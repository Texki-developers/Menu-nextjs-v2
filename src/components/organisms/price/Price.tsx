import { ReactNode } from "react";
import { cn } from "@/utils/classnames";
import { cva, type VariantProps } from "class-variance-authority";

const priceVariants = cva("font-extrabold", {
    variants: {
        size: {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
        },
        color: {
            default: "text-foreground",
            muted: "text-muted-foreground",
            primary: "text-primary",
            secondary: "text-secondary-foreground",
            destructive: "text-destructive",
        },
    },
    defaultVariants: {
        size: "base",
        color: "default",
    },
});

const offerPriceVariants = cva("font-semibold line-through", {
    variants: {
        size: {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
        },
        color: {
            default: "text-muted-foreground",
            muted: "text-muted-foreground/70",
            gray: "text-gray-400",
        },
    },
    defaultVariants: {
        size: "xs",
        color: "default",
    },
});

export interface PriceProps extends VariantProps<typeof priceVariants> {
    price: string | number;
    originalPrice?: string | number;
    currency?: string | ReactNode;
    offerPriceSize?: VariantProps<typeof offerPriceVariants>["size"];
    offerPriceColor?: VariantProps<typeof offerPriceVariants>["color"];
    className?: string;
    showCurrency?: boolean;
}

const Price = ({
    price,
    originalPrice,
    currency = "AED",
    size = "base",
    color = "default",
    offerPriceSize = "xs",
    offerPriceColor = "default",
    className,
    showCurrency = true,
}: PriceProps) => {
    return (
        <div className={cn("flex flex-col", className)}>
            {originalPrice && (
                <span
                    className={cn(
                        offerPriceVariants({ size: offerPriceSize, color: offerPriceColor }),
                        "mb-0"
                    )}>
                    {showCurrency && currency && (
                        <>
                            {typeof currency === "string" ? `${currency} ` : currency}
                        </>
                    )}
                    {originalPrice}
                </span>
            )}
            <span className={cn(priceVariants({ size, color }))}>
                {showCurrency && currency && (
                    <>
                        {typeof currency === "string" ? `${currency} ` : currency}
                    </>
                )}
                {price}
            </span>
        </div>
    );
};

export default Price;

