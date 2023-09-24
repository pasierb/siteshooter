import Link from "next/link";
import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const features = [
  {
    name: "🖱️ Effortless Experience",
    description:
      "No libraries or plugins required. Just provide the URL, and let Siteshooter handle the rest.",
  },
  {
    name: "📱 Perfect for Social Media",
    description:
      "Craft stunning preview images for your content. Ensure your links stand out in any social feed.",
  },
  {
    name: "🦙 Alpaca-Powered Magic",
    description:
      "Our mascot ensures a blend of humor and efficiency. Waiting for your shot? Alpaca's got your back with entertaining load screens.",
  },
];

export default function Home() {
  return (
    <div className="container">
      <Alert className="mb-8">
        <RocketIcon className="w-6 h-6 mr-2" />
        <AlertTitle>Coming soon!</AlertTitle>
        <AlertDescription>
          You are currently viewing a pre-release version of Siteshooter. While
          we're excited to show you a glimpse of what's coming, please note that
          this version might not represent the final product's full
          functionality or features. Mark your calendars for our official launch
          on <strong>October 1st, 2023</strong>!
        </AlertDescription>
      </Alert>

      <header>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-4">
          Screenshot as a Service.
          <br />
          No libraries, just the URL.
        </h1>

        <p>
          As simple as
          <a
            href={`https://www.siteshooter.app/api/shot?key=${process.env.NEXT_PUBLIC_PREVIEW_API_KEY}&url=https://www.siteshooter.app`}
            target="_blank"
          >
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              https://www.siteshooter.app/api/shot?url=https://www.siteshooter.app
            </code>
          </a>
        </p>

        <Button asChild className="my-4">
          <Link href="/playground">Try it out!</Link>
        </Button>
      </header>

      <section className="my-20 prose">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            🚀 Why Siteshooter?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Simplicity: No more complicated setups or tools. Social Ready:
            Amplify your online presence with eye-catching previews.
          </p>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt className="font-semibold text-gray-900">{feature.name}</dt>
              <dd className="mt-1 text-gray-600">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
