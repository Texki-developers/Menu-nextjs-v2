"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/atoms/Logo";
import { TableBadge } from "@/components/atoms/TableBadge";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Button } from "@/components/atoms/Button";
import { AvatarStack } from "@/components/molecules/AvatarStack";
import { RESTAURANT } from "@/constants/config";
import { pick } from "@/lib/menu";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useBranch } from "@/hooks/useBranch";
import { participantsOf, useTable } from "@/store/table.store";

type BootState = "loading" | "open" | "error" | "invalid";

export default function WelcomePage() {
  const locale = useUiLocale();
  const { routes, go } = useBranch();
  const orders = useTable((s) => s.orders);
  const people = participantsOf(orders);
  const [state, setState] = useState<BootState>("loading");
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);

  useEffect(() => {
    if (state !== "loading") return;
    const id = setTimeout(() => setState("open"), 1600);
    return () => clearTimeout(id);
  }, [state]);

  const card = "mt-[26px] w-full rounded-[20px] border border-line bg-white p-[18px] shadow-[0_8px_24px_rgba(36,27,22,0.08)] animate-rise";

  return (
    <div
      className="flex min-h-full flex-col items-center justify-center px-7 pb-7 pt-6 text-center"
      style={{ background: "radial-gradient(120% 80% at 50% 0%,#FFF6E6 0%,#FBF8F3 55%)" }}
    >
      <Logo size={72} className="animate-rise shadow-[0_12px_30px_rgba(36,27,22,0.22)]" />
      <div className="animate-rise mt-4 font-display text-2xl font-bold text-ink">
        {pick(RESTAURANT.name, locale)}
      </div>
      <TableBadge className="mt-3 px-[14px] py-[6px] text-[13px]">{pick(RESTAURANT.table, locale)}</TableBadge>

      {state === "loading" && (
        <div className="mt-[30px] w-full max-w-[260px]">
          <div className="mb-[14px] text-[15px] text-muted">{t("Welcome — loading the menu", "أهلاً — جارٍ تحميل القائمة")}</div>
          <Skeleton className="h-[6px]" />
        </div>
      )}

      {state === "open" && (
        <div className={card}>
          <div className="font-display text-[17px] font-semibold text-ink">
            {t("Table 12 has an open tab", "طاولة ١٢ لديها فاتورة مفتوحة")}
          </div>
          <div className="mb-[14px] mt-1 text-[13px] text-muted">
            {t("Join your table to add to the same bill.", "انضم إلى طاولتك للإضافة إلى نفس الفاتورة.")}
          </div>
          <div className="mb-[18px] flex justify-center">
            <AvatarStack people={people} size={38} />
          </div>
          <Button block size="lg" onClick={() => go(routes.menu)}>
            {t("Join this table", "انضم إلى الطاولة")}
          </Button>
          <Button variant="secondary" block className="mt-2" onClick={() => go(routes.menu)}>
            {t("Start fresh", "ابدأ من جديد")}
          </Button>
          <div className="mt-2 text-[11px] text-faint">
            {t("Starting fresh closes the table — ask staff if unsure.", "البدء من جديد يغلق الطاولة — اسأل الطاقم عند الشك.")}
          </div>
        </div>
      )}

      {state === "error" && (
        <div className={card}>
          <div className="mb-[6px] text-[30px]">📡</div>
          <div className="font-display text-[17px] font-semibold text-ink">
            {t("Couldn't reach the kitchen", "تعذّر الوصول للمطبخ")}
          </div>
          <div className="my-[6px] text-[13px] text-muted">
            {t("Show this screen to your server, or try again.", "أظهر هذه الشاشة للنادل، أو حاول مجدداً.")}
          </div>
          <Button block size="lg" className="mt-2" onClick={() => setState("loading")}>
            {t("Try again", "حاول مجدداً")}
          </Button>
        </div>
      )}

      {state === "invalid" && (
        <div className={card}>
          <div className="mb-[6px] text-[30px]">⌗</div>
          <div className="font-display text-[17px] font-semibold text-ink">
            {t("This code isn't active", "هذا الرمز غير مفعّل")}
          </div>
          <div className="mt-[6px] text-[13px] text-muted">
            {t("Ask staff for a new QR for your table.", "اطلب من الطاقم رمزاً جديداً لطاولتك.")}
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-[14px] flex flex-wrap justify-center gap-[6px] px-4">
        {(["loading", "open", "error", "invalid"] as BootState[]).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className="cursor-pointer rounded-full border-0 bg-sand px-[10px] py-[6px] text-[11px] font-semibold text-muted"
          >
            {{ loading: t("Loading", "تحميل"), open: t("Open tab", "فاتورة مفتوحة"), error: t("Error", "خطأ"), invalid: t("Invalid QR", "رمز غير صالح") }[s]}
          </button>
        ))}
      </div>
    </div>
  );
}
