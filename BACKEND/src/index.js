import express from "express";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.router.js";
import morgan from "morgan";

const app = express(); // ✅ ESTA LÍNEA DEBE IR ANTES de app.use

app.use(morgan("dev"));
app.use(express.json());

app.use(userRoutes); // ✅ Aquí ya puedes usar `app`

app.listen(PORT);
console.log("Server on port", PORT);
