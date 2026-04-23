"use client";

import { create } from "zustand";
import { FilterStore } from "./filter.type";

export const useFilterStore = create<FilterStore>((set) => ({
  isFilterModalOpen: false,
  setFilterModalOpen: (isOpen) => set({ isFilterModalOpen: isOpen }),
  toggleFilterModal: () => set((state) => ({ isFilterModalOpen: !state.isFilterModalOpen })),

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  selectedFilters: {},
  setFilterValues: (filterId, values) =>
    set((state) => {
      const next = { ...state.selectedFilters };
      if (values.length === 0) delete next[filterId];
      else next[filterId] = values;
      return { selectedFilters: next };
    }),
  toggleFilterValue: (filterId, value) =>
    set((state) => {
      const current = state.selectedFilters[filterId] ?? [];
      const exists = current.includes(value);
      const updated = exists ? current.filter((v) => v !== value) : [...current, value];
      const next = { ...state.selectedFilters };
      if (updated.length === 0) delete next[filterId];
      else next[filterId] = updated;
      return { selectedFilters: next };
    }),
  clearFilter: (filterId) =>
    set((state) => {
      const next = { ...state.selectedFilters };
      delete next[filterId];
      return { selectedFilters: next };
    }),

  activeSortId: null,
  setActiveSortId: (id) => set({ activeSortId: id }),

  resetAll: () => set({ selectedFilters: {}, activeSortId: null }),
}));
