"use client";

interface SearchBarProps {
  placeholder: string;
  /** controlled input mode */
  value?: string;
  onChange?: (value: string) => void;
  /** trigger mode — renders a button that navigates to the search screen */
  onClick?: () => void;
  autoFocus?: boolean;
}

/**
 * Dual-mode search field. With `onChange` it is a live input; otherwise it is a
 * tappable trigger that looks identical (used on the menu home).
 */
export function SearchBar({ placeholder, value, onChange, onClick, autoFocus }: SearchBarProps) {
  if (onChange) {
    return (
      <div className="flex flex-1 items-center gap-[9px] rounded-full border border-line bg-white px-[15px] py-3">
        <span className="text-faint">🔍</span>
        <input
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
        />
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-[10px] rounded-full border border-line bg-white px-4 py-[13px] text-start"
    >
      <span className="text-[15px] text-faint">🔍</span>
      <span className="text-sm text-faint">{placeholder}</span>
    </button>
  );
}
