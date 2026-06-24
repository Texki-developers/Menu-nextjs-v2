"use client";

import { Price } from "@/components/atoms/Price";
import { QtyStepper } from "@/components/atoms/QtyStepper";
import { Photo } from "@/components/molecules/Photo";
import { fmt } from "@/lib/format";
import { pick, type Locale } from "@/lib/menu";
import { lineModLabel, type CartLine } from "@/store/cart.store";
import { findItem } from "@/lib/menu";

interface CartLineItemProps {
  line: CartLine;
  locale: Locale;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}

export function CartLineItem({ line, locale, onInc, onDec, onRemove }: CartLineItemProps) {
  const item = findItem(line.id);
  if (!item) return null;
  const mods = lineModLabel(line, locale);
  return (
    <div className="flex gap-3 rounded-[16px] border border-line bg-white p-3">
      <Photo tint={item.tint} className="h-[62px] w-[62px] flex-none rounded-xl" />
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <div className="font-display text-[15px] font-semibold text-ink">{pick(item.name, locale)}</div>
          <Price tone="ink" className="text-[13px]">
            {fmt(line.unit * line.qty)}
          </Price>
        </div>
        {mods && <div className="mt-[2px] text-[12px] text-muted">{mods}</div>}
        <div className="mt-[9px] flex items-center justify-between">
          <QtyStepper value={line.qty} onInc={onInc} onDec={onDec} />
          <button
            onClick={onRemove}
            className="cursor-pointer border-0 bg-transparent text-[13px] font-semibold text-pom"
          >
            {locale === "ar" ? "إزالة" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
