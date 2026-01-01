"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
    imageUrl: string;
    title: string;
    price: string;
    currency?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    imageUrl,
    title,
    price,
    currency = "AED",
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden relative">
            {/* Image Section */}
            <div className="w-full h-48 relative">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="relative">
                <h3 className="text-lg pt-4 px-4 font-semibold text-black">{title}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-lg px-4 pb-4 font-medium text-black">
                        {currency} {price}
                    </span>
                    <button className="p-4 bg-gray-200 rounded-tl-2xl transition-colors">
                        <ShoppingCart className="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

