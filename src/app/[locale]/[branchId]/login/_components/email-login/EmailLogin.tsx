"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";
import Input from "../input/Input";

interface EmailLoginProps {
    formRef: RefObject<HTMLFormElement | null>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onEmailChange: (email: string) => void;
    email: string;
    error: string;
    isLoading?: boolean;
}

const EmailLogin = ({
    formRef,
    onSubmit,
    onEmailChange,
    email,
    error,
    isLoading,
}: EmailLoginProps) => {
    const t = useTranslations("auth");

    return (
        <form ref={formRef} onSubmit={onSubmit} className="w-full space-y-6">
            <Input
                label={t("email.label")}
                placeholder={t("email.placeholder")}
                required
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                error={error}
                disabled={isLoading}
            />
        </form>
    );
};

export default EmailLogin;
