"use client";

import { IconButton } from "@/components/atoms/IconButton";
import { TableBadge } from "@/components/atoms/TableBadge";
import { Button } from "@/components/atoms/Button";
import { Price } from "@/components/atoms/Price";
import { AvatarStack } from "@/components/molecules/AvatarStack";
import { CartLineItem } from "@/components/organisms/CartLineItem";
import { RESTAURANT } from "@/constants/config";
import { fmt } from "@/lib/format";
import { pick } from "@/lib/menu";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useBranch } from "@/hooks/useBranch";
import { cartSubtotal, useCart } from "@/store/cart.store";
import { participantsOf, useTable } from "@/store/table.store";
import { useToast } from "@/store/toast.store";

export default function CartPage() {
  const locale = useUiLocale();
  const { routes, go } = useBranch();
  const { lines, inc, dec, remove, clear } = useCart();
  const placeOrder = useTable((s) => s.placeOrder);
  const orders = useTable((s) => s.orders);
  const showToast = useToast((s) => s.show);
  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);
  const back = locale === "ar" ? "→" : "←";

  const subtotal = cartSubtotal(lines);
  const empty = lines.length === 0;

  const submit = () => {
    if (empty) return;
    placeOrder(lines);
    clear();
    go(routes.order);
  };

  return (
    <div className="min-h-full px-4 pb-32 pt-5">
      <div className="mb-[6px] flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <IconButton className="text-[17px]" onClick={() => go(routes.menu)} aria-label="Back">
            {back}
          </IconButton>
          <div className="font-display text-[22px] font-bold text-ink">{t("Your order", "طلبك")}</div>
        </div>
        <TableBadge>{pick(RESTAURANT.table, locale)}</TableBadge>
      </div>

      <div className="my-[18px] flex items-center">
        <AvatarStack people={participantsOf(orders)} size={30} ringColor="#FBF8F3" />
        <span className="ms-[10px] text-[12px] text-muted">{t("This round is yours", "هذه الجولة لك")}</span>
      </div>

      {empty ? (
        <div className="px-5 py-[60px] text-center">
          <div className="text-[40px]">🍢</div>
          <div className="mt-[10px] font-display text-[18px] font-semibold text-ink">
            {t("Your cart's empty", "سلتك فارغة")}
          </div>
          <div className="my-1 mb-[18px] text-sm text-muted">{t("The grills are calling.", "المشاوي بانتظارك")}</div>
          <Button size="lg" onClick={() => go(routes.menu)}>
            {t("Browse the menu", "تصفّح القائمة")}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {lines.map((l) => (
              <CartLineItem
                key={l.key}
                line={l}
                locale={locale}
                onInc={() => inc(l.key)}
                onDec={() => dec(l.key)}
                onRemove={() => {
                  remove(l.key);
                  showToast(t("Removed", "تمت الإزالة"), "ok");
                }}
              />
            ))}
          </div>

          <Button variant="dashed" block className="mt-[14px] py-[13px]" onClick={() => go(routes.menu)}>
            {t("+ Add more items", "+ أضف المزيد")}
          </Button>

          <div className="mt-[14px] rounded-[16px] border border-line bg-white p-[15px]">
            <div className="flex justify-between text-[15px] text-ink">
              <span className="font-semibold">{t("Subtotal", "المجموع الفرعي")}</span>
              <Price tone="ink">{fmt(subtotal)}</Price>
            </div>
            <div className="mt-[6px] text-[12px] text-faint">
              {t("Service charge + 5% VAT applied at billing.", "تُضاف رسوم الخدمة وضريبة ٥٪ عند الدفع.")}
            </div>
          </div>

          <div className="sticky bottom-0 mt-[6px] pt-[14px]">
            <Button
              block
              onClick={submit}
              className="rounded-[16px] py-[15px] text-base shadow-[0_-12px_32px_rgba(36,27,22,0.12),0_10px_24px_rgba(232,146,12,0.32)]"
            >
              {t("Place order", "تأكيد الطلب")} · {fmt(subtotal)}
            </Button>
            {RESTAURANT.requiresWaiterConfirm && (
              <div className="mt-2 text-center text-[12px] text-faint">
                {t("Your server will confirm before the kitchen starts.", "سيؤكد النادل قبل بدء المطبخ.")}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
