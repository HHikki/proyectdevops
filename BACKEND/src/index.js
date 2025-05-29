import express from "express";
import { PORT } from "./config.js";
import 'dotenv/config.js'; // Importa dotenv para cargar las variables de entorno
// // Importa las rutas

import usarRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import postImgRoutes from "./routes/postimg.routes.js";


import morgan from "morgan";

const app = express(); // ✅ ESTA LÍNEA DEBE IR ANTES de app.use

app.use(morgan("dev"));
app.use(express.json());


if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definida en las variables de entorno");
}
// // Rutas de la API
// app.use("/prima",userRoutes); // ✅ Aquí ya puedes usar `app`

app.use("/prisma", usarRoutes); //
app.use("/prisma", postRoutes);
// app.use("/prisma", postImgRoutes); //


app.listen(PORT);
console.log("Server on port", PORT);
