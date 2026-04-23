"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Login from "./login/Login";
import OtpEnter from "./otp-enter/OtpEnter";
import Signup from "./signup/Signup";
import EmailLogin from "./email-login/EmailLogin";
import { useAuth, AuthView } from "../_hooks/useAuth";
import { authViewConfig } from "./auth.config";
import { Button } from "@/components/atoms/button";
import BackButton from "@/components/atoms/back-button/BackButton";
import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { requestEmailOtp, verifyEmailOtp } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginTemplate = () => {
    const t = useTranslations();
    const {
        currentView,
        setOTPView,
        setSignupView,
        setLoginView,
        setEmailLoginView,
        setEmailOTPView,
    } = useAuth(AuthView.EMAIL_LOGIN);
    const config = authViewConfig[currentView];
    const formRef = useRef<HTMLFormElement | null>(null);
    const [phoneNumber, setPhoneNumber] = useState({ value: "", country: "+971" });
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const params: { branchId: string } = useParams();

    const handleButtonClick = () => {
        if (formRef.current) formRef.current.requestSubmit();
    };

    const handlePhoneChange = (value: { value: string; country: string }) => {
        setPhoneNumber(value);
        setError("");
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setError("");
    };

    const handlePhoneLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOTPView();
    };

    const handleEmailLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const normalized = email.trim();
        if (!EMAIL_REGEX.test(normalized)) {
            setError(t("auth.errors.invalidEmail"));
            return;
        }
        setIsSubmitting(true);
        try {
            await requestEmailOtp(normalized, params.branchId);
            setOtp("");
            setEmailOTPView();
        } catch (err) {
            const message =
                err instanceof ApiError
                    ? ((err.body as { message?: string } | undefined)?.message ?? err.message)
                    : t("auth.errors.sendFailed");
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            setError(t("auth.errors.invalidOtp"));
            return;
        }
        setSignupView();
    };

    const handleEmailOtpValidate = async (otpValue: string): Promise<boolean> => {
        setError("");
        try {
            const result = await verifyEmailOtp({
                email: email.trim(),
                code: otpValue,
                branchId: params.branchId,
            });
            router.push(`/${params.branchId}/`);
            return result != null;
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) return false;
            const message =
                err instanceof ApiError
                    ? ((err.body as { message?: string } | undefined)?.message ?? err.message)
                    : t("auth.errors.verifyFailed");
            setError(message);
            return false;
        }
    };

    const handleEmailOtpResend = async () => {
        setError("");
        try {
            await requestEmailOtp(email.trim(), params.branchId);
        } catch (err) {
            const message =
                err instanceof ApiError
                    ? ((err.body as { message?: string } | undefined)?.message ?? err.message)
                    : t("auth.errors.sendFailed");
            setError(message);
        }
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
        router.push(`/${params.branchId}/`);
    };

    const isEmailView =
        currentView === AuthView.EMAIL_LOGIN || currentView === AuthView.EMAIL_OTP;

    const toggleMethod = () => {
        setError("");
        if (isEmailView) setLoginView();
        else setEmailLoginView();
    };

    return (
        <div className="w-full min-h-dvh bg-bg">
            <div className="container max-w-md mx-auto px-4 pt-8 pb-32">
                <div className="mb-6">
                    <BackButton fallbackUrl={`/${params.branchId}/`} />
                </div>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{t(config.titleKey)}</h1>
                    <p className="text-gray-600 text-sm">{t(config.descriptionKey)}</p>
                </div>

                <div className="w-full">
                    {currentView === AuthView.LOGIN && (
                        <Login
                            formRef={formRef}
                            onSubmit={handlePhoneLoginSubmit}
                            onPhoneChange={handlePhoneChange}
                            error={error}
                            phoneNumber={phoneNumber}
                        />
                    )}
                    {currentView === AuthView.EMAIL_LOGIN && (
                        <EmailLogin
                            formRef={formRef}
                            onSubmit={handleEmailLoginSubmit}
                            onEmailChange={handleEmailChange}
                            email={email}
                            error={error}
                            isLoading={isSubmitting}
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
                    {currentView === AuthView.EMAIL_OTP && (
                        <OtpEnter
                            formRef={formRef}
                            onOtpChange={handleOtpChange}
                            onValidateOtp={handleEmailOtpValidate}
                            onResend={handleEmailOtpResend}
                            error={error}
                        />
                    )}
                </div>

            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-8 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50 rounded-t-3xl max-w-md mx-auto">
                <Button
                    variant="secondary"
                    fullWidth
                    size="xl"
                    rounded="lg"
                    onClick={handleButtonClick}
                    disabled={isSubmitting}
                    type="button">
                    {t(config.buttonTextKey)}
                </Button>
            </div>
        </div>
    );
};

export default LoginTemplate;
