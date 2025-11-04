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
 allowNull: false
 }, 

 email: {
 type: DataTypes.STRING(100),
 allowNull: false,
 unique: true
 },

senha: {
 type: DataTypes.STRING(100),
 allowNull: false
},

cpf: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true
},

telefone: {
    type: DataTypes.STRING(15),
    allowNull: false
}, 

endereco: {
    type: DataTypes.TEXT,
    allowNull: false
}
}, {
 tableName: 'Usuarios',
 timestamps: false
});
module.exports = User;