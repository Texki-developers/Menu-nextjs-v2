import { BADGE_META, pick, type BadgeKey, type Locale } from "@/lib/menu";

const BADGE_CLASS: Record<BadgeKey, string> = {
  Halal: "bg-[rgba(94,140,83,0.13)] text-[#42632F]",
  Veg: "bg-[rgba(94,140,83,0.13)] text-[#42632F]",
  Spicy: "bg-[rgba(197,40,61,0.1)] text-pom",
  Nuts: "bg-[rgba(110,99,91,0.12)] text-muted",
  New: "bg-[rgba(47,111,143,0.12)] text-info",
  Bestseller: "bg-[rgba(232,146,12,0.14)] text-saffron-dark",
};

export function Badge({ kind, locale }: { kind: BadgeKey; locale: Locale }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-[3px] text-[11px] font-semibold ${BADGE_CLASS[kind]}`}
    >
      {pick(BADGE_META[kind].label, locale)}
    </span>
  );
}
