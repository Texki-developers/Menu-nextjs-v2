import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import Price from "@/components/organisms/price/Price";
import { CartItemConfig } from "../../cart.config";
import { Button } from "@/components/atoms/button";

interface CartItemProps {
    item: CartItemConfig;
}

const CartItem = ({ item }: CartItemProps) => {
    return (
        <div className="group flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 relative overflow-hidden">
            {/* Image */}
            <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 relative">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-sm leading-tight pr-4">
                            {item.title}
                        </h4>
                        <Button variant="ghost" iconOnly size="sm" className="text-gray-300 hover:text-red-500">
                            <Trash2 size={16} />
                        </Button>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 leading-normal line-clamp-2">
                        {item.extras}
                    </p>
                </div>

                {/* Price & Stepper */}
                <div className="flex justify-between items-end mt-2">
                    <Price
                        price={item.price * item.qty}
                        size="base"
                        color="default"
                    />

                    {/* Thumb-friendly Stepper */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1 border border-gray-100 shadow-inner">
                        <Button
                            variant="outline"
                            iconOnly
                            size="xs"
                            rounded="md"
                            className="bg-white hover:text-red-500"
                        >
                            <Minus size={14} strokeWidth={3} />
                        </Button>
                        <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                        <Button
                            variant="outline"
                            iconOnly
                            size="xs"
                            rounded="md"
                            className="bg-white hover:text-green-600"
                        >
                            <Plus size={14} strokeWidth={3} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;

