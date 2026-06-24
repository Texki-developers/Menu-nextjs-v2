"use client";

import { StepTracker } from "@/components/molecules/StepTracker";
import { fmt } from "@/lib/format";
import { pick, type Locale } from "@/lib/menu";
import { RESTAURANT } from "@/constants/config";
import type { Order } from "@/store/table.store";

function note(order: Order, rejected: boolean, locale: Locale): { text: string; color: string } {
  const cur = order.steps[order.idx];
  if (rejected)
    return {
      text:
        locale === "ar"
          ? "الصنف غير متوفر — النادل في طريقه للمساعدة"
          : "Item unavailable — your server is coming to help",
      color: "#C5283D",
    };
  if (order.idx === 0 && RESTAURANT.requiresWaiterConfirm)
    return {
      text: locale === "ar" ? "بانتظار تأكيد النادل" : "Waiting for your server to confirm",
      color: "#6E635B",
    };
  if (cur === "Ready")
    return {
      text: locale === "ar" ? "جاهز — طعامك في الطريق" : "Ready — your food is on the way",
      color: "#5E8C53",
    };
  return {
    text: locale === "ar" ? "سنحدّث هذا مع تقدم طلبك" : "We’ll update this as your order moves",
    color: "#6E635B",
  };
}

export function OrderTrackerCard({
  order,
  rejected = false,
  locale,
}: {
  order: Order;
  rejected?: boolean;
  locale: Locale;
}) {
  const n = note(order, rejected, locale);
  return (
    <div className="rounded-[20px] border border-line bg-white p-4 shadow-[0_8px_24px_rgba(36,27,22,0.07)]">
      <div className="mb-[18px] flex items-center justify-between">
        <span className="font-mono text-[15px] font-semibold text-ink">{order.num}</span>
      </div>
      <StepTracker steps={order.steps} idx={order.idx} rejected={rejected} locale={locale} />
      <div className="mt-4 text-center text-[13px] font-medium" style={{ color: n.color }}>
        {n.text}
      </div>
      <div className="mt-[14px] flex flex-col gap-[6px] border-t border-line pt-3">
        {order.items.map((oi, i) => (
          <div key={i} className="flex justify-between text-[13px] text-muted">
            <span>
              {oi.q}× {pick(oi.name, locale)}
            </span>
            <span className="font-mono">{fmt(oi.p * oi.q)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
