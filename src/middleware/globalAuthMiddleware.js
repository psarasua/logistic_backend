const { verificarToken } = require('./authMiddleware');

// Middleware global para proteger todas las rutas excepto autenticación
const protegerAPIs = (req, res, next) => {
  // Rutas públicas que no requieren autenticación
  const rutasPublicas = [
    '/',
    '/health',
    '/api/usuarios/login',
    '/api/usuarios/registro'
  ];

  // Verificar si la ruta actual es pública
  const esRutaPublica = rutasPublicas.some(ruta => 
    req.path === ruta || req.path.startsWith('/api/usuarios/login') || req.path.startsWith('/api/usuarios/registro')
  );

  if (esRutaPublica) {
    return next(); // Permitir acceso sin token
  }

  // Para todas las demás rutas, verificar token
  return verificarToken(req, res, next);
};

module.exports = {
  protegerAPIs
};
