const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Controller');


router.get('/', controllers.paginaInicial);

module.exports = router;