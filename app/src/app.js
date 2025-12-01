require('dotenv').config(); //Do Buchalla!!!
const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/auth');
const verificarAutenticacao = require('./middlewares/autenticacao');
const { cliente, funcionario } = require('./middlewares/autenticacao');

const app = express();

// Configurar sessão
app.use(session({
  secret: 'sua_chave_secreta_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // true em produção com HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));

// Rotas de autenticação
app.use(authRouter);

// Rota do painel do funcionário (protegida)
app.get('/funcionario', funcionario, async (req, res) => {
  try {
    const usuarioId = req.session.usuarioId;

    res.render('funcionario', {
      usuario: req.session,
      produtos: [],
      clientes: []
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao carregar painel');
  }
});

// imageekit
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api", uploadRoutes);

const rotateste = require('./routes/rotateste');
app.use('/', rotateste);

const Routes = require('./routes/Routes');
app.use('/', Routes);

module.exports = app;