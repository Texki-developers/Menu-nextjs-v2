"use client";

interface TipChipsProps {
  options: number[];
  value: number;
  onChange: (value: number) => void;
  noTipLabel: string;
}

/** Equal-width tip selector row. */
export function TipChips({ options, value, onChange, noTipLabel }: TipChipsProps) {
  return (
    <div className="flex gap-2">
      {options.map((t) => {
        const active = value === t;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={
              "flex-1 cursor-pointer rounded-xl border-0 px-1 py-[11px] text-[13px] font-semibold " +
              (active ? "bg-saffron text-white" : "bg-sand text-muted")
            }
          >
            {t === 0 ? noTipLabel : `${t}%`}
          </button>
        );
      })}
    </div>
  );
}
