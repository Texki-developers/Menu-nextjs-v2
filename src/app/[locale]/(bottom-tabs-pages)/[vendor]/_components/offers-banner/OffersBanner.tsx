"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import PercentageOfferBanner from "@/components/organisms/offers/banners/PercentageOfferBanner";
import { Pagination, Autoplay } from 'swiper/modules';

import "swiper/css";
import 'swiper/css/pagination';
import styles from './OffersBanner.module.css';

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
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1.5,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}>
                <SwiperSlide style={{ width: "100%" }}>
                    <PercentageOfferBanner />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                    <PercentageOfferBanner
                        percentage={30}
                        backgroundColor="#FF6B6B"
                    />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                    <PercentageOfferBanner
                        percentage={40}
                        backgroundColor="#4ECDC4"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default OffersBanner;
