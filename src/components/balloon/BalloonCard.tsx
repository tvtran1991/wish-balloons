"use client";

import { useState } from "react";
import Link from "next/link";
import BalloonSVG from "./BalloonSVG";
import type { BalloonData } from "@/types/balloon";

interface BalloonCardProps {
  balloon: BalloonData;
  animationDelay?: number;
  animationDuration?: number;
}

export default function BalloonCard({
  balloon,
  animationDelay = 0,
  animationDuration = 4,
}: BalloonCardProps) {
  const [revealed, setRevealed] = useState(
    balloon.privacy === "public"
  );

  const isBlurred = balloon.privacy === "blurred_until_tap" && !revealed;

  return (
    <Link
      href={`/b/${balloon.id}`}
      className="group flex flex-col items-center text-center max-w-[160px] transition-transform duration-300 hover:scale-105"
      style={{
        animation: `float ${animationDuration}s ease-in-out infinite`,
        animationDelay: `${animationDelay}s`,
      }}
      aria-label={`Balloon wish${balloon.displayName ? ` by ${balloon.displayName}` : ""}`}
    >
      <BalloonSVG styleId={balloon.styleId} size={80} />

      <div
        className={`mt-1 px-3 py-2 bg-white/90 shadow-sm rounded-lg max-w-[150px] backdrop-blur-sm transition-all duration-200 ${
          isBlurred ? "cursor-pointer" : ""
        }`}
        onClick={
          isBlurred
            ? (e) => {
                e.preventDefault();
                setRevealed(true);
              }
            : undefined
        }
      >
        <p
          className={`text-xs text-text-primary leading-snug line-clamp-3 ${
            isBlurred ? "blur-sm select-none" : ""
          }`}
        >
          {balloon.wishText}
        </p>
        {isBlurred && (
          <p className="text-[10px] text-text-secondary mt-1">Tap to reveal</p>
        )}
        {balloon.displayName && !isBlurred && (
          <p className="text-[10px] text-text-secondary mt-1">
            &mdash; {balloon.displayName}
          </p>
        )}
      </div>
    </Link>
  );
}
