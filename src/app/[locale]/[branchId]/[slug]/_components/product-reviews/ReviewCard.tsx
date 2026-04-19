"use client";

import { Star } from "lucide-react";
import { Review } from "./ProductReviews";

interface ReviewCardProps {
    review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
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
                    &ldquo;{review.text}&rdquo;
                </p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="text-[10px] text-gray-400">{review.date}</span>
            </div>
        </div>
    );
};

export default ReviewCard;

