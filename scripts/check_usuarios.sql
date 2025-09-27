-- Script para insertar usuarios de prueba
-- Ejecutar en tu base de datos Neon

-- IMPORTANTE: Estas contraseñas están hasheadas con bcrypt (saltRounds = 12)
-- No puedes insertar contraseñas en texto plano porque tu backend espera hashes

-- Para crear usuarios de prueba, es mejor usar el endpoint de registro
-- Pero aquí tienes algunos ejemplos con hashes reales:

-- Usuario de prueba 1: admin / admin123
-- Hash generado: $2b$12$ejemplo (esto es solo un ejemplo, necesitas generar el hash real)

-- Usuario de prueba 2: usuario / password123  
-- Hash generado: $2b$12$ejemplo (esto es solo un ejemplo, necesitas generar el hash real)

-- MEJOR OPCIÓN: Crear usuarios usando tu endpoint de registro
-- Esto se hace desde tu frontend o usando Postman/curl

-- Verificar que la tabla está vacía
SELECT COUNT(*) as total_usuarios FROM usuarios;

-- Ver todos los usuarios (cuando los tengas)
SELECT id, username, email, nombre_completo, created_at FROM usuarios;