"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Star, ChevronRight, ThumbsUp } from "lucide-react";
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
        <div className="mt-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    {t("verifiedReviews")}
                    <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded">
                        {t("new")}
                    </span>
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
                            <div className="snap-center bg-gray-50 border border-gray-100 rounded-2xl p-4 w-64 shrink-0 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                {review.user.charAt(0)}
                                            </div>
                                            <span className="text-xs font-bold text-gray-900">
                                                {review.user}
                                            </span>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={10}
                                                    className={
                                                        i < review.rating
                                                            ? "fill-orange-400 text-orange-400"
                                                            : "text-gray-300"
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                        "{review.text}"
                                    </p>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                                    <span className="text-[10px] text-gray-400">{review.date}</span>
                                    <button className="text-[10px] text-gray-500 font-medium flex items-center gap-1 hover:text-gray-800 transition-colors">
                                        <ThumbsUp size={10} /> {t("helpful")}
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductReviews;

