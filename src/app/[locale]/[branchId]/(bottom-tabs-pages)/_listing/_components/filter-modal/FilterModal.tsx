"use client";

import { useTranslations } from "next-intl";
import BottomSheetWrapper from "@/components/molecules/bottom-sheet-wrapper/BottomSheetWrapper";
import { useFilterStore } from "@/store/filter/filter.store";
import { CheckCircle2 } from "lucide-react";
import type {
    FilterDefinition,
    SortOptionDefinition,
} from "@/lib/api/filters";
import { FilterType } from "@/lib/api/filters";

interface FilterModalProps {
    filters: FilterDefinition[];
    sortOptions: SortOptionDefinition[];
}

const FilterModal = ({ filters, sortOptions }: FilterModalProps) => {
    const t = useTranslations("filter");
    const {
        isFilterModalOpen,
        setFilterModalOpen,
        selectedFilters,
        setFilterValues,
        toggleFilterValue,
        activeSortId,
        setActiveSortId,
        resetAll,
    } = useFilterStore();

    const handleApply = () => setFilterModalOpen(false);

    const isValueSelected = (filterId: string, value: string) =>
        (selectedFilters[filterId] ?? []).includes(value);

    return (
        <BottomSheetWrapper
            show={isFilterModalOpen}
            onClose={() => setFilterModalOpen(false)}
            className="p-6 max-h-[85vh] overflow-y-auto"
        >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{t("title")}</h2>
                <button
                    onClick={resetAll}
                    className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                >
                    {t("reset")}
                </button>
            </div>

            {sortOptions.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">{t("sortBy")}</h3>
                    <div className="flex flex-wrap gap-2">
                        {sortOptions.map((opt) => {
                            const active = activeSortId === opt._id;
                            return (
                                <button
                                    key={opt._id}
                                    onClick={() => setActiveSortId(active ? null : opt._id)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                                        active
                                            ? "bg-gray-900 text-white border-gray-900"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {filters.map((filter) => (
                <div key={filter._id} className="mb-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">{filter.name}</h3>

                    {filter.type === FilterType.RANGE ? (
                        <div className="flex flex-wrap gap-2">
                            {filter.ranges.map((range) => {
                                const active = isValueSelected(filter._id, range.label);
                                return (
                                    <button
                                        key={range.label}
                                        onClick={() =>
                                            setFilterValues(filter._id, active ? [] : [range.label])
                                        }
                                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                                            active
                                                ? "bg-gray-900 text-white border-gray-900"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        {range.label}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {filter.options.map((opt) => {
                                const active = isValueSelected(filter._id, opt.value);
                                const onClick =
                                    filter.type === FilterType.SINGLE
                                        ? () =>
                                              setFilterValues(filter._id, active ? [] : [opt.value])
                                        : () => toggleFilterValue(filter._id, opt.value);
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={onClick}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 transition-all ${
                                            active
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        {active && <CheckCircle2 size={14} />}
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}

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
