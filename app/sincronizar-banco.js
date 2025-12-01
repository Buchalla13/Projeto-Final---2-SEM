require("dotenv").config();
const sequelize = require("./src/config/db");

const Usuarios = require("./src/models/ModelsUsuarios");

const Produtos = require("./src/models/ModelsProdutos");
const Categorias = require("./src/models/ModelsCategorias");

const Vendas = require("./src/models/ModelsVendas");
const ItensVenda = require("./src/models/Models_itensVenda");

Usuarios.hasMany(Vendas, {
  foreignKey: "usuarioId",
  as: "vendas",
});
Vendas.belongsTo(Usuarios, {
  foreignKey: "usuarioId",
  as: "usuario",
});

Categorias.hasMany(Produtos, {
  foreignKey: "categoriaId",
  as: "produtos",
});
Produtos.belongsTo(Categorias, {
  foreignKey: "categoriaId",
  as: "categoria",
});

Vendas.hasMany(ItensVenda, {
  foreignKey: "vendaId",
  as: "itens",
});
ItensVenda.belongsTo(Vendas, {
  foreignKey: "vendaId",
  as: "venda",
});

Produtos.hasMany(ItensVenda, {
  foreignKey: "produtoId",
  as: "itensVenda",
});
ItensVenda.belongsTo(Produtos, {
  foreignKey: "produtoId",
  as: "produto",
});

const sincronizar = async () => {
  try {
    await sequelize.sync({ alter: true });
    process.exit(0);
  } catch (erro) {
    process.exit(1);
  }
};

sincronizar();
