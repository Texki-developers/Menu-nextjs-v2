"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import BottomSheetWrapper from "@/components/molecules/bottom-sheet-wrapper/BottomSheetWrapper";
import { useFilterStore } from "@/store/filter/filter.store";
import { CheckCircle2 } from "lucide-react";

type DietaryType = "veg" | "non-veg" | "vegan" | "gluten-free";
type SortOption = "recommended" | "rating" | "priceLowToHigh" | "deliveryTime";
type PriceRange = "all" | "low" | "mid" | "high";

const FilterModal = () => {
    const t = useTranslations("filter");
    const { isFilterModalOpen, setFilterModalOpen } = useFilterStore();
    const [sortOption, setSortOption] = useState<SortOption>("recommended");
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
        setSortOption("recommended");
    };

    const handleApply = () => {
        // TODO: Apply filters to product listing
        setFilterModalOpen(false);
    };

    const sortOptions: { key: SortOption; translationKey: string }[] = [
        { key: "recommended", translationKey: "sortOptions.recommended" },
        { key: "rating", translationKey: "sortOptions.rating" },
        { key: "priceLowToHigh", translationKey: "sortOptions.priceLowToHigh" },
        { key: "deliveryTime", translationKey: "sortOptions.deliveryTime" },
    ];

    const dietaryOptions: { value: DietaryType; translationKey: string }[] = [
        { value: "veg", translationKey: "dietaryOptions.veg" },
        { value: "non-veg", translationKey: "dietaryOptions.nonVeg" },
        { value: "vegan", translationKey: "dietaryOptions.vegan" },
        { value: "gluten-free", translationKey: "dietaryOptions.glutenFree" },
    ];

    const priceRanges: { id: PriceRange; translationKey: string }[] = [
        { id: "all", translationKey: "priceRanges.all" },
        { id: "low", translationKey: "priceRanges.low" },
        { id: "mid", translationKey: "priceRanges.mid" },
        { id: "high", translationKey: "priceRanges.high" },
    ];

    return (
        <BottomSheetWrapper
            show={isFilterModalOpen}
            onClose={() => setFilterModalOpen(false)}
            className="p-6"
        >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t("title")}</h2>
                <button
                    onClick={handleReset}
                    className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                >
                    {t("reset")}
                </button>
            </div>

            {/* Sort By */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">{t("sortBy")}</h3>
                <div className="flex flex-wrap gap-2">
                    {sortOptions.map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setSortOption(opt.key)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                                sortOption === opt.key
                                    ? "bg-gray-900 text-white border-gray-900"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            {t(opt.translationKey)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dietary */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">{t("dietary")}</h3>
                <div className="flex flex-wrap gap-2">
                    {dietaryOptions.map(({ value, translationKey }) => {
                        const isSelected = dietary.includes(value);
                        return (
                            <button
                                key={value}
                                onClick={() => toggleDietary(value)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 transition-all ${
                                    isSelected
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                {isSelected && <CheckCircle2 size={14} />}
                                {t(translationKey)}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-3">{t("priceRange")}</h3>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    {priceRanges.map((range) => (
                        <button
                            key={range.id}
                            onClick={() => setPriceRange(range.id)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                                priceRange === range.id
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {t(range.translationKey)}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleApply}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform hover:bg-gray-800"
            >
                {t("applyFilters")}
            </button>
        </BottomSheetWrapper>
    );
};

export default FilterModal;

