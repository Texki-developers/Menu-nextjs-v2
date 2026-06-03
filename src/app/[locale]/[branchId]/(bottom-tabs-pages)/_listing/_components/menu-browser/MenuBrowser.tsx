"use client";

import { useEffect, useMemo, useState } from "react";
import { useMenuSelectionStore } from "@/stores/menuSelectionStore";
import { useCategories, useItems } from "@/lib/queries/use-menu-cascade";
import type { BranchMenuSummary } from "@/lib/api/menu";
import type { FilterDefinition, SortOptionDefinition } from "@/lib/api/filters";
import MenuControl from "./MenuControl";
import MenuSheet from "./MenuSheet";
import CategoryChips from "./CategoryChips";
import ListHeading from "./ListHeading";
import ItemListRow from "./ItemListRow";
import { SkRow, ChipsSkeleton } from "./Skeletons";
import EmptyState from "./EmptyState";

interface MenuBrowserProps {
    branchId: string;
    menus: BranchMenuSummary[];
    filters: FilterDefinition[];
    sortOptions: SortOptionDefinition[];
}

const MenuBrowser = ({ branchId, menus }: MenuBrowserProps) => {
    const selectedMenuId = useMenuSelectionStore((s) => s.selectedMenuId);
    const selectedCategoryId = useMenuSelectionStore((s) => s.selectedCategoryId);
    const setSelectedMenuId = useMenuSelectionStore((s) => s.setSelectedMenuId);
    const setSelectedCategoryId = useMenuSelectionStore((s) => s.setSelectedCategoryId);

    const [sheetOpen, setSheetOpen] = useState(false);

    useEffect(() => {
        if (selectedMenuId || menus.length === 0) return;
        const active = menus.find((m) => m.is_currently_active) ?? menus[0];
        if (active) setSelectedMenuId(active.id);
    }, [selectedMenuId, menus, setSelectedMenuId]);

    const categoriesQuery = useCategories(branchId, selectedMenuId);
    const categories = useMemo(() => categoriesQuery.data ?? [], [categoriesQuery.data]);

    useEffect(() => {
        if (!categories.length) return;
        if (selectedCategoryId && categories.some((c) => c.id === selectedCategoryId)) return;
        setSelectedCategoryId(categories[0].id);
    }, [categories, selectedCategoryId, setSelectedCategoryId]);

    const itemsQuery = useItems(branchId, selectedCategoryId, selectedMenuId);
    const items = itemsQuery.data ?? [];

    const activeMenu = useMemo(
        () => menus.find((m) => m.id === selectedMenuId) ?? menus[0],
        [menus, selectedMenuId],
    );
    const activeCategory = useMemo(
        () => categories.find((c) => c.id === selectedCategoryId),
        [categories, selectedCategoryId],
    );

    if (menus.length === 0) {
        return (
            <div className="menu-home-font flex flex-col" style={{ gap: 16 }}>
                <EmptyState
                    glyph={
                        <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="#A89E90" strokeWidth="1.8" />
                            <circle cx="12" cy="12" r="3.5" stroke="#A89E90" strokeWidth="1.8" />
                        </svg>
                    }
                    title="No menus just yet"
                    body="This branch hasn't published a menu. Please check back a little later."
                />
            </div>
        );
    }

    const menuState: "live" | "upcoming" = activeMenu?.is_currently_active ? "live" : "upcoming";

    const renderBody = () => {
        if (categoriesQuery.isLoading) {
            return (
                <>
                    <ChipsSkeleton />
                    <div style={{ height: 20 }} />
                    <div className="flex flex-col" style={{ gap: 18 }}>
                        <SkRow />
                        <SkRow />
                        <SkRow />
                    </div>
                </>
            );
        }
        if (categoriesQuery.isError) {
            return (
                <EmptyState
                    glyph={
                        <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 8v5M12 16h.01"
                                stroke="#A89E90"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <circle cx="12" cy="12" r="9" stroke="#A89E90" strokeWidth="1.8" />
                        </svg>
                    }
                    title="Could not load categories"
                    body="Please try again in a moment."
                />
            );
        }
        if (categories.length === 0) {
            return (
                <EmptyState
                    glyph={
                        <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
                            <path
                                d="M4 7h16M4 12h16M4 17h9"
                                stroke="#A89E90"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeDasharray="1 3"
                            />
                        </svg>
                    }
                    title={`${activeMenu?.name ?? "This menu"} has no sections yet`}
                    body="The kitchen is still setting up this menu. Try another menu above."
                />
            );
        }

        return (
            <>
                <CategoryChips
                    categories={categories}
                    activeId={selectedCategoryId}
                    onSelect={setSelectedCategoryId}
                />
                <div style={{ height: 14 }} />
                {activeCategory && (
                    <ListHeading
                        name={activeCategory.name}
                        count={activeCategory.item_count}
                    />
                )}
                <div style={{ height: 12 }} />
                {itemsQuery.isLoading ? (
                    <div className="flex flex-col" style={{ gap: 18 }}>
                        <SkRow />
                        <SkRow />
                        <SkRow />
                    </div>
                ) : itemsQuery.isError ? (
                    <EmptyState
                        glyph={
                            <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 8v5M12 16h.01"
                                    stroke="#A89E90"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    stroke="#A89E90"
                                    strokeWidth="1.8"
                                />
                            </svg>
                        }
                        title="Could not load items"
                        body="Please try again in a moment."
                    />
                ) : items.length === 0 ? (
                    <EmptyState
                        glyph={
                            <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
                                <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="4"
                                    stroke="#A89E90"
                                    strokeWidth="1.8"
                                />
                                <path
                                    d="M5 5l14 14"
                                    stroke="#A89E90"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        }
                        title={`Nothing in ${activeCategory?.name ?? "this section"} right now`}
                        body="These dishes may be sold out or off-menu today."
                    />
                ) : (
                    <div className="flex flex-col" style={{ gap: 18 }}>
                        {items.map((it, i) => (
                            <ItemListRow key={it.id} item={it} index={i} />
                        ))}
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="menu-home-font flex flex-col" style={{ gap: 16 }}>
            {activeMenu && (
                <MenuControl
                    menuName={activeMenu.name}
                    state={menuState}
                    open={sheetOpen}
                    onOpen={() => setSheetOpen(true)}
                />
            )}
            {renderBody()}
            {sheetOpen && (
                <MenuSheet
                    menus={menus}
                    selectedMenuId={selectedMenuId}
                    onSelect={setSelectedMenuId}
                    onClose={() => setSheetOpen(false)}
                />
            )}
        </div>
    );
};

export default MenuBrowser;
