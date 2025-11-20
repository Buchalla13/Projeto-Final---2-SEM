const express = require("express");
const multer = require("multer");
const Produtos = require("../models/ModelsProdutos");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const router = express.Router();
const upload = multer(); // recebe a imagem via buffer

router.post("/upload", upload.single("imagem"), async (req, res) => {
  try {
    const { titulo, categoriaId, preco } = req.body;

    if (!req.file) {
      return res.status(400).json({ erro: "Nenhum arquivo enviado" });
    }

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}-${req.file.originalname}`,
    });

    // cria produto no banco com Sequelize
    const novoProduto = await Produtos.create({
      titulo,
      preco,
      categoriaId,
      imagem: result.url, // só a URL vai pro MySQL
    });

    res.json({
      sucesso: true,
      produto: novoProduto,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
