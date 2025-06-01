// Remove dotenv and process.env usage for frontend code.
// Use import.meta.env (Vite) or process.env (CRA/Next.js) as appropriate.

export const VITE_API_BASE_URL = import.meta.env.VITE_JWT_SECRET;
export const VITE_API_KEY = import.meta.env.VITE_API_KEY;
