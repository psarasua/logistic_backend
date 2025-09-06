const { Pool } = require('pg');
require('dotenv').config();

// Validar que las variables de entorno críticas estén configuradas
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL no está configurada en las variables de entorno');
  console.error('💡 Copia el archivo .env.example a .env y configura tus credenciales');
  process.exit(1);
}

// Configuración de la conexión a Neon Database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: parseInt(process.env.DB_POOL_MAX) || 20, // máximo número de conexiones en el pool
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT) || 30000, // tiempo máximo que una conexión puede estar inactiva
  connectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT) || 2000, // tiempo máximo para establecer una conexión
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión a la base de datos establecida correctamente');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    return false;
  }
};

// Función para ejecutar consultas
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query ejecutada en', duration, 'ms');
    return res;
  } catch (error) {
    console.error('Error en query:', error);
    throw error;
  }
};

// Función para obtener un cliente del pool
const getClient = async () => {
  return await pool.connect();
};

module.exports = {
  pool,
  query,
  getClient,
  testConnection
};
