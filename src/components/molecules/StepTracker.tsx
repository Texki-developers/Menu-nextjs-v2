import { STATUS_LABEL, pick, type Locale, type StatusKey } from "@/lib/menu";

interface StepTrackerProps {
  steps: StatusKey[];
  idx: number;
  rejected?: boolean;
  locale: Locale;
}

/** Horizontal order-progress stepper with steam / pulse on the active node. */
export function StepTracker({ steps, idx, rejected, locale }: StepTrackerProps) {
  return (
    <div className="flex items-start">
      {steps.map((label, i) => {
        const cls = i < idx ? "done" : i === idx ? (rejected ? "rejected" : "active") : "todo";
        const isReady = label === "Ready";

        let bg = "#F0E8DC";
        let col = "#b8a890";
        let content: string = String(i + 1);

        if (cls === "done") {
          bg = isReady ? "#5E8C53" : "#E8920C";
          col = "#fff";
          content = "✓";
        } else if (cls === "active") {
          bg = isReady ? "#5E8C53" : "#E8920C";
          col = "#fff";
          content = isReady ? "✓" : String(i + 1);
        } else if (cls === "rejected") {
          bg = "#C5283D";
          col = "#fff";
          content = "!";
        }

        const showSteam = cls === "active" && !isReady && !rejected;
        const pulse = cls === "active" && isReady;

        return (
          <div key={label} className="flex flex-1 items-start">
            {i > 0 && (
              <div
                className="mt-4 h-[3px] flex-1 rounded-full"
                style={{ background: i <= idx ? "#E8920C" : "#ECE4D8" }}
              />
            )}
            <div className="flex w-[50px] flex-none flex-col items-center">
              <div
                className={
                  "relative flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full font-mono text-sm font-semibold" +
                  (pulse ? " animate-pulse-ring" : "")
                }
                style={{ background: bg, color: col }}
              >
                {showSteam && (
                  <span
                    className="animate-steam absolute left-1/2 top-[-13px] h-[14px] w-[14px] -translate-x-1/2 rounded-full"
                    style={{ background: "radial-gradient(circle,rgba(232,146,12,.7),transparent 70%)" }}
                  />
                )}
                <span>{content}</span>
              </div>
              <div
                className="mt-[7px] text-center text-[10px]"
                style={{
                  color: cls === "todo" ? "#b8a890" : "#241B16",
                  fontWeight: i === idx ? 600 : 500,
                }}
              >
                {pick(STATUS_LABEL[label], locale)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
