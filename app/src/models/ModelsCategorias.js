const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Categorias = sequelize.define('Categorias', {

id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
nome: {
    type: DataTypes.STRING(50),
},
descricao: {
    type: DataTypes.TEXT,
    allowNull: true
},

}, {
 tableName: 'Categorias',
 timestamps: false
});
module.exports = Categorias;