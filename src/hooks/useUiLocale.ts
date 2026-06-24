"use client";

import { useLocale } from "next-intl";
import type { Locale } from "@/lib/menu";

/** Narrow next-intl's locale string to the app's supported UI locales. */
export function useUiLocale(): Locale {
  return useLocale() === "ar" ? "ar" : "en";
}
