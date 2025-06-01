import { Router } from "express";
import { 
  getPosts,
  getPostById, 
  createPost, 
  updatePost, 
  deletePost, 
  getMyPosts,
  getPublicPosts
} from "../controllers/post.controller.js";

import { loginUser } from "../controllers/auth.controller.js";
import { authMiddleware, requireAdmin } from "../middlewares/auth.js";

const router = Router();

// ✅ Rutas públicas (NO requieren autenticación)
router.get("/post/page", getPublicPosts); // Endpoint público
router.post("/login", loginUser); // Endpoint público

// ✅ Middleware de autenticación para rutas protegidas
router.use(authMiddleware);

// 🔒 Rutas protegidas (requieren autenticación)
router.get("/post", requireAdmin, getPosts);
router.get("/post/:user", getMyPosts);
router.get("/post/e/:id", getPostById);
router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;
