const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controller");
const controllerU = require("../controllers/ControllerUsuarios");
const controllerP = require("../controllers/ControllerProdutos");
const controllerC = require("../controllers/ControllerCategorias");
const controllerV = require("../controllers/ControllerVendas");

// ============================================================
// PRA AJUDAR O LÉO, ROTAS DO VIEW
// ============================================================
// GET routes - renderizam views (ejs)

// / -> inicial.ejs
router.get("/", controllers.paginaInicial);

// /cliente -> cliente.ejs
router.get("/cliente", controllers.paginaCliente);

// /inscrever -> cadastro_cliente.ejs
router.get("/inscrever", (req, res) => res.render("cadastro_cliente"));

// /inscrever_funcionario -> funcionario.ejs (reutiliza para cadastro funcionário)
router.get("/inscrever_funcionario", (req, res) => res.render("funcionario"));

// /login_cliente -> login_cliente.ejs
router.get("/login_cliente", (req, res) => res.render("login_cliente"));

// /login_funcionario -> funcionario.ejs
router.get("/login_funcionario", (req, res) => res.render("funcionario"));

// /trabalhe_conosco -> funcionario.ejs
router.get("/funcionario", (req, res) => res.render("funcionario"));

// /sobre -> sobre.ejs
router.get("/sobre", (req, res) => res.render("sobre"));

// /testar-upload -> testar-upload.ejs (rota já existe em rotateste.js, mantém lá)
// Referência: /testar-upload -> testar-upload.ejs

// ============================================================
// POST routes - autenticação e formulários
// ============================================================

// Inscrição de cliente
router.post("/inscrever", controllerU.inscrever);

// Login de cliente
router.post("/login_cliente", controllerU.LoginCliente);

// Login de funcionário
router.post("/login_funcionario", controllerU.loginFuncionario);

// ============================================================
// ROTAS DE API - CRUD de recursos
// ============================================================

// Categorias
router.get("/api/categorias", controllerC.listarCategorias);
router.get("/api/categorias/:id", controllerC.obterCategoriaById);
router.post("/api/categorias", controllerC.criarCategoria);
router.put("/api/categorias/:id", controllerC.atualizarCategoria);
router.delete("/api/categorias/:id", controllerC.deletarCategoria);

// Produtos (routes específicas também estão em uploadRoutes.js)
router.get("/api/produtos", controllerP.listarProdutos);
router.get("/api/produtos/:id", controllerP.obterProdutoById);

// Usuários
router.get("/api/usuarios", controllerU.listarUsuarios);
router.get("/api/usuarios/:id", controllerU.obterUsuarioById);
router.put("/api/usuarios/:id", controllerU.atualizarUsuario);
router.delete("/api/usuarios/:id", controllerU.deletarUsuario);

// Vendas
router.get("/api/vendas", controllerV.listarVendas);
router.get("/api/vendas/:id", controllerV.obterVendaById);
router.post("/api/vendas", controllerV.criarVenda);
router.put("/api/vendas/:id", controllerV.atualizarVenda);
router.delete("/api/vendas/:id", controllerV.deletarVenda);

// Itens de Venda
router.get("/api/itens-venda", controllerV.listarItensVenda);
router.post("/api/itens-venda", controllerV.criarItemVenda);

module.exports = router;
