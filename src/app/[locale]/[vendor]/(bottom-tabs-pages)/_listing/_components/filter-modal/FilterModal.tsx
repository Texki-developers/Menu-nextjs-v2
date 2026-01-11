"use client";

import { useState } from "react";
import BottomSheetWrapper from "@/components/molecules/bottom-sheet-wrapper/BottomSheetWrapper";
import { useFilterStore } from "@/store/filter/filter.store";
import { CheckCircle2 } from "lucide-react";

type DietaryType = "veg" | "non-veg" | "vegan" | "gluten-free";
type SortOption = "Recommended" | "Rating" | "Price: Low to High" | "Delivery Time";
type PriceRange = "all" | "low" | "mid" | "high";

const FilterModal = () => {
    const { isFilterModalOpen, setFilterModalOpen } = useFilterStore();
    const [sortOption, setSortOption] = useState<SortOption>("Recommended");
    const [dietary, setDietary] = useState<DietaryType[]>([]);
    const [priceRange, setPriceRange] = useState<PriceRange>("all");

    const toggleDietary = (type: DietaryType) => {
        setDietary((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type]
        );
    };

    const handleReset = () => {
        setDietary([]);
        setPriceRange("all");
        setSortOption("Recommended");
    };

    const handleApply = () => {
        // TODO: Apply filters to product listing
        setFilterModalOpen(false);
    };

    const sortOptions: SortOption[] = [
        "Recommended",
        "Rating",
        "Price: Low to High",
        "Delivery Time",
    ];

    const dietaryOptions: { label: string; value: DietaryType }[] = [
        { label: "Veg", value: "veg" },
        { label: "Non-Veg", value: "non-veg" },
        { label: "Vegan", value: "vegan" },
        { label: "Gluten-Free", value: "gluten-free" },
    ];

    const priceRanges: { id: PriceRange; label: string }[] = [
        { id: "all", label: "All" },
        { id: "low", label: "< 30" },
        { id: "mid", label: "30-60" },
        { id: "high", label: "60+" },
    ];

    return (
        <BottomSheetWrapper
            show={isFilterModalOpen}
            onClose={() => setFilterModalOpen(false)}
            className="p-6"
        >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filter & Sort</h2>
                <button
                    onClick={handleReset}
                    className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                >
                    Reset
                </button>
            </div>

            {/* Sort By */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Sort By</h3>
                <div className="flex flex-wrap gap-2">
                    {sortOptions.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setSortOption(opt)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${sortOption === opt
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dietary */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Dietary</h3>
                <div className="flex flex-wrap gap-2">
                    {dietaryOptions.map(({ label, value }) => {
                        const isSelected = dietary.includes(value);
                        return (
                            <button
                                key={value}
                                onClick={() => toggleDietary(value)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 transition-all ${isSelected
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                {isSelected && <CheckCircle2 size={14} />}
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Price Range</h3>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    {priceRanges.map((range) => (
                        <button
                            key={range.id}
                            onClick={() => setPriceRange(range.id)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${priceRange === range.id
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleApply}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform hover:bg-gray-800"
            >
                Apply Filters
            </button>
        </BottomSheetWrapper>
    );
};

export default FilterModal;

