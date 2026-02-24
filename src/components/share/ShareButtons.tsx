"use client";

import { useState } from "react";

interface ShareButtonsProps {
  balloonId: string;
}

export default function ShareButtons({ balloonId }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/b/${balloonId}`
    : `/b/${balloonId}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Wish Balloon",
          text: "I released a wish balloon for Lunar New Year 2026!",
          url,
        });
      } catch {
        // user cancelled
      }
    }
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={handleCopy}
        className="px-5 py-2.5 bg-white border border-border hover:border-accent/40 text-text-primary rounded-full transition-all duration-200 text-sm cursor-pointer"
        aria-label="Copy link to balloon"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>

      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={handleShare}
          className="px-5 py-2.5 bg-white border border-border hover:border-accent/40 text-text-primary rounded-full transition-all duration-200 text-sm cursor-pointer"
          aria-label="Share balloon"
        >
          Share
        </button>
      )}
    </div>
  );
}
