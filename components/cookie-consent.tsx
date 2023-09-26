"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CookieIcon } from "@radix-ui/react-icons";

const storageKey = "cookies-accepted";

export function CookieConsent() {
  const [accepted, setAccepted] = useState<boolean | undefined>(undefined);

  const handleAccept = () => {
    globalThis.localStorage.setItem(storageKey, "true");
    setAccepted(true);
  };

  useEffect(() => {
    const value =
      globalThis.localStorage.getItem(storageKey) === "true" ?? false;
    setAccepted(value);
  }, [setAccepted]);

  return accepted === undefined || accepted ? null : (
    <Card className="fixed right-8 bottom-8 max-w-xs shadow-md">
      <CardHeader>
        <p className="text-sm">
          We use cookies to enhance your experience. By continuing to browse
          this site, you agree to our{" "}
          <Link href="/privacy" className="font-semibold">
            privacy terms
          </Link>
          .
        </p>
      </CardHeader>
      <CardFooter className="justify-between">
        <CookieIcon className="w-8 h-8" />
        <Button size="sm" variant="default" onClick={() => handleAccept()}>
          Got it!
        </Button>
      </CardFooter>
    </Card>
  );
}
