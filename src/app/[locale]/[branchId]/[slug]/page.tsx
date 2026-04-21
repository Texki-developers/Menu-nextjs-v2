import { getTranslations } from "next-intl/server";
import ProductMedia from "./_components/product-media/ProductMedia";
import ProductContent from "./_components/product-content/ProductContent";
import ProductActions from "./_components/product-actions/ProductActions";
import ProductButtons from "./_components/product-buttons/ProductButtons";
import { getProductBySlug } from "./_utils/get-product-by-slug";
import { getProductDetail, type ProductDetail } from "@/lib/api/menu";
import type { ProductConfig } from "@/app/[locale]/[branchId]/(bottom-tabs-pages)/_listing/_components/products/products.config";

interface PageProps {
    params: Promise<{ slug: string; locale: string; branchId: string }>;
}

const toProductConfig = (item: ProductDetail, branchName?: string): ProductConfig => {
    const primaryMedia = item.media?.find((m) => m.is_primary) ?? item.media?.[0];
    const price = item.discount_price ?? item.selling_price;
    const images = item.media?.map((m) => m.url).filter(Boolean) ?? [];
    return {
        id: item.id,
        slug: item.slug,
        title: item.name,
        description: item.description,
        image: primaryMedia?.url ?? "",
        price,
        originalPrice: item.discount_price ? item.selling_price : undefined,
        isVeg: item.type?.toLowerCase() === "veg" || item.type?.toLowerCase() === "vegan",
        bestseller: item.is_featured,
        vendorName: branchName,
        images: images.length > 0 ? images : undefined,
        sizes: item.variants.map((v) => ({
            id: v.variant_uuid,
            label: v.label,
            price: v.price,
        })),
        extras: item.extras.map((e) => ({
            id: e.extra_uuid,
            label: e.label,
            price: e.price,
        })),
    };
};

const page = async ({ params }: PageProps) => {
    const { slug, branchId } = await params;
    const t = await getTranslations("product");

    const detail = await getProductDetail(branchId, slug);
    const product: ProductConfig | undefined = detail
        ? toProductConfig(detail.item, detail.branch.name)
        : getProductBySlug(slug);

    if (!product) {
        return (
            <div className="bg-gray-100 w-full h-dvh flex items-center justify-center">
                <p className="text-gray-500">{t("notFound")}</p>
            </div>
        );
    }

    const basePrice = detail
        ? detail.item.discount_price ?? detail.item.selling_price
        : typeof product.price === "string"
            ? parseFloat(product.price)
            : product.price;
    const variantPrices: Record<string, number> = {};
    for (const v of detail?.item.variants ?? []) variantPrices[v.variant_uuid] = v.price;
    const extraPrices: Record<string, number> = {};
    for (const e of detail?.item.extras ?? []) extraPrices[e.extra_uuid] = e.price;

    return (
        <div className="bg-gray-100 w-full h-dvh">
            <ProductMedia
                images={product.images || [product.image]}
                alt={product.title}
            />
            <ProductButtons />
            <ProductContent product={product} />
            {detail && (
                <ProductActions
                    branchId={branchId}
                    menuItemId={detail.item.id}
                    basePrice={basePrice}
                    hasVariants={detail.item.variants.length > 0}
                    variantPrices={variantPrices}
                    extraPrices={extraPrices}
                />
            )}
        </div>
    );
};

export default page;
