const repartoModel = require('../models/repartoModel');

// Controlador para obtener todos los repartos
const getAllRepartos = async (req, res) => {
  try {
    const repartos = await repartoModel.getAllRepartos();
    res.json({
      success: true,
      data: repartos,
      count: repartos.length
    });
  } catch (error) {
    console.error('Error en getAllRepartos:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para obtener un reparto por ID
const getRepartoById = async (req, res) => {
  try {
    const { id } = req.params;
    const reparto = await repartoModel.getRepartoById(id);
    
    if (!reparto) {
      return res.status(404).json({
        success: false,
        error: 'Reparto no encontrado'
      });
    }

    res.json({
      success: true,
      data: reparto
    });
  } catch (error) {
    console.error('Error en getRepartoById:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para crear un nuevo reparto
const createReparto = async (req, res) => {
  try {
    const repartoData = req.body;
    
    // Validaciones básicas
    if (!repartoData.cliente_id || !repartoData.camion_id || !repartoData.ruta_id) {
      return res.status(400).json({
        success: false,
        error: 'Cliente ID, Camión ID y Ruta ID son obligatorios'
      });
    }

    // Validar que los IDs sean números enteros
    if (!Number.isInteger(Number(repartoData.cliente_id)) || 
        !Number.isInteger(Number(repartoData.camion_id)) || 
        !Number.isInteger(Number(repartoData.ruta_id))) {
      return res.status(400).json({
        success: false,
        error: 'Los IDs deben ser números enteros válidos'
      });
    }

    // Verificar que existan las referencias (FK)
    try {
      await repartoModel.validateReferences(
        repartoData.cliente_id,
        repartoData.camion_id,
        repartoData.ruta_id
      );
    } catch (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError.message
      });
    }

    const nuevoReparto = await repartoModel.createReparto(repartoData);
    
    res.status(201).json({
      success: true,
      message: 'Reparto creado exitosamente',
      data: nuevoReparto
    });
  } catch (error) {
    console.error('Error en createReparto:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para actualizar un reparto
const updateReparto = async (req, res) => {
  try {
    const { id } = req.params;
    const repartoData = req.body;

    // Verificar si el reparto existe
    const repartoExistente = await repartoModel.getRepartoById(id);
    if (!repartoExistente) {
      return res.status(404).json({
        success: false,
        error: 'Reparto no encontrado'
      });
    }

    // Validaciones básicas
    if (!repartoData.cliente_id || !repartoData.camion_id || !repartoData.ruta_id) {
      return res.status(400).json({
        success: false,
        error: 'Cliente ID, Camión ID y Ruta ID son obligatorios'
      });
    }

    // Validar que los IDs sean números enteros
    if (!Number.isInteger(Number(repartoData.cliente_id)) || 
        !Number.isInteger(Number(repartoData.camion_id)) || 
        !Number.isInteger(Number(repartoData.ruta_id))) {
      return res.status(400).json({
        success: false,
        error: 'Los IDs deben ser números enteros válidos'
      });
    }

    // Verificar que existan las referencias (FK)
    try {
      await repartoModel.validateReferences(
        repartoData.cliente_id,
        repartoData.camion_id,
        repartoData.ruta_id
      );
    } catch (validationError) {
      return res.status(400).json({
        success: false,
        error: validationError.message
      });
    }

    const repartoActualizado = await repartoModel.updateReparto(id, repartoData);
    
    res.json({
      success: true,
      message: 'Reparto actualizado exitosamente',
      data: repartoActualizado
    });
  } catch (error) {
    console.error('Error en updateReparto:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para eliminar un reparto
const deleteReparto = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el reparto existe
    const repartoExistente = await repartoModel.getRepartoById(id);
    if (!repartoExistente) {
      return res.status(404).json({
        success: false,
        error: 'Reparto no encontrado'
      });
    }

    const repartoEliminado = await repartoModel.deleteReparto(id);
    
    res.json({
      success: true,
      message: 'Reparto eliminado exitosamente',
      data: repartoEliminado
    });
  } catch (error) {
    console.error('Error en deleteReparto:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para obtener repartos por cliente
const getRepartosByCliente = async (req, res) => {
  try {
    const { cliente_id } = req.params;
    
    if (!Number.isInteger(Number(cliente_id))) {
      return res.status(400).json({
        success: false,
        error: 'Cliente ID debe ser un número entero válido'
      });
    }

    const repartos = await repartoModel.getRepartosByCliente(cliente_id);
    
    res.json({
      success: true,
      data: repartos,
      count: repartos.length,
      cliente_id: Number(cliente_id)
    });
  } catch (error) {
    console.error('Error en getRepartosByCliente:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para obtener repartos por camión
const getRepartosByCamion = async (req, res) => {
  try {
    const { camion_id } = req.params;
    
    if (!Number.isInteger(Number(camion_id))) {
      return res.status(400).json({
        success: false,
        error: 'Camión ID debe ser un número entero válido'
      });
    }

    const repartos = await repartoModel.getRepartosByCamion(camion_id);
    
    res.json({
      success: true,
      data: repartos,
      count: repartos.length,
      camion_id: Number(camion_id)
    });
  } catch (error) {
    console.error('Error en getRepartosByCamion:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para obtener repartos por ruta
const getRepartosByRuta = async (req, res) => {
  try {
    const { ruta_id } = req.params;
    
    if (!Number.isInteger(Number(ruta_id))) {
      return res.status(400).json({
        success: false,
        error: 'Ruta ID debe ser un número entero válido'
      });
    }

    const repartos = await repartoModel.getRepartosByRuta(ruta_id);
    
    res.json({
      success: true,
      data: repartos,
      count: repartos.length,
      ruta_id: Number(ruta_id)
    });
  } catch (error) {
    console.error('Error en getRepartosByRuta:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllRepartos,
  getRepartoById,
  createReparto,
  updateReparto,
  deleteReparto,
  getRepartosByCliente,
  getRepartosByCamion,
  getRepartosByRuta
};
