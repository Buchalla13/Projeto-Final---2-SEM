const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ItensVenda = sequelize.define('ItensVenda', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  vendaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Vendas',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },

  produtoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Produtos',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
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

  precoUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, { tableName: 'ItensVenda', timestamps: false });

module.exports = ItensVenda;