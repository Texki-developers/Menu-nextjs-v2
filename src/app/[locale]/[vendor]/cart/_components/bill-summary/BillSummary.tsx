"use client";

import { useTranslations } from "next-intl";
import Price from "@/components/organisms/price/Price";

interface BillSummaryProps {
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    distance?: string;
}

const BillSummary = ({ subtotal, deliveryFee, discount, total, distance }: BillSummaryProps) => {
    const t = useTranslations("cart");
    return (
        <div className="bg-white mx-5 mt-2 rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                    <span>{t("subtotal")}</span>
                    <Price price={subtotal} size="sm" color="default" className="items-center" />
                </div>
                <div className="flex justify-between text-gray-500">
                    <span className="flex items-center gap-1">
                        {t("deliveryFee")}{" "}
                        {distance && (
                            <span className="text-[10px] bg-gray-100 px-1 rounded">
                                {distance}
                            </span>
                        )}
                    </span>
                    <Price price={deliveryFee} size="sm" color="default" className="items-center" />
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>{t("discount")}</span>
                        <Price price={-discount} size="sm" color="destructive" className="items-center" />
                    </div>
                )}
                {/* Dashed Separator */}
                <div className="border-t border-dashed border-gray-200 my-2"></div>
                <div className="flex justify-between items-center text-base">
                    <span className="font-bold text-gray-900">{t("grandTotal")}</span>
                    <Price price={total} size="xl" color="default" />
                </div>
            </div>
        </div>
    );
};

export default BillSummary;
