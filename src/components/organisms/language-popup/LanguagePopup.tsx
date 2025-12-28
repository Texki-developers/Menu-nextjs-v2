"use client";

import BottomSheetWrapper from "@/components/molecules/bottom-sheet-wrapper/BottomSheetWrapper";
import { languageConfig } from "./languages.config";
import { useLanguageStore } from "@/store/language/language.store";
import LanguageCard from "@/components/atoms/language-card/LanguageCard";
import useLanguage from "./useLanguage.hook";

const LanguagePopup = () => {
    const { isPopupOpen, togglePopup } = useLanguageStore();
    const { handleUserDefaultLocale } = useLanguage();

    return (
        <BottomSheetWrapper
            onClose={() => {
                togglePopup();
            }}
            show={isPopupOpen}>
            <div className="grid grid-cols-2 gap-6 p-6 overflow-y-auto">
                {languageConfig?.map((language) => (
                    <LanguageCard
                        onClick={() => {
                            console.log(language.locale);
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
