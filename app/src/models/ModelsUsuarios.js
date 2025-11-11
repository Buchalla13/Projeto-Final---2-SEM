const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = sequelize.define('User', {
 id: {
 type: DataTypes.INTEGER,
 primaryKey: true,
 autoIncrement: true,
 
 },
 nome: {
 type: DataTypes.STRING(100),
 allowNull: true,
 defaultValue:'N/A'
 }, 

 email: {
 type: DataTypes.STRING(100),
 allowNull: true,
 unique: true,
defaultValue:'N/A'
 },

senha: {
 type: DataTypes.STRING(100),
  defaultValue:'N/A',
 allowNull: true
},
tipo: {
    type: DataTypes.ENUM('cliente', 'funcionario', 'admin'),
    defaultValue: 'cliente',
    allowNull: true
},
cpf: {
    type: DataTypes.STRING(11),
    allowNull: true,
    defaultValue:'N/A',
    unique: true
},

telefone: {
    type: DataTypes.STRING(15),
    defaultValue:'N/A',
    allowNull: true
},

endereco: {
    type: DataTypes.TEXT,
    defaultValue:'N/A',
    allowNull: true
}
}, {
 tableName: 'Usuarios',
 timestamps: false
});

function create(dados) {
    const novoUser = User.build(dados)
    novoUser.save();
}
module.exports = User;
// Exporta apenas o model Sequelize para que chamadas como `Usuarios.create(...)`
// funcionem corretamente quando importado em controllers.



