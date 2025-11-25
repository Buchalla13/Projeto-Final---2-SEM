function verificarAutenticacao(req, res, next) {
  if (!req.session.usuarioId || req.session.tipo !== 'funcionario') {
    return res.redirect('/login-funcionario');
  }
  next();
}

module.exports = verificarAutenticacao;