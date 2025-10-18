const db = require('../config/db');

const Task = {
    getAll: (callback) => {
        db.query('SELECT * FROM tarefas', callback);
    },

    create: (data, callback) => {
        const { titulo, descricao } = data;
        db.query(
            'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)', 
            [titulo, descricao], 
            callback
        );
    },

    };

module.exports = Task; 