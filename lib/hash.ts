import { createHash } from "node:crypto";

export function simpleHash(key: string) {
  const hash = createHash("sha256");
  hash.update(key);

  return hash.digest("hex");
}
