"use client";

import { LOCAL_STORAGE_KEYS } from "@/constants/common-keys";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLanguageStore } from "@/store/language/language.store";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
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

  const handleUserDefaultLocale = (locale: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DEFAULT_LOCALE, locale);
    togglePopupStore();
    if (currentLocale !== locale) {
      router.replace(pathname, { locale });
    }
  };

  return { handleUserDefaultLocale };
};

export default useLanguage;
