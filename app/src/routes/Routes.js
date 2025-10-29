const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Controller');

router.get('/', controllers.paginaInicial);

router.get('/inscrever', (req, res) => {
  res.send('a rota pra novo cliente ta rodando'); // todos os res.send são pra teste
});

router.get('/login', (req, res) => {
  res.send('a rota logar ta rodando');
});

router.get('/trabalhe_conosco', (req, res) => {
  res.send('a rota do CLT ta rodando');
});

module.exports = router;