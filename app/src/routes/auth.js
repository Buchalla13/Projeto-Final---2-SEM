const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// GET - Página de login
router.get('/login-funcionario', AuthController.telaLogin);

// POST - Processar login
router.post('/login-funcionario', AuthController.loginFuncionario);

// GET - Logout
router.get('/logout', AuthController.logout);

module.exports = router;