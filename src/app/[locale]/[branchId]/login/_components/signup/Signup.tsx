"use client";

import { RefObject } from "react";
import { useTranslations } from "next-intl";
import Input from "../input/Input";

interface SignupProps {
    formRef: RefObject<HTMLFormElement | null>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onNameChange: (name: string) => void;
    error: string;
    name: string;
}

const Signup = ({ formRef, onSubmit, onNameChange, error, name }: SignupProps) => {
    const t = useTranslations("auth");

    return (
        <form ref={formRef} onSubmit={onSubmit} className="w-full space-y-6">
            <Input
                label={t("name.label")}
                placeholder={t("name.placeholder")}
                required
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                error={error}
                type="text"
                id="name"
                name="name"
            />
        </form>
    );
};

export default Signup;
