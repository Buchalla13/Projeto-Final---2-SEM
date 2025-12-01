const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ItensVenda = sequelize.define('ItensVenda', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Venda_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Vendas',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  Produto_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Produtos',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  UsuarioI_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Permitir valores NULL
    references: {
      model: 'Usuarios',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = ItensVenda;