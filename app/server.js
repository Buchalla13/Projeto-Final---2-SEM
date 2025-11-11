const app = require('./src/app');
const sequelize = require('./src/config/db');
const Produtos = require('./src/models/ModelsProdutos');
const Categorias = require('./src/models/ModelsCategorias');
const Vendas = require('./src/models/ModelsVendas');
const Usuarios = require('./src/models/ModelsUsuarios');

sequelize.sync().then(() => {
 

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
})});

// Um produto pertence a uma categoria --- BDD
Produtos.belongsTo(Categorias, { foreignKey: 'categoriaId', as: 'categoria' });
Categorias.hasMany(Produtos, { foreignKey: 'categoriaId', as: 'produtos' });

// Uma venda pertence a um usuário --- BDD
//Vendas.belongsTo(Usuarios, { foreignKey: 'Usuario_id', as: 'usuario' });
//Usuarios.hasMany(Vendas, { foreignKey: 'Usuario_id', as: 'vendas' });
