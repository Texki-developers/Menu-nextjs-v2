"use client";

import { RefObject, useState } from "react";
import { useTranslations } from "next-intl";
import OtpInput from "@/components/atoms/otp-input/OtpInput";

interface OtpEnterProps {
    formRef: RefObject<HTMLFormElement | null>;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onOtpChange?: (otp: string) => void;
    error?: string;
    onValidateOtp?: (otp: string) => Promise<boolean>;
}

const OtpEnter = ({ formRef, onSubmit, onOtpChange, error, onValidateOtp }: OtpEnterProps) => {
    const t = useTranslations("auth");
    const [otpValue, setOtpValue] = useState("");
    const [isResendLoading, setIsResendLoading] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [isValidating, setIsValidating] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!otpValue || otpValue.length !== 6) {
            return;
        }

        // Clear previous validation error
        setValidationError("");

        // If validation function is provided, validate the OTP
        if (onValidateOtp) {
            setIsValidating(true);
            try {
                const isValid = await onValidateOtp(otpValue);
                if (!isValid) {
                    setValidationError(t("errors.incorrectOtp"));
                    setIsValidating(false);
                    return;
                }
            } catch {
                setValidationError(t("errors.incorrectOtp"));
                setIsValidating(false);
                return;
            }
            setIsValidating(false);
        } else {
            // For demo purposes: validate against a hardcoded OTP (123456)
            // In production, this should be replaced with actual API validation
            // TODO: Replace this with actual OTP validation API call
            if (otpValue !== "123456") {
                setValidationError(t("errors.incorrectOtp"));
                return;
            }
        }

        // Handle OTP verification logic here
        onSubmit?.(e);
        // On success, navigate to home or dashboard
    };

    const handleOtpChange = (otp: string) => {
        setOtpValue(otp);
        setValidationError(""); // Clear validation error when OTP changes
        onOtpChange?.(otp);
    };

    const handleOtpComplete = (otp: string) => {
        // Auto-submit when OTP is complete
        // The otp parameter is provided by OtpInput but we use otpValue from state instead
        setOtpValue(otp);
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    const handleResend = async () => {
        setIsResendLoading(true);
        setValidationError(""); // Clear validation error when resending
        // Handle resend OTP logic here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        setIsResendLoading(false);
    };

    // Combine both error sources (prop error and validation error)
    const displayError = error || validationError;

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
            <OtpInput
                length={6}
                resendTime={60}
                onOtpChange={handleOtpChange}
                onOtpComplete={handleOtpComplete}
                onResend={handleResend}
                isResendLoading={isResendLoading}
            />
            {displayError && (
                <p className="text-sm text-red-500 text-center">{displayError}</p>
            )}
            {isValidating && (
                <p className="text-sm text-gray-500 text-center">{t("sending")}...</p>
            )}
        </form>
    );
};

export default OtpEnter;
