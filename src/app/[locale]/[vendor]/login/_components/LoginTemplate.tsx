"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Login from "./login/Login";
import OtpEnter from "./otp-enter/OtpEnter";
import Signup from "./signup/Signup";
import { useAuth, AuthView } from "../_hooks/useAuth";
import { authViewConfig } from "./auth.config";
import { Button } from "@/components/atoms/button";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";

const LoginTemplate = () => {
    const t = useTranslations();
    const { currentView, setOTPView, setSignupView } = useAuth();
    const config = authViewConfig[currentView];
    const formRef = useRef<HTMLFormElement | null>(null);
    const [phoneNumber, setPhoneNumber] = useState({ value: "", country: "+971" });
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
    const params: { vendor: string } = useParams();

    const handleButtonClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    const handlePhoneChange = (value: { value: string; country: string }) => {
        setPhoneNumber(value);
        setError("");
    };

    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOTPView();
    };

    const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            setError(t("auth.errors.invalidOtp"));
            return;
        }
        setSignupView();
    };

    const handleOtpChange = (otpValue: string) => {
        setOtp(otpValue);
        setError("");
    };

    const handleNameChange = (nameValue: string) => {
        setName(nameValue);
        setError("");
    };

    const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || name.trim().length < 2) {
            setError(t("auth.errors.invalidName"));
            return;
        }
        router.push(`/${params.vendor}/`);
    };

    return (
        <div className="w-full min-h-dvh bg-bg">
            <div className="container max-w-md mx-auto px-4 pt-20 pb-32">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{t(config.titleKey)}</h1>
                    <p className="text-gray-600 text-sm">{t(config.descriptionKey)}</p>
                </div>

                {/* Content */}
                <div className="w-full">
                    {currentView === AuthView.LOGIN && (
                        <Login
                            formRef={formRef}
                            onSubmit={handleLoginSubmit}
                            onPhoneChange={handlePhoneChange}
                            error={error}
                            phoneNumber={phoneNumber}
                        />
                    )}
                    {currentView === AuthView.SIGNUP && (
                        <Signup
                            formRef={formRef}
                            onSubmit={handleSignupSubmit}
                            onNameChange={handleNameChange}
                            error={error}
                            name={name}
                        />
                    )}
                    {currentView === AuthView.OTP && (
                        <OtpEnter
                            formRef={formRef}
                            onSubmit={handleOtpSubmit}
                            onOtpChange={handleOtpChange}
                            error={error}
                        />
                    )}
                </div>
            </div>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-8 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 rounded-t-3xl max-w-md mx-auto">
                <Button
                    variant="secondary"
                    fullWidth
                    size="xl"
                    rounded="lg"
                    onClick={handleButtonClick}
                    type="button">
                    {t(config.buttonTextKey)}
                </Button>
            </div>
        </div>
    );
};

export default LoginTemplate;
