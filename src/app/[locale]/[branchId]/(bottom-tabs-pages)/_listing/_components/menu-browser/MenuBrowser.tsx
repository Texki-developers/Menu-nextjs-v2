"use client";

import { useEffect, useMemo } from "react";
import { useMenuSelectionStore } from "@/stores/menuSelectionStore";
import { useCategories, useItems } from "@/lib/queries/use-menu-cascade";
import { toProductConfig, type BranchMenuSummary } from "@/lib/api/menu";
import ProductListing, { type ProductSection } from "../products/ProductListing";
import type { FilterDefinition, SortOptionDefinition } from "@/lib/api/filters";

interface MenuBrowserProps {
    branchId: string;
    menus: BranchMenuSummary[];
    filters: FilterDefinition[];
    sortOptions: SortOptionDefinition[];
}

const MenuBrowser = ({ branchId, menus, filters, sortOptions }: MenuBrowserProps) => {
    const selectedMenuId = useMenuSelectionStore((s) => s.selectedMenuId);
    const selectedCategoryId = useMenuSelectionStore((s) => s.selectedCategoryId);
    const setSelectedMenuId = useMenuSelectionStore((s) => s.setSelectedMenuId);
    const setSelectedCategoryId = useMenuSelectionStore((s) => s.setSelectedCategoryId);

    useEffect(() => {
        if (selectedMenuId || menus.length === 0) return;
        const active = menus.find((m) => m.is_currently_active) ?? menus[0];
        if (active) setSelectedMenuId(active.id);
    }, [selectedMenuId, menus, setSelectedMenuId]);

    const categoriesQuery = useCategories(branchId, selectedMenuId);
    const categories = categoriesQuery.data ?? [];

    useEffect(() => {
        if (!categories.length) return;
        if (selectedCategoryId && categories.some((c) => c.id === selectedCategoryId)) return;
        setSelectedCategoryId(categories[0].id);
    }, [categories, selectedCategoryId, setSelectedCategoryId]);

    const itemsQuery = useItems(branchId, selectedCategoryId, selectedMenuId);

    const activeCategory = useMemo(
        () => categories.find((c) => c.id === selectedCategoryId),
        [categories, selectedCategoryId],
    );

    const sections: ProductSection[] = useMemo(() => {
        if (!activeCategory || !itemsQuery.data) return [];
        return [
            {
                id: activeCategory.id,
                name: activeCategory.name,
                products: itemsQuery.data.map(toProductConfig),
            },
        ];
    }, [activeCategory, itemsQuery.data]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 overflow-x-auto">
                {menus.map((m) => (
                    <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMenuId(m.id)}
                        className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border ${
                            selectedMenuId === m.id
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-700 border-gray-300"
                        }`}
                    >
                        {m.name}
                    </button>
                ))}
            </div>

            {categoriesQuery.isLoading ? (
                <div className="h-10 animate-pulse bg-gray-100 rounded" />
            ) : categoriesQuery.isError ? (
                <div className="text-sm text-red-500">Could not load categories</div>
            ) : (
                <div className="flex gap-2 overflow-x-auto">
                    {categories.map((c) => (
                        <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedCategoryId(c.id)}
                            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border ${
                                selectedCategoryId === c.id
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-gray-700 border-gray-300"
                            }`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
            )}

            {itemsQuery.isLoading ? (
                <div className="flex flex-col gap-3">
                    <div className="h-24 animate-pulse bg-gray-100 rounded" />
                    <div className="h-24 animate-pulse bg-gray-100 rounded" />
                </div>
            ) : itemsQuery.isError ? (
                <div className="text-sm text-red-500">Could not load items</div>
            ) : (
                <ProductListing sections={sections} filters={filters} sortOptions={sortOptions} />
            )}
        </div>
    );
};

export default MenuBrowser;
