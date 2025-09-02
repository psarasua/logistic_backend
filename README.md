# 🚀 API de Gestión Logística

API REST completa para gestión de logística con autenticación JWT, gestión de clientes, camiones, rutas y usuarios.

## 🏗️ **Características**

- ✅ **Autenticación JWT** completa
- ✅ **CRUD** para clientes, camiones, rutas y usuarios
- ✅ **Base de datos PostgreSQL** con Neon
- ✅ **Middleware de seguridad** global
- ✅ **Validaciones** robustas
- ✅ **Manejo de errores** centralizado
- ✅ **Logging** completo

## 🚀 **Despliegue Rápido**

### **Opción 1: Render (Recomendado)**

1. **Fork/Clone** este repositorio
2. **Conecta** tu cuenta de GitHub a Render
3. **Crea** un nuevo Web Service
4. **Configura** las variables de entorno:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=tu_url_de_neon
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_EXPIRES_IN=24h
ALLOWED_ORIGINS=https://tu-frontend.com
```

5. **Deploy** automático desde GitHub

### **Opción 2: Railway**

1. **Conecta** tu repositorio a Railway
2. **Configura** variables de entorno
3. **Deploy** automático

### **Opción 3: Heroku**

1. **Instala** Heroku CLI
2. **Crea** app: `heroku create tu-api-logistica`
3. **Configura** variables: `heroku config:set DATABASE_URL=...`
4. **Deploy**: `git push heroku main`

## 🔧 **Configuración Local**

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## 📚 **Documentación de la API**

### **Autenticación**
- `POST /api/usuarios/registro` - Registrar usuario
- `POST /api/usuarios/login` - Login de usuario

### **Clientes** (requiere token)
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Crear cliente
- `GET /api/clientes/:id` - Obtener cliente
- `PUT /api/clientes/:id` - Actualizar cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### **Camiones** (requiere token)
- `GET /api/camiones` - Listar camiones
- `POST /api/camiones` - Crear camión
- `GET /api/camiones/:id` - Obtener camión
- `PUT /api/camiones/:id` - Actualizar camión
- `DELETE /api/camiones/:id` - Eliminar camión

### **Rutas** (requiere token)
- `GET /api/rutas` - Listar rutas
- `POST /api/rutas` - Crear ruta
- `GET /api/rutas/:id` - Obtener ruta
- `PUT /api/rutas/:id` - Actualizar ruta
- `DELETE /api/rutas/:id` - Eliminar ruta

### **Usuarios** (requiere token)
- `GET /api/usuarios/perfil` - Obtener perfil
- `PUT /api/usuarios/cambiar-password` - Cambiar contraseña
- `GET /api/usuarios` - Listar usuarios (admin)
- `POST /api/usuarios` - Crear usuario (admin)

## 🔐 **Seguridad**

- **JWT tokens** para autenticación
- **Gestión** de contraseñas (sin encriptación)
- **Middleware** de seguridad global
- **Validaciones** de entrada
- **CORS** configurado
- **Helmet** para headers de seguridad

## 📊 **Base de Datos**

- **PostgreSQL** con Neon
- **Pool de conexiones** optimizado
- **Manejo de errores** robusto
- **Transacciones** seguras

## 🧪 **Testing**

```bash
# Probar conexión a BD
npm run test-db

# Probar endpoints (con Postman/Insomnia)
# Usar el token recibido del login
```

## 🌍 **Variables de Entorno**

```env
# Base de datos
DATABASE_URL=postgresql://...

# Servidor
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=tu_secret_super_seguro
JWT_EXPIRES_IN=24h

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://tu-dominio.com
```

## 📝 **Licencia**

MIT License - Libre para uso comercial y personal.

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📞 **Soporte**

- **Issues**: GitHub Issues
- **Email**: tu-email@ejemplo.com
- **Documentación**: README.md
