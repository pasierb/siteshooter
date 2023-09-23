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

export function ApiKeysTable() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  useEffect(() => {
    supabase
      .from("api_keys")
      .select("*")
      .then(({ data }) => setApiKeys(data as ApiKey[]));
  }, []);

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Last used at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell>{apiKey.key}</TableCell>
              <TableCell>{apiKey.last_used_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
