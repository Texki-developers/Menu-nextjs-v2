"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { RateStars } from "@/components/molecules/RateStars";
import { ReceiptCard } from "@/components/organisms/ReceiptCard";
import { fmt } from "@/lib/format";
import { pick } from "@/lib/menu";
import { useUiLocale } from "@/hooks/useUiLocale";
import { billOf, useTable } from "@/store/table.store";
import { useToast } from "@/store/toast.store";

export default function ReceiptPage() {
  const locale = useUiLocale();
  const orders = useTable((s) => s.orders);
  const showToast = useToast((s) => s.show);
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);

  const bill = billOf(orders);
  const items = orders.flatMap((o) =>
    o.items.map((it) => ({ label: `${it.q}× ${pick(it.name, locale)}`, value: fmt(it.p * it.q) })),
  );
  const rateTags = [t("Fast service", "خدمة سريعة"), t("Great food", "طعام رائع"), t("Would return", "سأعود")];
  const toggleTag = (tag: string) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]));

  return (
    <div className="min-h-full px-4 pb-7 pt-5">
      <div className="mb-[14px] font-display text-[22px] font-bold text-ink">{t("Receipt", "الإيصال")}</div>

      <div className="mb-4">
        <ReceiptCard
          locale={locale}
          meta={`${pick({ en: "Table 12", ar: "طاولة ١٢" }, locale)} · 21:48`}
          items={items}
          rows={[
            { label: t("Subtotal", "المجموع الفرعي"), value: fmt(bill.sub) },
            { label: t("Service (10%)", "خدمة (١٠٪)"), value: fmt(bill.svc) },
            { label: t("VAT (5%)", "ضريبة (٥٪)"), value: fmt(bill.vat) },
          ]}
          totalKey={t("Total", "الإجمالي")}
          totalValue={fmt(bill.total)}
          method={t("Card · **** 4291", "بطاقة · **** ٤٢٩١")}
        />
      </div>

      <div className="mb-5 flex gap-[10px]">
        <Button variant="secondary" className="flex-1 py-3 text-[13px]">
          {t("Email receipt", "إرسال بالبريد")}
        </Button>
        <Button variant="secondary" className="flex-1 py-3 text-[13px]">
          {t("Download", "تحميل")}
        </Button>
      </div>

      <div className="rounded-[18px] border border-line bg-white p-[18px] text-center">
        <div className="font-display text-[17px] font-semibold text-ink">{t("Rate your meal", "قيّم وجبتك")}</div>
        <div className="my-3">
          <RateStars rating={rating} onSet={setRating} />
        </div>
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {rateTags.map((tag) => {
            const active = tags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={
                  "cursor-pointer rounded-full border-0 px-[13px] py-[9px] text-[13px] font-semibold " +
                  (active ? "bg-saffron text-white" : "bg-sand text-muted")
                }
              >
                {tag}
              </button>
            );
          })}
        </div>
        <Button block size="lg" onClick={() => showToast(t("Thanks — come back soon", "شكراً — عُد قريباً"), "ok")}>
          {t("Submit feedback", "إرسال التقييم")}
        </Button>
      </div>
    </div>
  );
}
