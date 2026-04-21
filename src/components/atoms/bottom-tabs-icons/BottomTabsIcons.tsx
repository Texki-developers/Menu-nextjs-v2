"use client";

import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { BottomTabConfig, BottomTabId } from "@/components/organisms/bottom-tabs/bottom-tabs.config";
import { useBottomTabsStore } from "@/store/bottom-tabs/bottom-tabs.store";
import { cn } from "@/utils/classnames";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLanguageStore } from "@/store/language/language.store";
import { useCartStore } from "@/store/cart/cart.store";

interface BottomTabsIconsProps {
  tab: BottomTabConfig;
}

const BottomTabsIcons: React.FC<BottomTabsIconsProps> = ({ tab }) => {
  const t = useTranslations();
  const { setActiveTab } = useBottomTabsStore();
  const { togglePopup } = useLanguageStore();
  const pathname = usePathname();
  const router = useRouter();
  const { branchId }: { branchId: string } = useParams();
  const Icon = tab.icon;
  const cartCount = useCartStore((s) => s.cart?.totals.total_quantity ?? 0);
  const showCartBadge = tab.id === BottomTabId.CART && cartCount > 0;

  const isActive = useMemo(() => {
    if (tab.url === "/") {
      return !pathname.includes("/offers") && !pathname.includes("/cart") && !pathname.includes("/account");
    }
    if (!tab.url) {
      return false;
    }
    return pathname.endsWith(tab.url);
  }, [pathname, tab.url]);

  useEffect(() => {
    if (isActive) {
      setActiveTab(tab.id);
    }
  }, [pathname, isActive, tab.id, setActiveTab]);

  const handleClick = () => {
    if (tab.onClick) {
      tab.onClick({ togglePopupStore: togglePopup });
      return;
    }
    setActiveTab(tab.id);
    if (!tab.url) {
      return;
    }
    const targetPath = branchId ? `/${branchId}${tab.url}` : tab.url;
    router.push(targetPath);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-[6px] items-center justify-center cursor-pointer">
      <div className="relative">
        <Icon className={cn("w-6 h-6", isActive ? "text-primary" : "text-gray-500")} />
        {showCartBadge && (
          <span className="absolute -top-1.5 -right-2 bg-red-500 text-white rounded-full text-[10px] font-semibold min-w-4 h-4 px-1 flex items-center justify-center leading-none">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </div>
      <span className={cn("text-sm font-medium", isActive ? "text-primary" : "text-gray-500")}>{t(tab.nameKey)}</span>
    </div>
  );
};

export default BottomTabsIcons;
