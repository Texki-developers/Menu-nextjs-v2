import Image from "next/image";
import { Sparkles, Tag, Plus } from "lucide-react";
import Price from "@/components/organisms/price/Price";
import { Button } from "@/components/atoms/button";

interface OfferItem {
    image: string;
    title: string;
    discount: string;
    description: string;
    originalPrice: string | number;
    price: string | number;
    btnColor: string;
}

interface OfferCardProps {
    item: OfferItem;
    isHighlighted?: boolean;
    aiReason?: string;
}

const OfferCard = ({ item, isHighlighted, aiReason }: OfferCardProps) => {
    return (
        <div
            className={`group relative mb-6 rounded-3xl bg-white shadow-lg shadow-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
            {/* AI Recommendation Badge - Floating */}
            {isHighlighted && aiReason && (
                <div className="absolute top-4 left-4 right-4 z-30 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-purple-100 flex items-start gap-3">
                        <div className="bg-purple-100 p-1.5 rounded-full shrink-0">
                            <Sparkles
                                className="text-primary"
                                size={14}
                            />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-0.5">AI Pick</p>
                            <p className="text-sm font-medium text-gray-800 leading-tight">{aiReason}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Image Section */}
            <div className="relative aspect-3/2 w-full overflow-hidden">
                {item?.image && (
                    <Image
                        src={item?.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                )}

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex justify-between items-end mb-1">
                        <div>
                            <div
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-sm`}>
                                <Tag
                                    size={12}
                                    fill="currentColor"
                                />
                                {item.discount}
                            </div>
                            <h3 className="text-2xl font-bold leading-tight shadow-black drop-shadow-md">{item.title}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details & Action Section */}
            <div className="p-5 pt-4 bg-white">
                <p className="text-sm text-gray-500 mb-5 leading-relaxed font-medium line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between">
                    <Price
                        price={item.price}
                        originalPrice={item.originalPrice}
                        size="2xl"
                        color="default"
                        offerPriceSize="xs"
                        offerPriceColor="gray"
                    />

                    <Button
                        variant="primary"
                        size="base"
                        rounded="full"
                        leftIcon={<Plus size={18} strokeWidth={3} />}
                        className={`${item.btnColor} shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:brightness-105`}
                    >
                        Add to Order
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
