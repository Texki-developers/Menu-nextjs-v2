"use client";

import { useTranslations } from "next-intl";
import Price from "@/components/organisms/price/Price";
import { Clock, Star, Box, Flame, Leaf, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { RadioOption } from "@/components/atoms/radio-option";
import { CheckboxOption } from "@/components/atoms/checkbox-option";
import { useProductOptionsStore } from "@/store/product-options/product-options.store";
import { ProductConfig } from "@/app/[locale]/[branchId]/(bottom-tabs-pages)/_listing/_components/products/products.config";
import ProductReviews from "../product-reviews/ProductReviews";

interface ProductContentProps {
  product: ProductConfig;
}

const SPICE_FLAMES: Record<string, number> = {
  mild: 1,
  medium: 2,
  hot: 3,
  extra_hot: 3,
};

const DietBadge = ({ isVeg }: { isVeg?: boolean }) => {
  const color = isVeg ? "#2E9E5B" : "#C0392B";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold"
      style={{ background: `${color}14`, color }}
    >
      <span
        className="inline-flex items-center justify-center rounded-[3px] border-[1.5px]"
        style={{ width: 13, height: 13, borderColor: color }}
      >
        <span className="rounded-full" style={{ width: 6, height: 6, background: color }} />
      </span>
      {isVeg ? "Veg" : "Non-veg"}
    </span>
  );
};

const ProductContent = ({ product }: ProductContentProps) => {
  const t = useTranslations();
  const { selectedSize, selectedExtras, setSelectedSize, toggleExtra } = useProductOptionsStore();

  const handleArClick = () => {
    console.log("AR View Clicked");
  };

  const sizes = product.sizes || [];
  const extras = product.extras || [];
  const tags = product.tags?.filter(Boolean) ?? [];
  const allergens = product.allergens?.filter(Boolean) ?? [];
  const nutrition = product.nutrition;
  const hasNutrition =
    !!nutrition &&
    [nutrition.protein, nutrition.carbs, nutrition.fat, nutrition.fiber].some(
      (v) => typeof v === "number" && v > 0,
    );
  const spice = product.spiceLevel?.toLowerCase();
  const spiceFlames = spice ? SPICE_FLAMES[spice] ?? 0 : 0;

  return (
    <div className="w-full h-full min-h-dvh relative z-1 pointer-events-none">
      <div className="w-full h-[calc(min(100vw,440px)-20px)]"></div>
      <div className="bg-white p-4 pb-60 h-full rounded-t-2xl pointer-events-auto">
        <div className="mx-auto w-12 h-1 bg-gray-500 rounded-full "></div>

        {/* AR Button */}
        <div className="flex justify-center mt-4 mb-2">
          <Button
            onClick={handleArClick}
            variant="secondary"
            size="base"
            rounded="lg"
            className="shadow-lg shadow-gray-300 font-semibold px-6 flex items-center gap-2"
          >
            <Box size={18} />
            <span>View in Table</span>
          </Button>
        </div>

        <div className="flex mt-2 justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight mb-2">
              {product.vendorName || product.title}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              {product.rating && (
                <>
                  <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">
                      {product.rating} (120+ {t("product.reviews")})
                    </span>
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
          <Price size="xl" originalPrice={product.originalPrice} price={product.price} />
        </div>

        {/* Attribute badges */}
        <div className="flex items-center gap-2 flex-wrap mt-3">
          {product.type && <DietBadge isVeg={product.isVeg} />}
          {spiceFlames > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold bg-red-50 text-red-600 capitalize">
              {Array.from({ length: spiceFlames }).map((_, i) => (
                <Flame key={i} size={12} fill="currentColor" />
              ))}
              {spice?.replace("_", " ")}
            </span>
          )}
          {typeof product.calories === "number" && (
            <span className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold bg-gray-100 text-gray-600">
              <Flame size={12} /> {product.calories} kcal
            </span>
          )}
          {product.bestseller && (
            <span className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold bg-amber-50 text-amber-600">
              <Star size={12} fill="currentColor" /> Bestseller
            </span>
          )}
        </div>

        {product.description && (
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-700 px-3 py-1 text-xs font-semibold"
              >
                <Leaf size={12} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Nutrition */}
        {hasNutrition && (
          <div className="mt-6">
            <span className="uppercase text-sm font-medium text-gray-500">Nutrition</span>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[
                { label: "Protein", value: nutrition?.protein, unit: "g" },
                { label: "Carbs", value: nutrition?.carbs, unit: "g" },
                { label: "Fat", value: nutrition?.fat, unit: "g" },
                { label: "Fiber", value: nutrition?.fiber, unit: "g" },
              ].map((n) => (
                <div
                  key={n.label}
                  className="rounded-xl bg-gray-50 border border-gray-100 py-3 text-center"
                >
                  <div className="text-base font-extrabold text-gray-900">
                    {n.value ?? 0}
                    <span className="text-xs font-semibold text-gray-400">{n.unit}</span>
                  </div>
                  <div className="text-[11px] font-medium text-gray-500 mt-0.5">{n.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sizes / variants */}
        {sizes.length > 0 && (
          <div className="mt-6 grid gap-3">
            <span className="uppercase text-sm font-medium text-gray-500">
              {t("product.chooseSize")}
            </span>
            {sizes.map((size) => (
              <RadioOption
                key={size.id}
                label={size.label}
                isSelected={selectedSize === size.id}
                rightLabel={<Price price={size.price} size="base" />}
                onClick={() => setSelectedSize(size.id)}
              />
            ))}
          </div>
        )}

        {/* Extras */}
        {extras.length > 0 && (
          <div className="mt-6 grid gap-3">
            <span className="uppercase text-sm font-medium text-gray-500">
              {t("product.addExtras")}
            </span>
            {extras.map((extra) => (
              <CheckboxOption
                key={extra.id}
                label={extra.label}
                isSelected={selectedExtras.includes(extra.id)}
                rightLabel={
                  <div className="flex items-center gap-2">
                    +<Price price={extra.price} size="base" />
                  </div>
                }
                onClick={() => toggleExtra(extra.id)}
              />
            ))}
          </div>
        )}

        {/* Allergens */}
        {allergens.length > 0 && (
          <div className="mt-6">
            <span className="uppercase text-sm font-medium text-gray-500">Allergens</span>
            <div className="flex flex-wrap gap-2 mt-3">
              {allergens.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-xs font-semibold"
                >
                  <AlertTriangle size={12} /> {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {(product.specialNote || product.warningNote) && (
          <div className="mt-6 space-y-2">
            {product.specialNote && (
              <div className="flex items-start gap-2 rounded-xl bg-blue-50 text-blue-700 p-3 text-xs font-medium">
                <Info size={16} className="shrink-0 mt-0.5" />
                <span>{product.specialNote}</span>
              </div>
            )}
            {product.warningNote && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 text-red-700 p-3 text-xs font-medium">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{product.warningNote}</span>
              </div>
            )}
          </div>
        )}

        {/* Reviews Section */}
        <ProductReviews />

        <div className="h-[150px] bg-white w-full"></div>
      </div>
    </div>
  );
};

export default ProductContent;
