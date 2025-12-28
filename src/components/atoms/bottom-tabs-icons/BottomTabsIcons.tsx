"use client";

import React from "react";
import { BottomTabConfig } from "@/components/organisms/bottom-tabs/bottom-tabs.config";
import { useBottomTabsStore } from "@/store/bottom-tabs/bottom-tabs.store";
import { cn } from "@/utils/classnames";

interface BottomTabsIconsProps {
    tab: BottomTabConfig;
}

const BottomTabsIcons: React.FC<BottomTabsIconsProps> = ({ tab }) => {
    const { activeTab, setActiveTab } = useBottomTabsStore();
    const Icon = tab.icon;
    const isActive = activeTab === tab.id;

    const handleClick = () => {
        setActiveTab(tab.id);
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
