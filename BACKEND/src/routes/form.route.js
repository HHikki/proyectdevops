import { Router } from "express";
import {
  createSubmission,
  getSubmissions,
  deleteSubmission,
} from "../controllers/form.controller.js";
import {
  authMiddleware,
  requireAdmin,
  validateApiKey,
} from "../middlewares/auth.js";

const router = Router();

// Ruta de creación: solo necesita API Key.
router.post("/upform", validateApiKey, createSubmission);

// Rutas de lectura y eliminación: requieren JWT y que el usuario sea admin.
router.get("/getform", authMiddleware, requireAdmin, getSubmissions);
router.delete("/delfrom/:id", authMiddleware, requireAdmin, deleteSubmission);

export default router;
