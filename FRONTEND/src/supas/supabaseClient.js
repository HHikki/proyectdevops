import { createClient } from "@supabase/supabase-js";
import { SUPA_URL, SUPA_KEY } from "../config/env.jsx";

export const supabase = createClient(SUPA_URL, SUPA_KEY);