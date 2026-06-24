"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/lib/menu";

/** EN / ع locale switch — swaps the active next-intl locale on the same path. */
export function LangToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    // usePathname() already returns the resolved path (e.g. /branch/cart);
    // next-intl re-prefixes it with the chosen locale.
    router.replace(pathname, { locale: next });
  };

  const seg = (active: boolean) =>
    `cursor-pointer rounded-full border-0 px-[9px] py-[5px] text-[11px] font-semibold ${
      active ? "bg-saffron text-white" : "bg-transparent text-muted"
    }`;

  return (
    <div className="flex rounded-full bg-sand p-[2px]">
      <button className={seg(locale === "en")} onClick={() => switchTo("en")}>
        EN
      </button>
      <button className={seg(locale === "ar") + " text-[12px]"} onClick={() => switchTo("ar")}>
        ع
      </button>
    </div>
  );
}
