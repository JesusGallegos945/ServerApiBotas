const express = require('express');
const router = express.Router();
const loginController = require('./loginController');

// Rutas para login
router.post('/', loginController.createLogin);
router.get('/', loginController.getAllLogins);
router.get('/:id', loginController.getLoginById);
router.put('/:id', loginController.updateLogin);
router.delete('/:id', loginController.deleteLogin);

module.exports = router;