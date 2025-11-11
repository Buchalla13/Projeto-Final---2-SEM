const Usuarios = require('../models/ModelsUsuarios');
exports.listarUsuarios = async (req, res) => {
 try {
 const usuarios = await Usuarios.findAll();
 res.json(usuarios);
 
 } catch (err) {
 res.status(500).send('Erro ao buscar usuários');
 }
};