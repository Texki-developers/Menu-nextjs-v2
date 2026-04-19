import useDir from "@/hooks/useDir.hook";
import { cn } from "@/lib/utils";
import React from "react";
import { RefCallBack } from "react-hook-form";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  leftIconClick?: () => void;
  leftIconClassName?: string;
  rightIcon?: React.ReactNode;
  rightIconClick?: () => void;
  rightIconClassName?: string;
  required?: boolean;
  ref?: React.RefObject<HTMLInputElement | null> | RefCallBack;
  className?: string;
}

const Input = ({ label, error, leftIcon, leftIconClick, leftIconClassName, rightIcon, rightIconClick, rightIconClassName, required, ref, className, ...props }: IInputProps) => {
  const isRtl = useDir();

  const isControlled = props.value !== undefined;
  const inputProps = isControlled ? { ...props, value: props.value ?? "" } : { ...props, defaultValue: props.defaultValue ?? "" };

  // Calculate padding based on icons and RTL
  const getInputPadding = () => {
    let paddingClasses = "";

    if (leftIcon) {
      paddingClasses += isRtl ? " pr-10" : " pl-10";
    }

    if (rightIcon) {
      paddingClasses += isRtl ? " pl-10" : " pr-10";
    }

    return paddingClasses;
  };

  return (
    <div className="grid gap-2">
      {label && (
        <label
          className="label-text"
          htmlFor={props.id}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          autoComplete="off"
          required={required}
          className={cn("bg-white border border-border text-gray-900 outline-none  rounded-lg focus:outline-none block w-full p-2 py-3", getInputPadding(), className)}
          {...inputProps}
        />
        {leftIcon && (
          <div
            onClick={leftIconClick}
            className={cn(`absolute ${!isRtl ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 cursor-pointer`, leftIconClassName)}>
            {leftIcon}
          </div>
        )}
        {rightIcon && (
          <div
            onClick={rightIconClick}
            className={cn(`absolute ${!isRtl ? "right-2" : "left-2"} top-1/2 -translate-y-1/2 cursor-pointer`, rightIconClassName)}>
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
