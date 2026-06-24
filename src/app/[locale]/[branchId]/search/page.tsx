"use client";

import { useMemo, useState } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { Chip } from "@/components/atoms/Chip";
import { SearchBar } from "@/components/molecules/SearchBar";
import { MenuItemRow } from "@/components/organisms/MenuItemRow";
import { RECENT_SEARCHES, flatItems, pick } from "@/lib/menu";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useBranch } from "@/hooks/useBranch";
import { useSheet } from "@/store/sheet.store";

export default function SearchPage() {
  const locale = useUiLocale();
  const { routes, go } = useBranch();
  const openItem = useSheet((s) => s.openItem);
  const [q, setQ] = useState("");
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);
  const back = locale === "ar" ? "→" : "←";

  const { results, empty } = useMemo(() => {
    const query = q.trim().toLowerCase();
    const all = flatItems();
    if (!query) return { results: all.slice(0, 8), empty: false };
    const matched = all.filter((i) =>
      `${pick(i.name, "en")} ${pick(i.desc, "en")} ${pick(i.cat, "en")} ${pick(i.name, "ar")}`
        .toLowerCase()
        .includes(query),
    );
    return { results: matched.length ? matched.slice(0, 8) : all.slice(0, 8), empty: !matched.length };
  }, [q]);

  const filters = [t("🌿 Halal only", "🌿 حلال فقط"), t("Veg", "نباتي"), t("Spice", "حار"), t("Price", "السعر")];

  return (
    <div className="min-h-full px-4 pb-6 pt-5">
      <div className="mb-[14px] flex items-center gap-[10px]">
        <IconButton className="text-[17px]" onClick={() => go(routes.menu)} aria-label="Back">
          {back}
        </IconButton>
        <SearchBar placeholder={t("Search the menu", "ابحث في القائمة")} value={q} onChange={setQ} autoFocus />
      </div>

      <div className="no-scrollbar mb-[10px] flex gap-[7px] overflow-x-auto">
        <span className="flex-none py-[7px] text-[11px] font-semibold text-faint">{t("Recent:", "الأخيرة:")}</span>
        {RECENT_SEARCHES.map((r) => (
          <Chip key={r.en} onClick={() => setQ(pick(r, locale))}>
            {pick(r, locale)}
          </Chip>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-[7px]">
        {filters.map((f, i) => (
          <span
            key={f}
            className={
              "rounded-full px-3 py-[7px] text-[12px] font-semibold " +
              (i === 0 ? "bg-[rgba(94,140,83,0.13)] text-[#42632F]" : "bg-sand text-muted")
            }
          >
            {f}
          </span>
        ))}
      </div>

      {empty && (
        <div className="mb-[14px] text-sm text-muted">
          {t("No matches — here are popular picks instead.", "لا نتائج — إليك الأكثر طلباً.")}
        </div>
      )}

      <div className="flex flex-col gap-[10px]">
        {results.map((it) => (
          <MenuItemRow key={it.id} item={it} locale={locale} onOpen={() => openItem(it.id)} />
        ))}
      </div>
    </div>
  );
}
