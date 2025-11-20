const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.ImagekitID,
    privateKey: process.env.ImagekitPrivate,
    urlEndpoint: process.env.URLendpoint
});

// Página com o formulário
router.get('/testar-upload', (req, res) => {
    res.render('testar-upload', { urlImagem: null });
});

// Recebe o upload real
router.post('/testar-upload', upload.single('imagem'), async (req, res) => {
    try {
        if (!req.file) {
            return res.render('testar-upload', { urlImagem: null, erro: 'Nenhuma imagem enviada!' });
        }

        const resultado = await imagekit.upload({
            file: req.file.buffer,
            fileName: req.file.originalname
        });

        const url = resultado.url;

        res.render('testar-upload', { urlImagem: url });
    } catch (err) {
        console.log(err);
        res.render('testar-upload', { urlImagem: null, erro: 'Erro ao enviar imagem.' });
    }
});

module.exports = router;
