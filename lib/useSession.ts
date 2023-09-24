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
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      onAuthChange?.(event, session);
    });
  }, []);

  return { session };
}
