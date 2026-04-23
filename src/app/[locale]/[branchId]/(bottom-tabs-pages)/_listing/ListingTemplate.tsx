import ListingHeader from "./_components/listing-header/ListingHeader";
import Categories from "./_components/categories/Categories";
import OffersBanner from "./_components/offers-banner/OffersBanner";
import ProductListing, { type ProductSection } from "./_components/products/ProductListing";
import FilterModal from "./_components/filter-modal/FilterModal";
import { getBranchMenu, toProductConfig } from "@/lib/api/menu";
import { getBranchFilters } from "@/lib/api/filters";
import { productsConfig } from "./_components/products/products.config";

interface ListingTemplateProps {
    branchId: string;
}

const ListingTemplate = async ({ branchId }: ListingTemplateProps) => {
    const [menu, filterData] = await Promise.all([
        getBranchMenu(branchId),
        getBranchFilters(branchId),
    ]);

    const categories =
        menu?.categories.map((c) => ({
            id: c.id,
            name: c.name,
            icon: c.icon,
            image_url: c.image_url,
        })) ?? [];

    const sections: ProductSection[] = menu
        ? menu.categories
              .map((c) => ({
                  id: c.id,
                  name: c.name,
                  products: c.items.map(toProductConfig),
              }))
              .filter((s) => s.products.length > 0)
        : [{ id: "fallback", name: "Featured", products: productsConfig }];

    const filters = filterData?.filters ?? [];
    const sortOptions = filterData?.sort_options ?? [];

    return (
        <div className="flex flex-col gap-4">
            <ListingHeader />
            <Categories categories={categories} />
            <OffersBanner />
            <ProductListing sections={sections} filters={filters} sortOptions={sortOptions} />
            <FilterModal filters={filters} sortOptions={sortOptions} />
        </div>
    );
};

export default ListingTemplate;
