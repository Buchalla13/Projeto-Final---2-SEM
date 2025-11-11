const Usuarios = require('../models/ModelsCategorias');
exports.listarCategorias = async (req, res) => {
 try {
 const categorias = await Categorias.findAll();
 res.json(categorias);

 } catch (err) {
 res.status(500).send('Erro ao buscar categorias');
 }
};