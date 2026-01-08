"use client";

import { create } from "zustand";
import { ProductOptionsStore } from "./product-options.type";

export const useProductOptionsStore = create<ProductOptionsStore>((set) => ({
  selectedSize: null,
  selectedExtras: [],
  setSelectedSize: (sizeId: string) => set({ selectedSize: sizeId }),
  toggleExtra: (extraId: string) =>
    set((state) => ({
      selectedExtras: state.selectedExtras.includes(extraId) ? state.selectedExtras.filter((id) => id !== extraId) : [...state.selectedExtras, extraId],
    })),
  resetOptions: () => set({ selectedSize: null, selectedExtras: [] }),
}));
