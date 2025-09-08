const camionModel = require('../models/camionModel');

// Controlador para obtener todos los camiones
const getAllCamiones = async (req, res) => {
  try {
    const camiones = await camionModel.getAllCamiones();
    res.json({
      success: true,
      data: camiones,
      count: camiones.length
    });
  } catch (error) {
    console.error('Error en getAllCamiones:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para obtener un camión por ID
const getCamionById = async (req, res) => {
  try {
    const { id } = req.params;
    const camion = await camionModel.getCamionById(id);
    
    if (!camion) {
      return res.status(404).json({
        success: false,
        error: 'Camión no encontrado'
      });
    }

    res.json({
      success: true,
      data: camion
    });
  } catch (error) {
    console.error('Error en getCamionById:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para crear un nuevo camión
const createCamion = async (req, res) => {
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

    const nuevoCamion = await camionModel.createCamion({ nombre: nombre.trim() });
    
    res.status(201).json({
      success: true,
      message: 'Camión creado exitosamente',
      data: nuevoCamion
    });
  } catch (error) {
    console.error('Error en createCamion:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para actualizar un camión
const updateCamion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    // Verificar si el camión existe
    const camionExistente = await camionModel.getCamionById(id);
    if (!camionExistente) {
      return res.status(404).json({
        success: false,
        error: 'Camión no encontrado'
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

    const camionActualizado = await camionModel.updateCamion(id, { nombre: nombre.trim() });
    
    res.json({
      success: true,
      message: 'Camión actualizado exitosamente',
      data: camionActualizado
    });
  } catch (error) {
    console.error('Error en updateCamion:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para eliminar un camión
const deleteCamion = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el camión existe
    const camionExistente = await camionModel.getCamionById(id);
    if (!camionExistente) {
      return res.status(404).json({
        success: false,
        error: 'Camión no encontrado'
      });
    }

    // Verificar si el camión está siendo usado en repartos
    const { getRepartosByCamion } = require('../models/repartoModel');
    const repartos = await getRepartosByCamion(id);
    if (repartos.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar el camión porque está siendo usado en repartos',
        repartosRelacionados: repartos.map(r => r.id)
      });
    }

    const camionEliminado = await camionModel.deleteCamion(id);
    res.json({
      success: true,
      message: 'Camión eliminado exitosamente',
      data: camionEliminado
    });
  } catch (error) {
    console.error('Error en deleteCamion:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para buscar camiones
const searchCamiones = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Término de búsqueda requerido'
      });
    }

    const camiones = await camionModel.searchCamiones(q);
    
    res.json({
      success: true,
      data: camiones,
      count: camiones.length,
      searchTerm: q
    });
  } catch (error) {
    console.error('Error en searchCamiones:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllCamiones,
  getCamionById,
  createCamion,
  updateCamion,
  deleteCamion,
  searchCamiones
};
