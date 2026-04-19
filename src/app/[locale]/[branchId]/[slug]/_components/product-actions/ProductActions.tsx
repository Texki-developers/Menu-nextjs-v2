"use client";

import { useState } from "react";
import { QuantityStepper } from "@/components/molecules/quantity-stepper";
import { Button } from "@/components/atoms/button";

interface ProductActionsProps {
    price?: number | string;
    currency?: string;
    onAddToCart?: (quantity: number) => void;
}

const ProductActions = ({
    price = 0,
    currency = "AED",
    onAddToCart
}: ProductActionsProps) => {
    const [quantity, setQuantity] = useState(0);

    const totalPrice = typeof price === "string" ? parseFloat(price) : price;
    const calculatedTotal = totalPrice * (quantity || 1);

    const handleIncrease = () => {
        setQuantity((q) => q + 1);
    };

    const handleDecrease = () => {
        setQuantity((q) => q > 1 ? q - 1 : 0);
    };

    const handleAddToCart = () => {
        if (quantity === 0) {
            setQuantity(1);
            onAddToCart?.(1);
        } else {
            onAddToCart?.(quantity);
        }
    };

    const hasQuantity = quantity > 0;

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 container bg-white border-t border-gray-100 p-5 pb-8 z-30 rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.1)]">
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
                    className="flex items-center justify-between w-full px-6 shadow-lg shadow-gray-400"
                >
                    <span>{hasQuantity ? "Added" : "Add to Cart"}</span>
                    <span className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
                        {currency} {calculatedTotal.toFixed(2)}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default ProductActions;

