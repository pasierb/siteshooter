"use client";

import { useRef, PropsWithChildren } from "react";
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
  const supabaseClient = useRef(supabase());

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <Auth
          supabaseClient={supabaseClient.current}
          appearance={{ theme: ThemeSupa }}
          redirectTo="/"
          providers={["google"]}
        />
      </DialogContent>
    </Dialog>
  );
}
