import { create } from "zustand";
import { ADDONS, SIZES, pick, type Locale } from "@/lib/menu";

export interface CartLine {
  key: string;
  id: string;
  qty: number;
  /** size modifier id (when the item has mods) */
  size?: string;
  addons: string[];
  /** unit price including selected modifiers */
  unit: number;
}

interface CartState {
  lines: CartLine[];
  add: (line: Omit<CartLine, "key">) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
}

let seq = 0;

export const useCart = create<CartState>((set) => ({
  lines: [],
  add: (line) => set((s) => ({ lines: [...s.lines, { ...line, key: `l${++seq}` }] })),
  inc: (key) => set((s) => ({ lines: s.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)) })),
  dec: (key) =>
    set((s) => {
      const line = s.lines.find((l) => l.key === key);
      if (line && line.qty <= 1) return { lines: s.lines.filter((l) => l.key !== key) };
      return { lines: s.lines.map((l) => (l.key === key ? { ...l, qty: l.qty - 1 } : l)) };
    }),
  remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
  clear: () => set({ lines: [] }),
}));

export const cartCount = (lines: CartLine[]) => lines.reduce((a, l) => a + l.qty, 0);
export const cartSubtotal = (lines: CartLine[]) => lines.reduce((a, l) => a + l.unit * l.qty, 0);

/** Human-readable modifier summary, e.g. "Large · Garlic sauce". */
export function lineModLabel(line: CartLine, locale: Locale): string {
  const names: string[] = [];
  if (line.size) {
    const s = SIZES.find((x) => x.id === line.size);
    if (s) names.push(pick(s.name, locale));
  }
  line.addons.forEach((id) => {
    const a = ADDONS.find((x) => x.id === id);
    if (a) names.push(pick(a.name, locale));
  });
  return names.join(" · ");
}
