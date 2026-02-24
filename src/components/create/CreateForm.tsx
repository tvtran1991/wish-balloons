"use client";

import { useState } from "react";
import ColorPicker from "@/components/balloon/ColorPicker";
import ShapePicker from "@/components/balloon/ShapePicker";
import CategoryPicker from "@/components/balloon/CategoryPicker";
import Confirmation from "@/components/share/Confirmation";

const EXAMPLE_WISHES = [
  "May this year bring good health and happiness to my family.",
  "Wishing for courage to chase my dreams in 2026!",
  "Peace and love for everyone around the world.",
  "May I find balance between work and the things I love.",
  "Hoping for new friendships and deeper connections.",
  "Wishing for a year full of laughter and adventure.",
];

type Phase = "form" | "releasing" | "done";

interface CreateFormProps {
  phase: Phase;
  balloonId: string | null;
  onRelease: (balloon: { id: string; styleId: number; shapeId: number }) => void;
  onReset: () => void;
}

export default function CreateForm({
  phase,
  balloonId,
  onRelease,
  onReset,
}: CreateFormProps) {
  const [wishText, setWishText] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [styleId, setStyleId] = useState<number | null>(1);
  const [shapeId, setShapeId] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const maxChars = 120;
  const charCount = wishText.length;

  function handleRandomExample() {
    const example =
      EXAMPLE_WISHES[Math.floor(Math.random() * EXAMPLE_WISHES.length)];
    setWishText(example.slice(0, maxChars));
  }

  async function handleRelease() {
    if (!styleId || !wishText.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/balloons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          styleId,
          shapeId,
          wishText: wishText.trim(),
          category: category || undefined,
          displayName: displayName.trim() || undefined,
          privacy: "public",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const balloon = await res.json();
      onRelease({ id: balloon.id, styleId, shapeId });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleReleaseAnother() {
    setWishText("");
    setCategory(null);
    setDisplayName("");
    setStyleId(1);
    setShapeId(0);
    setError(null);
    onReset();
  }

  if (phase === "releasing") {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center animate-fade-in">
        <p className="text-text-secondary text-lg py-8">
          Your balloon is rising into the sky...
        </p>
      </div>
    );
  }

  if (phase === "done" && balloonId) {
    return <Confirmation balloonId={balloonId} onReleaseAnother={handleReleaseAnother} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5 animate-fade-in">
      {/* Wish text */}
      <div>
        <label className="block text-sm text-text-secondary mb-2">
          Your wish
        </label>
        <textarea
          value={wishText}
          onChange={(e) =>
            setWishText(e.target.value.slice(0, maxChars))
          }
          placeholder="What do you wish for in the new year?"
          rows={3}
          maxLength={maxChars}
          className="w-full border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent resize-none bg-white"
          aria-label="Your wish"
        />
        <div className="flex items-center justify-between mt-1">
          <button
            type="button"
            onClick={handleRandomExample}
            className="text-xs text-accent hover:text-accent-hover transition-colors cursor-pointer"
          >
            Random example
          </button>
          <p
            className={`text-xs ${
              charCount > maxChars - 20
                ? "text-red-400"
                : "text-text-muted"
            }`}
          >
            {charCount}/{maxChars}
          </p>
        </div>
      </div>

      {/* Category */}
      <CategoryPicker
        selectedId={category}
        onSelect={(id) => setCategory(id)}
      />

      {/* Display name */}
      <div>
        <label className="block text-sm text-text-secondary mb-2">
          Display name (optional)
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) =>
            setDisplayName(e.target.value.slice(0, 30))
          }
          placeholder="Anonymous"
          maxLength={30}
          className="w-full border border-border rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
          aria-label="Display name"
        />
      </div>

      {/* Color picker */}
      <ColorPicker
        selectedId={styleId}
        onSelect={(id) => setStyleId(id)}
      />

      {/* Shape picker */}
      <ShapePicker
        selectedId={shapeId}
        onSelect={(id) => setShapeId(id)}
      />

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm" role="alert">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        onClick={handleRelease}
        disabled={!wishText.trim() || !styleId || submitting}
        className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        {submitting ? "Releasing..." : "Release to the Sky"}
      </button>
    </div>
  );
}
