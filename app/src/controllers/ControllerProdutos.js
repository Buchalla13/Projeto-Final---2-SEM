const Produtos = require('../models/ModelsProdutos');
const Categorias = require('../models/ModelsCategorias');
const imagekit = require('../config/imagekit');

// GET - Listar todos os produtos com URLs de imagens
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produtos.findAll({
      include: [{ model: Categorias, as: 'categoria' }]
    });
    res.json(produtos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
};

// POST - Criar novo produto com upload de imagem para ImageKit
exports.criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, categoriaId, Tamanho, Cor, Estoque } = req.body;

    // Validar campos obrigatórios
    if (!nome || !preco || !Tamanho || !Cor || !Estoque) {
      return res.status(400).json({ 
        erro: 'Campos obrigatórios faltando: nome, preco, Tamanho, Cor, Estoque' 
      });
    }

    let imagemUrl = null;

    // Validação robusta de categoriaId: converter para inteiro e verificar existência
    let categoriaIdInt = null;
    if (typeof categoriaId !== 'undefined' && categoriaId !== null && categoriaId !== '') {
      const parsed = parseInt(categoriaId, 10);
      if (!isNaN(parsed)) {
        const categoria = await Categorias.findByPk(parsed);
        if (categoria) categoriaIdInt = parsed;
        else categoriaIdInt = null; // categoria inválida -> armazenar NULL
      } else {
        categoriaIdInt = null; // valor não numérico
      }
    }

    // Se houver arquivo, fazer upload para ImageKit
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: `produto-${Date.now()}-${req.file.originalname}`,
        folder: '/produtos' // opcional: organizar em pasta
      });
      imagemUrl = result.url;
    }

    // Criar produto no banco de dados
    const novoProduto = await Produtos.create({
      nome,
      descricao: descricao || null,
      preco: parseFloat(preco),
      categoriaId: categoriaIdInt,
      Tamanho,
      Cor,
      Imagem: imagemUrl, // Salvar URL da imagem do ImageKit
      Estoque: parseInt(Estoque, 10)
    });

    res.status(201).json({
      sucesso: true,
      mensagem: 'Produto criado com sucesso',
      produto: novoProduto
    });

  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).json({ 
      erro: 'Erro ao criar produto',
      detalhes: err.message 
    });
  }
};

// GET - Buscar produto por ID
exports.obterProdutoById = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produtos.findByPk(id, {
      include: [{ model: Categorias, as: 'categoria' }]
    });

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produto' });
  }
};

// PUT - Atualizar produto (incluindo imagem)
exports.atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, categoriaId, Tamanho, Cor, Estoque } = req.body;

    const produto = await Produtos.findByPk(id);
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    // Se nova imagem foi enviada, fazer upload
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: `produto-${Date.now()}-${req.file.originalname}`,
        folder: '/produtos'
      });
      produto.Imagem = result.url;
    }

    // Atualizar campos
    if (nome) produto.nome = nome;
    if (descricao) produto.descricao = descricao;
    if (preco) produto.preco = parseFloat(preco);

    // Validar categoriaId fornecido na atualização
    if (typeof categoriaId !== 'undefined') {
      if (categoriaId === null || categoriaId === '') {
        produto.categoriaId = null;
      } else {
        const parsed = parseInt(categoriaId, 10);
        if (!isNaN(parsed)) {
          const categoria = await Categorias.findByPk(parsed);
          produto.categoriaId = categoria ? parsed : null;
        } else {
          produto.categoriaId = null;
        }
      }
    }

    if (Tamanho) produto.Tamanho = Tamanho;
    if (Cor) produto.Cor = Cor;
    if (Estoque) produto.Estoque = parseInt(Estoque, 10);

    await produto.save();

    res.json({
      sucesso: true,
      mensagem: 'Produto atualizado com sucesso',
      produto
    });

  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ 
      erro: 'Erro ao atualizar produto',
      detalhes: err.message 
    });
  }
};

// DELETE - Deletar produto
exports.deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produtos.findByPk(id);

    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    // Deletar imagem do ImageKit se existir (opcional)
    if (produto.Imagem) {
      try {
        // Extrair fileId da URL ou usar API de delete se tiver o fileId armazenado
        console.log(`Imagem do produto será removida: ${produto.Imagem}`);
      } catch (err) {
        console.warn('Erro ao deletar imagem do ImageKit:', err);
      }
    }

    await produto.destroy();

    res.json({
      sucesso: true,
      mensagem: 'Produto deletado com sucesso'
    });

  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ 
      erro: 'Erro ao deletar produto',
      detalhes: err.message 
    });
  }
};