"use client";

import { BottomSheet, SheetHandle } from "@/components/molecules/BottomSheet";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useSheet } from "@/store/sheet.store";
import { useToast } from "@/store/toast.store";

const REASONS: { en: string; ar: string }[] = [
  { en: "Water", ar: "ماء" },
  { en: "Cutlery", ar: "أدوات مائدة" },
  { en: "Napkins", ar: "مناديل" },
  { en: "Help", ar: "مساعدة" },
  { en: "Get the bill", ar: "الفاتورة" },
];

export function CallWaiterSheet() {
  const locale = useUiLocale();
  const { kind, close } = useSheet();
  const showToast = useToast((s) => s.show);
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);

  const call = () => {
    close();
    showToast(t("Your server's on the way", "النادل في الطريق"), "ok");
  };

  return (
    <BottomSheet open={kind === "call"} onClose={close} className="px-4 pb-[26px] pt-[18px]">
      <SheetHandle className="mb-4" />
      <div className="text-center font-display text-[20px] font-bold text-ink">
        {t("Call your server", "نادِ النادل")}
      </div>
      <div className="mb-[18px] mt-1 text-center text-[13px] text-muted">
        {t("Tap what you need — we'll send it to the floor.", "اختر ما تحتاجه — سنبلّغ الطاقم.")}
      </div>
      <div className="flex flex-wrap justify-center gap-[10px]">
        {REASONS.map((r) => (
          <button
            key={r.en}
            onClick={call}
            className="cursor-pointer rounded-[14px] border border-line bg-white px-[18px] py-[13px] text-sm font-semibold text-ink"
          >
            {t(r.en, r.ar)}
          </button>
        ))}
      </div>
      <button
        onClick={close}
        className="mt-[18px] w-full cursor-pointer rounded-[14px] border-0 bg-sand py-[13px] text-sm font-semibold text-muted"
      >
        {t("Not now", "ليس الآن")}
      </button>
    </BottomSheet>
  );
}
