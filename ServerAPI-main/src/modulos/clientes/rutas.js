const express = require('express');
const router = express.Router();
const respuestas = require('../../red/respuestas');
const controlador = require('../../modulos/clientes/controlador');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await controlador.todos();
    respuestas.success(req, res, 200, clientes);
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

// Obtener un cliente por id
router.get('/:id', async (req, res) => {
  try {
    const cliente = await controlador.uno(req.params.id);
    if (!cliente) {
      return respuestas.error(req, res, 404, 'Cliente no encontrado');
    }
    respuestas.success(req, res, 200, cliente);
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

// Agregar un nuevo cliente (inserción)
router.post('/agregar', async (req, res) => {
  try {
    await controlador.agregar(req.body);
    respuestas.success(req, res, 200, 'Cliente insertado');
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

// Actualizar un cliente existente
router.post('/actualizar', async (req, res) => {
  try {
    if (!req.body.id) {
      return respuestas.error(req, res, 400, 'El id es requerido para actualizar');
    }
    await controlador.actualizar(req.body);
    respuestas.success(req, res, 200, 'Cliente actualizado');
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

// Eliminar un cliente
router.post('/eliminar', async (req, res) => {
  try {
    if (!req.body.id) {
      return respuestas.error(req, res, 400, 'El id es requerido para eliminar');
    }
    await controlador.eliminar(req.body.id);
    respuestas.success(req, res, 200, 'Cliente eliminado');
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define('login', {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      tel: DataTypes.STRING,
      email: DataTypes.STRING,
      estado: DataTypes.STRING,
      area: DataTypes.STRING,
      pais: DataTypes.STRING
  }, {
      timestamps: false
  });
  return Login;
};

module.exports = router;
