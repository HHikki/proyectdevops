import { Router } from "express";
import { getPosts,getPostById, createPost, updatePost, deletePost } from "../controllers/post.controller.js";

import { loginUser } from "../controllers/auth.controller.js";
import { authMiddleware, requireAdmin } from "../middlewares/auth.js";

const router = Router();


router.use(authMiddleware); // ✅ Middleware de autenticación

router.post("/login", loginUser);

router.get("/post",requireAdmin, getPosts); // ✅ GET all users
router.get("/post/:id", getPostById); // ✅ GET user by ID

router.post("/post", createPost); // ✅ POST create user

router.put("/post/:id", updatePost); // ✅ PUT update user
router.delete("/post/:id", deletePost); // ✅ DELETE delete user




export default router;