"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignInDialog } from "@/components/signin-dialog";
import { PersonIcon } from "@radix-ui/react-icons";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { useSession } from "@/lib/useSession";
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
  const router = useRouter();
  const onAuthChange = useCallback<
    (event: AuthChangeEvent, session: Session | null) => void
  >(
    (event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/");
      }
    },
    [router]
  );

  const { session } = useSession({
    onAuthChange: onAuthChange,
  });

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
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
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
