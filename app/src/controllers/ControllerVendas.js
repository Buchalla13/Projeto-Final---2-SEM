const Vendas = require('../models/ModelsVendas');
exports.listarVendas = async (req, res) => {
 try {
 const vendas = await Vendas.findAll();
 res.json(vendas);

 } catch (err) {
 res.status(500).send('Erro ao buscar vendas');
 }
};