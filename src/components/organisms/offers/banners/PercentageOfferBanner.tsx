"use client";

import { cn } from "@/utils/classnames";

interface PercentageOfferBannerProps {
    percentage?: number;
    title?: string;
    description?: string;
    backgroundColor?: string;
}

const PercentageOfferBanner: React.FC<PercentageOfferBannerProps> = ({
    percentage = 50,
    title = "Special Offer",
    description = "Get amazing deals on your favorite items",
    backgroundColor = "#FFD700",
}) => {
    return (
        <div className={cn("w-full h-[250px] flex items-center px-6 rounded-2xl")} style={{ backgroundColor: backgroundColor }}>
            <div className="flex flex-col gap-2">
                <div className="text-5xl font-bold text-gray-900">{percentage}% OFF</div>
                <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
                <p className="text-lg text-gray-700">{description}</p>
            </div>
        </div>
    );
};

export default PercentageOfferBanner;
