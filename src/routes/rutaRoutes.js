const express = require('express');
const rutaController = require('../controllers/rutaController');

const router = express.Router();

// Rutas para rutas
// GET /api/rutas - Obtener todas las rutas
router.get('/', rutaController.getAllRutas);

// GET /api/rutas/search?q=termino - Buscar rutas
router.get('/search', rutaController.searchRutas);

// GET /api/rutas/:id - Obtener una ruta por ID
router.get('/:id', rutaController.getRutaById);

// POST /api/rutas - Crear una nueva ruta
router.post('/', rutaController.createRuta);

// PUT /api/rutas/:id - Actualizar una ruta
router.put('/:id', rutaController.updateRuta);

// DELETE /api/rutas/:id - Eliminar una ruta
router.delete('/:id', rutaController.deleteRuta);

module.exports = router;
