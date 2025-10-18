const mysql = require('mysql2');

const connection = mysql.createConnection({
 host: '127.0.0.1',
 user: 'root',
 password: 'B1st3c40',
 database: 'projeto_final_bd'
});

connection.connect((err) => {
 if (err) {
 console.error('Erro ao conectar no MySQL:', err);
 return;
 }

 console.log('Conectado ao MySQL com sucesso!');
});

module.exports = connection;

