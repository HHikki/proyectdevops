
import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definida en las variables de entorno");
}
export const PORT = 4001;
export const JWT_SECRET = process.env.JWT_SECRET;
