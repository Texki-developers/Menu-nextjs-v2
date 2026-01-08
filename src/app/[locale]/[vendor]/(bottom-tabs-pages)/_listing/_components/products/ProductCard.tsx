"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import Price from "@/components/organisms/price/Price";
import { Button } from "@/components/atoms/button";
import { QuantityStepper } from "@/components/molecules/quantity-stepper";

interface ProductCardProps {
    item: {
        id: string;
        slug: string;
        image: string;
        title: string;
        price: string | number;
        originalPrice?: string | number;
        description?: string;
        rating?: number;
        isVeg?: boolean;
        isCustomizable?: boolean;
        bestseller?: boolean;
    };
}

const ProductCard = ({ item }: ProductCardProps) => {
    const [qty, setQty] = useState(0);
    const router = useRouter();
    const params = useParams();
    const vendor = params?.vendor as string | undefined;

    const handleAdd = () => setQty(1);
    const handleInc = () => setQty((q) => q + 1);
    const handleDec = () => setQty((q) => (q - 1 > 0 ? q - 1 : 0));

    const handleCardClick = () => {
        if (vendor && item.slug) {
            router.push(`/${vendor}/${item.slug}`);
        }
    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="bg-white p-3 h-full rounded-2xl border border-gray-100 shadow-sm flex gap-4 relative overflow-hidden group cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Product Image Section */}
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

                {/* BIGGER FAVORITE BUTTON */}
                <Button
                    variant="ghost"
                    iconOnly
                    size="base"
                    rounded="full"
                    className="absolute top-2 right-2 bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-red-500 shadow-sm z-10"
                    aria-label="Add to favorites"
                    onClick={handleButtonClick}
                >
                    <Heart
                        size={20}
                        fill={qty > 0 ? "currentColor" : "none"}
                        className={qty > 0 ? "text-red-500" : ""}
                    />
                </Button>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                    <div className="flex items-start justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                            {/* Veg/Non-Veg Indicator */}
                            <div
                                className={`w-3.5 h-3.5 border ${item.isVeg ? "border-green-600" : "border-red-600"
                                    } flex items-center justify-center p-[1.5px]`}>
                                <div
                                    className={`w-full h-full rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"
                                        }`}></div>
                            </div>
                            {item.isCustomizable && (
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

                    {/* Smart Action Button (Stepper) - OPTIMIZED FOR TOUCH */}
                    {qty === 0 ? (
                        <Button
                            onClick={(e) => {
                                handleButtonClick(e);
                                handleAdd();
                            }}
                            variant="secondary"
                            size="base"
                            rounded="md"
                        >
                            Add
                        </Button>
                    ) : (
                        <div onClick={handleButtonClick}>
                            <QuantityStepper
                                quantity={qty}
                                onIncrease={handleInc}
                                onDecrease={handleDec}
                                min={1}
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

