const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

class AuthController {
  static async telaLogin(req, res) {
    try {
      res.render('login_funcionario', { erro: null });
    } catch (erro) {
      console.error(erro);
      res.status(500).send('Erro ao carregar página de login');
    }
  }

  static async loginFuncionario(req, res) {
    try {
      const { email, senha } = req.body;

      // Validar campos
      if (!email || !senha) {
        return res.render('login_funcionario', { erro: 'Email e senha são obrigatórios' });
      }

      // Buscar usuário no banco (tipo = 'funcionario')
      const usuario = await Usuario.findOne({ 
        where: { email, tipo: 'funcionario' } 
      });

      if (!usuario) {
        return res.render('login_funcionario', { erro: 'Email ou senha inválidos' });
      }

      // Comparar senha (usando bcrypt)
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      
      if (!senhaValida) {
        return res.render('login_funcionario', { erro: 'Email ou senha inválidos' });
      }

      // Criar sessão
      req.session.usuarioId = usuario.id;
      req.session.tipo = usuario.tipo;
      req.session.nome = usuario.nome;
      req.session.email = usuario.email;

      // Redirecionar para painel do funcionário
      res.redirect('/funcionario');
    } catch (erro) {
      console.error(erro);
      res.status(500).render('login_funcionario', { erro: 'Erro ao fazer login' });
    }
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Erro ao fazer logout');
      }
      res.redirect('/');
    });
  }
}

module.exports = AuthController;