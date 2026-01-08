"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/classnames";

interface BackButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    fallbackUrl?: string;
    className?: string;
    withBlur?: boolean;
}

const BackButton = ({ fallbackUrl, className, withBlur = false, ...props }: BackButtonProps) => {
    const router = useRouter();
    const params = useParams();
    const vendor = params?.vendor as string | undefined;

    const handleBack = () => {
        // Check if there's history to go back to
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            // If no history, navigate to fallback URL or home
            const targetUrl = fallbackUrl || (vendor ? `/${vendor}/` : "/");
            router.push(targetUrl);
        }
    };

    return (
        <Button
            onClick={handleBack}
            variant="ghost"
            iconOnly
            size="base"
            rounded="full"
            aria-label="Go back"
            className={cn(
                withBlur && "group bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-black shadow-sm",
                className
            )}
            {...props}
        >
            <ArrowLeft size={20} className={withBlur ? "text-white group-hover:text-black" : "text-gray-900"} />
        </Button>
    );
};

export default BackButton;

