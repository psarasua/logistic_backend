const clienteModel = require('../models/clienteModel');

// Controlador para obtener todos los clientes
const getAllClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.getAllClientes();
    res.json({
      success: true,
      data: clientes,
      count: clientes.length
    });
  } catch (error) {
    console.error('Error en getAllClientes:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para obtener un cliente por ID
const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clienteModel.getClienteById(id);
    
    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    res.json({
      success: true,
      data: cliente
    });
  } catch (error) {
    console.error('Error en getClienteById:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para crear un nuevo cliente
const createCliente = async (req, res) => {
  try {
    const clienteData = req.body;
    
    // Validaciones detalladas
    const errores = [];
    if (!clienteData.razonsocial) errores.push("El campo 'razonsocial' es obligatorio");
    if (!clienteData.nombre) errores.push("El campo 'nombre' es obligatorio");
    if (!clienteData.direccion) errores.push("El campo 'direccion' es obligatorio");
    if (errores.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errores
      });
    }

    // Verificar si ya existe un cliente con el mismo código o RUT
    if (clienteData.codigoalte) {
      const existingByCodigo = await clienteModel.getClienteByCodigo(clienteData.codigoalte);
      if (existingByCodigo) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe un cliente con ese código alternativo'
        });
      }
    }

    if (clienteData.rut) {
      const existingByRut = await clienteModel.getClienteByRut(clienteData.rut);
      if (existingByRut) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe un cliente con ese RUT'
        });
      }
    }

    const nuevoCliente = await clienteModel.createCliente(clienteData);
    
    res.status(201).json({
      success: true,
      message: 'Cliente creado exitosamente',
      data: nuevoCliente
    });
  } catch (error) {
    console.error('Error en createCliente:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para actualizar un cliente
const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteData = req.body;

    // Verificar si el cliente existe
    const clienteExistente = await clienteModel.getClienteById(id);
    if (!clienteExistente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    // Validaciones detalladas
    const errores = [];
    if (!clienteData.razonsocial) errores.push("El campo 'razonsocial' es obligatorio");
    if (!clienteData.nombre) errores.push("El campo 'nombre' es obligatorio");
    if (!clienteData.direccion) errores.push("El campo 'direccion' es obligatorio");
    if (errores.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errores
      });
    }

    // Verificar duplicados (excluyendo el cliente actual)
    if (clienteData.codigoalte && clienteData.codigoalte !== clienteExistente.codigoalte) {
      const existingByCodigo = await clienteModel.getClienteByCodigo(clienteData.codigoalte);
      if (existingByCodigo) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe un cliente con ese código alternativo'
        });
      }
    }

    if (clienteData.rut && clienteData.rut !== clienteExistente.rut) {
      const existingByRut = await clienteModel.getClienteByRut(clienteData.rut);
      if (existingByRut) {
        return res.status(400).json({
          success: false,
          error: 'Ya existe un cliente con ese RUT'
        });
      }
    }

    const clienteActualizado = await clienteModel.updateCliente(id, clienteData);
    
    res.json({
      success: true,
      message: 'Cliente actualizado exitosamente',
      data: clienteActualizado
    });
  } catch (error) {
    console.error('Error en updateCliente:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para eliminar un cliente
const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el cliente existe
    const clienteExistente = await clienteModel.getClienteById(id);
    if (!clienteExistente) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado'
      });
    }

    const clienteEliminado = await clienteModel.deleteCliente(id);
    
    res.json({
      success: true,
      message: 'Cliente eliminado exitosamente',
      data: clienteEliminado
    });
  } catch (error) {
    console.error('Error en deleteCliente:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para buscar clientes
const searchClientes = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Término de búsqueda requerido'
      });
    }

    const clientes = await clienteModel.searchClientes(q);
    
    res.json({
      success: true,
      data: clientes,
      count: clientes.length,
      searchTerm: q
    });
  } catch (error) {
    console.error('Error en searchClientes:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controlador para obtener clientes activos
const getClientesActivos = async (req, res) => {
  try {
    const clientes = await clienteModel.getClientesActivos();
    
    res.json({
      success: true,
      data: clientes,
      count: clientes.length
    });
  } catch (error) {
    console.error('Error en getClientesActivos:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  searchClientes,
  getClientesActivos
};
