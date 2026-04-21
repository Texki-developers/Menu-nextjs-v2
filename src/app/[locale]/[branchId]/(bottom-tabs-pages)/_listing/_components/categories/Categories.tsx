"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "./CategoryCard";

import "swiper/css";

export interface CategoryItem {
    id: string;
    name: string;
    icon?: string;
    image_url?: string;
}

interface CategoriesProps {
    categories: CategoryItem[];
}

const ALL_ID = "all";

const scrollToSection = (id: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
};

const Categories = ({ categories }: CategoriesProps) => {
    const [slidesPerView, setSlidesPerView] = useState(3.5);
    const cardWidth = 80;
    const spaceBetween = 10;
    const containerPadding = 2;

    useEffect(() => {
        const calculate = () => {
            if (typeof window === "undefined") return 3.5;
            const windowWidth = Math.min(window.innerWidth, 440);
            const availableWidth = windowWidth - containerPadding;
            return availableWidth / (cardWidth + spaceBetween);
        };

        const update = () => setSlidesPerView(calculate());
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    if (!categories.length) return null;

    return (
        <div className="w-full overflow-hidden">
            <Swiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} freeMode={true}>
                <SwiperSlide key={ALL_ID}>
                    <CategoryCard title="All" onClick={() => scrollToSection(ALL_ID)} />
                </SwiperSlide>
                {categories.map((category) => (
                    <SwiperSlide key={category.id}>
                        <CategoryCard
                            title={category.name}
                            icon={category.icon}
                            imageUrl={category.image_url}
                            onClick={() => scrollToSection(category.id)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Categories;
