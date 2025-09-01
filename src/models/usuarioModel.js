const { query } = require('../config/database');
const bcrypt = require('bcryptjs');

// Función para obtener todos los usuarios (sin contraseñas)
const getAllUsuarios = async () => {
  try {
    const result = await query(
      'SELECT id, username FROM usuarios ORDER BY username'
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error al obtener usuarios: ${error.message}`);
  }
};

// Función para obtener un usuario por ID (sin contraseña)
const getUsuarioById = async (id) => {
  try {
    const result = await query(
      'SELECT id, username FROM usuarios WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener usuario: ${error.message}`);
  }
};

// Función para obtener usuario por username (con contraseña para autenticación)
const getUsuarioByUsername = async (username) => {
  try {
    const result = await query(
      'SELECT id, username, password FROM usuarios WHERE username = $1',
      [username]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al obtener usuario por username: ${error.message}`);
  }
};

// Función para crear un nuevo usuario
const createUsuario = async (usuarioData) => {
  const { username, password } = usuarioData;

  try {
    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await query(
      'INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al crear usuario: ${error.message}`);
  }
};

// Función para actualizar un usuario
const updateUsuario = async (id, usuarioData) => {
  const { username, password } = usuarioData;

  try {
    let queryText, params;

    if (password) {
      // Si se proporciona nueva contraseña, encriptarla
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      queryText = 'UPDATE usuarios SET username = $1, password = $2 WHERE id = $3 RETURNING id, username';
      params = [username, hashedPassword, id];
    } else {
      // Solo actualizar username
      queryText = 'UPDATE usuarios SET username = $1 WHERE id = $2 RETURNING id, username';
      params = [username, id];
    }

    const result = await query(queryText, params);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error.message}`);
  }
};

// Función para eliminar un usuario
const deleteUsuario = async (id) => {
  try {
    const result = await query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING id, username',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error al eliminar usuario: ${error.message}`);
  }
};

// Función para verificar credenciales de usuario
const verificarCredenciales = async (username, password) => {
  try {
    const usuario = await getUsuarioByUsername(username);
    
    if (!usuario) {
      return null;
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    
    if (!passwordValida) {
      return null;
    }

    // Retornar usuario sin contraseña
    return {
      id: usuario.id,
      username: usuario.username
    };
  } catch (error) {
    throw new Error(`Error al verificar credenciales: ${error.message}`);
  }
};

// Función para cambiar contraseña
const cambiarPassword = async (id, passwordActual, nuevaPassword) => {
  try {
    // Obtener usuario con contraseña actual
    const result = await query(
      'SELECT id, password FROM usuarios WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const usuario = result.rows[0];

    // Verificar contraseña actual
    const passwordValida = await bcrypt.compare(passwordActual, usuario.password);
    
    if (!passwordValida) {
      throw new Error('Contraseña actual incorrecta');
    }

    // Encriptar nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(nuevaPassword, saltRounds);

    // Actualizar contraseña
    const updateResult = await query(
      'UPDATE usuarios SET password = $1 WHERE id = $2 RETURNING id, username',
      [hashedPassword, id]
    );

    return updateResult.rows[0];
  } catch (error) {
    throw new Error(`Error al cambiar contraseña: ${error.message}`);
  }
};

// Función para buscar usuarios por username
const searchUsuarios = async (searchTerm) => {
  try {
    const result = await query(
      'SELECT id, username FROM usuarios WHERE username ILIKE $1 ORDER BY username',
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error al buscar usuarios: ${error.message}`);
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  getUsuarioByUsername,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  verificarCredenciales,
  cambiarPassword,
  searchUsuarios
};
