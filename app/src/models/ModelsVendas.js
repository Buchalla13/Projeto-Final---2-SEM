const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Vendas = sequelize.define('Vendas', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // Cliente (usuário que comprou)
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },

    // Funcionário (opcional - quem processou/registrou a venda)
    funcionarioId: {
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    tipo: {
        type: DataTypes.ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado'),
        allowNull: false,
        defaultValue: 'pendente'
    },

    pagamento: {
        type: DataTypes.ENUM('cartao', 'boleto', 'pix', 'transferencia'),
        allowNull: true,
    },

    endereco_entrega: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Vendas',
    timestamps: false
});

module.exports = Vendas;