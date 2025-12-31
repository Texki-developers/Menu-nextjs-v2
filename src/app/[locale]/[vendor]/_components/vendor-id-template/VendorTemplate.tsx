import SearchInput from "@/components/atoms/search-input/SearchInput";
import OffersBanner from "../offers-banner/OffersBanner";
import Categories from "../categories/Categories";

const VendorTemplate = () => {
    return (
        <div className="flex flex-col gap-4">
            <SearchInput />
            <Categories />
            <OffersBanner />
        </div>
    );
};

export default VendorTemplate;
