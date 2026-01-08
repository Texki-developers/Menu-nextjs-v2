"use client";

import { ReactNode } from "react";
import { cn } from "@/utils/classnames";

interface RadioOptionProps {
    label: string;
    rightLabel?: ReactNode;
    isSelected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
}

const RadioOption = ({
    label,
    rightLabel,
    isSelected = false,
    disabled = false,
    loading = false,
    onClick,
    className,
}: RadioOptionProps) => {
    const handleClick = () => {
        if (!disabled && !loading && onClick) {
            onClick();
        }
    };

    return (
        <div
            className={cn(
                "border-2 rounded-2xl p-3 flex items-center justify-between gap-4 transition-colors",
                isSelected ? "border-black" : "border-gray-100",
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400",
                className
            )}
            onClick={handleClick}
        >
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        "w-6 h-6 rounded-full border relative before:content-[''] before:w-[70%] before:h-[70%] before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 transition-all",
                        isSelected
                            ? "border-black bg-white before:bg-black"
                            : "border-gray-100 before:bg-transparent",
                        loading && "opacity-50"
                    )}
                >
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
                <span
                    className={cn(
                        "font-medium",
                        isSelected ? "text-gray-900" : "text-gray-500",
                        disabled && "opacity-50"
                    )}
                >
                    {label}
                </span>
            </div>
            {rightLabel && (
                <div
                    className={cn(
                        disabled && "opacity-50"
                    )}
                >
                    {rightLabel}
                </div>
            )}
        </div>
    );
};

export default RadioOption;

