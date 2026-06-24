"use client";

import { useState } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { Button } from "@/components/atoms/Button";
import { Price } from "@/components/atoms/Price";
import { Avatar } from "@/components/atoms/Avatar";
import { QtyStepper } from "@/components/atoms/QtyStepper";
import { SegmentedControl } from "@/components/molecules/SegmentedControl";
import { SummaryCard } from "@/components/organisms/SummaryCard";
import { RESTAURANT } from "@/constants/config";
import { fmt } from "@/lib/format";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useBranch } from "@/hooks/useBranch";
import { billOf, participantsOf, useTable } from "@/store/table.store";
import { useToast } from "@/store/toast.store";

type Split = "full" | "even" | "item" | "person";

export default function BillPage() {
  const locale = useUiLocale();
  const { routes, go } = useBranch();
  const orders = useTable((s) => s.orders);
  const showToast = useToast((s) => s.show);
  const [split, setSplit] = useState<Split>("full");
  const [payers, setPayers] = useState(2);
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);
  const back = locale === "ar" ? "→" : "←";

  const bill = billOf(orders);
  const atCounter = RESTAURANT.payMode === "AT_COUNTER";

  const footerLabel = atCounter
    ? t("Ask for the bill", "اطلب الفاتورة")
    : split === "even"
      ? `${t("Pay your share", "ادفع حصتك")} · ${fmt(bill.total / payers)}`
      : `${t("Pay", "ادفع")} ${fmt(bill.total)}`;

  const onPay = () => {
    if (atCounter) {
      showToast(t("Your server is bringing the bill", "النادل يحضر الفاتورة"), "ok");
      return;
    }
    go(routes.pay);
  };

  return (
    <div className="min-h-full px-4 pb-32 pt-5">
      <div className="mb-4 flex items-center gap-[10px]">
        <IconButton className="text-[17px]" onClick={() => go(routes.order)} aria-label="Back">
          {back}
        </IconButton>
        <div className="font-display text-[22px] font-bold text-ink">{t("Request bill", "اطلب الفاتورة")}</div>
      </div>

      <div className="mb-4">
        <SummaryCard
          rows={[
            { k: t("Subtotal", "المجموع الفرعي"), v: fmt(bill.sub) },
            { k: t("Service charge (10%)", "رسوم الخدمة (١٠٪)"), v: fmt(bill.svc) },
            { k: t("VAT (5%)", "ضريبة القيمة المضافة (٥٪)"), v: fmt(bill.vat) },
          ]}
          totalKey={t("Total", "الإجمالي")}
          totalValue={fmt(bill.total)}
        />
      </div>

      <div className="mb-2 text-[13px] font-semibold text-ink">{t("How would you like to split?", "كيف تريد التقسيم؟")}</div>
      <div className="mb-4">
        <SegmentedControl
          value={split}
          onChange={setSplit}
          options={[
            { value: "full", label: t("Pay full", "دفع كامل") },
            { value: "even", label: t("Evenly", "بالتساوي") },
            { value: "item", label: t("By item", "حسب الصنف") },
            { value: "person", label: t("By person", "حسب الشخص") },
          ]}
        />
      </div>

      {split === "even" && (
        <>
          <div className="flex items-center justify-between rounded-[16px] border border-line bg-white p-4">
            <div>
              <div className="text-sm font-semibold text-ink">{t("Number of payers", "عدد الدافعين")}</div>
              <div className="text-[12px] text-muted">{t("Each pays an equal share", "كل شخص يدفع حصة متساوية")}</div>
            </div>
            <QtyStepper
              value={payers}
              size="md"
              onInc={() => setPayers((n) => Math.min(n + 1, 8))}
              onDec={() => setPayers((n) => Math.max(n - 1, 2))}
            />
          </div>
          <div className="mt-3 text-center text-sm text-muted">
            {t("Your share", "حصتك")} <Price className="text-base">{fmt(bill.total / payers)}</Price>
          </div>
        </>
      )}

      {split === "person" && (
        <div className="rounded-[16px] border border-line bg-white p-4">
          <div className="mb-3 text-[13px] text-muted">{t("Tap an avatar to claim their items", "اضغط على صورة لتحديد أصنافها")}</div>
          <div className="flex justify-center gap-[10px]">
            {participantsOf(orders).map((p) => (
              <Avatar key={p.ini} ini={p.ini} color={p.color} size={46} />
            ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-0 mt-4 pt-[14px]">
        <Button block onClick={onPay} className="rounded-[16px] py-[15px] text-base">
          {footerLabel}
        </Button>
        {atCounter && (
          <div className="mt-2 text-center text-[12px] text-faint">{t("Pay at the counter when ready.", "ادفع عند الكاونتر.")}</div>
        )}
      </div>
    </div>
  );
}
