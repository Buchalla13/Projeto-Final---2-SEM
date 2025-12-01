const Vendas = require('../models/ModelsVendas');
const ItensVenda = require('../models/Models_itensVenda');
const Produtos = require('../models/ModelsProdutos');
const sequelize = require('../config/db');

// GET - Listar todas as vendas
exports.listarVendas = async (req, res) => {
    try {
        const vendas = await Vendas.findAll({
            include: [{ model: ItensVenda, as: 'itens' }]
        });
        res.json(vendas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar vendas' });
    }
};

// GET - Obter venda por ID
exports.obterVendaById = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await Vendas.findByPk(id, {
            include: [{ model: ItensVenda, as: 'itens' }]
        });

        if (!venda) {
            return res.status(404).json({ erro: 'Venda não encontrada' });
        }

        res.json(venda);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar venda' });
    }
};

// POST - Criar nova venda
exports.criarVenda = async (req, res) => {
    try {
        const { usuarioId, data, status, total } = req.body;

        if (!usuarioId || !total) {
            return res.status(400).json({ erro: 'usuarioId e total são obrigatórios' });
        }

        const venda = await Vendas.create({
            usuarioId,
            data: data || new Date(),
            status: status || 'pendente',
            total: parseFloat(total)
        });

        res.status(201).json({
            sucesso: true,
            mensagem: 'Venda criada com sucesso',
            venda
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao criar venda', detalhes: err.message });
    }
};

// PUT - Atualizar venda
exports.atualizarVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, total, data } = req.body;

        const venda = await Vendas.findByPk(id);
        if (!venda) {
            return res.status(404).json({ erro: 'Venda não encontrada' });
        }

        if (status) venda.status = status;
        if (total) venda.total = parseFloat(total);
        if (data) venda.data = data;

        await venda.save();

        res.json({
            sucesso: true,
            mensagem: 'Venda atualizada com sucesso',
            venda
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar venda', detalhes: err.message });
    }
};

// DELETE - Deletar venda
exports.deletarVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await Vendas.findByPk(id);

        if (!venda) {
            return res.status(404).json({ erro: 'Venda não encontrada' });
        }

        // Deletar itens associados
        await ItensVenda.destroy({ where: { vendaId: id } });
        await venda.destroy();

        res.json({
            sucesso: true,
            mensagem: 'Venda deletada com sucesso'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao deletar venda', detalhes: err.message });
    }
};

// GET - Listar itens de venda
exports.listarItensVenda = async (req, res) => {
    try {
        const itens = await ItensVenda.findAll();
        res.json(itens);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar itens de venda' });
    }
};

// POST - Criar item de venda
exports.criarItemVenda = async (req, res) => {
    try {
        const { vendaId, produtoId, quantidade, precoUnitario } = req.body;

        if (!vendaId || !produtoId || !quantidade || !precoUnitario) {
            return res.status(400).json({ 
                erro: 'vendaId, produtoId, quantidade e precoUnitario são obrigatórios' 
            });
        }

        const item = await ItensVenda.create({
            vendaId,
            produtoId,
            quantidade: parseInt(quantidade, 10),
            precoUnitario: parseFloat(precoUnitario)
        });

        res.status(201).json({
            sucesso: true,
            mensagem: 'Item de venda criado com sucesso',
            item
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao criar item de venda', detalhes: err.message });
    }
};

// POST - Checkout: cria venda e itens em transação, checa estoque e debita
exports.checkout = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const usuarioId = req.session && req.session.usuario ? req.session.usuario.id : null;
        const { items } = req.body; // items: [{ produtoId, quantidade, precoUnitario }]

        if (!items || !Array.isArray(items) || items.length === 0) {
            await t.rollback();
            return res.status(400).json({ erro: 'Carrinho vazio' });
        }

        // calcular total no servidor e validar estoque
        let total = 0;
        for (const it of items) {
            const produto = await Produtos.findByPk(it.produtoId, { transaction: t });
            if (!produto) {
                await t.rollback();
                return res.status(404).json({ erro: `Produto ${it.produtoId} não encontrado` });
            }
            const qty = parseInt(it.quantidade, 10) || 1;
            if (produto.Estoque < qty) {
                await t.rollback();
                return res.status(400).json({ erro: `Estoque insuficiente para ${produto.nome}` });
            }
            const preco = parseFloat(it.precoUnitario) || parseFloat(produto.preco) || 0;
            total += preco * qty;
        }

        const venda = await Vendas.create({
            usuarioId,
            data: new Date(),
            status: 'pendente',
            total: parseFloat(total.toFixed(2))
        }, { transaction: t });

        for (const it of items) {
            const produto = await Produtos.findByPk(it.produtoId, { transaction: t });
            const qty = parseInt(it.quantidade, 10) || 1;
            const preco = parseFloat(it.precoUnitario) || parseFloat(produto.preco) || 0;

            await ItensVenda.create({
                vendaId: venda.id,
                produtoId: it.produtoId,
                quantidade: qty,
                precoUnitario: preco
            }, { transaction: t });

            produto.Estoque = produto.Estoque - qty;
            await produto.save({ transaction: t });
        }

        await t.commit();
        return res.status(201).json({ sucesso: true, vendaId: venda.id });
    } catch (err) {
        await t.rollback();
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao processar compra', detalhes: err.message });
    }
};