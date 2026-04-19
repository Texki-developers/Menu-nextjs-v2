"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { categoriesConfig } from "./categories.config";
import CategoryCard from "./CategoryCard";

import "swiper/css";

const Categories = () => {
    const [slidesPerView, setSlidesPerView] = useState(3.5);
    const cardWidth = 80;
    const spaceBetween = 10;
    const containerPadding = 2; // Approximate padding (px-4 on both sides = 16px * 2)

    const calculateSlidesPerView = () => {
        console.log("🚀 ~ calculateSlidesPerView ~ windowWidth:")
        if (typeof window === "undefined") return 3.5;

        const windowWidth = Math.min(window.innerWidth, 440);
        console.log("🚀 ~ calculateSlidesPerView ~ windowWidth:", windowWidth)
        const availableWidth = windowWidth - containerPadding;
        console.log("🚀 ~ calculateSlidesPerView ~ availableWidth:", availableWidth)
        const cardWithSpacing = cardWidth + spaceBetween;
        console.log("🚀 ~ calculateSlidesPerView ~ cardWithSpacing:", cardWithSpacing)
        const calculated = availableWidth / cardWithSpacing;
        console.log("🚀 ~ calculateSlidesPerView ~ calculated:", calculated)

        return calculated;
    };

    useEffect(() => {
        const updateSlidesPerView = () => {
            setSlidesPerView(calculateSlidesPerView());
        };

        // Set initial value
        updateSlidesPerView();

        // Update on resize
        window.addEventListener("resize", updateSlidesPerView);

        return () => {
            window.removeEventListener("resize", updateSlidesPerView);
        };
    }, []);

    return (
        <div className="w-full overflow-hidden">
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                freeMode={true}>
                {categoriesConfig.map((category) => (
                    <SwiperSlide key={category.id}>
                        <CategoryCard imageUrl={category.imageUrl} title={category.title} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Categories;

