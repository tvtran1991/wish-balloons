import Link from "next/link";
import SkyBackground from "@/components/sky/SkyBackground";

export default function BalloonNotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <SkyBackground />
      <div className="relative z-10 text-center space-y-4 animate-fade-in">
        <h1 className="text-3xl font-bold text-text-primary">
          Balloon not found
        </h1>
        <p className="text-text-secondary max-w-sm">
          This balloon may have floated away or been removed.
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <Link
            href="/"
            className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-all duration-200 text-sm"
          >
            Create a Balloon
          </Link>
          <Link
            href="/sky"
            className="px-6 py-2.5 bg-white border border-border hover:border-accent/40 text-text-primary rounded-full transition-all duration-200 text-sm"
          >
            View the Sky
          </Link>
        </div>
      </div>
    </main>
  );
}
