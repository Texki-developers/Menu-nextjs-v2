"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const OffersBanner = () => {
    return (
        <Swiper
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}>
            <SwiperSlide>
                <div className=" min-h-[150px] bg-red-500"></div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=" min-h-[150px] bg-blue-500"></div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=" min-h-[150px] bg-green-500"></div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=" min-h-[150px] bg-yellow-500"></div>
            </SwiperSlide>
        </Swiper>
    );
};

export default OffersBanner;
