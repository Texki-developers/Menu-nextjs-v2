"use client";

import { Badge } from "@/components/atoms/Badge";
import { Price } from "@/components/atoms/Price";
import { QtyStepper } from "@/components/atoms/QtyStepper";
import { Button } from "@/components/atoms/Button";
import { BottomSheet, SheetHandle } from "@/components/molecules/BottomSheet";
import { Photo } from "@/components/molecules/Photo";
import { OptionRow } from "@/components/molecules/OptionRow";
import { ADDONS, SIZES, findItem, pick } from "@/lib/menu";
import { fmt } from "@/lib/format";
import { useUiLocale } from "@/hooks/useUiLocale";
import { useSheet } from "@/store/sheet.store";
import { useCart } from "@/store/cart.store";
import { useToast } from "@/store/toast.store";

export function ItemDetailSheet() {
  const locale = useUiLocale();
  const { kind, detailId, qty, size, addons, close, incQty, decQty, setSize, toggleAddon } =
    useSheet();
  const add = useCart((s) => s.add);
  const showToast = useToast((s) => s.show);

  const open = kind === "item";
  const item = detailId ? findItem(detailId) : undefined;
  if (!open || !item) return <BottomSheet open={false} onClose={close} children={null} />;

  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);

  const unit =
    item.price +
    (item.mods
      ? (SIZES.find((s) => s.id === size)?.delta ?? 0) +
        addons.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.delta ?? 0), 0)
      : 0);

  const onAdd = () => {
    if (item.soldout) return;
    add({ id: item.id, qty, size: item.mods ? size : undefined, addons: item.mods ? addons : [], unit });
    close();
    showToast(t("Added to cart", "أُضيف إلى السلة"), "ok");
  };

  return (
    <BottomSheet open={open} onClose={close} full>
      <div className="no-scrollbar flex-1 overflow-y-auto">
        <Photo tint={item.tint} className="h-[230px]">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute end-[14px] top-[14px] flex h-[34px] w-[34px] items-center justify-center rounded-full border-0 bg-[rgba(255,255,255,0.85)] text-[17px] text-ink"
          >
            ✕
          </button>
          <SheetHandle className="absolute left-1/2 top-3 -translate-x-1/2" />
          <span className="absolute bottom-3 end-[14px] text-[15px] text-[rgba(36,27,22,0.3)]">📷</span>
        </Photo>

        <div className="px-4 pt-[18px]">
          <div className="flex items-baseline justify-between gap-[10px]">
            <div className="font-display text-[22px] font-bold text-ink">{pick(item.name, locale)}</div>
            <Price className="text-base">{fmt(item.price)}</Price>
          </div>
          <div className="mt-[6px] text-sm leading-[1.5] text-muted">{pick(item.desc, locale)}</div>
          <div className="mt-3 flex flex-wrap gap-[6px]">
            {item.badges.map((b) => (
              <Badge key={b} kind={b} locale={locale} />
            ))}
          </div>

          {item.mods && (
            <>
              <section className="mt-[22px]">
                <div className="mb-[10px] flex items-center justify-between">
                  <span className="font-display text-base font-semibold text-ink">{t("Size", "الحجم")}</span>
                  <span className="text-[11px] font-semibold text-pom">{t("Required", "مطلوب")}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {SIZES.map((s) => (
                    <OptionRow
                      key={s.id}
                      name={pick(s.name, locale)}
                      delta={s.delta ? "+ " + fmt(s.delta) : ""}
                      selected={size === s.id}
                      control="radio"
                      onClick={() => setSize(s.id)}
                    />
                  ))}
                </div>
              </section>

              <section className="mt-[22px]">
                <div className="mb-[10px] flex items-center justify-between">
                  <span className="font-display text-base font-semibold text-ink">{t("Add-ons", "الإضافات")}</span>
                  <span className="text-[12px] text-faint">{t("Choose up to 4", "اختر حتى ٤")}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {ADDONS.map((a) => (
                    <OptionRow
                      key={a.id}
                      name={pick(a.name, locale)}
                      delta={"+ " + fmt(a.delta)}
                      selected={addons.includes(a.id)}
                      control="check"
                      onClick={() => toggleAddon(a.id)}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          <section className="mt-[22px]">
            <div className="mb-[10px] font-display text-base font-semibold text-ink">
              {t("Special instructions", "ملاحظات خاصة")}
            </div>
            <div className="rounded-[14px] border border-line bg-white px-[15px] py-[13px] text-sm text-faint">
              {t("No onions, extra spicy…", "بدون بصل، حار إضافي…")}
            </div>
          </section>
          <div className="h-5" />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-line bg-surface px-4 py-[14px]">
        <QtyStepper value={qty} onInc={incQty} onDec={decQty} size="md" />
        <Button onClick={onAdd} disabled={item.soldout} className="flex-1 py-[15px]">
          {t(`Add ${qty} to cart`, `أضف ${qty} إلى السلة`)} · {fmt(unit * qty)}
        </Button>
      </div>
    </BottomSheet>
  );
}
