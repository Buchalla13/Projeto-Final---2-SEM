const app = require('./src/app');
const sequelize = require('./src/config/db');

sequelize.sync().then(() => {
 app.listen(2000, () => console.log('Servidor rodando em http://localhost:2000'));
});
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});
