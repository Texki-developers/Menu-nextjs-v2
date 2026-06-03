import type { ReactNode } from "react";

interface EmptyStateProps {
  glyph: ReactNode;
  title: string;
  body: string;
  action?: string;
  onAction?: () => void;
}

const EmptyState = ({ glyph, title, body, action, onAction }: EmptyStateProps) => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div
        className="flex flex-col items-center text-center"
        style={{ padding: "10px 36px", gap: 8 }}
      >
        <div
          className="flex items-center justify-center rounded-full bg-[#F3EFE8] border border-[rgba(25,21,15,0.09)]"
          style={{ width: 72, height: 72, marginBottom: 4 }}
        >
          {glyph}
        </div>
        <div
          className="font-extrabold text-[#19150F]"
          style={{ fontSize: 17, letterSpacing: -0.2 }}
        >
          {title}
        </div>
        <div
          className="text-[#7A7062]"
          style={{ fontSize: 13.5, lineHeight: 1.4 }}
        >
          {body}
        </div>
        {action && (
          <button
            type="button"
            onClick={onAction}
            className="font-extrabold bg-[#FBE7DC] text-[#EC5A2A] rounded-[12px]"
            style={{
              marginTop: 8,
              padding: "10px 18px",
              fontSize: 13.5,
            }}
          >
            {action}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
