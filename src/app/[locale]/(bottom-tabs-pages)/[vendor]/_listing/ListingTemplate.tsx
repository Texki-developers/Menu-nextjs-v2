import ListingHeader from "./_components/listing-header/ListingHeader";
import Categories from "./_components/categories/Categories";
import OffersBanner from "./_components/offers-banner/OffersBanner";
import ProductListing from "./_components/products/ProductListing";

const ListingTemplate = () => {
    return (
        <div className="flex flex-col gap-4">
            <ListingHeader />
            <Categories />
            <OffersBanner />
            <ProductListing />
        </div>
    );
};

export default ListingTemplate;
