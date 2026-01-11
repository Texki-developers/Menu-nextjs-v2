"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";
import PhoneInput from "@/components/atoms/phone-input/PhoneInput";

interface LoginProps {
    formRef: RefObject<HTMLFormElement | null>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onPhoneChange: (value: { value: string; country: string }) => void;
    error: string;
    phoneNumber: { value: string; country: string };
}

const Login = ({ formRef, onSubmit, onPhoneChange, error, phoneNumber }: LoginProps) => {
    const t = useTranslations("auth");

    return (
        <form
            ref={formRef}
            onSubmit={onSubmit}
            className="w-full space-y-6">
            <PhoneInput
                label={t("phoneNumber.label")}
                placeholder={t("phoneNumber.placeholder")}
                required
                fullValue={phoneNumber}
                onPhoneNumberChange={onPhoneChange}
                error={error}
            />
        </form>
    );
};

export default Login;
