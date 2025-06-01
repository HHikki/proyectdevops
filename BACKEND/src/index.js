import express from "express";
import { PORT, CORS_ORIGIN ,JWT_SECRET, API_KEY} from "./config/env.js";
import 'dotenv/config.js'; 

// Importa dotenv para cargar las variables de entorno
// // Importa las rutas

import usarRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import postImgRoutes from "./routes/postimg.routes.js";


import morgan from "morgan";
import cors from "cors";

const app = express(); // ✅ ESTA LÍNEA DEBE IR ANTES de app.DA

app.use(morgan("dev"));
app.use(express.json());

// Configuración CORS
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true
}));

// Verificación de variables de entorno críticas
if (!API_KEY) {
  throw new Error("API_KEY no está definida en las variables de entorno");
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definida en las variables de entorno");
}

// Configuración de CORS
const corsOptions = {
  origin: CORS_ORIGIN, // Dominio permitido desde las variables de entorno
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};

app.use(cors(corsOptions));

// // Rutas de la API
// app.use("/prima",userRoutes); // ✅ Aquí ya puedes usar `app`


app.use("/prisma", usarRoutes); //
app.use("/prisma", postRoutes);
// app.use("/prisma", postImgRoutes); //


app.listen(PORT);
console.log("Server on port", PORT);
console.log("API Key configurada:", API_KEY ? "Sí" : "No");

export default app; // Exporta la aplicación para pruebas u otros usos
