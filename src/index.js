const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importar configuración de base de datos
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());

// Middleware de CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-dominio.com', 'http://localhost:3000']  // ← AGREGAR localhost
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true
}));

// Middleware de logging
app.use(morgan('combined'));

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// RUTAS PÚBLICAS (sin autenticación)
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de health check (PÚBLICA)
app.get('/health', async (req, res) => {
  try {
    const dbStatus = await testConnection();
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: dbStatus ? 'connected' : 'disconnected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});



// Importar y usar rutas PROTEGIDAS
const clienteRoutes = require('./routes/clienteRoutes');
const camionRoutes = require('./routes/camionRoutes');
const rutaRoutes = require('./routes/rutaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const repartoRoutes = require('./routes/repartoRoutes');

app.use('/api/clientes', clienteRoutes);
app.use('/api/camiones', camionRoutes);
app.use('/api/rutas', rutaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/repartos', repartoRoutes);

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    error: error.message || 'Error interno del servidor',
    timestamp: new Date().toISOString()
  });
});

// Middleware para manejar rutas no encontradas (al final)
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    console.log('🔍 Probando conexión a la base de datos...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ No se pudo conectar a la base de datos');
      process.exit(1);
    }

    // Iniciar servidor
    app.listen(PORT,'0.0.0.0',  () => {
      console.log(`�� Servidor corriendo en http://localhost:${PORT}`);
      console.log(`�� Health check: http://localhost:${PORT}/health`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔒 Rutas protegidas: /api/*`);
      console.log(`�� Rutas públicas: /, /health`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Iniciar servidor si este archivo se ejecuta directamente
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };