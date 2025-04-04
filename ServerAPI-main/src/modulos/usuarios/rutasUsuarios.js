const express = require('express');
const router = express.Router();
const respuestas = require('../../red/respuestas');
const controladorUser = require('./controladorUser');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await controladorUser.todos();
    respuestas.success(req, res, 200, users);
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

// Obtener un usuario por id
router.get('/:id', async (req, res) => {
  try {
    const user = await controladorUser.uno(req.params.id);
    if (!user) {
      return respuestas.error(req, res, 404, 'Usuario no encontrado');
    }
    respuestas.success(req, res, 200, user);
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

// Registrar (crear) un nuevo usuario
router.post('/registrar', async (req, res) => {
  try {
    await controladorUser.registrar(req.body);
    respuestas.success(req, res, 200, 'Usuario registrado');
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

// Actualizar un usuario existente
router.post('/actualizar', async (req, res) => {
  try {
    if (!req.body.id) {
      return respuestas.error(req, res, 400, 'El id es requerido para actualizar');
    }
    await controladorUser.actualizar(req.body);
    respuestas.success(req, res, 200, 'Usuario actualizado');
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

// Eliminar un usuario
router.post('/eliminar', async (req, res) => {
  try {
    if (!req.body.id) {
      return respuestas.error(req, res, 400, 'El id es requerido para eliminar');
    }
    await controladorUser.eliminar(req.body.id);
    respuestas.success(req, res, 200, 'Usuario eliminado');
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

// Login: autenticación de usuario
router.post('/login', async (req, res) => {
  try {
    const user = await controladorUser.login(req.body);
    respuestas.success(req, res, 200, user);
  } catch (error) {
    respuestas.error(req, res, 500, error.message);
  }
});

module.exports = router;