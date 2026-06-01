import { create } from "zustand";

export type MenuSelectionState = {
  selectedMenuId: string | null;
  selectedCategoryId: string | null;
  setSelectedMenuId: (id: string | null) => void;
  setSelectedCategoryId: (id: string | null) => void;
};

export const useMenuSelectionStore = create<MenuSelectionState>((set) => ({
  selectedMenuId: null,
  selectedCategoryId: null,
  setSelectedMenuId: (id) => set({ selectedMenuId: id, selectedCategoryId: null }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));
