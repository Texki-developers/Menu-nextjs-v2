"use client";

import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { BottomTabConfig } from "@/components/organisms/bottom-tabs/bottom-tabs.config";
import { useBottomTabsStore } from "@/store/bottom-tabs/bottom-tabs.store";
import { cn } from "@/utils/classnames";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLanguageStore } from "@/store/language/language.store";

interface BottomTabsIconsProps {
  tab: BottomTabConfig;
}

const BottomTabsIcons: React.FC<BottomTabsIconsProps> = ({ tab }) => {
  const t = useTranslations();
  const { setActiveTab } = useBottomTabsStore();
  const { togglePopup } = useLanguageStore();
  const pathname = usePathname();
  const router = useRouter();
  const { vendor }: { vendor: string } = useParams();
  const Icon = tab.icon;

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
    const targetPath = vendor ? `/${vendor}${tab.url}` : tab.url;
    router.push(targetPath);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-[6px] items-center justify-center">
      <Icon className={cn("w-6 h-6", isActive ? "text-primary" : "text-gray-500")} />
      <span className={cn("text-sm font-medium", isActive ? "text-primary" : "text-gray-500")}>{t(tab.nameKey)}</span>
    </div>
  );
};

export default BottomTabsIcons;
