"use client";

import { useState } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { Button } from "@/components/atoms/Button";
import { Spinner } from "@/components/atoms/Spinner";
import { TipChips } from "@/components/molecules/TipChips";
import { RESTAURANT } from "@/constants/config";
import { fmt } from "@/lib/format";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useBranch } from "@/hooks/useBranch";
import { billOf, useTable } from "@/store/table.store";

type PayState = "idle" | "processing" | "success";

export default function PaymentPage() {
  const locale = useUiLocale();
  const { routes, go } = useBranch();
  const orders = useTable((s) => s.orders);
  const [method, setMethod] = useState<string | null>(null);
  const [tip, setTip] = useState(0);
  const [state, setState] = useState<PayState>("idle");
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);
  const back = locale === "ar" ? "→" : "←";

  const bill = billOf(orders);
  const grand = bill.total * (1 + tip / 100);

  const allMethods = [
    { id: "card", name: t("Card", "بطاقة"), sub: t("Visa · Mastercard", "فيزا · ماستركارد"), icon: "💳" },
    { id: "tabby", name: "Tabby", sub: t("Split in 4, interest-free", "قسّمها على ٤، بدون فوائد"), icon: "🟢" },
    { id: "tamara", name: "Tamara", sub: t("Pay later", "ادفع لاحقاً"), icon: "🟣" },
    { id: "cash", name: t("Cash at counter", "نقداً عند الكاونتر"), sub: t("Pay your server", "ادفع للنادل"), icon: "💵" },
  ];
  const methods =
    RESTAURANT.payMode === "ONLINE"
      ? allMethods.filter((m) => m.id !== "cash")
      : RESTAURANT.payMode === "AT_COUNTER"
        ? allMethods.filter((m) => m.id === "cash")
        : allMethods;

  const payNow = () => {
    setState("processing");
    setTimeout(() => setState("success"), 1700);
  };

  return (
    <div className="relative min-h-full px-4 pb-32 pt-5">
      {state === "success" && (
        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center bg-surface p-[30px]">
          <div className="animate-bump flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green text-[36px] text-white">
            ✓
          </div>
          <div className="mt-4 font-display text-2xl font-bold text-ink">
            {t("Paid", "تم الدفع")} · {fmt(grand)}
          </div>
          <div className="my-[6px] mb-[22px] text-sm text-muted">{t("Thanks for dining at Saffra", "شكراً لتناولك الطعام في صفرا")}</div>
          <Button size="lg" onClick={() => go(routes.receipt)}>
            {t("View receipt", "عرض الإيصال")}
          </Button>
        </div>
      )}

      <div className="mb-4 flex items-center gap-[10px]">
        <IconButton className="text-[17px]" onClick={() => go(routes.bill)} aria-label="Back">
          {back}
        </IconButton>
        <div className="font-display text-[22px] font-bold text-ink">{t("Payment", "الدفع")}</div>
      </div>

      <div className="mb-[18px] flex flex-col gap-[10px]">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className="flex w-full items-center gap-[13px] rounded-[16px] border-2 bg-white p-[15px] text-start"
            style={{ borderColor: method === m.id ? "#E8920C" : "#ECE4D8" }}
          >
            <span className="text-[22px]">{m.icon}</span>
            <div className="flex-1">
              <div className="text-[15px] font-semibold text-ink">{m.name}</div>
              <div className="text-[12px] text-muted">{m.sub}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mb-2 text-[13px] font-semibold text-ink">{t("Add a tip", "أضف بقشيشاً")}</div>
      <div className="mb-5">
        <TipChips options={[0, 5, 10, 15]} value={tip} onChange={setTip} noTipLabel={t("No tip", "بدون")} />
      </div>

      <div className="sticky bottom-0 pt-[14px]">
        {state === "processing" ? (
          <Button block disabled className="rounded-[16px] bg-saffron-dark py-[15px] text-base">
            <Spinner /> {t("Processing…", "جارٍ المعالجة…")}
          </Button>
        ) : (
          <Button block onClick={payNow} disabled={!method} className="rounded-[16px] py-[15px] text-base">
            {t("Pay", "ادفع")} {fmt(grand)}
          </Button>
        )}
      </div>
    </div>
  );
}
