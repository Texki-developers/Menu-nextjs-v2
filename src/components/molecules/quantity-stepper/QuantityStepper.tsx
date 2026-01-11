"use client";

import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { cn } from "@/utils/classnames";

interface QuantityStepperProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min?: number;
    max?: number;
    className?: string;
    variant?: "default" | "compact" | "dark";
}

const QuantityStepper = ({
    quantity,
    onIncrease,
    onDecrease,
    min = 1,
    max,
    className,
    variant = "default",
}: QuantityStepperProps) => {
    const t = useTranslations("common");
    const canDecrease = quantity > min;
    const canIncrease = max === undefined || quantity < max;

    const variants = {
        default: "bg-gray-100 rounded-xl h-14 px-2 shadow-inner",
        compact: "bg-gray-50 rounded-xl p-1 border border-gray-100 shadow-inner",
        dark: "bg-gray-900 rounded-xl overflow-hidden shadow-md shadow-gray-200 h-11",
    };

    const buttonVariants = {
        default: {
            variant: "ghost" as const,
            size: "base" as const,
            className: "w-10 h-full flex items-center justify-center text-gray-600 active:scale-75 transition-transform",
        },
        compact: {
            variant: "outline" as const,
            size: "xs" as const,
            className: "bg-white hover:text-red-500",
        },
        dark: {
            variant: "ghost" as const,
            size: "base" as const,
            className: "w-12 h-full text-white hover:bg-white/20 active:bg-white/30",
        },
    };

    const textVariants = {
        default: "w-8 text-center font-bold text-lg",
        compact: "text-sm font-bold w-4 text-center",
        dark: "text-white text-sm font-bold w-8 text-center tabular-nums",
    };

    const currentVariant = buttonVariants[variant];
    const currentTextStyle = textVariants[variant];

    return (
        <div className={cn("flex items-center", variants[variant], className)}>
            <Button
                onClick={onDecrease}
                variant={currentVariant.variant}
                iconOnly
                size={currentVariant.size}
                rounded={variant === "dark" ? "none" : variant === "compact" ? "md" : "none"}
                disabled={!canDecrease}
                className={cn(
                    currentVariant.className,
                    !canDecrease && "opacity-50 cursor-not-allowed"
                )}
                aria-label={t("decreaseQuantity")}
            >
                <Minus size={variant === "compact" ? 14 : 20} strokeWidth={variant === "compact" ? 3 : undefined} />
            </Button>
            <span className={currentTextStyle}>{quantity}</span>
            <Button
                onClick={onIncrease}
                variant={currentVariant.variant}
                iconOnly
                size={currentVariant.size}
                rounded={variant === "dark" ? "none" : variant === "compact" ? "md" : "none"}
                disabled={!canIncrease}
                className={cn(
                    currentVariant.className,
                    variant === "compact" && "hover:text-green-600",
                    !canIncrease && "opacity-50 cursor-not-allowed"
                )}
                aria-label={t("increaseQuantity")}
            >
                <Plus size={variant === "compact" ? 14 : 20} strokeWidth={variant === "compact" ? 3 : undefined} />
            </Button>
        </div>
    );
};

export default QuantityStepper;

