import Image from "next/image";

export function PageNav() {
  return (
    <nav>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-end">
            <Image
              src="/alpaca-logo.png"
              alt="Cute alpaca"
              role="presentation"
              width="64"
              height="64"
            />
            <span className="text-2xl font-bold">Siteshooter</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
