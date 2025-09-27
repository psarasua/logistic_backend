// Script para crear un usuario de prueba usando Node.js
// Ejecutar: node create-test-user.js

const bcrypt = require("bcrypt");

async function createTestUser() {
  const password = "admin123";
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  console.log("Usuario de prueba:");
  console.log("Username: admin");
  console.log("Password: admin123");
  console.log("Email: admin@test.com");
  console.log("Hash para BD:", hashedPassword);

  console.log("\nSQL para insertar:");
  console.log(
    `INSERT INTO usuarios (username, email, password, nombre_completo) VALUES ('admin', 'admin@test.com', '${hashedPassword}', 'Administrador');`
  );
}

createTestUser();
