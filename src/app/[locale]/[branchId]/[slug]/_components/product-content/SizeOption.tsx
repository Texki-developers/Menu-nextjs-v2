"use client";

import React from "react";

interface SizeOptionProps {
    label: string;
    price?: string | number;
    isSelected?: boolean;
    onClick?: () => void;
}

const SizeOption = ({ label, price, isSelected = false, onClick }: SizeOptionProps) => {
    return (
        <div
            className={`border-2 rounded-2xl p-3 flex items-center justify-between gap-4 cursor-pointer hover:border-gray-400 transition-colors ${isSelected ? "border-black" : "border-gray-100"
                }`}
            onClick={onClick}>
            <div className="flex items-center gap-2">
                <div
                    className={`w-6 h-6 rounded-full border relative before:content-[''] before:w-[70%] before:h-[70%] before:rounded-full before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 transition-all ${isSelected ? "border-black bg-white before:bg-black" : "border-border  before:bg-transparent"
                        }`}></div>
                <span className={`font-medium ${isSelected ? "text-gray-900" : "text-gray-500"}`}>{label}</span>
            </div>
            {price && (
                <span className={`font-medium ${isSelected ? "text-gray-900" : "text-gray-500"}`}>
                    {typeof price === "number" ? `AED ${price.toFixed(2)}` : `${price} AED`}
                </span>
            )}
        </div>
    );
};

export default SizeOption;
