"use client";

import type { Locale } from "@/lib/menu";

/** Sticky "View cart" bar shown on the menu home when the cart has items. */
export function StickyCartBar({
  count,
  subLabel,
  onClick,
  locale,
}: {
  count: number;
  subLabel: string;
  onClick: () => void;
  locale: Locale;
}) {
  return (
    <div className="sticky bottom-0 px-4 pb-4 pt-3">
      <button
        onClick={onClick}
        className="flex w-full cursor-pointer items-center gap-3 rounded-[16px] border-0 bg-saffron px-4 py-[13px] text-white shadow-[0_-12px_32px_rgba(36,27,22,0.12),0_10px_24px_rgba(232,146,12,0.32)]"
      >
        <span className="animate-bump flex h-[26px] min-w-[26px] items-center justify-center rounded-lg bg-[rgba(255,255,255,0.25)] font-mono text-[13px] font-semibold">
          {count}
        </span>
        <span className="flex-1 text-start text-[15px] font-semibold">
          {locale === "ar" ? "عرض السلة" : "View cart"}
        </span>
        <span className="font-mono text-[15px] font-semibold">{subLabel}</span>
      </button>
    </div>
  );
}
