"use client";

import { useEffect, useMemo } from "react";
import BalloonSVG from "./BalloonSVG";

interface ReleaseAnimationProps {
  styleId: number;
  onComplete: () => void;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
}

const SPARKLE_COLORS = ["#93c5fd", "#f9a8d4", "#c4b5fd", "#86efac", "#fde047"];

export default function ReleaseAnimation({
  styleId,
  onComplete,
}: ReleaseAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const sparkles = useMemo<Sparkle[]>(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      x: 40 + ((i * 23) % 40) - 20,
      y: 30 + ((i * 17) % 30),
      size: 4 + (i % 4) * 2,
      delay: 0.1 + i * 0.08,
      color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
    }));
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] relative"
      aria-live="polite"
      aria-label="Your balloon is being released into the sky"
    >
      {/* Sparkle particles */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute animate-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            borderRadius: "50%",
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Rising balloon */}
      <div className="animate-rise">
        <BalloonSVG styleId={styleId} size={160} />
      </div>
    </div>
  );
}
