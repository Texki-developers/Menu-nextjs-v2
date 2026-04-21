"use client";

import SearchInput from "@/components/atoms/search-input/SearchInput";
import { Filter } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { useFilterStore } from "@/store/filter/filter.store";

const ListingHeader = () => {
    const { setFilterModalOpen, searchQuery, setSearchQuery } = useFilterStore();

    return (
        <div className="grid grid-cols-[1fr_52px] items-stretch justify-between gap-4">
            <div className="flex-1">
                <SearchInput
                    inputProps={{
                        value: searchQuery,
                        onChange: (e) => setSearchQuery(e.target.value),
                    }}
                />
            </div>
            <Button
                variant="outline"
                iconOnly
                size="base"
                rounded="lg"
                className="h-full w-[52px] shrink-0"
                onClick={() => setFilterModalOpen(true)}
            >
                <Filter size={20} className="text-gray-700" />
            </Button>
        </div>
    );
};

export default ListingHeader;

