"use client";

import { create } from "zustand";
import { LanguageStore } from "./language.type";

export const useLanguageStore = create<LanguageStore>((set) => ({
  isPopupOpen: false,
  setPopupOpen: (isOpen: boolean) => set({ isPopupOpen: isOpen }),
  togglePopup: () => set((state) => ({ isPopupOpen: !state.isPopupOpen })),
}));
