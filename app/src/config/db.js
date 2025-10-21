
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1' || 'localhost',
  user: 'root', 
  password: 'B1st3c40',
  database: 'projeto_final_bd'
}).promise();

async function getUsuarios() {
  const [rows] = await db.execute('SELECT * FROM usuarios');
  return rows;
}
db.connect((err) => {
 if (err) {
 console.error('Erro ao conectar no MySQL:', err);
 return;
 }
 console.log('Conectado ao MySQL com sucesso!');
});
module.exports = {getUsuarios, db};