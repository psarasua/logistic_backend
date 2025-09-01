const { query } = require('../config/database');

// Función para obtener todos los clientes
const getAllClientes = async () => {
  try {
    const result = await query(
      'SELECT * FROM clientes ORDER BY razonsocial'
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener clientes: ${error.message}`);
  }
};

// Función para obtener un cliente por ID
const getClienteById = async (id) => {
  try {
    const result = await query(
      'SELECT * FROM clientes WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener cliente: ${error.message}`);
  }
};

// Función para obtener cliente por código alternativo
const getClienteByCodigo = async (codigoalte) => {
  try {
    const result = await query(
      'SELECT * FROM clientes WHERE codigoalte = $1',
      [codigoalte]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener cliente por código: ${error.message}`);
  }
};

// Función para obtener cliente por RUT
const getClienteByRut = async (rut) => {
  try {
    const result = await query(
      'SELECT * FROM clientes WHERE rut = $1',
      [rut]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener cliente por RUT: ${error.message}`);
  }
};

// Función para crear un nuevo cliente
const createCliente = async (clienteData) => {
  const {
    codigoalte,
    razonsocial,
    nombre,
    direccion,
    telefono,
    rut,
    estado = 'Activo',
    longitud,
    latitud
  } = clienteData;

  try {
    const result = await query(
      `INSERT INTO clientes 
       (codigoalte, razonsocial, nombre, direccion, telefono, rut, estado, longitud, latitud)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [codigoalte, razonsocial, nombre, direccion, telefono, rut, estado, longitud, latitud]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al crear cliente: ${error.message}`);
  }
};

// Función para actualizar un cliente
const updateCliente = async (id, clienteData) => {
  const {
    codigoalte,
    razonsocial,
    nombre,
    direccion,
    telefono,
    rut,
    estado,
    longitud,
    latitud
  } = clienteData;

  try {
    const result = await query(
      `UPDATE clientes 
       SET codigoalte = $1, razonsocial = $2, nombre = $3, direccion = $4, 
           telefono = $5, rut = $6, estado = $7, longitud = $8, latitud = $9
       WHERE id = $10
       RETURNING *`,
      [codigoalte, razonsocial, nombre, direccion, telefono, rut, estado, longitud, latitud, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al actualizar cliente: ${error.message}`);
  }
};

// Función para eliminar un cliente (cambiar estado a 'Inactivo')
const deleteCliente = async (id) => {
  try {
    const result = await query(
      'UPDATE clientes SET estado = $1 WHERE id = $2 RETURNING *',
      ['Inactivo', id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al eliminar cliente: ${error.message}`);
  }
};

// Función para buscar clientes por término
const searchClientes = async (searchTerm) => {
  try {
    const result = await query(
      `SELECT * FROM clientes 
       WHERE razonsocial ILIKE $1 OR nombre ILIKE $1 OR codigoalte ILIKE $1
       ORDER BY razonsocial`,
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error al buscar clientes: ${error.message}`);
  }
};

// Función para obtener clientes activos
const getClientesActivos = async () => {
  try {
    const result = await query(
      'SELECT * FROM clientes WHERE estado = $1 ORDER BY razonsocial',
      ['Activo']
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener clientes activos: ${error.message}`);
  }
};

module.exports = {
  getAllClientes,
  getClienteById,
  getClienteByCodigo,
  getClienteByRut,
  createCliente,
  updateCliente,
  deleteCliente,
  searchClientes,
  getClientesActivos
};
