const express = require('express');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
const path = require('path');
app.use(express.static(path.join(__dirname, 'view')));
// Configurando middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
module.exports = app;

const Routes = require('./routes/Routes');
app.use('/', Routes);