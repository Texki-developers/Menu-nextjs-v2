import SearchInput from "@/components/atoms/search-input/SearchInput";
import { Filter } from "lucide-react";

const ListingHeader = () => {
    return (
        <div className="grid grid-cols-[1fr_52px] items-stretch justify-between gap-4">
            <div className="flex-1">
                <SearchInput />
            </div>
            <button className="bg-white h-full w-[52px] rounded-2xl border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center shrink-0">
                <Filter size={20} className="text-gray-700" />
            </button>
        </div>
    );
};

export default ListingHeader;

