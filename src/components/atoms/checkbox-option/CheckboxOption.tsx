"use client";

import { Check } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/utils/classnames";

interface CheckboxOptionProps {
    label: string;
    rightLabel?: ReactNode;
    isSelected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
    activeColor?: "success" | "black";
}

const CheckboxOption = ({
    label,
    rightLabel,
    isSelected = false,
    disabled = false,
    loading = false,
    onClick,
    className,
    activeColor = "success",
}: CheckboxOptionProps) => {
    const handleClick = () => {
        if (!disabled && !loading && onClick) {
            onClick();
        }
    };

    const isSuccess = activeColor === "success";
    const borderColor = isSelected
        ? (isSuccess ? "border-success" : "border-black")
        : "border-gray-100";
    const bgColor = isSelected && isSuccess
        ? "bg-success-light"
        : "";
    const checkboxBorderColor = isSelected
        ? (isSuccess ? "border-success" : "border-black")
        : "border-gray-100";
    const checkboxBgColor = isSelected
        ? (isSuccess ? "bg-success" : "bg-black")
        : "bg-gray-100";
    const checkIconColor = isSelected
        ? (isSuccess ? "text-white" : "text-white")
        : "";

    return (
        <div
            className={cn(
                "border-2 rounded-2xl p-3 flex items-center justify-between gap-4 transition-colors",
                borderColor,
                bgColor,
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400",
                className
            )}
            onClick={handleClick}
        >
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        "w-6 h-6 rounded-lg border relative flex items-center justify-center transition-all",
                        checkboxBorderColor,
                        checkboxBgColor,
                        loading && "opacity-50"
                    )}
                >
                    {loading ? (
                        <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        isSelected && <Check size={16} className={checkIconColor} strokeWidth={3} />
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

export default CheckboxOption;

