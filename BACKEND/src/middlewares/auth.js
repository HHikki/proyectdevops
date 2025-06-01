import jwt from "jsonwebtoken";
import { JWT_SECRET, API_KEY } from "../config/env.js";

function authMiddleware(req, res, next) {

  if (req.path === "/post/page") {
    return next(); // ✅ Permitir acceso sin autenticación
  }


  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user?.is_admin) {
    return res.status(403).json({ error: "Solo administradores" });
  }
  next();
}

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({
      error: "API Key inválida o no proporcionada",
    });
  }

  next();
};


export { authMiddleware, requireAdmin, validateApiKey };
