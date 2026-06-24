"use client";

interface Segment<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Sand-tracked segmented control (split mode, tab grouping). */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="flex rounded-xl bg-sand p-[3px]">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={
              "flex-1 cursor-pointer rounded-[10px] border-0 px-1 py-[9px] text-[12px] font-semibold transition " +
              (active
                ? "bg-white text-ink shadow-[0_2px_6px_rgba(36,27,22,0.1)]"
                : "bg-transparent text-muted")
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
