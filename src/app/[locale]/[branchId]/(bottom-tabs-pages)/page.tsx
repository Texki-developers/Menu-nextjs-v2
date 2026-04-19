import VendorTemplate from "./_listing/_components/vendor-id-template/VendorTemplate";

interface PageProps {
    params: Promise<{ locale: string; branchId: string }>;
}

const page = async ({ params }: PageProps) => {
    const { branchId } = await params;

    return (
        <div className="p-4 w-full bg-background">
            <VendorTemplate branchId={branchId} />
        </div>
    );
};

export default page;
