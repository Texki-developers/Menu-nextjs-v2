"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { QuantityStepper } from "@/components/molecules/quantity-stepper";
import { Button } from "@/components/atoms/button";
import { useCartStore } from "@/store/cart/cart.store";
import { useProductOptionsStore } from "@/store/product-options/product-options.store";

interface ProductActionsProps {
    branchId: string;
    menuItemId: string;
    basePrice: number;
    hasVariants: boolean;
    variantPrices: Record<string, number>;
    extraPrices: Record<string, number>;
    currency?: string;
}

const ProductActions = ({
    branchId,
    menuItemId,
    basePrice,
    hasVariants,
    variantPrices,
    extraPrices,
    currency = "AED",
}: ProductActionsProps) => {
    const [quantity, setQuantity] = useState(0);
    const [localError, setLocalError] = useState<string | null>(null);
    const router = useRouter();
    const locale = useLocale();
    const { selectedSize, selectedExtras, resetOptions } = useProductOptionsStore();
    const add = useCartStore((s) => s.add);
    const isMutating = useCartStore((s) => s.isMutating);
    const storeError = useCartStore((s) => s.error);

    const unitPrice = useMemo(() => {
        const variantPrice = selectedSize ? variantPrices[selectedSize] : undefined;
        const baseForThis = variantPrice ?? basePrice;
        const extrasTotal = selectedExtras.reduce((s, id) => s + (extraPrices[id] ?? 0), 0);
        return baseForThis + extrasTotal;
    }, [selectedSize, selectedExtras, variantPrices, extraPrices, basePrice]);

    const effectiveQty = quantity || 1;
    const calculatedTotal = unitPrice * effectiveQty;

    const handleIncrease = () => setQuantity((q) => q + 1);
    const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 0));

    const handleAddToCart = async () => {
        setLocalError(null);
        if (hasVariants && !selectedSize) {
            setLocalError("Please choose a size");
            return;
        }
        const qty = quantity === 0 ? 1 : quantity;
        try {
            await add(branchId, {
                menu_item_id: menuItemId,
                variant_uuid: selectedSize ?? undefined,
                extra_uuids: selectedExtras,
                quantity: qty,
            });
            resetOptions();
            router.push(`/${locale}/${branchId}/cart`);
        } catch (err) {
            console.error("[add to cart] failed:", err);
        }
    };

    const hasQuantity = quantity > 0;

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 container bg-white border-t border-gray-100 p-5 pb-8 z-30 rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.1)]">
            {(localError || storeError) && (
                <p className="text-xs text-red-500 mb-2 text-center">
                    {localError ?? storeError}
                </p>
            )}
            <div className="flex items-center gap-4">
                {hasQuantity && (
                    <QuantityStepper
                        quantity={quantity}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        min={1}
                    />
                )}
                <Button
                    onClick={handleAddToCart}
                    variant="secondary"
                    size="xl"
                    rounded="lg"
                    fullWidth={!hasQuantity}
                    disabled={isMutating}
                    className="flex items-center justify-between w-full px-6 shadow-lg shadow-gray-400"
                >
                    <span>{isMutating ? "Adding..." : "Add to Cart"}</span>
                    <span className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
                        {currency} {calculatedTotal.toFixed(2)}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default ProductActions;
