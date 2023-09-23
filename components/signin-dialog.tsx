"use client";

import { useRef, useState, PropsWithChildren, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ThemeMinimal } from "@supabase/auth-ui-shared";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";

interface SignInDialogProps {}

export function SignInDialog(props: PropsWithChildren<SignInDialogProps>) {
  const supabaseClient = useRef(supabase);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.current.auth.onAuthStateChange((_, session) => {
      if (session !== null) {
        setOpen(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>
        <Auth
          supabaseClient={supabaseClient.current}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
        />
      </DialogContent>
    </Dialog>
  );
}
