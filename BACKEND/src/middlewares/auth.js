import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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


export { authMiddleware, requireAdmin };
