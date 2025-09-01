// Configuración para producción
module.exports = {
  // Configuración de CORS para producción
  cors: {
    origin: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',') 
      : ['https://tu-frontend.com'],
    credentials: true
  },
  
  // Configuración de rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo 100 requests por ventana
  },
  
  // Configuración de logging
  logging: {
    level: 'combined',
    format: 'combined'
  }
};
