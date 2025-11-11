const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Itens = sequelize.define('Itens', {

id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},

Venda_id: {
    type: DataTypes.INTEGER,
    references: {
    model: 'Vendas',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
},

Produto_id: {
    type: DataTypes.INTEGER,
    references: {
    model: 'Produtos',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
}, 

quantidade:{
    type: DataTypes.INTEGER,
    allowNull: false
},
preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
},
subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
},

UsuarioI_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'Usuarios',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
}
}, {
 tableName: 'Itens_Venda',
 timestamps: false
});
module.exports = Itens;