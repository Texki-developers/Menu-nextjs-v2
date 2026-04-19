"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import UpsellItem from "../upsell-item/UpsellItem";
import { UpsellItemConfig } from "../../cart.config";

import "swiper/css";

interface UpsellSectionProps {
    items: UpsellItemConfig[];
}

const UpsellSection = ({ items }: UpsellSectionProps) => {
    const t = useTranslations("cart");
    if (items.length === 0) return null;

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between px-5 mb-3">
                <h3 className="font-bold text-gray-800 text-sm">{t("completeYourMeal")}</h3>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                    {t("trending")}
                </span>
            </div>
            <div className="px-5 pb-6">
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={16}
                    className="overflow-y-visible"
                    freeMode={true}>
                    {items.map((upsell) => (
                        <SwiperSlide key={upsell.id} style={{ width: "auto" }}>
                            <UpsellItem item={upsell} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default UpsellSection;

