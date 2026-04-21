"use client";

import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { useFilterStore } from "@/store/filter/filter.store";
import type { ProductConfig } from "./products.config";

export interface ProductSection {
    id: string;
    name: string;
    products: ProductConfig[];
}

interface ProductListingProps {
    sections: ProductSection[];
}

const matches = (p: ProductConfig, q: string): boolean => {
    if (!q) return true;
    const haystack = [p.title, p.description, p.vendorName].filter(Boolean).join(" ").toLowerCase();
    return haystack.includes(q);
};

const ProductListing = ({ sections }: ProductListingProps) => {
    const searchQuery = useFilterStore((s) => s.searchQuery);
    const q = searchQuery.trim().toLowerCase();

    const filtered = useMemo(() => {
        if (!q) return sections;
        return sections
            .map((s) => ({ ...s, products: s.products.filter((p) => matches(p, q)) }))
            .filter((s) => s.products.length > 0);
    }, [sections, q]);

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
                No products match &ldquo;{searchQuery}&rdquo;.
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
