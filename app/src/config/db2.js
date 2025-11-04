
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

let db;
async function getDb() {
  if (db) return db;
  db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  return db;
}

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
  } catch (err) {
    throw err;
  } finally {
    await connection.end();
  }
  await getDb();
}

async function createTables() { 
  const conn = await getDb();

  await conn.query(`CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('cliente', 'funcionario', 'admin') DEFAULT 'cliente',
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(15),
    endereco TEXT);`);
 
  await conn.query(`CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL,
    categoria VARCHAR(50));`);
 
  await conn.query(`CREATE TABLE IF NOT EXISTS vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_funcionario INT,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES usuarios(id),
    FOREIGN KEY (id_funcionario) REFERENCES usuarios(id));`);
 
  await conn.query(`CREATE TABLE IF NOT EXISTS itens_venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_venda INT,
    id_produto INT,
    quantidade INT,
    FOREIGN KEY (id_venda) REFERENCES vendas(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id));`);
}

async function ConectaDb() {
  try {
    const conn = await getDb();
    // teste simples de query para verificar conectividade
    await conn.query('SELECT 1');
    console.log("Database conectada com sucesso!");
    return true;
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return false;
  }
}

async function createUser(email, password) {

  const hashpass = await bcrypt.hash(password, 10);
  const conn = await getDb();
  // ajustar para a tabela `usuarios` e coluna `senha`
  const sql = `INSERT INTO usuarios (email, senha) VALUES (?, ?)`;
  const [result] = await conn.execute(sql, [email, hashpass]);
  return result.insertId;
}

async function QueryDatabase(query, params) {

  try {
    const conn = await getDb();
    const [rows] = await conn.execute(query, params);
    return rows;
  } catch (error) {
    throw error;
  }
}



// funções utilitárias compatíveis com código existente (Model.js espera db.execute)
async function execute(query, params) {
  const conn = await getDb();
  return conn.execute(query, params);
}

async function query(queryText, params) {
  const conn = await getDb();
  return conn.query(queryText, params);
}

module.exports = { createDatabase, createTables, ConectaDb, createUser, QueryDatabase, execute, query };