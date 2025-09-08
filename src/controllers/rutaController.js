const rutaModel = require('../models/rutaModel');

// Controlador para obtener todas las rutas
const getAllRutas = async (req, res) => {
  try {
    const rutas = await rutaModel.getAllRutas();
    res.json({
      success: true,
      data: rutas,
      count: rutas.length
    });
  } catch (error) {
    console.error('Error en getAllRutas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para obtener una ruta por ID
const getRutaById = async (req, res) => {
  try {
    const { id } = req.params;
    const ruta = await rutaModel.getRutaById(id);
    
    if (!ruta) {
      return res.status(404).json({
        success: false,
        error: 'Ruta no encontrada'
      });
    }

    res.json({
      success: true,
      data: ruta
    });
  } catch (error) {
    console.error('Error en getRutaById:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para crear una nueva ruta
const createRuta = async (req, res) => {
  try {
    const { nombre } = req.body;
    
    // Validaciones detalladas
    const errores = [];
    if (!nombre || nombre.trim() === '') errores.push("El campo 'nombre' es obligatorio");
    if (errores.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errores
      });
    }

    const nuevaRuta = await rutaModel.createRuta({ nombre: nombre.trim() });
    
    res.status(201).json({
      success: true,
      message: 'Ruta creada exitosamente',
      data: nuevaRuta
    });
  } catch (error) {
    console.error('Error en createRuta:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para actualizar una ruta
const updateRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    // Verificar si la ruta existe
    const rutaExistente = await rutaModel.getRutaById(id);
    if (!rutaExistente) {
      return res.status(404).json({
        success: false,
        error: 'Ruta no encontrada'
      });
    }

    // Validaciones detalladas
    const errores = [];
    if (!nombre || nombre.trim() === '') errores.push("El campo 'nombre' es obligatorio");
    if (errores.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errores
      });
    }

    const rutaActualizada = await rutaModel.updateRuta(id, { nombre: nombre.trim() });
    
    res.json({
      success: true,
      message: 'Ruta actualizada exitosamente',
      data: rutaActualizada
    });
  } catch (error) {
    console.error('Error en updateRuta:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para eliminar una ruta
const deleteRuta = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si la ruta existe
    const rutaExistente = await rutaModel.getRutaById(id);
    if (!rutaExistente) {
      return res.status(404).json({
        success: false,
        error: 'Ruta no encontrada'
      });
    }

    const rutaEliminada = await rutaModel.deleteRuta(id);
    
    res.json({
      success: true,
      message: 'Ruta eliminada exitosamente',
      data: rutaEliminada
    });
  } catch (error) {
    console.error('Error en deleteRuta:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para buscar rutas
const searchRutas = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Término de búsqueda requerido'
      });
    }

    const rutas = await rutaModel.searchRutas(q);
    
    res.json({
      success: true,
      data: rutas,
      count: rutas.length,
      searchTerm: q
    });
  } catch (error) {
    console.error('Error en searchRutas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
  searchRutas
};
