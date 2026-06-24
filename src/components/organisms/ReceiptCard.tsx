import { RESTAURANT } from "@/constants/config";
import { fmt } from "@/lib/format";
import { pick, type Locale } from "@/lib/menu";

interface LineEntry {
  label: string;
  value: string;
}

/** Itemised receipt with dashed sections and payment method footnote. */
export function ReceiptCard({
  meta,
  items,
  rows,
  totalKey,
  totalValue,
  method,
  locale,
}: {
  meta: string;
  items: LineEntry[];
  rows: LineEntry[];
  totalKey: string;
  totalValue: string;
  method: string;
  locale: Locale;
}) {
  return (
    <div className="rounded-[18px] border border-line bg-white p-[18px]">
      <div className="mb-[14px] text-center">
        <div className="font-display text-[18px] font-bold text-ink">{pick(RESTAURANT.name, locale)}</div>
        <div className="font-mono text-[11px] text-faint">{meta}</div>
      </div>

      <div className="flex flex-col gap-[6px] border-y border-dashed border-line py-3">
        {items.map((it, i) => (
          <div key={i} className="flex justify-between text-[13px] text-ink">
            <span>{it.label}</span>
            <span className="font-mono">{it.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[5px] py-3">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between text-[13px] text-muted">
            <span>{r.label}</span>
            <span className="font-mono">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-baseline justify-between border-t border-line pt-[10px]">
        <span className="text-[15px] font-bold text-ink">{totalKey}</span>
        <span className="font-mono text-[18px] font-semibold text-ink">{totalValue}</span>
      </div>
      <div className="mt-[10px] text-center font-mono text-[11px] text-faint">{method}</div>
    </div>
  );
}
