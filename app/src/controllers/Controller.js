const Task = require('../models/Model');

exports.listarTarefas = (req, res) => {
    Task.getAll((err, results) => {
        if (err) return res.status(500).send('Erro ao buscar tarefas');
        res.json(results);
    });
};

exports.criarTarefa = (req, res) => {
    const novaTarefa = req.body;
    Task.create(novaTarefa, (err, result) => {
        if (err) return res.status(500).send('Erro ao criar tarefa');
        res.send('Tarefa criada com sucesso!');
    });
};

exports.paginaInicial = (req, res) => {
let pagina = ejs.render('formularioTarefas')
 res.render(pagina)
};
