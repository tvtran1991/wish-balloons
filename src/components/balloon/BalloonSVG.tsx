"use client";

import { getBalloonStyle } from "@/lib/balloon-styles";

interface BalloonSVGProps {
  styleId: number;
  size?: number;
  className?: string;
  showString?: boolean;
}

export default function BalloonSVG({
  styleId,
  size = 120,
  className = "",
  showString = true,
}: BalloonSVGProps) {
  const style = getBalloonStyle(styleId);
  const { bodyColor, accentColor, glowColor } = style;
  const w = size;
  const h = size * 1.4;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 120 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${style.name} balloon`}
    >
      <defs>
        <radialGradient id={`grad-${styleId}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={glowColor} stopOpacity="0.9" />
          <stop offset="40%" stopColor={accentColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={bodyColor} />
        </radialGradient>
        <filter id={`glow-${styleId}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow */}
      <ellipse
        cx="60"
        cy="58"
        rx="46"
        ry="54"
        fill={bodyColor}
        opacity="0.15"
        filter={`url(#glow-${styleId})`}
      />

      {/* Main balloon body — lantern shape */}
      <path
        d="M60 4 C30 4, 14 30, 14 58 C14 86, 30 108, 60 112 C90 108, 106 86, 106 58 C106 30, 90 4, 60 4Z"
        fill={`url(#grad-${styleId})`}
        stroke={bodyColor}
        strokeWidth="1.5"
      />

      {/* Horizontal ribs (lantern detail) */}
      <ellipse cx="60" cy="38" rx="38" ry="4" fill={accentColor} opacity="0.3" />
      <ellipse cx="60" cy="58" rx="44" ry="4" fill={accentColor} opacity="0.25" />
      <ellipse cx="60" cy="78" rx="40" ry="4" fill={accentColor} opacity="0.2" />
      <ellipse cx="60" cy="96" rx="30" ry="3" fill={accentColor} opacity="0.15" />

      {/* Top cap */}
      <ellipse cx="60" cy="8" rx="10" ry="4" fill={accentColor} opacity="0.6" />

      {/* Bottom knot */}
      <path
        d="M54 112 L60 118 L66 112"
        fill={bodyColor}
        stroke={bodyColor}
        strokeWidth="1"
      />

      {/* Highlight reflection */}
      <ellipse cx="45" cy="35" rx="12" ry="18" fill="white" opacity="0.12" />

      {/* String */}
      {showString && (
        <g className="animate-sway">
          <path
            d="M60 118 Q58 135, 62 145 Q64 155, 60 168"
            stroke={accentColor}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
      )}
    </svg>
  );
}
