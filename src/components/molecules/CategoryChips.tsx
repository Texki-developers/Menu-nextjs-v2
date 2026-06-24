"use client";

import { Chip } from "@/components/atoms/Chip";

interface CategoryItem {
  id: string;
  label: string;
}

interface CategoryChipsProps {
  items: CategoryItem[];
  activeId?: string;
  onPick?: (id: string) => void;
  sticky?: boolean;
}

/** Horizontally scrolling category filter row. */
export function CategoryChips({ items, activeId, onPick, sticky }: CategoryChipsProps) {
  return (
    <div
      className={
        "no-scrollbar flex gap-2 overflow-x-auto px-4 py-[10px]" +
        (sticky
          ? " sticky top-0 z-30 bg-[linear-gradient(var(--surface),var(--surface)_70%,transparent)]"
          : "")
      }
    >
      {items.map((c) => (
        <Chip key={c.id} active={activeId === c.id} onClick={onPick ? () => onPick(c.id) : undefined}>
          {c.label}
        </Chip>
      ))}
    </div>
  );
}
