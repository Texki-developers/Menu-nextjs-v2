"use client";

import Image from "next/image";

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
            </div>
        </div>
    );
};

export default ProductMedia;
