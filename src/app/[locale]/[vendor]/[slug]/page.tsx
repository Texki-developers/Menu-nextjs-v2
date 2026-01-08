import ProductMedia from "./_components/product-media/ProductMedia";
import ProductContent from "./_components/product-content/ProductContent";
import ProductActions from "./_components/product-actions/ProductActions";
import { getProductBySlug } from "./_utils/get-product-by-slug";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return (
            <div className="bg-gray-100 w-full h-dvh flex items-center justify-center">
                <p className="text-gray-500">Product not found</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 w-full h-dvh">
            <ProductMedia images={product.images || [product.image]} alt={product.title} />
            <ProductContent product={product} />
            <ProductActions price={product.price} />
        </div>
    );
};

export default page;
