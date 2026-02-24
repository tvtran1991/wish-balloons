"use client";

import { BALLOON_SHAPES } from "@/lib/balloon-shapes";

interface ShapePickerProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function ShapePicker({ selectedId, onSelect }: ShapePickerProps) {
  return (
    <div>
      <label className="block text-sm text-text-secondary mb-2">
        Zodiac animal (optional)
      </label>
      <div
        className="grid grid-cols-4 gap-2"
        role="radiogroup"
        aria-label="Zodiac animal shape"
      >
        {/* None option */}
        <button
          type="button"
          role="radio"
          aria-checked={selectedId === 0}
          aria-label="No animal"
          onClick={() => onSelect(0)}
          className={`flex flex-col items-center justify-center gap-0.5 px-1 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer border ${
            selectedId === 0
              ? "border-accent ring-2 ring-accent/30 bg-accent/5"
              : "border-border hover:border-accent/40 bg-white"
          }`}
        >
          <span className="text-base leading-none">{"\u2728"}</span>
          <span className="text-text-secondary">None</span>
        </button>

        {BALLOON_SHAPES.map((shape) => {
          const isSelected = selectedId === shape.id;
          return (
            <button
              key={shape.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={shape.name}
              onClick={() => onSelect(shape.id)}
              className={`flex flex-col items-center justify-center gap-0.5 px-1 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer border ${
                isSelected
                  ? "border-accent ring-2 ring-accent/30 bg-accent/5"
                  : "border-border hover:border-accent/40 bg-white"
              }`}
            >
              <span className="text-base leading-none">{shape.emoji}</span>
              <span className="text-text-secondary">{shape.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
