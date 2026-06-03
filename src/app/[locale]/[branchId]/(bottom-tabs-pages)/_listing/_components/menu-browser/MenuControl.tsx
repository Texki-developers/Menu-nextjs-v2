"use client";

import MenuStatus, { type MenuStatusState } from "./MenuStatus";

interface MenuControlProps {
  menuName: string;
  state: MenuStatusState;
  open: boolean;
  onOpen: () => void;
}

const MenuControl = ({ menuName, state, open, onOpen }: MenuControlProps) => {
  return (
    <div className="">
      <button
        type="button"
        onClick={onOpen}
        className="w-full flex items-center bg-white rounded-[16px] border border-[rgba(25,21,15,0.09)] text-left"
        style={{
          gap: 14,
          padding: "13px 15px 13px 17px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        <div className="flex-1 min-w-0">
          <div
            className="menu-home-mono uppercase text-[#A89E90]"
            style={{ fontSize: 10.5, letterSpacing: 1.5 }}
          >
            Menu
          </div>
          <div className="flex items-center mt-[3px]" style={{ gap: 9 }}>
            <span
              className="text-[#19150F] font-extrabold truncate"
              style={{ fontSize: 20, letterSpacing: -0.4 }}
            >
              {menuName}
            </span>
            <MenuStatus state={state} />
          </div>
        </div>
        <span
          className="flex items-center justify-center flex-shrink-0 bg-[#F3EFE8] rounded-[12px]"
          style={{
            width: 38,
            height: 38,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .2s",
          }}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="#19150F"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default MenuControl;
