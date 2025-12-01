module.exports = {
  cliente: (req, res, next) => {
    if (req.session.usuario && req.session.usuario.tipo === 'cliente') {
      return next();
    }
    res.redirect('/login-cliente');
  },
  funcionario: (req, res, next) => {
    if (req.session.usuario && req.session.usuario.tipo === 'funcionario') {
      return next();
    }
    res.redirect('/login-funcionario');
  },
};