"use client";

import type { CategorySummary } from "@/lib/api/menu";

interface CategoryChipsProps {
  categories: CategorySummary[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

const CategoryChips = ({ categories, activeId, onSelect }: CategoryChipsProps) => {
  return (
    <div
      className="flex overflow-x-auto"
      style={{ gap: 8, padding: "2px 0 2px" }}
    >
      {categories.map((c) => {
        const on = c.id === activeId;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className="flex-shrink-0 rounded-xl whitespace-nowrap font-bold"
            style={{
              padding: "8px 15px",
              fontSize: 13.5,
              background: on ? "#EC5A2A" : "#FFFFFF",
              color: on ? "#FFFFFF" : "#7A7062",
              border: on
                ? "1px solid #EC5A2A"
                : "1px solid rgba(25,21,15,0.09)",
            }}
          >
            {c.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryChips;
