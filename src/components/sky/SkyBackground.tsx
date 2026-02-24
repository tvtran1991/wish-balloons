"use client";

interface Cloud {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  delay: number;
  duration: number;
}

const CLOUDS: Cloud[] = [
  { x: 5, y: 10, scale: 1, opacity: 0.7, delay: 0, duration: 25 },
  { x: 30, y: 25, scale: 0.7, opacity: 0.5, delay: 3, duration: 30 },
  { x: 60, y: 8, scale: 1.2, opacity: 0.6, delay: 5, duration: 22 },
  { x: 80, y: 35, scale: 0.6, opacity: 0.4, delay: 8, duration: 28 },
  { x: 15, y: 50, scale: 0.8, opacity: 0.3, delay: 2, duration: 26 },
  { x: 50, y: 45, scale: 0.9, opacity: 0.35, delay: 6, duration: 24 },
  { x: 75, y: 60, scale: 0.5, opacity: 0.25, delay: 10, duration: 32 },
];

function CloudSVG() {
  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <ellipse cx="70" cy="50" rx="60" ry="28" fill="white" />
      <ellipse cx="110" cy="45" rx="50" ry="25" fill="white" />
      <ellipse cx="85" cy="35" rx="40" ry="25" fill="white" />
      <ellipse cx="55" cy="42" rx="35" ry="22" fill="white" />
      <ellipse cx="130" cy="52" rx="35" ry="20" fill="white" />
    </svg>
  );
}

export default function SkyBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className="absolute animate-cloud-drift"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.scale * 160}px`,
            opacity: cloud.opacity,
            animationDelay: `${cloud.delay}s`,
            animationDuration: `${cloud.duration}s`,
          }}
        >
          <CloudSVG />
        </div>
      ))}
    </div>
  );
}
