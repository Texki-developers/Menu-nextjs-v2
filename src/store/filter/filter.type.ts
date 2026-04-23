export type SelectedFilters = Record<string, string[]>;

export interface FilterStore {
  isFilterModalOpen: boolean;
  setFilterModalOpen: (isOpen: boolean) => void;
  toggleFilterModal: () => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  selectedFilters: SelectedFilters;
  setFilterValues: (filterId: string, values: string[]) => void;
  toggleFilterValue: (filterId: string, value: string) => void;
  clearFilter: (filterId: string) => void;

  activeSortId: string | null;
  setActiveSortId: (id: string | null) => void;

  resetAll: () => void;
}
