import SearchInput from "@/components/atoms/search-input/SearchInput";
import OffersBanner from "../offers-banner/OffersBanner";
import Categories from "../categories/Categories";
import ProductListing from "../products/ProductListing";

const VendorTemplate = () => {
    return (
        <div className="flex flex-col gap-4">
            <SearchInput />
            <Categories />
            <OffersBanner />
            <ProductListing />
        </div>
    );
};

export default VendorTemplate;
