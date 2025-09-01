const { query } = require('../config/database');

// Función para obtener todos los camiones
const getAllCamiones = async () => {
  try {
    const result = await query(
      'SELECT * FROM camiones ORDER BY nombre'
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener camiones: ${error.message}`);
  }
};

// Función para obtener un camión por ID
const getCamionById = async (id) => {
  try {
    const result = await query(
      'SELECT * FROM camiones WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener camión: ${error.message}`);
  }
};

// Función para crear un nuevo camión
const createCamion = async (camionData) => {
  const { nombre } = camionData;

  try {
    const result = await query(
      'INSERT INTO camiones (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al crear camión: ${error.message}`);
  }
};

// Función para actualizar un camión
const updateCamion = async (id, camionData) => {
  const { nombre } = camionData;

  try {
    const result = await query(
      'UPDATE camiones SET nombre = $1 WHERE id = $2 RETURNING *',
      [nombre, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al actualizar camión: ${error.message}`);
  }
};

// Función para eliminar un camión
const deleteCamion = async (id) => {
  try {
    const result = await query(
      'DELETE FROM camiones WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al eliminar camión: ${error.message}`);
  }
};

// Función para buscar camiones por nombre
const searchCamiones = async (searchTerm) => {
  try {
    const result = await query(
      'SELECT * FROM camiones WHERE nombre ILIKE $1 ORDER BY nombre',
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error al buscar camiones: ${error.message}`);
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
