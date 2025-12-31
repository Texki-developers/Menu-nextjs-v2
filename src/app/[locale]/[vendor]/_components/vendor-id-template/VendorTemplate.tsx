import SearchInput from "@/components/atoms/search-input/SearchInput";
import OffersBanner from "../offers-banner/OffersBanner";

const VendorTemplate = () => {
    return (
        <div className="flex flex-col gap-2">
            <SearchInput />
            <OffersBanner />
        </div>
    );
};

export default VendorTemplate;
