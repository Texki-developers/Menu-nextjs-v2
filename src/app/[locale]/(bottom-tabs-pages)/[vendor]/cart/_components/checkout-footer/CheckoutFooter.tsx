import { ArrowRight } from "lucide-react";
import Price from "@/components/organisms/price/Price";

interface CheckoutFooterProps {
    total: number;
}

const CheckoutFooter = ({ total }: CheckoutFooterProps) => {
    return (
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-8 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 rounded-t-3xl max-w-md mx-auto">
            <button className="group w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex justify-between items-center px-6 shadow-lg shadow-gray-300 active:scale-[0.98] transition-transform hover:bg-gray-800">
                <span className="flex items-center gap-2">
                    Checkout
                    <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </span>
                <Price
                    price={total}
                    size="sm"
                    color="destructive"
                    className="bg-white/20 px-2 py-0.5 rounded items-center"
                />
            </button>
        </div>
    );
};

export default CheckoutFooter;
