"use client";

import { Badge } from "@/components/atoms/Badge";
import { Price } from "@/components/atoms/Price";
import { Photo } from "@/components/molecules/Photo";
import { fmt } from "@/lib/format";
import { pick, type FlatItem, type Locale } from "@/lib/menu";

interface MenuItemCardProps {
  item: FlatItem;
  locale: Locale;
  onOpen: () => void;
  onAdd: () => void;
}

/** Full-width menu card with photo, badges, add button, name, price, desc. */
export function MenuItemCard({ item, locale, onOpen, onAdd }: MenuItemCardProps) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_8px_24px_rgba(36,27,22,0.06)]">
      <Photo tint={item.tint} className="h-[150px]" cameraGlyph>
        <div className="absolute start-[10px] top-[10px] flex flex-wrap gap-[5px]">
          {item.badges.map((b) => (
            <Badge key={b} kind={b} locale={locale} />
          ))}
        </div>
        <button
          onClick={onAdd}
          aria-label="Add"
          disabled={item.soldout}
          className="absolute bottom-3 end-3 flex h-11 w-11 items-center justify-center rounded-full border-0 bg-saffron text-2xl leading-none text-white shadow-[0_8px_18px_rgba(232,146,12,0.4)] disabled:opacity-50"
        >
          +
        </button>
        {item.soldout && (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(251,248,243,0.6)]">
            <span className="rounded-full bg-ink px-3 py-[6px] text-[12px] font-semibold text-white">
              {locale === "ar" ? "نفد" : "Sold out"}
            </span>
          </div>
        )}
      </Photo>
      <div onClick={onOpen} className="cursor-pointer px-[15px] py-[13px]">
        <div className="flex items-baseline justify-between gap-[10px]">
          <div className="font-display text-base font-semibold text-ink">{pick(item.name, locale)}</div>
          <Price className="text-sm">{fmt(item.price)}</Price>
        </div>
        <div className="mt-[3px] text-[13px] leading-[1.4] text-muted">{pick(item.desc, locale)}</div>
      </div>
    </div>
  );
}
