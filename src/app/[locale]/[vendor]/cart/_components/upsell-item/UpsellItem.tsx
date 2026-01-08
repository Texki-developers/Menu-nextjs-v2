import Image from "next/image";
import { Plus } from "lucide-react";
import Price from "@/components/organisms/price/Price";
import { UpsellItemConfig } from "../../cart.config";
import { Button } from "@/components/atoms/button";

interface UpsellItemProps {
    item: UpsellItemConfig;
}

const UpsellItem = ({ item }: UpsellItemProps) => {
    return (
        <div className="snap-center shrink-0 w-32 bg-white rounded-xl p-2 border border-border flex flex-col items-center text-center relative">
            <Button
                variant="outline"
                iconOnly
                size="xs"
                rounded="full"
                className="absolute top-2 right-2 bg-white shadow text-green-600 z-10"
            >
                <Plus size={14} strokeWidth={3} />
            </Button>
            <div className="w-16 h-16 rounded-full relative overflow-hidden mb-2 shadow-sm">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>
            <h4 className="text-xs font-bold text-gray-700 leading-tight mb-1">
                {item.title}
            </h4>
            <Price
                price={item.price}
                size="xs"
                color="muted"
                className="items-center"
            />
        </div>
    );
};

export default UpsellItem;

