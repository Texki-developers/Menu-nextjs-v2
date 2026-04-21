"use client";

import { use, useEffect } from "react";
import CartHeader from "./_components/cart-header/CartHeader";
import CartItem from "./_components/cart-item/CartItem";
import EmptyCart from "./_components/empty-cart/EmptyCart";
import UpsellSection from "./_components/upsell-section/UpsellSection";
import BillSummary from "./_components/bill-summary/BillSummary";
import CheckoutFooter from "./_components/checkout-footer/CheckoutFooter";
import { upsellItemsConfig, deliveryFee, discount } from "./cart.config";
import { useCartStore } from "@/store/cart/cart.store";

interface CartPageProps {
    params: Promise<{ branchId: string }>;
}

const Cart = ({ params }: CartPageProps) => {
    const { branchId } = use(params);
    const cart = useCartStore((s) => s.cart);
    const isLoading = useCartStore((s) => s.isLoading);
    const error = useCartStore((s) => s.error);
    const fetchCart = useCartStore((s) => s.fetch);
    const removeItem = useCartStore((s) => s.remove);
    const updateItem = useCartStore((s) => s.update);

    useEffect(() => {
        fetchCart(branchId);
    }, [branchId, fetchCart]);

    const items = cart?.items ?? [];
    const subtotal = cart?.totals.subtotal ?? 0;
    const total = subtotal + deliveryFee - discount;

    return (
        <div className="pb-30 animate-in fade-in slide-in-from-right-8 duration-300">
            <CartHeader />

            <div className="px-5 mt-6 space-y-5">
                {isLoading && items.length === 0 ? (
                    <div className="text-center text-sm text-gray-400 py-10">Loading cart…</div>
                ) : error && items.length === 0 ? (
                    <div className="text-center text-sm text-red-500 py-10">{error}</div>
                ) : items.length === 0 ? (
                    <EmptyCart />
                ) : (
                    items.map((line) => (
                        <CartItem
                            key={line.cart_item_id}
                            item={{
                                id: line.cart_item_id,
                                title: line.name,
                                extras: [
                                    line.variant_label,
                                    ...line.extras.map((e) => e.label),
                                    line.note,
                                ]
                                    .filter(Boolean)
                                    .join(", "),
                                price: line.unit_price,
                                qty: line.quantity,
                                image: line.image?.url ?? "",
                            }}
                            onIncrease={() =>
                                updateItem(branchId, line.cart_item_id, { quantity: line.quantity + 1 })
                            }
                            onDecrease={() =>
                                updateItem(branchId, line.cart_item_id, { quantity: Math.max(1, line.quantity - 1) })
                            }
                            onRemove={() => removeItem(branchId, line.cart_item_id)}
                            unavailableReason={line.is_available ? undefined : line.unavailable_reason}
                        />
                    ))
                )}
            </div>

            {items.length > 0 && <UpsellSection items={upsellItemsConfig} />}

            {items.length > 0 && (
                <BillSummary
                    subtotal={subtotal}
                    deliveryFee={deliveryFee}
                    discount={discount}
                    total={total}
                    distance="2.5km"
                />
            )}

            {items.length > 0 && <CheckoutFooter total={total} />}
        </div>
    );
};

export default Cart;
