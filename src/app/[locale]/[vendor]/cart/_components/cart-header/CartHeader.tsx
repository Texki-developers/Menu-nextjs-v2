"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/atoms/button";

interface CartHeaderProps {
    tableNumber?: string;
    deliveryTime?: string;
}

const CartHeader = ({
    tableNumber = "Table 12",
    deliveryTime = "Ready in 15-20 mins",
}: CartHeaderProps) => {
    const router = useRouter();
    const { vendor }: { vendor: string } = useParams();

    const handleBack = () => {
        // Check if there's history to go back to
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            // If no history, navigate to home
            router.push(`/${vendor}/`);
        }
    };

    return (
        <div className="bg-white p-5 pb-6 rounded-b-3xl shadow-sm border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleBack}
                        variant="ghost"
                        iconOnly
                        size="base"
                        rounded="full"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={20} className="text-gray-900" />
                    </Button>
                    <h2 className="text-lg font-bold text-gray-900">Cart</h2>
                </div>
                <Button variant="text-destructive" size="sm" rounded="md">
                    Clear
                </Button>
            </div>

            {/* Table Number Card */}
            <div className="flex items-center gap-4 bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                <div className="bg-white p-2.5 rounded-full shadow-sm text-orange-600">
                    <div className="w-5 h-5 flex items-center justify-center font-bold text-orange-600">
                        #
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{tableNumber}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{deliveryTime}</p>
                </div>
                {/* <button>
                    <ChevronRight size={18} className="text-orange-300" />
                </button> */}
            </div>
        </div>
    );
};

export default CartHeader;

