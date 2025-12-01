require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/auth');
const verificarAutenticacao = require('./middlewares/autenticacao');
const Produtos = require('./models/ModelsProdutos');
const Usuarios = require('./models/ModelsUsuarios');
const routes = require('./routes/Routes');

const app = express();

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'sua_chave_secreta_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views'); // ajuste para o caminho correto das views
app.use(express.static('./public')); // ajuste para o caminho correto dos assets

// Rotas de autenticação
app.use('/auth', authRouter);

// Painel do funcionário (rota protegida)
app.get('/funcionario', verificarAutenticacao, async (req, res) => {
  try {
    const produtos = await Produtos.findAll({ include: 'categoria' });
    const clientes = await Usuarios.findAll({ where: { tipo: 'cliente' } });

    res.render('funcionario', {
      usuario: req.session.usuario,
      produtos,
      clientes
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao carregar painel');
  }
});

// Página inicial
app.get('/', (req, res) => {
  res.render('inicial');
});

app.use('/', routes);

module.exports = app;
