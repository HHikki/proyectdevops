import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers); // ✅ GET all
router.get("/users/:id", getUserById); // ✅ GET by ID
router.post("/users", createUser); // ✅ POST
router.put("/users/:id", updateUser); // ✅ PUT
router.delete("/users/:id", deleteUser); // ✅ DELETE

export default router;
