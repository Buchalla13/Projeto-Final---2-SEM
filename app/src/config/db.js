
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_HOST || 'root', 
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'projeto_escola'
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