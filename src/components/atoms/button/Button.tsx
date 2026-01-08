import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classnames";

const buttonVariants = cva(
    "inline-flex items-center justify-center font-bold transition-all disabled:opacity-50 disabled:pointer-events-none focus:outline-none",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/20",
                secondary: "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98] shadow-lg shadow-gray-300",
                outline: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95 shadow-sm",
                ghost: "bg-transparent text-gray-600 hover:bg-gray-100 active:scale-95",
                destructive: "bg-red-500 text-white hover:bg-red-600 active:scale-95 shadow-lg shadow-red-200",
                "destructive-outline": "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 active:scale-95",
                "orange-ghost": "bg-orange-50 text-orange-700 hover:bg-orange-100 active:scale-95",
                text: "text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:scale-95",
                "text-primary": "text-primary hover:text-primary/80 hover:bg-primary/10 active:scale-95",
                "text-destructive": "text-red-500 hover:text-red-600 hover:bg-red-50 active:scale-95",
            },
            size: {
                xs: "text-xs px-2 py-1 h-7",
                sm: "text-sm px-3 py-1.5 h-8",
                base: "text-sm px-4 py-2 h-10",
                lg: "text-base px-6 py-3 h-12",
                xl: "text-lg px-8 py-4 h-14",
            },
            rounded: {
                none: "rounded-none",
                sm: "rounded-lg",
                md: "rounded-xl",
                lg: "rounded-2xl",
                full: "rounded-full",
            },
            fullWidth: {
                true: "w-full",
                false: "",
            },
            iconOnly: {
                true: "aspect-square p-0",
                false: "",
            },
        },
        compoundVariants: [
            {
                iconOnly: true,
                size: "xs",
                className: "w-7 h-7",
            },
            {
                iconOnly: true,
                size: "sm",
                className: "w-8 h-8",
            },
            {
                iconOnly: true,
                size: "base",
                className: "w-10 h-10",
            },
            {
                iconOnly: true,
                size: "lg",
                className: "w-12 h-12",
            },
            {
                iconOnly: true,
                size: "xl",
                className: "w-14 h-14",
            },
        ],
        defaultVariants: {
            variant: "primary",
            size: "base",
            rounded: "lg",
            fullWidth: false,
            iconOnly: false,
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            rounded,
            fullWidth,
            iconOnly,
            leftIcon,
            rightIcon,
            isLoading,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        rounded,
                        fullWidth,
                        iconOnly,
                        className,
                    })
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        {!iconOnly && <span>Loading...</span>}
                    </span>
                ) : (
                    <>
                        {leftIcon && <span className={cn(children && "mr-2")}>{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className={cn(children && "ml-2")}>{rightIcon}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;

