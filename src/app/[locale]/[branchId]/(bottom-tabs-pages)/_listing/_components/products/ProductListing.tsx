"use client";

import { useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import { useFilterStore } from "@/store/filter/filter.store";
import type { ProductConfig } from "./products.config";
import {
    FilterSource,
    FilterType,
    SortDirection,
    SortField,
    type FilterDefinition,
    type SortOptionDefinition,
} from "@/lib/api/filters";

export interface ProductSection {
    id: string;
    name: string;
    products: ProductConfig[];
}

interface ProductListingProps {
    sections: ProductSection[];
    filters: FilterDefinition[];
    sortOptions: SortOptionDefinition[];
}

const matchesSearch = (p: ProductConfig, q: string): boolean => {
    if (!q) return true;
    const haystack = [p.title, p.description, p.vendorName].filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(q);
};

const priceOf = (p: ProductConfig): number => Number(p.price) || 0;

const matchesFilter = (
    product: ProductConfig,
    filter: FilterDefinition,
    selected: string[],
): boolean => {
    if (selected.length === 0) return true;

    if (filter.type === FilterType.RANGE && filter.source === FilterSource.PRICE) {
        const price = priceOf(product);
        return selected.some((label) => {
            const range = filter.ranges.find((r) => r.label === label);
            if (!range) return false;
            const max = range.max ?? Number.POSITIVE_INFINITY;
            return price >= range.min && price <= max;
        });
    }

    switch (filter.source) {
        case FilterSource.TYPE:
            return !!product.type && selected.includes(product.type.toLowerCase());
        case FilterSource.SPICE_LEVEL:
            return !!product.spiceLevel && selected.includes(product.spiceLevel.toLowerCase());
        case FilterSource.TAG:
            return !!product.tags && selected.some((v) => product.tags?.includes(v));
        case FilterSource.FEATURED:
            return selected.some((v) => {
                const bool = v === "true" || v === "1" || v === "yes";
                return bool ? !!product.isFeatured : !product.isFeatured;
            });
        case FilterSource.PRICE: {
            const price = priceOf(product);
            return selected.some((v) => {
                const num = Number(v);
                return Number.isFinite(num) && price <= num;
            });
        }
        default:
            return true;
    }
};

const compareProducts = (
    a: ProductConfig,
    b: ProductConfig,
    sort: SortOptionDefinition | undefined,
): number => {
    if (!sort) return 0;
    const dir = sort.direction === SortDirection.ASC ? 1 : -1;
    switch (sort.field) {
        case SortField.PRICE:
            return (priceOf(a) - priceOf(b)) * dir;
        case SortField.NAME:
            return a.title.localeCompare(b.title) * dir;
        case SortField.FEATURED:
            return ((b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)) * dir;
        default:
            return 0;
    }
};

const ProductListing = ({ sections, filters, sortOptions }: ProductListingProps) => {
    const searchQuery = useFilterStore((s) => s.searchQuery);
    const selectedFilters = useFilterStore((s) => s.selectedFilters);
    const activeSortId = useFilterStore((s) => s.activeSortId);
    const setActiveSortId = useFilterStore((s) => s.setActiveSortId);

    useEffect(() => {
        if (activeSortId) return;
        const def = sortOptions.find((s) => s.is_default);
        if (def) setActiveSortId(def._id);
    }, [activeSortId, sortOptions, setActiveSortId]);

    const q = searchQuery.trim().toLowerCase();
    const activeSort = useMemo(
        () => sortOptions.find((s) => s._id === activeSortId),
        [sortOptions, activeSortId],
    );

    const filtered = useMemo(() => {
        const applyAll = (products: ProductConfig[]) => {
            const kept = products.filter((p) => {
                if (!matchesSearch(p, q)) return false;
                for (const filter of filters) {
                    const selected = selectedFilters[filter._id];
                    if (selected && selected.length > 0 && !matchesFilter(p, filter, selected)) {
                        return false;
                    }
                }
                return true;
            });
            if (activeSort) kept.sort((a, b) => compareProducts(a, b, activeSort));
            return kept;
        };

        return sections
            .map((s) => ({ ...s, products: applyAll(s.products) }))
            .filter((s) => s.products.length > 0);
    }, [sections, q, filters, selectedFilters, activeSort]);

    const hasActiveFilters = Object.keys(selectedFilters).length > 0;

    if (sections.length === 0) {
        return (
            <div id="cat-all" className="py-10 text-center text-gray-500 text-sm">
                No products available right now.
            </div>
        );
    }

    if (filtered.length === 0) {
        return (
            <div id="cat-all" className="py-10 text-center text-gray-500 text-sm">
                {q
                    ? `No products match "${searchQuery}".`
                    : hasActiveFilters
                      ? "No products match the selected filters."
                      : "No products available right now."}
            </div>
        );
    }

    return (
        <div id="cat-all" className="flex flex-col gap-8 scroll-mt-20">
            {filtered.map((section) => (
                <section
                    key={section.id}
                    id={`cat-${section.id}`}
                    className="flex flex-col gap-4 scroll-mt-20"
                >
                    <h2 className="text-lg font-semibold">{section.name}</h2>
                    <div className="flex flex-col gap-4">
                        {section.products.map((product) => (
                            <ProductCard key={product.id} item={product} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ProductListing;
