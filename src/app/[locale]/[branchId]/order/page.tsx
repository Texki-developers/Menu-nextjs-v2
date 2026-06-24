"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { OrderTrackerCard } from "@/components/organisms/OrderTrackerCard";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useBranch } from "@/hooks/useBranch";
import { useSheet } from "@/store/sheet.store";
import { useTable } from "@/store/table.store";

export default function OrderTrackerPage() {
  const locale = useUiLocale();
  const { routes, go } = useBranch();
  const openCall = useSheet((s) => s.openCall);
  const orders = useTable((s) => s.orders);
  const bumpOrder = useTable((s) => s.bumpOrder);
  const [rejected, setRejected] = useState(false);
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);

  const mine = orders.filter((o) => o.me);
  const newest = mine[0];

  // gentle one-step advance of a just-placed order (Placed → Preparing),
  // mirroring the prototype. Further status comes from the kitchen/API later.
  useEffect(() => {
    if (!newest || newest.idx !== 0) return;
    const id = setTimeout(() => bumpOrder(newest.num), 2200);
    return () => clearTimeout(id);
  }, [newest, bumpOrder]);

  if (mine.length === 0) {
    return (
      <div className="min-h-full px-4 pt-5">
        <div className="px-5 py-[50px] text-center">
          <div className="text-[40px]">🍽️</div>
          <div className="mt-[10px] font-display text-[18px] font-semibold text-ink">
            {t("No active orders yet", "لا طلبات نشطة بعد")}
          </div>
          <div className="my-1 mb-4 text-sm text-muted">{t("Place an order to watch it cook.", "اطلب لتتابع تحضيره.")}</div>
          <Button size="lg" onClick={() => go(routes.menu)}>
            {t("Browse the menu", "تصفّح القائمة")}
          </Button>
        </div>
      </div>
    );
  }

  const actions = [
    { label: t("Add more items", "أضف المزيد"), onClick: () => go(routes.menu), variant: "secondary" as const },
    { label: t("Call waiter", "نادِ النادل"), onClick: openCall, variant: "secondary" as const },
    { label: t("View table tab", "فاتورة الطاولة"), onClick: () => go(routes.tab), variant: "secondary" as const },
    { label: t("Request bill", "اطلب الفاتورة"), onClick: () => go(routes.bill), variant: "dark" as const },
  ];

  return (
    <div className="min-h-full px-4 pb-6 pt-5">
      <div className="mb-2 text-center">
        <div className="animate-bump mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-full bg-green text-[26px] text-white">
          ✓
        </div>
        <div className="mt-[10px] font-display text-[22px] font-bold text-ink">{t("Order placed", "تم الطلب")}</div>
      </div>

      <div className="mt-[14px] flex flex-col gap-[14px]">
        {mine.map((o) => (
          <OrderTrackerCard key={o.num} order={o} rejected={rejected && o === newest} locale={locale} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-[10px]">
        {actions.map((a) => (
          <Button key={a.label} variant={a.variant} onClick={a.onClick} className="py-[13px] text-sm">
            {a.label}
          </Button>
        ))}
      </div>

      <button
        onClick={() => setRejected((v) => !v)}
        className="mt-3 w-full cursor-pointer border-0 bg-transparent text-[11px] text-faint"
      >
        ⌄ {t("simulate item rejected", "محاكاة رفض صنف")}
      </button>
    </div>
  );
}
