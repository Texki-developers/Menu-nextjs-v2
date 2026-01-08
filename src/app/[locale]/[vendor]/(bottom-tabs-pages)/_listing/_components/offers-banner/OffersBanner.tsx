"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import HeroOfferBanner from "@/components/organisms/offers/banners/HeroOfferBanner";
import { Pagination, Autoplay } from "swiper/modules";
import { heroBannerConfig } from "@/components/organisms/offers/banners/hero-banner.config";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./OffersBanner.module.css";

const OffersBanner = () => {
    return (
        <div className={`w-full overflow-hidden ${styles.swiperWrapper}`}>
            <Swiper
                slidesPerView={1}
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                }}
                spaceBetween={12}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}>
                {heroBannerConfig.map((banner) => (
                    <SwiperSlide key={banner.id} style={{ width: "100%" }}>
                        <HeroOfferBanner banner={banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default OffersBanner;
