"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroBannerConfig } from "./offers-banner.config";
import { Button } from "@/components/atoms/button";

interface HeroOfferBannerProps {
    banner: HeroBannerConfig;
}

const HeroOfferBanner = ({ banner }: HeroOfferBannerProps) => {
    return (
        <div className="relative w-full h-[280px] rounded-3xl overflow-hidden shadow-2xl shadow-yellow-500/20 mb-8 group">
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-6 flex flex-col justify-center items-start text-white">
                <div className="bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-widest animate-pulse">
                    {banner.badge}
                </div>

                <h2 className="text-4xl font-black mb-1 leading-tight">{banner.discount}</h2>
                <h3 className="text-2xl font-bold text-yellow-300 mb-2">{banner.title}</h3>

                <p className="text-gray-200 text-sm max-w-[60%] mb-6 leading-relaxed">
                    {banner.description}
                </p>

                <Button
                    variant="outline"
                    size="base"
                    rounded="md"
                    rightIcon={<ArrowRight size={16} />}
                    className="bg-white text-black shadow-lg hover:bg-yellow-400"
                >
                    Claim Offer
                </Button>
            </div>
        </div>
    );
};

export default HeroOfferBanner;

