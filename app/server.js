const app = require('./src/app');
const sequelize = require('./src/config/db');
const Produtos = require('./ModelsProdutos');
const Categorias = require('./ModelsCategorias');
const Vendas = require('./ModelsVendas');
const Usuarios = require('./ModelsUsuarios');

sequelize.sync().then(() => {
 app.listen(2000, () => console.log('Servidor rodando em http://localhost:2000'));
});
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});

// Um produto pertence a uma categoria --- BDD
Produtos.belongsTo(Categorias, { foreignKey: 'categoriaId', as: 'categoria' });
Categorias.hasMany(Produtos, { foreignKey: 'categoriaId', as: 'produtos' });

// Uma venda pertence a um usuário --- BDD
Vendas.belongsTo(Usuarios, { foreignKey: 'Usuario_id', as: 'usuario' });
Usuarios.hasMany(Vendas, { foreignKey: 'Usuario_id', as: 'vendas' });
