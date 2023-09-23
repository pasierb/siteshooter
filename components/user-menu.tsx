"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SignInDialog } from "@/components/signin-dialog";
import { PersonIcon } from "@radix-ui/react-icons";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return session !== null ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <PersonIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account ({session.user.email})</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleSignOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    // <div>{session.user.email}</div>
    <SignInDialog>
      <Button variant="outline">Sign in</Button>
    </SignInDialog>
  );
}
