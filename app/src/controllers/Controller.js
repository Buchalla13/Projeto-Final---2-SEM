const Task = require('../models/Model');
const ejs = require('ejs');

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
  res.sendFile(__dirname.replace("controllers","views/inicial.html"))
};
//------------------------Buchalla------------------------

/*const Produtos_controladores = {
 getAll: async (req, res) => {
   try {
      const produtos = await Task.getAll(); 
      res.render('produtos', { produtos }); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = Produtos_controladores;
//------------------Fim do Buchalla------------------------*/