"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { ButtonHTMLAttributes } from "react";

interface FavoriteButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "onToggle"> {
    isFavorite?: boolean;
    onToggle?: (isFavorite: boolean) => void;
    className?: string;
}

const FavoriteButton = ({ isFavorite: controlledIsFavorite, onToggle, className, ...props }: FavoriteButtonProps) => {
    const t = useTranslations("common");
    const [internalIsFavorite, setInternalIsFavorite] = useState(false);

    // Use controlled state if provided, otherwise use internal state
    const isFavorite = controlledIsFavorite !== undefined ? controlledIsFavorite : internalIsFavorite;

    const handleToggle = () => {
        const newValue = !isFavorite;

        if (controlledIsFavorite === undefined) {
            setInternalIsFavorite(newValue);
        }

        onToggle?.(newValue);
    };

    return (
        <Button
            onClick={handleToggle}
            variant="ghost"
            iconOnly
            size="base"
            rounded="full"
            className={`bg-black/80 backdrop-blur-md text-white hover:bg-white hover:text-red-500 shadow-sm ${className || ""}`}
            aria-label={isFavorite ? t("removeFromFavorites") : t("addToFavorites")}
            {...props}>
            <Heart
                size={20}
                fill={isFavorite ? "currentColor" : "none"}
                className={isFavorite ? "text-red-500" : ""}
            />
        </Button>
    );
};

export default FavoriteButton;
