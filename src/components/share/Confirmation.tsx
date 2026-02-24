"use client";

import Link from "next/link";
import ShareButtons from "./ShareButtons";

interface ConfirmationProps {
  balloonId: string;
  onReleaseAnother?: () => void;
}

export default function Confirmation({ balloonId, onReleaseAnother }: ConfirmationProps) {
  return (
    <div className="animate-fade-in-up text-center space-y-6 py-8">
      <div className="text-5xl mb-2" aria-hidden="true">
        &#10024;
      </div>
      <h2 className="text-2xl font-bold text-text-primary font-display">
        Your balloon is in the sky!
      </h2>
      <p className="text-text-secondary max-w-xs mx-auto">
        Your wish is now floating among the clouds. Share it with friends and
        family, or release another.
      </p>

      <ShareButtons balloonId={balloonId} />

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <button
          onClick={() => onReleaseAnother ? onReleaseAnother() : window.location.reload()}
          className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-all duration-200 text-sm cursor-pointer"
        >
          Release Another
        </button>
        <Link
          href="/sky"
          className="px-6 py-2.5 bg-white border border-border hover:border-accent/40 text-text-primary rounded-full transition-all duration-200 text-sm"
        >
          View the Sky
        </Link>
        <Link
          href={`/b/${balloonId}`}
          className="px-6 py-2.5 bg-white border border-border hover:border-accent/40 text-text-primary rounded-full transition-all duration-200 text-sm"
        >
          View Your Balloon
        </Link>
      </div>
    </div>
  );
}
