import Link from "next/link";
import SkyBackground from "@/components/sky/SkyBackground";
import SkyFeed from "@/components/sky/SkyFeed";

export const metadata = {
  title: "The Sky — Wish Balloons",
  description: "See wish balloons floating in the sky for Lunar New Year 2026.",
};

export default function SkyPage() {
  return (
    <main className="relative min-h-screen">
      <SkyBackground />

      <div className="relative z-10">
        <header className="flex items-center justify-between px-4 sm:px-8 py-6">
          <Link
            href="/"
            className="text-text-primary font-bold text-lg hover:text-accent transition-colors"
          >
            Wish Balloons
          </Link>
          <Link
            href="/"
            className="px-5 py-2 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-all duration-200 text-sm hover:scale-105"
          >
            Create a Balloon
          </Link>
        </header>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-text-primary mb-2">The Sky</h1>
          <p className="text-text-secondary">
            Wishes floating among the clouds
          </p>
        </div>

        <SkyFeed />
      </div>
    </main>
  );
}
