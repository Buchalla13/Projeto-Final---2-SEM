const app = require('./src/app');
const sequelize = require('./src/config/db');
const Produtos = require('./src/models/ModelsProdutos');
const Categorias = require('./src/models/ModelsCategorias');
const Vendas = require('./src/models/ModelsVendas');
const Usuarios = require('./src/models/ModelsUsuarios');
const ItensVenda = require('./src/models/Models_itensVenda');

sequelize.sync().then(() => {
 

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
})});

// Um produto pertence a uma categoria --- BDD
Produtos.belongsTo(Categorias, { foreignKey: 'categoriaId', as: 'categoria' });
Categorias.hasMany(Produtos, { foreignKey: 'categoriaId', as: 'produtos' });

// Associações de vendas, itens e usuários
Vendas.belongsTo(Usuarios, { foreignKey: 'usuarioId', as: 'cliente' });
Usuarios.hasMany(Vendas, { foreignKey: 'usuarioId', as: 'vendas' });

Vendas.belongsTo(Usuarios, { foreignKey: 'funcionarioId', as: 'funcionario' });

Vendas.hasMany(ItensVenda, { foreignKey: 'vendaId', as: 'itens' });
ItensVenda.belongsTo(Vendas, { foreignKey: 'vendaId', as: 'venda' });

ItensVenda.belongsTo(Produtos, { foreignKey: 'produtoId', as: 'produto' });
Produtos.hasMany(ItensVenda, { foreignKey: 'produtoId', as: 'itens' });
