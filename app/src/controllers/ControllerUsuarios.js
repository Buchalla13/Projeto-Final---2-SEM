const Usuarios = require('../models/ModelsUsuarios');
exports.listarUsuarios = async (req, res) => {
 try {
 const usuarios = await Usuarios.findAll();
 res.json(usuarios);
 
 } catch (err) {
 res.status(500).send('Erro ao buscar usuários');
 }
};

exports.inscrever = async (req, res) => {
    try{
    const {nome , email, senha, endereco,cpf} = req.body;
    const usuario = await Usuarios.create({nome,email,senha,endereco,cpf});
        return res.redirect('/login_cliente');
    } catch (error) {
        console.error('deu b.o', error);
        return res.status(500).send('deu b.o no serve');
    }
};
