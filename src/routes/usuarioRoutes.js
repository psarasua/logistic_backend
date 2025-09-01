const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

// Rutas públicas (sin autenticación)
// POST /api/usuarios/login - Login de usuario
router.post('/login', usuarioController.login);

// POST /api/usuarios/registro - Registro de usuario
router.post('/registro', usuarioController.registro);

// Rutas protegidas (requieren autenticación)
// GET /api/usuarios/perfil - Obtener perfil del usuario autenticado
router.get('/perfil', usuarioController.getPerfil);

// PUT /api/usuarios/cambiar-password - Cambiar contraseña
router.put('/cambiar-password', usuarioController.cambiarPassword);

// Rutas de administración (requieren autenticación)
// GET /api/usuarios - Obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// GET /api/usuarios/search?q=termino - Buscar usuarios
router.get('/search', usuarioController.searchUsuarios);

// GET /api/usuarios/:id - Obtener un usuario por ID
router.get('/:id', usuarioController.getUsuarioById);

// POST /api/usuarios - Crear un nuevo usuario
router.post('/', usuarioController.createUsuario);

// PUT /api/usuarios/:id - Actualizar un usuario
router.put('/:id', usuarioController.updateUsuario);

// DELETE /api/usuarios/:id - Eliminar un usuario
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
