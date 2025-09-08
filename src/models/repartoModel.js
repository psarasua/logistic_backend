const { query } = require('../config/database');

// Función para obtener todos los repartos con información de las relaciones
const getAllRepartos = async () => {
  try {
    const result = await query(`
      SELECT 
        r.*,
        cam.nombre as camion_nombre,
        ru.nombre as ruta_nombre,
        COALESCE(ARRAY_AGG(c.id) FILTER (WHERE c.id IS NOT NULL), '{}') AS clientes_ids,
        COALESCE(ARRAY_AGG(c.razonsocial) FILTER (WHERE c.razonsocial IS NOT NULL), '{}') AS clientes_nombres,
        COUNT(c.id) AS total_clientes
      FROM repartos r
      LEFT JOIN reparto_cliente rc ON r.id = rc.reparto_id
      LEFT JOIN clientes c ON rc.cliente_id = c.id
      LEFT JOIN camiones cam ON r.camion_id = cam.id
      LEFT JOIN rutas ru ON r.ruta_id = ru.id
      GROUP BY r.id, cam.nombre, ru.nombre
      ORDER BY r.id DESC
    `);
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener repartos: ${error.message}`);
  }
};

// Función para obtener un reparto por ID con información de las relaciones
const getRepartoById = async (id) => {
  try {
    const result = await query(`
      SELECT 
        r.*,
        cam.nombre as camion_nombre,
        ru.nombre as ruta_nombre,
        COALESCE(ARRAY_AGG(c.id) FILTER (WHERE c.id IS NOT NULL), '{}') AS clientes_ids,
        COALESCE(ARRAY_AGG(c.razonsocial) FILTER (WHERE c.razonsocial IS NOT NULL), '{}') AS clientes_nombres,
        COUNT(c.id) AS total_clientes
      FROM repartos r
      LEFT JOIN reparto_cliente rc ON r.id = rc.reparto_id
      LEFT JOIN clientes c ON rc.cliente_id = c.id
      LEFT JOIN camiones cam ON r.camion_id = cam.id
      LEFT JOIN rutas ru ON r.ruta_id = ru.id
      WHERE r.id = $1
      GROUP BY r.id, cam.nombre, ru.nombre
    `, [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener reparto: ${error.message}`);
  }
};

// Función para crear un nuevo reparto
const createReparto = async (repartoData) => {
  const { camion_id, ruta_id } = repartoData;
  try {
    const result = await query(
      'INSERT INTO repartos (camion_id, ruta_id) VALUES ($1, $2) RETURNING *',
      [camion_id, ruta_id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al crear reparto: ${error.message}`);
  }
};

// Función para actualizar un reparto
const updateReparto = async (id, repartoData) => {
  const { cliente_id, camion_id, ruta_id } = repartoData;

  try {
    const result = await query(
      'UPDATE repartos SET cliente_id = $1, camion_id = $2, ruta_id = $3 WHERE id = $4 RETURNING *',
      [cliente_id, camion_id, ruta_id, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al actualizar reparto: ${error.message}`);
  }
};

// Función para eliminar un reparto
const deleteReparto = async (id) => {
  try {
    const result = await query(
      'DELETE FROM repartos WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al eliminar reparto: ${error.message}`);
  }
};

// Función para obtener repartos por cliente
const getRepartosByCliente = async (cliente_id) => {
  try {
    const result = await query(`
      SELECT 
        r.*,
        c.razonsocial as cliente_nombre,
        cam.nombre as camion_nombre,
        ru.nombre as ruta_nombre
      FROM repartos r
      LEFT JOIN clientes c ON r.cliente_id = c.id
      LEFT JOIN camiones cam ON r.camion_id = cam.id
      LEFT JOIN rutas ru ON r.ruta_id = ru.id
      WHERE r.cliente_id = $1
      ORDER BY r.id DESC
    `, [cliente_id]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener repartos por cliente: ${error.message}`);
  }
};

// Función para obtener repartos por camión
const getRepartosByCamion = async (camion_id) => {
  try {
    const result = await query(`
      SELECT 
        r.*,
        c.razonsocial as cliente_nombre,
        cam.nombre as camion_nombre,
        ru.nombre as ruta_nombre
      FROM repartos r
      LEFT JOIN clientes c ON r.cliente_id = c.id
      LEFT JOIN camiones cam ON r.camion_id = cam.id
      LEFT JOIN rutas ru ON r.ruta_id = ru.id
      WHERE r.camion_id = $1
      ORDER BY r.id DESC
    `, [camion_id]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener repartos por camión: ${error.message}`);
  }
};

// Función para obtener repartos por ruta
const getRepartosByRuta = async (ruta_id) => {
  try {
    const result = await query(`
      SELECT 
        r.*,
        c.razonsocial as cliente_nombre,
        cam.nombre as camion_nombre,
        ru.nombre as ruta_nombre
      FROM repartos r
      LEFT JOIN clientes c ON r.cliente_id = c.id
      LEFT JOIN camiones cam ON r.camion_id = cam.id
      LEFT JOIN rutas ru ON r.ruta_id = ru.id
      WHERE r.ruta_id = $1
      ORDER BY r.id DESC
    `, [ruta_id]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener repartos por ruta: ${error.message}`);
  }
};

// Función para verificar si existen las referencias (FK)
const validateReferences = async (cliente_id, camion_id, ruta_id) => {
  try {
    // Verificar cliente
    if (cliente_id) {
      const clienteResult = await query('SELECT id FROM clientes WHERE id = $1', [cliente_id]);
      if (clienteResult.rows.length === 0) {
        throw new Error('Cliente no encontrado');
      }
    }

    // Verificar camión
    if (camion_id) {
      const camionResult = await query('SELECT id FROM camiones WHERE id = $1', [camion_id]);
      if (camionResult.rows.length === 0) {
        throw new Error('Camión no encontrado');
      }
    }

    // Verificar ruta
    if (ruta_id) {
      const rutaResult = await query('SELECT id FROM rutas WHERE id = $1', [ruta_id]);
      if (rutaResult.rows.length === 0) {
        throw new Error('Ruta no encontrada');
      }
    }

    return true;
  } catch (error) {
    throw new Error(`Error en validación de referencias: ${error.message}`);
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
  getRepartosByRuta,
  validateReferences
};
