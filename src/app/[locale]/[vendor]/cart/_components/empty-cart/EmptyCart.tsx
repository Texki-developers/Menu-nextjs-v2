"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";

const EmptyCart = () => {
    const t = useTranslations("cart");

    return (
        <div className="text-center py-10 opacity-50">
            <ShoppingBag size={48} className="mx-auto mb-3" />
            <p>{t("empty")}</p>
        </div>
    );
};

export default EmptyCart;

