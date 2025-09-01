const express = require('express');
const camionController = require('../controllers/camionController');

const router = express.Router();

// Rutas para camiones
// GET /api/camiones - Obtener todos los camiones
router.get('/', camionController.getAllCamiones);

// GET /api/camiones/search?q=termino - Buscar camiones
router.get('/search', camionController.searchCamiones);

// GET /api/camiones/:id - Obtener un camión por ID
router.get('/:id', camionController.getCamionById);

// POST /api/camiones - Crear un nuevo camión
router.post('/', camionController.createCamion);

// PUT /api/camiones/:id - Actualizar un camión
router.put('/:id', camionController.updateCamion);

// DELETE /api/camiones/:id - Eliminar un camión
router.delete('/:id', camionController.deleteCamion);

module.exports = router;
