import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/user-menu";

export function PageNav() {
  return (
    <nav>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-end">
            <img
              src="/alpaca-logo.png"
              alt="Cute alpaca"
              role="presentation"
              className="w-16 h-16"
            />
            <span className="text-2xl font-bold">Siteshooter</span>
            <Badge variant="secondary" className="rotate-12">
              alpha
            </Badge>
          </Link>
        </div>

        <div>
          <Link href="/playground" className="font-semibold">
            Playground
          </Link>
        </div>

        <div>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
