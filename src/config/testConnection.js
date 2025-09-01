const { testConnection } = require('./database');

// Función para probar la conexión
const testDBConnection = async () => {
  console.log('🔍 Probando conexión a la base de datos...');
  
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      console.log('🎉 ¡Conexión exitosa!');
      process.exit(0);
    } else {
      console.log('💥 Conexión fallida');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
    process.exit(1);
  }
};

// Ejecutar la prueba si este archivo se ejecuta directamente
if (require.main === module) {
  testDBConnection();
}

module.exports = { testDBConnection };
