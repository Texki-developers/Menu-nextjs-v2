"use client";

import { bottomTabsConfig } from "./bottom-tabs.config";
import BottomTabsIcons from "@/components/atoms/bottom-tabs-icons/BottomTabsIcons";

const BottomTabs = () => {
    return (
        <div className="fixed bottom-0 flex px-6! py-3! justify-between items-center left-0 w-full border-t border-border bg-white">
            {bottomTabsConfig.map((tab) => (
                <BottomTabsIcons
                    key={tab.id}
                    tab={tab}
                />
            ))}
        </div>
    );
};

export default BottomTabs;
