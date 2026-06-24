"use client";

import { Logo } from "@/components/atoms/Logo";
import { TableBadge } from "@/components/atoms/TableBadge";
import { IconButton } from "@/components/atoms/IconButton";
import { LangToggle } from "@/components/molecules/LangToggle";
import { RESTAURANT } from "@/constants/config";
import { pick, type Locale } from "@/lib/menu";

/** Menu-home top bar: brand + table, locale switch, call-waiter bell. */
export function AppHeader({ locale, onBell }: { locale: Locale; onBell: () => void }) {
  return (
    <div className="flex items-center justify-between gap-[10px] px-4 pb-3 pt-5">
      <div className="flex items-center gap-[10px]">
        <Logo />
        <div>
          <div className="font-display text-[17px] font-bold leading-none text-ink">
            {pick(RESTAURANT.name, locale)}
          </div>
          <TableBadge className="mt-[3px]">{pick(RESTAURANT.table, locale)}</TableBadge>
        </div>
      </div>
      <div className="flex items-center gap-[7px]">
        <LangToggle locale={locale} />
        <IconButton onClick={onBell} aria-label="Call waiter" className="text-base">
          🔔
        </IconButton>
      </div>
    </div>
  );
}
