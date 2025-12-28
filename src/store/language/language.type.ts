export interface LanguageStore {
  isPopupOpen: boolean;
  setPopupOpen: (isOpen: boolean) => void;
  togglePopup: () => void;
}
