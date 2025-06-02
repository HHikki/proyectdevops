// Remove dotenv and process.env usage for frontend code.
// Use import.meta.env (Vite) or process.env (CRA/Next.js) as appropriate.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;


