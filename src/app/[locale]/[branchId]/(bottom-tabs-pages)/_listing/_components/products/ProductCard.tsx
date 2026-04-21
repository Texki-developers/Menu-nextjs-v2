"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import Price from "@/components/organisms/price/Price";
import { Button } from "@/components/atoms/button";
import { QuantityStepper } from "@/components/molecules/quantity-stepper";
import { useCartStore } from "@/store/cart/cart.store";
import type { ProductConfig } from "./products.config";

interface ProductCardProps {
    item: ProductConfig;
}

const ProductCard = ({ item }: ProductCardProps) => {
    const router = useRouter();
    const params = useParams();
    const branchId = params?.branchId as string | undefined;

    const hasVariants = (item.sizes?.length ?? 0) > 0;
    const hasExtras = (item.extras?.length ?? 0) > 0;
    const needsCustomization = hasVariants || hasExtras;

    const cart = useCartStore((s) => s.cart);
    const isMutating = useCartStore((s) => s.isMutating);
    const addItem = useCartStore((s) => s.add);
    const updateItem = useCartStore((s) => s.update);
    const removeItem = useCartStore((s) => s.remove);

    const plainLine = cart?.items.find(
        (line) =>
            line.menu_item_id === item.id &&
            !line.variant_uuid &&
            line.extras.length === 0,
    );
    const qty = plainLine?.quantity ?? 0;

    const stop = (e: React.MouseEvent) => e.stopPropagation();

    const handleCardClick = () => {
        if (branchId && item.slug) router.push(`/${branchId}/${item.slug}`);
    };

    const handleAdd = async (e: React.MouseEvent) => {
        stop(e);
        if (!branchId) return;
        if (needsCustomization) {
            router.push(`/${branchId}/${item.slug}`);
            return;
        }
        try {
            await addItem(branchId, { menu_item_id: item.id, quantity: 1 });
        } catch (err) {
            console.error("[listing add] failed:", err);
        }
    };

    const handleIncrease = async () => {
        if (!branchId || !plainLine) return;
        try {
            await updateItem(branchId, plainLine.cart_item_id, {
                quantity: plainLine.quantity + 1,
            });
        } catch (err) {
            console.error("[listing increase] failed:", err);
        }
    };

    const handleDecrease = async () => {
        if (!branchId || !plainLine) return;
        try {
            if (plainLine.quantity <= 1) {
                await removeItem(branchId, plainLine.cart_item_id);
            } else {
                await updateItem(branchId, plainLine.cart_item_id, {
                    quantity: plainLine.quantity - 1,
                });
            }
        } catch (err) {
            console.error("[listing decrease] failed:", err);
        }
    };

    return (
        <div
            className="bg-white p-3 h-full rounded-2xl border border-gray-100 shadow-sm flex gap-4 relative overflow-hidden group cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="w-30 shrink-0 relative rounded-xl overflow-hidden bg-gray-100">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
                />
                {item.bestseller && (
                    <div className="absolute top-0 left-0 bg-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-br-lg z-10 text-black shadow-sm">
                        BESTSELLER
                    </div>
                )}
                <Button
                    variant="ghost"
                    iconOnly
                    size="base"
                    rounded="full"
                    className="absolute top-2 right-2 bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-red-500 shadow-sm z-10"
                    aria-label="Add to favorites"
                    onClick={stop}
                >
                    <Heart size={20} />
                </Button>
            </div>

            <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                    <div className="flex items-start justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-3.5 h-3.5 border ${item.isVeg ? "border-green-600" : "border-red-600"} flex items-center justify-center p-[1.5px]`}
                            >
                                <div
                                    className={`w-full h-full rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`}
                                ></div>
                            </div>
                            {needsCustomization && (
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium tracking-tight">
                                    Customizable
                                </span>
                            )}
                        </div>
                        {item.rating && (
                            <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-md">
                                <Star size={10} fill="currentColor" />
                                <span className="text-[10px] font-bold">{item.rating}</span>
                            </div>
                        )}
                    </div>

                    <h3 className="font-bold text-gray-900 text-[15px] leading-tight mb-1">
                        {item.title}
                    </h3>
                    {item.description && (
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {item.description}
                        </p>
                    )}
                </div>

                <div className="flex justify-between items-center mt-3">
                    <Price
                        price={item.price}
                        originalPrice={item.originalPrice}
                        size="lg"
                        color="default"
                        offerPriceSize="xs"
                        offerPriceColor="gray"
                    />

                    {qty === 0 ? (
                        <Button
                            onClick={handleAdd}
                            variant="secondary"
                            size="base"
                            rounded="md"
                            disabled={isMutating}
                        >
                            Add
                        </Button>
                    ) : (
                        <div onClick={stop}>
                            <QuantityStepper
                                quantity={qty}
                                onIncrease={handleIncrease}
                                onDecrease={handleDecrease}
                                min={0}
                                variant="dark"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
