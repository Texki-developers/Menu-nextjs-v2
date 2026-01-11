import { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classnames";

const badgeVariants = cva(
    "inline-flex items-center justify-center font-bold uppercase tracking-wider",
    {
        variants: {
            type: {
                new: "bg-green-100 text-green-700",
                trending: "bg-purple-50 text-purple-600",
                sale: "bg-red-100 text-red-700",
                popular: "bg-orange-100 text-orange-700",
                featured: "bg-blue-100 text-blue-700",
                default: "bg-gray-100 text-gray-700",
            },
            size: {
                xs: "text-[8px] px-1 py-0.5 rounded",
                sm: "text-[10px] px-1.5 py-0.5 rounded",
                base: "text-xs px-2 py-1 rounded-md",
                lg: "text-sm px-2.5 py-1 rounded-lg",
            },
        },
        defaultVariants: {
            type: "default",
            size: "sm",
        },
    }
);

export interface BadgeProps
    extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
    children: React.ReactNode;
}

const Badge = ({ type, size, className, children, ...props }: BadgeProps) => {
    return (
        <span className={cn(badgeVariants({ type, size }), className)} {...props}>
            {children}
        </span>
    );
};

export default Badge;

