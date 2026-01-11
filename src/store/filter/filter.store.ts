"use client";

import { create } from "zustand";
import { FilterStore } from "./filter.type";

export const useFilterStore = create<FilterStore>((set) => ({
  isFilterModalOpen: false,
  setFilterModalOpen: (isOpen: boolean) => set({ isFilterModalOpen: isOpen }),
  toggleFilterModal: () => set((state) => ({ isFilterModalOpen: !state.isFilterModalOpen })),
}));
