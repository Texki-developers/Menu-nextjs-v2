"use client";

import { useState } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { Avatar } from "@/components/atoms/Avatar";
import { Price } from "@/components/atoms/Price";
import { Button } from "@/components/atoms/Button";
import { StatusPill } from "@/components/atoms/StatusPill";
import { AvatarStack } from "@/components/molecules/AvatarStack";
import { SegmentedControl } from "@/components/molecules/SegmentedControl";
import { fmt } from "@/lib/format";
import { pick, type StatusKey } from "@/lib/menu";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useBranch } from "@/hooks/useBranch";
import { billOf, participantsOf, useTable, type Order } from "@/store/table.store";

interface TabLine {
  name: string;
  qtyLabel: string;
  priceLabel: string;
  status: StatusKey;
}
interface TabGroup {
  title: string;
  ini: string;
  color: string;
  lines: TabLine[];
}

export default function TableTabPage() {
  const locale = useUiLocale();
  const { routes, go } = useBranch();
  const orders = useTable((s) => s.orders);
  const [mode, setMode] = useState<"person" | "round">("person");
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);
  const back = locale === "ar" ? "→" : "←";

  const lineFor = (o: Order): TabLine[] =>
    o.items.map((it) => ({
      name: pick(it.name, locale),
      qtyLabel: `${it.q}×`,
      priceLabel: fmt(it.p * it.q),
      status: o.steps[o.idx],
    }));

  const byPerson: TabGroup[] = Object.values(
    orders.reduce<Record<string, TabGroup>>((map, o) => {
      if (!map[o.who]) map[o.who] = { title: o.who, ini: o.ini, color: o.color, lines: [] };
      map[o.who].lines.push(...lineFor(o));
      return map;
    }, {}),
  );
  const byRound: TabGroup[] = orders.map((o) => ({ title: o.num, ini: o.ini, color: o.color, lines: lineFor(o) }));

  const groups = mode === "person" ? byPerson : byRound;
  const bill = billOf(orders);
  const onlyYou = orders.filter((o) => !o.me).length === 0;

  return (
    <div className="min-h-full px-4 pb-28 pt-[50px]">
      <div className="mb-[14px] flex items-center gap-[10px]">
        <IconButton className="text-[17px]" onClick={() => go(routes.order)} aria-label="Back">
          {back}
        </IconButton>
        <div className="font-display text-[22px] font-bold text-ink">{t("Table 12 tab", "فاتورة طاولة ١٢")}</div>
      </div>

      <div className="mb-2 flex items-center">
        <AvatarStack people={participantsOf(orders)} size={34} ringColor="#FBF8F3" />
        {onlyYou && (
          <span className="ms-[10px] text-[12px] text-muted">
            {t("Invite the table — they scan the same code", "ادعُ الطاولة — يمسحون نفس الرمز")}
          </span>
        )}
      </div>

      <div className="my-3">
        <SegmentedControl
          value={mode}
          onChange={setMode}
          options={[
            { value: "person", label: t("By person", "حسب الشخص") },
            { value: "round", label: t("By round", "حسب الجولة") },
          ]}
        />
      </div>

      <div className="flex flex-col gap-3">
        {groups.map((g) => (
          <div key={g.title} className="rounded-[16px] border border-line bg-white p-[14px]">
            <div className="mb-[10px] flex items-center gap-[9px]">
              <Avatar ini={g.ini} color={g.color} size={28} />
              <span className="font-mono text-sm font-semibold text-ink">{g.title}</span>
            </div>
            {g.lines.map((ln, i) => (
              <div key={i} className="flex items-center justify-between gap-2 py-[5px]">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="font-mono text-[12px] text-faint">{ln.qtyLabel}</span>
                  <span className="text-sm text-ink">{ln.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill status={ln.status} locale={locale} />
                  <Price tone="ink" className="text-[13px]">
                    {ln.priceLabel}
                  </Price>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mt-4 bg-[linear-gradient(transparent,var(--surface)_30%)] pt-[14px]">
        <div className="flex items-baseline justify-between px-1 pb-3">
          <span className="text-[15px] font-semibold text-ink">{t("Tab total", "إجمالي الفاتورة")}</span>
          <Price tone="ink" className="text-xl">
            {fmt(bill.sub)}
          </Price>
        </div>
        <Button block onClick={() => go(routes.bill)} className="rounded-[16px] py-[15px] text-base">
          {t("Request bill", "اطلب الفاتورة")}
        </Button>
      </div>
    </div>
  );
}
