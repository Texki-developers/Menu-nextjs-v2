import { create } from "zustand";

export type SheetKind = "item" | "call" | null;

interface SheetState {
  kind: SheetKind;
  /** menu item id for the detail sheet */
  detailId: string | null;
  qty: number;
  size: string;
  addons: string[];
  openItem: (id: string) => void;
  openCall: () => void;
  close: () => void;
  incQty: () => void;
  decQty: () => void;
  setSize: (id: string) => void;
  toggleAddon: (id: string) => void;
}

export const useSheet = create<SheetState>((set) => ({
  kind: null,
  detailId: null,
  qty: 1,
  size: "reg",
  addons: [],
  openItem: (id) => set({ kind: "item", detailId: id, qty: 1, size: "reg", addons: [] }),
  openCall: () => set({ kind: "call" }),
  close: () => set({ kind: null }),
  incQty: () => set((s) => ({ qty: s.qty + 1 })),
  decQty: () => set((s) => ({ qty: Math.max(1, s.qty - 1) })),
  setSize: (id) => set({ size: id }),
  toggleAddon: (id) =>
    set((s) => ({
      addons: s.addons.includes(id) ? s.addons.filter((x) => x !== id) : [...s.addons, id],
    })),
}));
