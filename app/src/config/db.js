const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('Projeto_BDD', 'root',
'aluno123', {
 host: 'localhost',
 dialect: 'mysql'
});
sequelize.authenticate().then(() => console.log('Conectado ao MySQL com Sequelize!'))
 .catch(err => console.error('Erro ao conectar:', err));
 
module.exports = sequelize;
