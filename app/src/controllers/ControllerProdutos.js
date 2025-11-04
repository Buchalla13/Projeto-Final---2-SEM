const Produtos = require('../models/ModelsProdutos');
exports.listarProdutos = async (req, res) => {
 try {
Produtos.findAll({ include: [{ model: Categorias, as: 'categoria' }] });
 res.json(produtos);

 } catch (err) {
 res.status(500).send('Erro ao buscar produtos');
 }
};