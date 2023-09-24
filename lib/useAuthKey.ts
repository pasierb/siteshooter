"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSession } from "@/lib/useSession";
import type { Database } from "@/types/supabase";

type ApiKey = Database["public"]["Tables"]["api_keys"]["Row"];

export function useAuthKeys() {
  const { session } = useSession();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  useEffect(() => {
    if (!session) return;

    supabase
      .from("api_keys")
      .select("*")
      .then(({ data, error }) => {
        setApiKeys(data || []);
      });
  }, [session]);

  return apiKeys;
}
