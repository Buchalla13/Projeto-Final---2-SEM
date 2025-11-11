const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controller");

// Páginas públicas (views)
router.get("/", controllers.paginaInicial);
router.get("/inscrever", (req, res) => res.render("cadastro_cliente"));
router.get("/inscrever_funcionario", (req, res) => res.render("cadastro_funcionario"));
router.get("/login_cliente", (req, res) => res.render("login_cliente"));
router.get("/login_funcionario", (req, res) => res.render("login_funcionario"));
router.get("/trabalhe_conosco", (req, res) => res.render("funcionario"));
router.get("/sobre", (req, res) => res.render("sobre"));

module.exports = router;
