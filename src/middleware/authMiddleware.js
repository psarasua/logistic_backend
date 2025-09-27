const jwt = require("jsonwebtoken");

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Token de acceso requerido",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Token inválido",
    });
  }
};

// Middleware opcional para verificar token (no falla si no hay token)
const verificarTokenOpcional = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
    } catch (error) {
      // Token inválido, pero no falla la petición
      req.usuario = null;
    }
  }

  next();
};

// Función para generar token JWT
const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    }
  );
};

module.exports = {
  verificarToken,
  verificarTokenOpcional,
  generarToken,
};
