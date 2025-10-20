const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Controller');

router.get('/tarefas', controllers.getTarefas);
router.get('/tarefasFeitas/', controllers.getTarefasFeitas );
router.post('/tarefas/', controllers.criarTarefa );
router.get('/', controllers.paginaInicial);
router.delete('/tarefas/', controllers.deletarTarefa);
router.put('/tarefas/', controllers.editarTarefa);
module.exports = router;