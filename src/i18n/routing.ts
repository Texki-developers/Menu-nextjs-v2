import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "hi", "ur", "ar", "ml", "bn", "tl", "ta", "te", "fa", "zh"],
  defaultLocale: "en",
});
