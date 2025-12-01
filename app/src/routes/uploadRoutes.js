const express = require("express");
const multer = require("multer");
const controllerProdutos = require("../controllers/ControllerProdutos");

const router = express.Router();
const upload = multer(); // recebe a imagem via buffer

// POST - Upload de imagem e criação de produto
router.post("/produtos/upload", upload.single("imagem"), controllerProdutos.criarProduto);

// GET - Listar todos os produtos
router.get("/produtos", controllerProdutos.listarProdutos);

// GET - Buscar produto por ID
router.get("/produtos/:id", controllerProdutos.obterProdutoById);

// PUT - Atualizar produto
router.put("/produtos/:id", upload.single("imagem"), controllerProdutos.atualizarProduto);

// DELETE - Deletar produto
router.delete("/produtos/:id", controllerProdutos.deletarProduto);

module.exports = router;
