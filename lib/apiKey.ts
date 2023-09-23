import { supabaseServiceRole } from "@/lib/supabaseClient";
import { UnauthorizedError } from "@/lib/errors";

export async function touchApiKey(keyId: string): Promise<void> {
  await supabaseServiceRole
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", keyId);
}

export async function authenticateApiKey(key: string | null) {
  if (!key) {
    throw new UnauthorizedError("Missing key");
  }

  const { data, error } = await supabaseServiceRole
    .from("api_keys")
    .select("*")
    .eq("key", key)
    .single();

  if (!data) {
    throw new UnauthorizedError("Invalid key");
  }

  return data;
}
