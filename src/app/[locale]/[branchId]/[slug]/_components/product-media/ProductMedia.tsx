"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ProductMediaProps {
    images?: string[];
    alt?: string;
}

const ProductMedia = ({ images = [], alt = "Product image" }: ProductMediaProps) => {
    const pics = images.filter(Boolean);
    const displayImages = pics.length > 0 ? pics : ["/images/temp/image.png"];
    const [active, setActive] = useState(0);
    const scrollerRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        const el = scrollerRef.current;
        if (!el) return;
        const idx = Math.round(el.scrollLeft / el.clientWidth);
        if (idx !== active) setActive(idx);
    };

    return (
        <div className="relative w-full aspect-square bg-gray-100">
            <div
                ref={scrollerRef}
                onScroll={onScroll}
                className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
                {displayImages.map((src, i) => (
                    <div key={i} className="relative w-full h-full shrink-0 snap-center">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="(max-width: 440px) 100vw, 440px"
                            className="object-cover"
                            priority={i === 0}
                        />
                    </div>
                ))}
            </div>

            {displayImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {displayImages.map((_, i) => (
                        <span
                            key={i}
                            className="h-1.5 rounded-full transition-all"
                            style={{
                                width: i === active ? 16 : 6,
                                background: i === active ? "#EC5A2A" : "rgba(255,255,255,0.7)",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductMedia;
