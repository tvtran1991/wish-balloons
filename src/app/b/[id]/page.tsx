import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import SkyBackground from "@/components/sky/SkyBackground";
import BalloonDetail from "@/components/balloon/BalloonDetail";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const balloon = await prisma.balloon.findUnique({ where: { id } });

  if (!balloon || balloon.status === "hidden") {
    return { title: "Balloon Not Found — Wish Balloons" };
  }

  const wishPreview =
    balloon.wishText.length > 80
      ? balloon.wishText.slice(0, 80) + "..."
      : balloon.wishText;

  return {
    title: `"${wishPreview}" — Wish Balloons`,
    description: `A Lunar New Year wish balloon${balloon.displayName ? ` by ${balloon.displayName}` : ""}. ${wishPreview}`,
    openGraph: {
      title: `"${wishPreview}" — Wish Balloons`,
      description: `A Lunar New Year 2026 wish balloon. ${wishPreview}`,
      type: "website",
    },
  };
}

export default async function BalloonPage({ params }: PageProps) {
  const { id } = await params;
  const balloon = await prisma.balloon.findUnique({ where: { id } });

  if (!balloon || balloon.status === "hidden") {
    notFound();
  }

  const balloonData = {
    ...balloon,
    createdAt: balloon.createdAt.toISOString(),
    privacy: balloon.privacy as "public" | "blurred_until_tap",
    status: balloon.status as "active" | "hidden",
  };

  return (
    <main className="relative min-h-screen">
      <SkyBackground />

      <div className="relative z-10">
        <header className="flex items-center justify-between px-4 sm:px-8 py-6">
          <Link
            href="/"
            className="text-text-primary font-bold text-lg hover:text-accent transition-colors font-display"
          >
            Wish Balloons
          </Link>
          <Link
            href="/sky"
            className="px-5 py-2 bg-white border border-border hover:border-accent/40 text-text-primary rounded-full transition-all duration-200 text-sm"
          >
            View the Sky
          </Link>
        </header>

        <BalloonDetail balloon={balloonData} />
      </div>
    </main>
  );
}
