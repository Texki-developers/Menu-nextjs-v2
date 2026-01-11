import ListingHeader from "./_components/listing-header/ListingHeader";
import Categories from "./_components/categories/Categories";
import OffersBanner from "./_components/offers-banner/OffersBanner";
import ProductListing from "./_components/products/ProductListing";
import FilterModal from "./_components/filter-modal/FilterModal";

const ListingTemplate = () => {
    return (
        <div className="flex flex-col gap-4">
            <ListingHeader />
            <Categories />
            <OffersBanner />
            <ProductListing />
            <FilterModal />
        </div>
    );
};

export default ListingTemplate;
