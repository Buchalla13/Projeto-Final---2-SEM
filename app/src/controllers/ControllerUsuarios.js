const Usuarios = require('../models/ModelsUsuarios');
const bcrypt = require('bcrypt');
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
    let {nome , email, senha, endereco,cpf} = req.body;

    senha = await bcrypt.hash(senha, 10);
    console.log("senha;"+senha);

    

    const usuario = await Usuarios.create({nome,email,senha,endereco,cpf});

        return res.redirect('/login_cliente');
    } catch (error) {
        console.error('deu b.o', error);
        return res.status(500).send('deu b.o no serve');
    }
};

const LoginCliente = async (req, res) => {
    try {
        const { nome, email } = req.body; 
        const clienteExistente = await Usuarios.findOne({ where: { email} });
        if (!clienteExistente) {
            return res.status(404).send('Usuário não encontrado');
        }
        const Comparacao_Senha = await bcrypt.compare(req.body.senha, clienteExistente.senha);
        if (!Comparacao_Senha) {
            return res.status(401).send('Senha incorreta');
        }
        
        req.session.usuario = {
            id: clienteExistente.id,
            nome: clienteExistente.nome,
            email: clienteExistente.email,
            endereco: clienteExistente.endereco,    
            cpf: clienteExistente.cpf,
            tipo: clienteExistente.tipo
        };
        res.status(200).send('Login realizado com sucesso');
    }

    catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).send('Erro ao fazer login');
    }}