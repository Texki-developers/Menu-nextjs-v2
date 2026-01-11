"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/atoms/badge";
import ReviewCard from "./ReviewCard";
import "swiper/css";

export interface Review {
    id: string;
    user: string;
    rating: number;
    text: string;
    date: string;
    helpful?: number;
}

interface ProductReviewsProps {
    reviews?: Review[];
}

// Mock reviews data - will be replaced with API data
const MOCK_REVIEWS: Review[] = [
    {
        id: "1",
        user: "Sarah M.",
        rating: 5,
        text: "Absolutely delicious! The pasta was perfectly cooked and the sauce was amazing. Highly recommend!",
        date: "2 days ago",
        helpful: 12,
    },
    {
        id: "2",
        user: "John D.",
        rating: 4,
        text: "Great food, fast delivery. The portion size was generous. Will order again!",
        date: "5 days ago",
        helpful: 8,
    },
    {
        id: "3",
        user: "Emily R.",
        rating: 5,
        text: "Best pasta I've had in a while! The quality is outstanding and the price is reasonable.",
        date: "1 week ago",
        helpful: 15,
    },
    {
        id: "4",
        user: "Michael T.",
        rating: 4,
        text: "Very tasty and fresh. The delivery was on time and the packaging was excellent.",
        date: "2 weeks ago",
        helpful: 6,
    },
];

const ProductReviews = ({ reviews = MOCK_REVIEWS }: ProductReviewsProps) => {
    const t = useTranslations("product");

    if (reviews.length === 0) return null;

    return (
        <div className="mt-6 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    {t("verifiedReviews")}
                    <Badge type="new" size="sm">
                        {t("new")}
                    </Badge>
                </h3>
                <button className="text-orange-600 text-xs font-bold flex items-center gap-1 hover:text-orange-700 transition-colors">
                    {t("seeAll")} <ChevronRight size={12} />
                </button>
            </div>

            {/* Reviews Swiper */}
            <div className="px-4 -mx-4">
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={12}
                    className="overflow-y-visible"
                    freeMode={true}
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id} style={{ width: "auto" }}>
                            <ReviewCard review={review} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductReviews;

