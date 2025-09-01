const { query } = require('../config/database');

// Función para obtener todas las rutas
const getAllRutas = async () => {
  try {
    const result = await query(
      'SELECT * FROM rutas ORDER BY nombre'
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener rutas: ${error.message}`);
  }
};

// Función para obtener una ruta por ID
const getRutaById = async (id) => {
  try {
    const result = await query(
      'SELECT * FROM rutas WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener ruta: ${error.message}`);
  }
};

// Función para crear una nueva ruta
const createRuta = async (rutaData) => {
  const { nombre } = rutaData;

  try {
    const result = await query(
      'INSERT INTO rutas (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al crear ruta: ${error.message}`);
  }
};

// Función para actualizar una ruta
const updateRuta = async (id, rutaData) => {
  const { nombre } = rutaData;

  try {
    const result = await query(
      'UPDATE rutas SET nombre = $1 WHERE id = $2 RETURNING *',
      [nombre, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al actualizar ruta: ${error.message}`);
  }
};

// Función para eliminar una ruta
const deleteRuta = async (id) => {
  try {
    const result = await query(
      'DELETE FROM rutas WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al eliminar ruta: ${error.message}`);
  }
};

// Función para buscar rutas por nombre
const searchRutas = async (searchTerm) => {
  try {
    const result = await query(
      'SELECT * FROM rutas WHERE nombre ILIKE $1 ORDER BY nombre',
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error al buscar rutas: ${error.message}`);
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
