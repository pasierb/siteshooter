export default function Home() {
  return (
    <div className="container">
      <header>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
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

        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Perfect for social media share preview images.</li>
        </ul>
      </header>
    </div>
  );
}
