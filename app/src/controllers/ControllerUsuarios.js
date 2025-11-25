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

const inscrever = async (req, res) => {
    try{
    let {nome , email, senha, tipo,endereco,cpf} = req.body;

    senha = await bcrypt.hash(senha, 10);
    console.log("senha;"+senha);

    

    const usuario = await Usuarios.create({nome,email,senha,tipo,endereco,cpf});

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
            return res.status(404).redirect('/login_cliente?error=notfound');
        }
        const Comparacao_Senha = await bcrypt.compare(req.body.senha, clienteExistente.senha);
        if (!Comparacao_Senha) {
            return res.status(401).redirect('/login_cliente?error=wrong');
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

        // simples sessão (se estiver usando express-session)
        if (req.session) {
            req.session.usuario = {
                id: clienteExistente.id,
                nome: clienteExistente.nome,
                email: clienteExistente.email,
                endereco: clienteExistente.endereco,
                cpf: clienteExistente.cpf,
                tipo: clienteExistente.tipo
            };
        }
        // redireciona para página inicial após login
        return res.redirect('/');

    }

    catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).redirect('/login_cliente?error=server');
    }}

// login de funcionário por código simples
const loginFuncionario = async (req, res) => {
    try {
        const { codigo } = req.body;
        const secret = process.env.FUNC_CODE || '12345';
        if (codigo === secret) {
            if (req.session) req.session.usuario = { tipo: 'funcionario' };
            return res.redirect('/trabalhe_conosco');
        }
        return res.redirect('/login_funcionario?error=wrong');
    } catch (error) {
        console.error('Erro login funcionario', error);
        return res.status(500).redirect('/login_funcionario?error=server');
    }
}

module.exports = { inscrever, LoginCliente, loginFuncionario };