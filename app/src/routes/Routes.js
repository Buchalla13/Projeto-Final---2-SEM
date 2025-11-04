const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controller");

router.get("/", controllers.paginaInicial);

router.get("/inscrever", (req, res) => {
  // renderiza a view cadastro.ejs (views path configurado em app.js)
  res.render("cadastro_cliente");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/trabalhe_conosco", (req, res) => {
  res.render("funcionario");
});

module.exports = router;
