import { cn } from "@/lib/utils";

interface QtyStepperProps {
  value: string | number;
  onInc: () => void;
  onDec: () => void;
  size?: "sm" | "md";
  className?: string;
}

/** "– n +" control in a rounded sand pill. */
export function QtyStepper({ value, onInc, onDec, size = "sm", className }: QtyStepperProps) {
  const big = size === "md";
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-sand",
        big ? "gap-[14px] px-[14px] py-2" : "gap-[13px] px-[11px] py-[5px]",
        className,
      )}
    >
      <button
        onClick={onDec}
        aria-label="Decrease"
        className={cn(
          "cursor-pointer border-0 bg-transparent leading-none text-muted",
          big ? "text-[19px]" : "text-[17px]",
        )}
      >
        –
      </button>
      <span
        className={cn(
          "min-w-3 text-center font-mono font-semibold",
          big ? "text-[15px]" : "text-[13px]",
        )}
      >
        {value}
      </span>
      <button
        onClick={onInc}
        aria-label="Increase"
        className={cn(
          "cursor-pointer border-0 bg-transparent leading-none text-saffron",
          big ? "text-[19px]" : "text-[17px]",
        )}
      >
        +
      </button>
    </div>
  );
}
