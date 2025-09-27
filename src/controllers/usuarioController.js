const usuarioModel = require("../models/usuarioModel");
const { generarToken } = require("../middleware/authMiddleware");

// Controlador para login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validaciones básicas
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "Username y password son obligatorios",
      });
    }

    // Verificar credenciales
    const usuario = await usuarioModel.verificarCredenciales(
      username,
      password
    );

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas",
      });
    }

    // Generar token JWT
    const token = generarToken(usuario);

    res.json({
      success: true,
      message: "Login exitoso",
      data: {
        usuario,
        token,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controlador para registro
const registro = async (req, res) => {
  try {
    const { username, password, email, nombre_completo } = req.body;

    // Validaciones detalladas
    const errores = [];
    if (!username) errores.push("El campo 'username' es obligatorio");
    if (!password) errores.push("El campo 'password' es obligatorio");
    if (!email) errores.push("El campo 'email' es obligatorio");
    if (!nombre_completo)
      errores.push("El campo 'nombre_completo' es obligatorio");
    if (errores.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errores,
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "El formato del email no es válido",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await usuarioModel.getUsuarioByUsername(username);
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        error: "El username ya está en uso",
      });
    }

    // Verificar si el email ya existe
    const emailExistente = await usuarioModel.getUsuarioByEmail(email);
    if (emailExistente) {
      return res.status(400).json({
        success: false,
        error: "El email ya está en uso",
      });
    }

    // Crear nuevo usuario
    const nuevoUsuario = await usuarioModel.createUsuario({
      username,
      password,
      email,
      nombre_completo,
    });

    // Generar token JWT
    const token = generarToken(nuevoUsuario);

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: {
        usuario: nuevoUsuario,
        token,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controlador para obtener perfil del usuario autenticado
const getPerfil = async (req, res) => {
  try {
    const usuario = await usuarioModel.getUsuarioById(req.usuario.id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: usuario,
    });
  } catch (error) {
    console.error("Error en getPerfil:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controlador para cambiar contraseña
const cambiarPassword = async (req, res) => {
  try {
    const { passwordActual, nuevaPassword } = req.body;

    // Validaciones básicas
    if (!passwordActual || !nuevaPassword) {
      return res.status(400).json({
        success: false,
        error: "Contraseña actual y nueva contraseña son obligatorias",
      });
    }

    if (nuevaPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "La nueva contraseña debe tener al menos 6 caracteres",
      });
    }

    const usuarioActualizado = await usuarioModel.cambiarPassword(
      req.usuario.id,
      passwordActual,
      nuevaPassword
    );

    res.json({
      success: true,
      message: "Contraseña cambiada exitosamente",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error en cambiarPassword:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controlador para obtener todos los usuarios (solo admin)
const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getAllUsuarios();
    res.json({
      success: true,
      data: usuarios,
      count: usuarios.length,
    });
  } catch (error) {
    console.error("Error en getAllUsuarios:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controlador para obtener un usuario por ID (solo admin)
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioModel.getUsuarioById(id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: usuario,
    });
  } catch (error) {
    console.error("Error en getUsuarioById:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controlador para crear un nuevo usuario (solo admin)
const createUsuario = async (req, res) => {
  try {
    const { username, password, email, nombre_completo } = req.body;

    // Validaciones detalladas
    const errores = [];
    if (!username) errores.push("El campo 'username' es obligatorio");
    if (!password) errores.push("El campo 'password' es obligatorio");
    if (!email) errores.push("El campo 'email' es obligatorio");
    if (!nombre_completo)
      errores.push("El campo 'nombre_completo' es obligatorio");
    if (errores.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errores,
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "El formato del email no es válido",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await usuarioModel.getUsuarioByUsername(username);
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        error: "El username ya está en uso",
      });
    }

    // Verificar si el email ya existe
    const emailExistente = await usuarioModel.getUsuarioByEmail(email);
    if (emailExistente) {
      return res.status(400).json({
        success: false,
        error: "El email ya está en uso",
      });
    }

    const nuevoUsuario = await usuarioModel.createUsuario({
      username,
      password,
      email,
      nombre_completo,
    });

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      data: nuevoUsuario,
    });
  } catch (error) {
    console.error("Error en createUsuario:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controlador para actualizar un usuario (solo admin)
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const usuarioExistente = await usuarioModel.getUsuarioById(id);
    if (!usuarioExistente) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    // Validaciones detalladas
    const errores = [];
    if (!username) errores.push("El campo 'username' es obligatorio");
    if (errores.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errores,
      });
    }

    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    // Verificar duplicados (excluyendo el usuario actual)
    if (username !== usuarioExistente.username) {
      const existingByUsername = await usuarioModel.getUsuarioByUsername(
        username
      );
      if (existingByUsername) {
        return res.status(400).json({
          success: false,
          error: "El username ya está en uso",
        });
      }
    }

    const usuarioActualizado = await usuarioModel.updateUsuario(id, {
      username,
      password,
    });

    res.json({
      success: true,
      message: "Usuario actualizado exitosamente",
      data: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error en updateUsuario:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controlador para eliminar un usuario (solo admin)
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario existe
    const usuarioExistente = await usuarioModel.getUsuarioById(id);
    if (!usuarioExistente) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    // No permitir eliminar el propio usuario
    if (parseInt(id) === req.usuario.id) {
      return res.status(400).json({
        success: false,
        error: "No puedes eliminar tu propio usuario",
      });
    }

    const usuarioEliminado = await usuarioModel.deleteUsuario(id);

    res.json({
      success: true,
      message: "Usuario eliminado exitosamente",
      data: usuarioEliminado,
    });
  } catch (error) {
    console.error("Error en deleteUsuario:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controlador para buscar usuarios (solo admin)
const searchUsuarios = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Término de búsqueda requerido",
      });
    }

    const usuarios = await usuarioModel.searchUsuarios(q);

    res.json({
      success: true,
      data: usuarios,
      count: usuarios.length,
      searchTerm: q,
    });
  } catch (error) {
    console.error("Error en searchUsuarios:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  login,
  registro,
  getPerfil,
  cambiarPassword,
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  searchUsuarios,
};
