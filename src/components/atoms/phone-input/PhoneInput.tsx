"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import type { PhoneInputProps } from "react-phone-input-2";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const PhoneInputComponent = dynamic(() => import("react-phone-input-2").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="h-[52px] w-full animate-pulse rounded-md bg-gray-100" />,
});

interface IPhoneInputProps extends PhoneInputProps {
  label?: string;
  error?: string;
  onPhoneNumberChange?: (value: { value: string; country: string }) => void;
  required?: boolean;
  placeholder?: string;
  fullValue: { value: string; country: string };
}

const PhoneInput = ({ label, error, onPhoneNumberChange, placeholder, required, fullValue }: IPhoneInputProps) => {
  const isRTL = false;

  // Load heavy CSS only on the client to keep it out of the initial bundle.
  useEffect(() => {
    // @ts-expect-error – CSS side-effect import
    import("react-phone-input-2/lib/style.css");
    // @ts-expect-error – CSS side-effect import
    import("./phone-input.css");
  }, []);

  return (
    <div
      dir="ltr"
      className={cn("grid gap-2", isRTL ? "arabic" : "english")}>
      <div className="flex items-center gap-1">
        {label && (
          <>
            <label
              className="label-text"
              htmlFor="phone">
              {label}
            </label>
            {required && <span className="text-red-500">*</span>}
          </>
        )}
      </div>
      <div className="relative">
        <PhoneInputComponent
          country={"ae"}
          preferredCountries={["ae", "sa"]}
          containerClass="phone-input-container"
          inputClass="phone-input-input"
          buttonClass="phone-input-dropdown-container"
          countryCodeEditable={false}
          enableSearch
          value={fullValue.country}
          searchClass="phone-input-search"
          onChange={(value, country, event, formattedValue) => {
            if (country && "countryCode" in country) {
              onPhoneNumberChange && onPhoneNumberChange({ value: fullValue.value, country: formattedValue });
            }
          }}
        />
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={placeholder}
          autoComplete="off"
          autoFocus={false}
          // dir={isRTL ? "rtl" : "ltr"}
          value={fullValue.value}
          onChange={(e) => {
            if (!/^\d+$/.test(e.target.value) && e.target.value !== "") {
              return;
            }
            onPhoneNumberChange && onPhoneNumberChange({ value: e.target.value, country: fullValue.country });
          }}
          name="phone"
          className={cn(`absolute top-0 border-border w-[calc(100%-120px)] h-[calc(100%-(0.5rem*2))]  my-2 outline-none`, "left-[110px] border-l-2 pl-2")}
        />

        <ChevronDown
          className={`absolute pointer-events-none z-20 top-0 h-full`}
          style={
            isRTL
              ? {
                right: `${fullValue.country.length * 10 + 45}px`,
              }
              : {
                left: `${fullValue.country.length * 10 + 45}px`,
              }
          }
        />
        <div
          className={cn(
            "absolute pointer-events-none z-40 left-[40px] top-0 text-base font-medium text-gray-500 flex h-full items-center",
            isRTL ? "right-[40px]" : "left-[40px]"
          )}>
          {fullValue.country}
        </div>
      </div>
      {error && <p className=" max-w-[80%] text-sm text-red-500 -mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;
