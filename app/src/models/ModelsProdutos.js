const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Produtos = sequelize.define('Produtos', {

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

preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
},

categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false
}, 

Tamanho: {
    type: DataTypes.STRING(10),
    allowNull: false
},

Cor: {
    type: DataTypes.STRING(20),
    allowNull: false
},
Imagem: {
    type: DataTypes.STRING(255),
    allowNull: true
},

Estoque: {
    type: DataTypes.INTEGER,
    allowNull: false
}
}, {
 tableName: 'Produtos',
 timestamps: false
});
module.exports = Produtos;
