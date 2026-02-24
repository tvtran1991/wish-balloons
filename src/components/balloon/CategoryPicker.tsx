"use client";

import { CATEGORIES } from "@/lib/categories";

interface CategoryPickerProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

function CategoryIcon({ icon }: { icon: string }) {
  const cls = "w-4 h-4 inline-block shrink-0";
  switch (icon) {
    case "heart":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      );
    case "people":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      );
    case "house":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm-2 8a24.998 24.998 0 008 0v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1z" clipRule="evenodd" />
        </svg>
      );
    case "building":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
        </svg>
      );
    case "sparkles":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 17.5 7.512a1 1 0 01.576 1.765l-2.55 2.167.83 3.395a1 1 0 01-1.503 1.094L12 14.089l-2.853 1.844a1 1 0 01-1.503-1.094l.83-3.395-2.55-2.167a1 1 0 01.576-1.765l3.354-.311 1.179-3.456A1 1 0 0112 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CategoryPicker({
  selectedId,
  onSelect,
}: CategoryPickerProps) {
  return (
    <div>
      <label className="block text-sm text-text-secondary mb-2">
        Category (optional)
      </label>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Wish category">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(isSelected ? null : cat.id)}
              aria-pressed={isSelected}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-150 cursor-pointer border
                ${
                  isSelected
                    ? "border-accent bg-accent/10 text-accent font-medium"
                    : "border-border bg-white text-text-secondary hover:border-accent/40"
                }`}
            >
              <CategoryIcon icon={cat.icon} />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
