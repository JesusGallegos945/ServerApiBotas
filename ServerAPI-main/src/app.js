const express = require('express');
const cors = require('cors'); // Importa cors
const config = require('./config');
const clientes = require('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutasUsuarios');
const loginRoutes = require('../modulos/login/loginRoutes');

const app = express();

app.use(cors()); // Se activa CORS para todas las rutas
app.use(express.json());

app.set('port', config.app.port);

app.use('/api/clientes', clientes);
app.use('/api/usuarios', usuarios);
app.use('/api/login', loginRoutes);

module.exports = app;
