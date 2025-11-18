const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controller");
const controllerU = require("../controllers/ControllerUsuarios")

// Páginas públicas (views)
router.get("/", controllers.paginaInicial);
router.get("/inscrever", (req, res) => res.render("cadastro_cliente"));
router.get("/inscrever_funcionario", (req, res) => res.render("cadastro_funcionario"));
router.get("/login_cliente", (req, res) => res.render("login_cliente"));
// agora a rota de login do funcionário usa a view `funcionario.ejs` com campo de código
router.get("/login_funcionario", (req, res) => res.render("funcionario"));
router.get("/trabalhe_conosco", (req, res) => res.render("funcionario"));
router.get("/sobre", (req, res) => res.render("sobre"));

router.post("/inscrever",controllerU.inscrever)
// rotas de autenticação
router.post('/login_cliente', controllerU.LoginCliente);
router.post('/login_funcionario', controllerU.loginFuncionario);

module.exports = router;
