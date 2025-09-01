const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

// Rutas para clientes
// GET /api/clientes - Obtener todos los clientes
router.get('/', clienteController.getAllClientes);

// GET /api/clientes/activos - Obtener solo clientes activos
router.get('/activos', clienteController.getClientesActivos);

// GET /api/clientes/search?q=termino - Buscar clientes
router.get('/search', clienteController.searchClientes);

// GET /api/clientes/:id - Obtener un cliente por ID
router.get('/:id', clienteController.getClienteById);

// POST /api/clientes - Crear un nuevo cliente
router.post('/', clienteController.createCliente);

// PUT /api/clientes/:id - Actualizar un cliente
router.put('/:id', clienteController.updateCliente);

// DELETE /api/clientes/:id - Eliminar un cliente (cambiar estado a Inactivo)
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
