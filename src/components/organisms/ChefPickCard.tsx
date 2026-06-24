"use client";

import { Price } from "@/components/atoms/Price";
import { Photo } from "@/components/molecules/Photo";
import { fmt } from "@/lib/format";
import { pick, type FlatItem, type Locale } from "@/lib/menu";

/** Horizontal chef-pick card shown in the menu-home carousel. */
export function ChefPickCard({
  item,
  locale,
  onOpen,
}: {
  item: FlatItem;
  locale: Locale;
  onOpen: () => void;
}) {
  return (
    <div onClick={onOpen} className="w-[172px] flex-none cursor-pointer">
      <Photo tint={item.tint} className="flex h-[118px] items-end rounded-[16px] p-[10px]">
        <span className="absolute end-2 top-2 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[rgba(36,27,22,0.18)] text-[12px] text-white">
          📷
        </span>
        <div className="font-display text-[15px] font-bold text-ink [text-shadow:0_1px_0_rgba(255,255,255,0.4)]">
          {pick(item.name, locale)}
        </div>
      </Photo>
      <Price className="mt-[6px] block text-[13px]">{fmt(item.price)}</Price>
    </div>
  );
}
