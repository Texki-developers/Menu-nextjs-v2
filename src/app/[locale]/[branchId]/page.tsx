"use client";

import { AppHeader } from "@/components/organisms/AppHeader";
import { ChefPickCard } from "@/components/organisms/ChefPickCard";
import { MenuItemCard } from "@/components/organisms/MenuItemCard";
import { StickyCartBar } from "@/components/organisms/StickyCartBar";
import { SearchBar } from "@/components/molecules/SearchBar";
import { CategoryChips } from "@/components/molecules/CategoryChips";
import { CHEF_PICK_IDS, MENU, findItem, pick } from "@/lib/menu";
import { fmt } from "@/lib/format";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useBranch } from "@/hooks/useBranch";
import { useSheet } from "@/store/sheet.store";
import { cartCount, cartSubtotal, useCart } from "@/store/cart.store";

export default function MenuHomePage() {
  const locale = useUiLocale();
  const { routes, go } = useBranch();
  const openItem = useSheet((s) => s.openItem);
  const openCall = useSheet((s) => s.openCall);
  const lines = useCart((s) => s.lines);
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);

  const chefPicks = CHEF_PICK_IDS.map(findItem).filter(Boolean);
  const scrollTo = (id: string) =>
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-full pb-24">
      <AppHeader locale={locale} onBell={openCall} />

      {/* hero */}
      <div className="px-4 pt-[6px]">
        <div className="font-display text-[25px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
          {t("Charcoal grills & mezze, the Gulf way", "مشاوي الفحم والمقبلات")}
        </div>
        <div className="mb-[14px] mt-[6px] text-[13px] text-muted">
          {t("Chef's picks tonight", "اختيارات الشيف الليلة")}
        </div>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
          {chefPicks.map(
            (it) =>
              it && <ChefPickCard key={it.id} item={it} locale={locale} onOpen={() => openItem(it.id)} />,
          )}
        </div>
      </div>

      {/* search */}
      <div className="px-4 pb-1 pt-4">
        <SearchBar placeholder={t("Search the menu", "ابحث في القائمة")} onClick={() => go(routes.search)} />
      </div>

      {/* sticky category chips */}
      <CategoryChips
        sticky
        items={MENU.map((s) => ({ id: s.id, label: pick(s.cat, locale) }))}
        onPick={scrollTo}
      />

      {/* menu sections */}
      <div className="px-4 pt-1">
        {MENU.map((sec) => (
          <div key={sec.id} id={`sec-${sec.id}`} className="mt-[18px] scroll-mt-16">
            <div className="mb-3 font-display text-[18px] font-bold text-ink">{pick(sec.cat, locale)}</div>
            <div className="flex flex-col gap-3">
              {sec.items.map((it) => {
                const flat = { ...it, cat: sec.cat, tint: sec.tint };
                return (
                  <MenuItemCard
                    key={it.id}
                    item={flat}
                    locale={locale}
                    onOpen={() => openItem(it.id)}
                    onAdd={() => openItem(it.id)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {lines.length > 0 && (
        <StickyCartBar
          count={cartCount(lines)}
          subLabel={fmt(cartSubtotal(lines))}
          onClick={() => go(routes.cart)}
          locale={locale}
        />
      )}
    </div>
  );
}
