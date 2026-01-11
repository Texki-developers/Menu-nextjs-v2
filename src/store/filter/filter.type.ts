export interface FilterStore {
  isFilterModalOpen: boolean;
  setFilterModalOpen: (isOpen: boolean) => void;
  toggleFilterModal: () => void;
}
