import { Badge } from "@/components/ui/badge";

export function PageNav() {
  return (
    <nav>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-end">
            <img
              src="/alpaca-logo.png"
              alt="Cute alpaca"
              role="presentation"
              className="w-16 h-16"
            />
            <span className="text-2xl font-bold">Siteshooter</span>
            <Badge variant="secondary" className="rotate-12">alpha</Badge>
          </a>
        </div>
      </div>
    </nav>
  );
}
