import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_API_KEY!
);
export const supabaseServiceRole = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // This is a service role API key not available to the client code, only servser side.
  process.env.SUPABASE_SERVICE_ROLE_API_KEY || "intentionally-invalid-key"
);
