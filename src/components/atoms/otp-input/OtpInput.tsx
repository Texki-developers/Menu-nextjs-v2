import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface OtpInputProps {
  length: number;
  resendTime?: number;
  onOtpChange?: (otp: string) => void;
  onResend?: () => Promise<void>;
  isResendLoading?: boolean;
  value?: number;
  onOtpComplete?: (otp: string) => void;
}

const OtpInput = ({ length, resendTime = 60, onOtpChange, onResend, isResendLoading: externalResendLoading, value, onOtpComplete }: OtpInputProps) => {
  const t = useTranslations("auth");
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const otpValuesRef = useRef<string[]>(Array.from({ length }, () => ""));
  const [showResendTime, setShowResendTime] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [time, setTime] = useState(resendTime);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFirstTry, setIsFirstTry] = useState(true);

  const updateInputValues = useCallback(
    (values: string[]) => {
      const normalizedValues = values.map((v) => (v || "").slice(0, 1));
      otpValuesRef.current = normalizedValues;
      inputsRef.current.forEach((input, i) => {
        if (input) {
          input.value = normalizedValues[i] || "";
        }
      });
      const otpString = normalizedValues.join("");
      onOtpChange?.(otpString);
      if (otpString.length === length && isFirstTry) {
        onOtpComplete?.(otpString);
        setIsFirstTry(false);
      }
    },
    [length, isFirstTry, onOtpChange, onOtpComplete]
  );

  // Sync DOM values to ref - handles Safari autofill race conditions
  const syncFromDOM = useCallback(() => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    syncTimeoutRef.current = setTimeout(() => {
      // Collect all digits from all inputs (Safari might put all digits in one input)
      const allDigits: string[] = [];
      inputsRef.current.forEach((input) => {
        if (input?.value) {
          const digits = input.value.split("").filter((c) => /^[0-9]$/.test(c));
          allDigits.push(...digits);
        }
      });

      // Distribute digits across inputs
      const newValues = Array.from({ length }, (_, i) => allDigits[i] || "");
      const hasChanges = newValues.some((val, i) => val !== otpValuesRef.current[i]);

      if (hasChanges) {
        updateInputValues(newValues);
      }
    }, 50);
  }, [length, updateInputValues]);

  useEffect(() => {
    if (inputsRef.current.length > 0) {
      inputsRef.current[0]?.focus();
    }
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (value) {
      const digits = Number(value).toString().split("");
      const normalizedValues = digits.map((v) => (v || "").slice(0, 1));
      otpValuesRef.current = normalizedValues;
      inputsRef.current.forEach((input, i) => {
        if (input) {
          input.value = normalizedValues[i] || "";
        }
      });
    }
  }, [value]);

  useEffect(() => {
    if (time <= 0) {
      return;
    }

    const resendTimeInterval = setTimeout(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime === 0) {
          // Use setTimeout to avoid setting state synchronously in effect
          setTimeout(() => setShowResendTime(true), 0);
        }
        return newTime;
      });
    }, 1000);

    return () => {
      clearTimeout(resendTimeInterval);
    };
  }, [time]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    console.log("onInputChange", e, index);
    const inputValue = e.target.value;
    // Filter to only digits
    const digits = inputValue.split("").filter((char) => /^[0-9]$/.test(char));

    if (digits.length === 0) {
      // Clearing the input
      const newOtp = [...otpValuesRef.current];
      newOtp[index] = "";
      updateInputValues(newOtp);
      return;
    }

    if (digits.length > 1) {
      // Handle autofill or paste - distribute digits across all inputs starting from index
      const newOtp = [...otpValuesRef.current];
      for (let i = 0; i < digits.length && index + i < length; i++) {
        newOtp[index + i] = digits[i];
      }
      updateInputValues(newOtp);

      // Focus on the next empty input or last input
      setTimeout(() => {
        const nextEmptyIndex = newOtp.findIndex((val) => !val);
        const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
        inputsRef.current[focusIndex]?.focus();
      }, 0);
      return;
    }

    // Single digit input
    const newOtp = [...otpValuesRef.current];
    newOtp[index] = digits[0];
    updateInputValues(newOtp);

    if (index < length - 1) {
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 0);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    console.log("onKeyDown", e, index);
    if (e.key === "Backspace") {
      if (otpValuesRef.current[index]) {
        const newOtp = [...otpValuesRef.current];
        newOtp[index] = "";
        updateInputValues(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const newOtp = [...otpValuesRef.current];
        newOtp[index - 1] = "";
        updateInputValues(newOtp);
      }
      e.preventDefault(); // Prevent onChange from firing after this
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const isNumber = /^[0-9]+$/.test(text);
    if (!isNumber) return;

    const newOtp = [...otpValuesRef.current];
    let lastFilledIndex = -1;

    for (let i = 0; i < Math.min(length, text.length); i++) {
      newOtp[i] = text[i];
      lastFilledIndex = i;
    }

    updateInputValues(newOtp);

    // Focus after update
    setTimeout(() => {
      const focusIndex = Math.min(lastFilledIndex + 1, length - 1);
      inputsRef.current[focusIndex]?.focus();
    }, 0);
  };

  const clearAllInput = () => {
    updateInputValues(Array.from({ length }, () => ""));
  };

  const onResendClick = async () => {
    if (!externalResendLoading) {
      setResendLoading(true);
    }
    await onResend?.();
    if (!externalResendLoading) {
      setResendLoading(false);
    }
    setShowResendTime(false);
    setTime(resendTime);
    clearAllInput();
  };

  return (
    <div
      dir="ltr"
      className="grid gap-2">
      <div className="flex gap-2">
        {Array.from({ length }, (_, index) => (
          <input
            ref={(el) => {
              if (el) {
                inputsRef.current[index] = el;
              }
            }}
            key={index}
            onChange={(e) => onInputChange(e, index)}
            onInput={syncFromDOM}
            onKeyDown={(e) => onKeyDown(e, index)}
            type="text"
            autoComplete={"one-time-code"}
            inputMode="numeric"
            pattern="[0-9]*"
            onClick={(e) => (e.target as HTMLInputElement)?.select()}
            onPaste={onPaste}
            className="w-10 h-12 border border-border rounded-md text-center focus:border-brand-primary focus:outline-none"
          />
        ))}
      </div>

      {!showResendTime ? (
        <div className="text-sm text-gray-700">
          {t("resend_in_seconds")}
          <span className="text-brand-primary ">{time} </span>
          {t("seconds")}
        </div>
      ) : (
        <div>
          <p className="text-sm text-fade-black-333">{t("didnt_receive_code")}</p>
          <button
            onClick={onResendClick}
            className="text-sm text-start text-gray-500 cursor-pointer hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={resendLoading || externalResendLoading}>
            {resendLoading || externalResendLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 p-4 h-4 animate-spin" />
                {t("sending")}
              </div>
            ) : (
              <div>
                <p className="text-sm hover:text-brand-primary text-gray-500">{t("resend_otp")}</p>
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default OtpInput;

// Manshad
