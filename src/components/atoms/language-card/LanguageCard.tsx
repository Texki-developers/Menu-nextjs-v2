import React from "react";
import Image from "next/image";
import { LanguageConfig } from "@/components/organisms/language-popup/languages.config";

interface LanguageCardProps {
    language: LanguageConfig;
    onClick: () => void;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col w-full gap-2 aspect-square bg-white rounded-2xl shadow-xs items-center justify-center">
            <div className="relative w-15 h-15 overflow-hidden rounded-full">
                <Image
                    src={language.image}
                    alt={language.name}
                    fill
                    sizes="100px"
                    className="object-cover"
                />
            </div>
            <p className="text-lg font-bold">{language.name}</p>
        </div>
    );
};

export default LanguageCard;
