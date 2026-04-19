import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api/products";

interface ProductListingProps {
    branchId: string;
}

const ProductListing = async ({ branchId }: ProductListingProps) => {
    const products = await getProducts(branchId);

    if (products.length === 0) {
        return (
            <div className="py-10 text-center text-gray-500 text-sm">
                No products available right now.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} item={product} />
            ))}
        </div>
    );
};

export default ProductListing;
