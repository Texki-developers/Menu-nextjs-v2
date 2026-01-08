import SearchInput from "@/components/atoms/search-input/SearchInput";
import { Filter } from "lucide-react";
import { Button } from "@/components/atoms/button";

const ListingHeader = () => {
    return (
        <div className="grid grid-cols-[1fr_52px] items-stretch justify-between gap-4">
            <div className="flex-1">
                <SearchInput />
            </div>
            <Button
                variant="outline"
                iconOnly
                size="base"
                rounded="lg"
                className="h-full w-[52px] shrink-0"
            >
                <Filter size={20} className="text-gray-700" />
            </Button>
        </div>
    );
};

export default ListingHeader;

