"use client";

import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { BottomTabConfig } from "@/components/organisms/bottom-tabs/bottom-tabs.config";
import { useBottomTabsStore } from "@/store/bottom-tabs/bottom-tabs.store";
import { cn } from "@/utils/classnames";
import { usePathname, useRouter } from "@/i18n/navigation";

interface BottomTabsIconsProps {
    tab: BottomTabConfig;
}

const BottomTabsIcons: React.FC<BottomTabsIconsProps> = ({ tab }) => {
    const { setActiveTab } = useBottomTabsStore();
    const pathname = usePathname();
    const router = useRouter();
    const { vendor }: { vendor: string } = useParams();
    const Icon = tab.icon;

    const isActive = useMemo(() => {
        if (tab.url === "/") {
            return !pathname.includes("/offers") && !pathname.includes("/cart") && !pathname.includes("/account");
        }
        return pathname.endsWith(tab.url);
    }, [pathname, tab.url]);

    useEffect(() => {
        if (isActive) {
            setActiveTab(tab.id);
        }
    }, [pathname, isActive, tab.id, setActiveTab]);

    const handleClick = () => {
        setActiveTab(tab.id);
        const targetPath = vendor ? `/${vendor}${tab.url}` : tab.url;
        router.push(targetPath);
    };

    return (
        <div
            onClick={handleClick}
            className="flex flex-col gap-[6px] items-center justify-center">
            <Icon className={cn("w-8 h-8", isActive ? "text-primary" : "text-gray-500")} />
            <span className={cn("text-sm font-medium", isActive ? "text-primary" : "text-gray-500")}>{tab.name}</span>
        </div>
    );
};

export default BottomTabsIcons;
