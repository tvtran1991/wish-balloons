"use client";

import { useState } from "react";
import Link from "next/link";
import BalloonSVG from "./BalloonSVG";
import type { BalloonData } from "@/types/balloon";

interface BalloonCardProps {
  balloon: BalloonData;
  animationDelay?: number;
  animationDuration?: number;
  index?: number;
}

export default function BalloonCard({
  balloon,
  animationDelay = 0,
  animationDuration = 4,
  index = 0,
}: BalloonCardProps) {
  const rotation = index % 2 === 0 ? 1.5 : -1.5;
  const [revealed, setRevealed] = useState(
    balloon.privacy === "public"
  );

  const isBlurred = balloon.privacy === "blurred_until_tap" && !revealed;

  return (
    <Link
      href={`/b/${balloon.id}`}
      className="group flex flex-col items-center text-center max-w-[200px] transition-transform duration-300 hover:scale-105"
      style={{
        animation: `float ${animationDuration}s ease-in-out infinite`,
        animationDelay: `${animationDelay}s`,
      }}
      aria-label={`Balloon wish${balloon.displayName ? ` by ${balloon.displayName}` : ""}`}
    >
      <BalloonSVG styleId={balloon.styleId} shapeId={balloon.shapeId ?? 0} size={80} />

      <div
        className={`mt-1 px-3 py-2 bg-white border border-gray-200 rounded-xl max-w-[190px] transition-all duration-200 ${
          isBlurred ? "cursor-pointer" : ""
        }`}
        style={{ transform: `rotate(${rotation}deg)` }}
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
          className={`text-[13px] text-gray-800 leading-snug font-display ${
            isBlurred ? "blur-sm select-none" : ""
          }`}
        >
          {balloon.wishText}
        </p>
        {isBlurred && (
          <p className="text-[11px] text-gray-400 mt-1">Tap to reveal</p>
        )}
        {balloon.displayName && !isBlurred && (
          <p className="text-[11px] text-gray-400 mt-1">
            &mdash; {balloon.displayName}
          </p>
        )}
      </div>
    </Link>
  );
}
