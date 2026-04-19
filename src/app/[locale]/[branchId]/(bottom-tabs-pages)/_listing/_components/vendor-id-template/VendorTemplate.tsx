import ListingTemplate from "../../ListingTemplate";

interface VendorTemplateProps {
    branchId: string;
}

const VendorTemplate = ({ branchId }: VendorTemplateProps) => {
    return <ListingTemplate branchId={branchId} />;
};

export default VendorTemplate;
