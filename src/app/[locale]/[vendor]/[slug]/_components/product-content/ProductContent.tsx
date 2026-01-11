"use client";

import { useTranslations } from "next-intl";
import Price from "@/components/organisms/price/Price";
import { Clock, Star } from "lucide-react";
import { RadioOption } from "@/components/atoms/radio-option";
import { CheckboxOption } from "@/components/atoms/checkbox-option";
import { useProductOptionsStore } from "@/store/product-options/product-options.store";
import { ProductConfig } from "@/app/[locale]/[vendor]/(bottom-tabs-pages)/_listing/_components/products/products.config";
import ProductReviews from "../product-reviews/ProductReviews";

interface ProductContentProps {
  product: ProductConfig;
}

const ProductContent = ({ product }: ProductContentProps) => {
  const t = useTranslations();
  const { selectedSize, selectedExtras, setSelectedSize, toggleExtra } = useProductOptionsStore();

  const sizes = product.sizes || [];
  const extras = product.extras || [];
  return (
    <div className="w-full h-full min-h-dvh relative z-1 pointer-events-none ">
      <div className="w-full h-[calc(min(100vw,440px)-20px)]"></div>
      <div className="bg-white p-4 pb-30 h-full rounded-t-2xl pointer-events-auto ">
        <div className="mx-auto w-12 h-1 bg-gray-500 rounded-full "></div>
        <div className="flex mt-4 justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight mb-2">{product.vendorName || product.title}</h1>
            <div className="flex items-center gap-2">
              {product.rating && (
                <>
                  <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
                    <Star
                      size={14}
                      fill="currentColor"
                    />
                    <span className="text-xs font-bold">{product.rating} (120+ {t("product.reviews")})</span>
                  </div>
                  {product.deliveryTime && <span className="text-gray-300">•</span>}
                </>
              )}
              {product.deliveryTime && (
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} />
                  <span className="text-xs font-medium">{product.deliveryTime}</span>
                </div>
              )}
            </div>
          </div>
          <Price
            size="xl"
            originalPrice={product.originalPrice}
            price={product.price}
          />
        </div>
        {product.description && (
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
        )}
        {sizes.length > 0 && (
          <div className="mt-6 grid gap-3">
            <span className="uppercase text-sm font-medium text-gray-500">{t("product.chooseSize")}</span>
            {sizes.map((size) => (
              <RadioOption
                key={size.id}
                label={size.label}
                isSelected={selectedSize === size.id}
                rightLabel={
                  <Price
                    price={size.price}
                    size="base"
                  />
                }
                onClick={() => setSelectedSize(size.id)}
              />
            ))}
          </div>
        )}

        {extras.length > 0 && (
          <div className="mt-6 grid gap-3">
            <span className="uppercase text-sm font-medium text-gray-500">{t("product.addExtras")}</span>
            {extras.map((extra) => (
              <CheckboxOption
                key={extra.id}
                label={extra.label}
                isSelected={selectedExtras.includes(extra.id)}
                rightLabel={
                  <div className="flex items-center gap-2">
                    +
                    <Price
                      price={extra.price}
                      size="base"
                    />
                  </div>
                }
                onClick={() => toggleExtra(extra.id)}
              />
            ))}
          </div>
        )}

        {/* Reviews Section */}
        <ProductReviews />

        <div className="h-[150px] w-full"></div>
      </div>
    </div>
  );
};

export default ProductContent;
