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
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (typeof document === "undefined") return;

        if (show) {
            document.body.style.overflow = "hidden";
            setTimeout(() => {
                setHidden(false);
                console.log("setHidden(false)");
            }, 0);
        } else {
            document.body.style.overflow = "auto";
            const timer = setTimeout(() => {
                setHidden(true);
                console.log("setHidden(true)");
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <div
            onClick={() => onClose?.()}
            className={cn("fixed top-0 h-dvh w-screen left-0 z-9999 bg-black/50 backdrop-blur-md", hidden ? "hidden" : "block")}>
            <div
                className={cn(
                    "absolute bottom-0 left-0 transition-transform duration-300 max-h-[90dvh] overflow-y-auto w-screen bg-popup border-t border-border rounded-t-4xl",
                    show ? "translate-y-0" : "translate-y-full"
                )}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default BottomSheetWrapper;
