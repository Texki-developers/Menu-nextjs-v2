"use client";

interface OptionRowProps {
  name: string;
  /** price delta label, e.g. "+ AED 18.00" (empty for free) */
  delta?: string;
  selected: boolean;
  control: "radio" | "check";
  onClick: () => void;
}

/** Selectable bordered row for sizes (radio) and add-ons (checkbox). */
export function OptionRow({ name, delta, selected, control, onClick }: OptionRowProps) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between rounded-[14px] border-2 bg-white px-[15px] py-[13px]"
      style={{ borderColor: selected ? "#E8920C" : "#ECE4D8" }}
    >
      <span className="text-[15px] text-ink">{name}</span>
      <span className="flex items-center gap-[10px]">
        {delta && <span className="font-mono text-[13px] text-muted">{delta}</span>}
        <span
          className="flex h-5 w-5 items-center justify-center text-[12px] text-white"
          style={{
            borderRadius: control === "radio" ? "50%" : "6px",
            border: `2px solid ${selected ? "#E8920C" : "#DCCFBE"}`,
            background: selected ? "#E8920C" : "transparent",
          }}
        >
          {control === "check" && selected ? "✓" : ""}
        </span>
      </span>
    </button>
  );
}
