const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Vendas = sequelize.define('Vendas', {

id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},

usuarioV_id: {
    type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: 'Usuarios',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
},

total: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: true
}, 

tipo: {
    type: DataTypes.ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado'),
    allowNull: false,
    defaultValue: 'pendente'
},

pagamento: {
    type: DataTypes.ENUM('cartao', 'boleto', 'pix', 'transferencia'),
    allowNull: false,
},
endereco_entrega: {
    type: DataTypes.TEXT,
    allowNull: false
}
}, {
 tableName: 'Vendas',
 timestamps: false
});
module.exports = Vendas;