"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ApiKey = Database["public"]["Tables"]["api_keys"]["Row"];

type ApiKeyWithShotsCount = ApiKey & { shots: [{ count: number }] };

export function ApiKeysTable() {
  const [apiKeys, setApiKeys] = useState<ApiKeyWithShotsCount[]>([]);
  useEffect(() => {
    supabase
      .from("api_keys")
      .select("*, shots(count)")
      .then(({ data }) =>
        setApiKeys(data as unknown as ApiKeyWithShotsCount[])
      );
  }, []);

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead className="text-right">Shots</TableHead>
            <TableHead>Last used at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell>{apiKey.key}</TableCell>
              <TableCell className="text-right">
                {apiKey.shots[0]?.count}
              </TableCell>
              <TableCell>{apiKey.last_used_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
