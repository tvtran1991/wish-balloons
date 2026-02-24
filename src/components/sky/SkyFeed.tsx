"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import BalloonCard from "@/components/balloon/BalloonCard";
import type { BalloonData } from "@/types/balloon";

export default function SkyFeed() {
  const [balloons, setBalloons] = useState<BalloonData[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchBalloons = useCallback(
    async (cursorParam?: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (cursorParam) params.set("cursor", cursorParam);
        params.set("limit", "20");

        const res = await fetch(`/api/balloons?${params}`);
        if (!res.ok) return;

        const data = await res.json();
        setBalloons((prev) =>
          cursorParam ? [...prev, ...data.balloons] : data.balloons
        );
        setCursor(data.nextCursor);
        setHasMore(!!data.nextCursor);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchBalloons();
  }, [fetchBalloons]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && cursor) {
          fetchBalloons(cursor);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [cursor, hasMore, loading, fetchBalloons]);

  if (!loading && balloons.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary text-lg">
          The sky is empty. Be the first to release a balloon!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 px-4">
        {balloons.map((balloon, i) => (
          <BalloonCard
            key={balloon.id}
            balloon={balloon}
            animationDelay={(i * 0.7) % 5}
            animationDuration={3.5 + (i % 3)}
          />
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center py-8">
        {loading && (
          <p className="text-text-secondary text-sm animate-pulse">
            Loading balloons...
          </p>
        )}
      </div>
    </div>
  );
}
