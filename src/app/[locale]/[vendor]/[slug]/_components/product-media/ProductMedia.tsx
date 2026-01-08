"use client";

import Image from "next/image";
import { BackButton } from "@/components/atoms/back-button";
import { FavoriteButton } from "@/components/atoms/favorite-button";

interface ProductMediaProps {
    images?: string[];
    alt?: string;
}

const ProductMedia = ({ images = [], alt = "Product image" }: ProductMediaProps) => {
    const displayImage = images.length > 0 ? images[0] : "/images/temp/image.png";

    return (
        <div className="w-full container fixed top-0 left-1/2 -translate-x-1/2 aspect-square">
            <div className="relative w-full h-full">
                <Image
                    src={displayImage}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Back Button */}
                <div className="absolute top-4 left-4 z-10">
                    <BackButton withBlur />
                </div>

                {/* Favorite Button */}
                <div className="absolute top-4 right-4 z-10">
                    <FavoriteButton />
                </div>
            </div>
        </div>
    );
};

export default ProductMedia;
