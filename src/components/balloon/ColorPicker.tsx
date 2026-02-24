"use client";

import { BALLOON_STYLES } from "@/lib/balloon-styles";

interface ColorPickerProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function ColorPicker({ selectedId, onSelect }: ColorPickerProps) {
  return (
    <div>
      <label className="block text-sm text-text-secondary mb-2">
        Balloon color
      </label>
      <div className="flex gap-3" role="radiogroup" aria-label="Balloon color">
        {BALLOON_STYLES.map((style) => {
          const isSelected = selectedId === style.id;
          return (
            <button
              key={style.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={style.name}
              onClick={() => onSelect(style.id)}
              className={`w-9 h-9 rounded-full transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "ring-2 ring-offset-2 ring-accent"
                  : "hover:scale-110"
              }`}
              style={{ backgroundColor: style.bodyColor }}
            />
          );
        })}
      </div>
    </div>
  );
}
