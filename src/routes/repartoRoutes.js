const express = require('express');
const repartoController = require('../controllers/repartoController');

const router = express.Router();

// Rutas para repartos
// GET /api/repartos - Obtener todos los repartos
router.get('/', repartoController.getAllRepartos);

// GET /api/repartos/cliente/:cliente_id - Obtener repartos por cliente
router.get('/cliente/:cliente_id', repartoController.getRepartosByCliente);

// GET /api/repartos/camion/:camion_id - Obtener repartos por camión
router.get('/camion/:camion_id', repartoController.getRepartosByCamion);

// GET /api/repartos/ruta/:ruta_id - Obtener repartos por ruta
router.get('/ruta/:ruta_id', repartoController.getRepartosByRuta);

// GET /api/repartos/:id - Obtener un reparto por ID
router.get('/:id', repartoController.getRepartoById);

// POST /api/repartos - Crear un nuevo reparto
router.post('/', repartoController.createReparto);

// PUT /api/repartos/:id - Actualizar un reparto
router.put('/:id', repartoController.updateReparto);

// DELETE /api/repartos/:id - Eliminar un reparto
router.delete('/:id', repartoController.deleteReparto);

module.exports = router;
