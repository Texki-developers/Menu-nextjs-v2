import ListingHeader from "./_components/listing-header/ListingHeader";
import OffersBanner from "./_components/offers-banner/OffersBanner";
import FilterModal from "./_components/filter-modal/FilterModal";
import MenuBrowser from "./_components/menu-browser/MenuBrowser";
import { getBranchMenus } from "@/lib/api/menu";
import { getBranchDetails } from "@/lib/api/branch";
import { getBranchFilters } from "@/lib/api/filters";

interface ListingTemplateProps {
    branchId: string;
}

const ListingTemplate = async ({ branchId }: ListingTemplateProps) => {
    const [branch, menus, filterData] = await Promise.all([
        getBranchDetails(branchId),
        getBranchMenus(branchId),
        getBranchFilters(branchId),
    ]);

    console.log({branch, menus, filterData});

    void branch;

    const filters = filterData?.filters ?? [];
    const sortOptions = filterData?.sort_options ?? [];

    return (
        <div className="flex flex-col gap-4">
            <ListingHeader />
            <OffersBanner />
            <MenuBrowser
                branchId={branchId}
                menus={menus}
                filters={filters}
                sortOptions={sortOptions}
            />
            <FilterModal filters={filters} sortOptions={sortOptions} />
        </div>
    );
};

export default ListingTemplate;
