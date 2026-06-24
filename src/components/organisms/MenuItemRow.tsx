"use client";

import { Badge } from "@/components/atoms/Badge";
import { Price } from "@/components/atoms/Price";
import { Photo } from "@/components/molecules/Photo";
import { fmt } from "@/lib/format";
import { pick, type FlatItem, type Locale } from "@/lib/menu";

/** Compact horizontal item row used in search results. */
export function MenuItemRow({
  item,
  locale,
  onOpen,
}: {
  item: FlatItem;
  locale: Locale;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      className="flex cursor-pointer gap-3 rounded-[16px] border border-line bg-white p-[10px]"
    >
      <Photo tint={item.tint} className="h-16 w-16 flex-none rounded-xl" cameraGlyph />
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <div className="font-display text-[15px] font-semibold text-ink">{pick(item.name, locale)}</div>
          <Price className="text-[13px]">{fmt(item.price)}</Price>
        </div>
        <div className="mt-[2px] truncate text-[12px] text-muted">{pick(item.desc, locale)}</div>
        <div className="mt-[6px] flex gap-[5px]">
          {item.badges.slice(0, 2).map((b) => (
            <Badge key={b} kind={b} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
