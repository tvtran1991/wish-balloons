"use client";

import { useState, useCallback } from "react";
import CreateForm from "@/components/create/CreateForm";
import SkyBackground from "@/components/sky/SkyBackground";
import SkyFeed from "@/components/sky/SkyFeed";
import ReleaseAnimation from "@/components/balloon/ReleaseAnimation";

type Phase = "form" | "releasing" | "done";

export default function HomePage() {
  const [phase, setPhase] = useState<Phase>("form");
  const [releasedBalloon, setReleasedBalloon] = useState<{
    id: string;
    styleId: number;
  } | null>(null);

  const handleRelease = useCallback(
    (balloon: { id: string; styleId: number }) => {
      setReleasedBalloon(balloon);
      setPhase("releasing");
    },
    []
  );

  const handleReset = useCallback(() => {
    setPhase("form");
    setReleasedBalloon(null);
  }, []);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel: form */}
      <div className="w-full lg:w-[420px] shrink-0 bg-panel-bg px-6 py-10 lg:py-16 lg:px-10 flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full">
          <h1 className="text-3xl font-bold text-text-primary mb-1 font-display">
            Wish Balloon
          </h1>
          <p className="text-text-secondary mb-6">
            Write a wish and release it into the sky.
          </p>
          <CreateForm
            phase={phase}
            balloonId={releasedBalloon?.id ?? null}
            onRelease={handleRelease}
            onReset={handleReset}
          />
        </div>
      </div>

      {/* Right panel: sky (hidden on mobile unless releasing) */}
      <div
        className={`${
          phase === "releasing"
            ? "fixed inset-0 z-50 lg:static lg:z-auto lg:flex-1"
            : "hidden lg:block flex-1"
        } relative overflow-hidden`}
      >
        <SkyBackground />

        {/* Live balloon feed — always visible */}
        <div className="relative z-10 pt-8 overflow-y-auto h-full">
          <SkyFeed newBalloonId={phase === "done" ? releasedBalloon?.id ?? null : null} />
        </div>

        {/* Release animation overlay */}
        {phase === "releasing" && releasedBalloon && (
          <div className="absolute inset-x-0 bottom-0 z-20 h-full pointer-events-none">
            <ReleaseAnimation
              styleId={releasedBalloon.styleId}
              onComplete={() => setPhase("done")}
            />
          </div>
        )}
      </div>
    </main>
  );
}
