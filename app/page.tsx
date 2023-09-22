import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container">
      <header>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">
          Screenshot as a Service.
          <br />
          No libraries, just the URL.
        </h1>

        <p>
          As simple as
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            https://www.siteshooter.app/api/shot?url=https://www.siteshooter.app
          </code>
        </p>

        <Button asChild className="my-4">
          <Link href="/playground">Try it out!</Link>
        </Button>

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Perfect for social media share 📱 preview images 🖼️.</li>
        </ul>
      </header>

      <section className="my-20"></section>
    </div>
  );
}
