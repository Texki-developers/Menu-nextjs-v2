"use client";

import { LOCAL_STORAGE_KEYS } from "@/constants/common-keys";
import { useLanguageStore } from "@/store/language/language.store";
import { useEffect } from "react";

const useLanguage = () => {
  const { setPopupOpen, togglePopup: togglePopupStore } = useLanguageStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDefaultLocale = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DEFAULT_LOCALE);
      console.log("🚀 ~ useLanguage ~ userDefaultLocale:", userDefaultLocale);
      if (userDefaultLocale) {
        setPopupOpen(false);
      } else {
        setPopupOpen(true);
      }
    }
  }, [setPopupOpen]);

  const handleUserDefaultLocale = () => {};

  return { handleUserDefaultLocale };
};

export default useLanguage;
