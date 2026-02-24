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
        <header className="flex items-center justify-center px-4 sm:px-8 py-8">
          <Link
            href="/"
            className="text-text-primary font-bold text-4xl hover:text-accent transition-colors font-display"
          >
            Wish Balloons
          </Link>
        </header>

        <div className="pt-4 pb-8">
          <SkyFeed />
        </div>

        <div className="text-center pb-12">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full shadow-lg transition-all duration-200 text-base hover:scale-105"
          >
            Create Your Own Balloon
          </Link>
        </div>
      </div>
    </main>
  );
}
