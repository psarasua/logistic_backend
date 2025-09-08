const express = require('express');
const controller = require('../controllers/repartoClienteController');
const router = express.Router();

// POST /api/reparto-cliente/add
router.post('/add', controller.addCliente);

// POST /api/reparto-cliente/remove
router.post('/remove', controller.removeCliente);

// GET /api/reparto-cliente/reparto/:reparto_id
router.get('/reparto/:reparto_id', controller.getClientes);

// GET /api/reparto-cliente/cliente/:cliente_id
router.get('/cliente/:cliente_id', controller.getRepartos);

module.exports = router;
