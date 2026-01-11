"use client";

import BottomSheetWrapper from "@/components/molecules/bottom-sheet-wrapper/BottomSheetWrapper";
import { languageConfig } from "./languages.config";
import { useLanguageStore } from "@/store/language/language.store";
import LanguageCard from "@/components/atoms/language-card/LanguageCard";
import useLanguage from "./useLanguage.hook";
import { useLocale } from "next-intl";

const LanguagePopup = () => {
    const { isPopupOpen } = useLanguageStore();
    const { handleUserDefaultLocale } = useLanguage();
    const locale = useLocale();

    return (
        <BottomSheetWrapper
            onClose={() => {
                handleUserDefaultLocale(locale);
            }}
            show={isPopupOpen}>
            <div className="grid grid-cols-2 gap-6 p-6 overflow-y-auto">
                {languageConfig?.map((language) => (
                    <LanguageCard
                        onClick={() => {
                            handleUserDefaultLocale(language.locale);
                        }}
                        key={language.locale}
                        language={language}
                    />
                ))}
            </div>
        </BottomSheetWrapper>
    );
};

export default LanguagePopup;
