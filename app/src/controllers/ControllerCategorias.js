const Categorias = require('../models/ModelsCategorias');

// GET - Listar todas as categorias
exports.listarCategorias = async (req, res) => {
  try {
    const categorias = await Categorias.findAll();
    res.json(categorias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar categorias' });
  }
};

// GET - Obter categoria por ID
exports.obterCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categorias.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    res.json(categoria);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar categoria' });
  }
};

// POST - Criar nova categoria
exports.criarCategoria = async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Nome da categoria é obrigatório' });
    }

    const categoria = await Categorias.create({
      nome,
      descricao: descricao || null
    });

    res.status(201).json({
      sucesso: true,
      mensagem: 'Categoria criada com sucesso',
      categoria
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar categoria', detalhes: err.message });
  }
};

// PUT - Atualizar categoria
exports.atualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    if (nome) categoria.nome = nome;
    if (descricao) categoria.descricao = descricao;

    await categoria.save();

    res.json({
      sucesso: true,
      mensagem: 'Categoria atualizada com sucesso',
      categoria
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar categoria', detalhes: err.message });
  }
};

// DELETE - Deletar categoria
exports.deletarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categorias.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    await categoria.destroy();

    res.json({
      sucesso: true,
      mensagem: 'Categoria deletada com sucesso'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar categoria', detalhes: err.message });
  }
};