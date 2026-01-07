"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/utils/classnames";
import { createPortal } from "react-dom";

interface BottomSheetWrapperProps {
    children: React.ReactNode;
    show: boolean;
    onClose?: () => void;
}

const BottomSheetWrapper: React.FC<BottomSheetWrapperProps> = ({ children, show, onClose }) => {
    useEffect(() => {
        if (typeof document === "undefined") return;

        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [show]);

    if (typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <>
            <div
                onClick={() => onClose?.()}
                className={cn("fixed top-0 container h-dvh w-screen left-1/2 -translate-x-1/2 z-9999 bg-black/50 backdrop-blur-md", !show ? "hidden" : "block")}></div>
            <div
                className={cn(
                    "fixed bottom-0 z-9999 left-1/2 -translate-x-1/2 container transition-transform duration-300 max-h-[90dvh] overflow-y-auto w-screen bg-popup border-t border-border rounded-t-4xl",
                    show ? "translate-y-0" : "translate-y-full"
                )}>
                {children}
            </div>
        </>,
        document.body
    );
};

export default BottomSheetWrapper;
