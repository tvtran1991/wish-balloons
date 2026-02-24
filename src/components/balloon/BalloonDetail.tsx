"use client";

import { useState } from "react";
import BalloonSVG from "./BalloonSVG";
import ShareButtons from "@/components/share/ShareButtons";
import type { BalloonData } from "@/types/balloon";

interface BalloonDetailProps {
  balloon: BalloonData;
}

export default function BalloonDetail({ balloon }: BalloonDetailProps) {
  const [reported, setReported] = useState(false);
  const [reporting, setReporting] = useState(false);

  async function handleReport() {
    if (reported || reporting) return;
    setReporting(true);
    try {
      const res = await fetch(`/api/balloons/${balloon.id}/report`, {
        method: "POST",
      });
      if (res.ok) {
        setReported(true);
      }
    } catch {
      // silently fail
    } finally {
      setReporting(false);
    }
  }

  const date = new Date(balloon.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="animate-fade-in text-center space-y-6 max-w-md mx-auto px-4 py-12">
      <div className="flex justify-center animate-float">
        <BalloonSVG styleId={balloon.styleId} shapeId={balloon.shapeId ?? 0} size={160} />
      </div>

      <div className="bg-white shadow-sm rounded-2xl p-6 space-y-3">
        <p className="text-xl text-text-primary leading-relaxed font-display">
          &ldquo;{balloon.wishText}&rdquo;
        </p>

        {balloon.displayName && (
          <p className="text-text-secondary text-sm">
            &mdash; {balloon.displayName}
          </p>
        )}

        <div className="flex items-center justify-center gap-3 pt-1">
          {balloon.category && (
            <span className="px-2.5 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
              {balloon.category}
            </span>
          )}
          <span className="text-text-secondary/60 text-xs">{formattedDate}</span>
        </div>
      </div>

      <ShareButtons balloonId={balloon.id} />

      <div className="pt-4">
        <button
          onClick={handleReport}
          disabled={reported || reporting}
          className="text-text-secondary/50 hover:text-red-400 text-xs transition-colors duration-200 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Report this balloon"
        >
          {reported ? "Reported" : reporting ? "Reporting..." : "Report"}
        </button>
      </div>
    </div>
  );
}
