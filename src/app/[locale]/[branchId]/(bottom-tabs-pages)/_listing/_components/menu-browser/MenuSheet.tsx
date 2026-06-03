"use client";

import { useEffect } from "react";
import type { BranchMenuSummary } from "@/lib/api/menu";

interface MenuSheetProps {
  menus: BranchMenuSummary[];
  selectedMenuId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const formatTime = (t: string): string => {
  const match = /^(\d{1,2}):(\d{2})/.exec(t);
  if (!match) return t;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${period}` : `${h12}:${String(m).padStart(2, "0")} ${period}`;
};

const scheduleString = (raw: unknown): string => {
  if (!raw) return "All day";
  let first: Record<string, unknown> | null = null;
  if (Array.isArray(raw) && raw.length > 0) {
    first = raw[0] as Record<string, unknown>;
  } else if (typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    if (Array.isArray(obj.schedule) && obj.schedule.length > 0) {
      first = obj.schedule[0] as Record<string, unknown>;
    } else if (typeof obj.start_time === "string") {
      first = obj;
    }
  }
  if (!first) return "All day";
  const start = first.start_time;
  const end = first.end_time;
  if (typeof start !== "string" || typeof end !== "string") return "All day";
  return `${formatTime(start)} – ${formatTime(end)}`;
};

type State = "live" | "upcoming" | "ended";

const stateOf = (m: BranchMenuSummary): State =>
  m.is_currently_active ? "live" : "upcoming";

const STATE_MAP: Record<State, { c: string; label: string }> = {
  live: { c: "#2E9E5B", label: "Serving now" },
  upcoming: { c: "#F2B01E", label: "Upcoming" },
  ended: { c: "#A89E90", label: "Ended for today" },
};

interface RowProps {
  m: BranchMenuSummary;
  selected: boolean;
  onSelect: (id: string) => void;
}

const MenuSheetRow = ({ m, selected, onSelect }: RowProps) => {
  const state = stateOf(m);
  const d = STATE_MAP[state];
  const ended = state === "ended";
  const time = scheduleString(m.schedule);
  return (
    <button
      type="button"
      onClick={() => onSelect(m.id)}
      className="flex items-center text-left rounded-[14px]"
      style={{
        gap: 13,
        padding: "14px 15px",
        background: selected ? "#FBE7DC" : "#FFFFFF",
        border: selected
          ? "1.5px solid #EC5A2A"
          : "1px solid rgba(25,21,15,0.09)",
        opacity: ended ? 0.6 : 1,
      }}
    >
      <div className="flex-1 min-w-0">
        <div
          className="font-extrabold text-[#19150F]"
          style={{ fontSize: 16, letterSpacing: -0.2 }}
        >
          {m.name}
        </div>
        <div
          className="flex items-center"
          style={{ gap: 7, marginTop: 4 }}
        >
          <span
            className="inline-flex items-center font-bold whitespace-nowrap"
            style={{ gap: 5, fontSize: 11.5, color: d.c, letterSpacing: 0.2 }}
          >
            <span
              className="rounded-full"
              style={{ width: 7, height: 7, background: d.c }}
            />
            {d.label}
          </span>
          <span
            className="font-semibold text-[#A89E90]"
            style={{ fontSize: 11.5 }}
          >
            · {time}
          </span>
        </div>
      </div>
      <span
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 24,
          height: 24,
          border: selected ? "none" : "2px solid rgba(25,21,15,0.09)",
          background: selected ? "#EC5A2A" : "transparent",
        }}
      >
        {selected && (
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5 9-10"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

const MenuSheet = ({ menus, selectedMenuId, onSelect, onClose }: MenuSheetProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(24,20,16,0.5)",
          backdropFilter: "blur(2px)",
        }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-[440px] menu-home-font bg-[#FBF9F6] text-[#19150F]"
        style={{
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          padding: "12px 18px calc(env(safe-area-inset-bottom, 0px) + 120px)",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div
          className="mx-auto bg-[rgba(25,21,15,0.09)] rounded-full"
          style={{ width: 40, height: 5, marginBottom: 16 }}
        />
        <div
          className="flex items-baseline justify-between"
          style={{ marginBottom: 14 }}
        >
          <h2
            className="m-0 font-extrabold text-[#19150F]"
            style={{ fontSize: 19, letterSpacing: -0.3 }}
          >
            Choose a menu
          </h2>
          <span
            className="font-semibold text-[#7A7062]"
            style={{ fontSize: 12.5 }}
          >
            {menus.length} {menus.length === 1 ? "menu" : "menus"}
          </span>
        </div>
        <div className="flex flex-col" style={{ gap: 9 }}>
          {menus.map((m) => (
            <MenuSheetRow
              key={m.id}
              m={m}
              selected={m.id === selectedMenuId}
              onSelect={(id) => {
                onSelect(id);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSheet;
