"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { bottomTabsConfig } from "./bottom-tabs.config";
import BottomTabsIcons from "@/components/atoms/bottom-tabs-icons/BottomTabsIcons";
import { useCartStore } from "@/store/cart/cart.store";

const BottomTabs = () => {
    const { branchId } = useParams<{ branchId: string }>();
    const fetchCart = useCartStore((s) => s.fetch);
    const loadedBranchId = useCartStore((s) => s.branchId);

    useEffect(() => {
        if (branchId && loadedBranchId !== branchId) {
            fetchCart(branchId);
        }
    }, [branchId, loadedBranchId, fetchCart]);

    return (
        <div className="fixed bottom-0 flex px-6! py-3! rounded-t-3xl justify-between items-center left-1/2 -translate-x-1/2 max-w-container w-full border-t border-border bg-white z-9999">
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
