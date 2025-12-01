require('dotenv').config(); //Do Buchalla!!!
const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/auth');
const Routes = require('./routes/Routes'); // Corrigido
const { cliente, funcionario } = require('./middlewares/autenticacao');
const Vendas = require('./models/ModelsVendas'); // Certifique-se de importar o modelo correto
const Produtos = require('./models/ModelsProdutos');
const Usuarios = require('./models/ModelsUsuarios');
const uploadRoutes = require('./routes/uploadRoutes');

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

app.get('/funcionario', funcionario, async (req, res) => {
  try {
    const usuarioId = req.session.usuarioId;

    // Buscar dados necessários para renderizar o painel do funcionário
    const produtos = await Produtos.findAll();
    const clientes = await Usuarios.findAll({ where: { tipo: 'cliente' } });
    const vendas = await Vendas.findAll();

    res.render('funcionario', {
      usuario: req.session,
      produtos,
      clientes,
      vendas
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao carregar painel');
  }
});


// Rotas de autenticação
app.use('/auth', authRouter);

// Rotas de upload/produtos (multer + imagekit)
app.use('/api', uploadRoutes);

// Rotas principais
app.use('/', Routes);

module.exports = app;