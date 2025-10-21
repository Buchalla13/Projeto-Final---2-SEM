const db = require('../config/db');

const Produto = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM produtos WHERE ativo = TRUE');
    return rows;
  },
  
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Produto;