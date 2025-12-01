const Usuarios = require('../models/ModelsUsuarios');
const bcrypt = require('bcrypt');

// GET - Listar todos os usuários
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll({
            attributes: { exclude: ['senha'] } // nunca expor senha
        });
        res.json(usuarios);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
};

// GET - Obter usuário por ID
exports.obterUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuarios.findByPk(id, {
            attributes: { exclude: ['senha'] }
        });

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
};

// POST - Inscrição de cliente
exports.inscrever = async (req, res) => {
    try {
        let { nome, email, senha, tipo, endereco, cpf } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
        }

        // verificar se email já existe
        const usuarioExistente = await Usuarios.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.redirect('/inscrever?error=email_exists');
        }

        // hash da senha
        senha = await bcrypt.hash(senha, 10);

        const usuario = await Usuarios.create({
            nome,
            email,
            senha,
            tipo: tipo || 'cliente',
            endereco: endereco || null,
            cpf: cpf || null
        });

        return res.redirect('/login_cliente?success=registered');
    } catch (error) {
        console.error('Erro ao inscrever:', error);
        return res.redirect('/inscrever?error=server');
    }
};

// POST - Login de cliente
exports.LoginCliente = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.redirect('/login_cliente?error=missing_fields');
        }

        const clienteExistente = await Usuarios.findOne({ where: { email } });
        if (!clienteExistente) {
            return res.redirect('/login_cliente?error=notfound');
        }

        const Comparacao_Senha = await bcrypt.compare(senha, clienteExistente.senha);
        if (!Comparacao_Senha) {
            return res.redirect('/login_cliente?error=wrong');
        }

        // armazenar sessão do usuário
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

        return res.redirect('/cliente');
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.redirect('/login_cliente?error=server');
    }
};

// POST - Login de funcionário
exports.loginFuncionario = async (req, res) => {
    try {
        const { email, senha, codigo } = req.body;

        if (!email || !senha) {
            return res.redirect('/login_funcionario?error=missing_fields');
        }

        const funcionarioExistente = await Usuarios.findOne({ where: { email } });
        if (!funcionarioExistente) {
            return res.redirect('/login_funcionario?error=notfound');
        }

        // verificar tipo
        if (funcionarioExistente.tipo !== 'funcionario') {
            return res.redirect('/login_funcionario?error=not_employee');
        }

        const Comparacao_Senha = await bcrypt.compare(senha, funcionarioExistente.senha);
        if (!Comparacao_Senha) {
            return res.redirect('/login_funcionario?error=wrong');
        }

        // armazenar sessão do funcionário
        if (req.session) {
            req.session.usuario = {
                id: funcionarioExistente.id,
                nome: funcionarioExistente.nome,
                email: funcionarioExistente.email,
                tipo: 'funcionario'
            };
        }

        return res.redirect('/funcionario');
    } catch (error) {
        console.error('Erro ao fazer login de funcionário:', error);
        return res.redirect('/login_funcionario?error=server');
    }
};

// PUT - Atualizar usuário
exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, endereco, cpf, senha } = req.body;

        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        if (nome) usuario.nome = nome;
        if (email) usuario.email = email;
        if (endereco) usuario.endereco = endereco;
        if (cpf) usuario.cpf = cpf;
        if (senha) {
            usuario.senha = await bcrypt.hash(senha, 10);
        }

        await usuario.save();

        res.json({
            sucesso: true,
            mensagem: 'Usuário atualizado com sucesso',
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhes: err.message });
    }
};

// DELETE - Deletar usuário
exports.deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        await usuario.destroy();

        res.json({
            sucesso: true,
            mensagem: 'Usuário deletado com sucesso'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao deletar usuário', detalhes: err.message });
    }
};