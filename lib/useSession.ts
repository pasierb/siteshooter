"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session, AuthChangeEvent } from "@supabase/supabase-js";

interface UseSessionProps {
  onAuthChange?: (event: AuthChangeEvent, session: Session | null) => void;
}

export function useSession({ onAuthChange }: UseSessionProps = {}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((event, _session) => {
      setSession(_session);
      onAuthChange?.(event, _session);
    });
  }, [onAuthChange]);

  return { session };
}
