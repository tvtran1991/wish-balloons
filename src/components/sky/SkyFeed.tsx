"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import BalloonCard from "@/components/balloon/BalloonCard";
import type { BalloonData } from "@/types/balloon";

interface SkyFeedProps {
  newBalloonId?: string | null;
}

export default function SkyFeed({ newBalloonId }: SkyFeedProps = {}) {
  const [balloons, setBalloons] = useState<BalloonData[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);
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
        if (data.totalCount !== undefined) {
          setTotalCount(data.totalCount);
        }
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
    if (newBalloonId) {
      fetchBalloons();
    }
  }, [newBalloonId, fetchBalloons]);

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
        <p className="text-text-secondary text-lg italic font-display">
          The sky is waiting for the first wish...
        </p>
      </div>
    );
  }

  return (
    <div>
      {totalCount > 0 && (
        <p className="text-center text-gray-500 text-sm mb-6 font-display">
          {totalCount} {totalCount === 1 ? "wish" : "wishes"} released to the sky today
        </p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 px-4 justify-items-center">
        {balloons.map((balloon, i) => (
          <BalloonCard
            key={balloon.id}
            balloon={balloon}
            index={i}
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
