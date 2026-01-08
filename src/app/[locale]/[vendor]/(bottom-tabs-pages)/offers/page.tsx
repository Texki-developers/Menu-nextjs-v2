import { Timer } from "lucide-react";
import OfferCard from "./_components/offer-card/OfferCard";
import { offersConfig } from "./offers.config";

const page = () => {
    return (
        <div>
            <div className="flex flex-col gap-4 p-4 min-h-dvh bg-background">
                <h1 className="text-2xl font-bold">Exclusive Offers</h1>
                <div className="bg-linear-to-r from-primary to-secondary rounded-xl p-4 text-white flex items-center justify-between shadow-lg">
                    <div>
                        <p className="text-xs font-medium opacity-90 mb-1">Flash Sale Ends In</p>
                        <div className="flex items-center gap-2 font-mono text-xl font-bold">
                            <span>02</span>:<span>45</span>:<span>12</span>
                        </div>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <Timer size={24} />
                    </div>
                </div>
                <h2 className="text-lg font-bold text-gray-800">Today&apos;s Top Picks</h2>
                <div className="flex flex-col gap-4">
                    {offersConfig.map((offer) => (
                        <OfferCard
                            key={offer.id}
                            item={offer}
                            isHighlighted={offer.isHighlighted}
                            aiReason={offer.aiReason}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;
