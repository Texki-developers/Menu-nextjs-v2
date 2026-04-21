export interface FilterStore {
  isFilterModalOpen: boolean;
  setFilterModalOpen: (isOpen: boolean) => void;
  toggleFilterModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
