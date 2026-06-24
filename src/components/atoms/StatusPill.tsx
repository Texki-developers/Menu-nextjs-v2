import { STATUS_LABEL, pick, type Locale, type StatusKey } from "@/lib/menu";

const STATUS_CLASS: Record<StatusKey, string> = {
  Placed: "bg-sand text-muted",
  Confirmed: "bg-[rgba(47,111,143,0.12)] text-info",
  Preparing: "bg-[rgba(47,111,143,0.12)] text-info",
  Ready: "bg-green text-white",
  Served: "bg-sand text-muted",
  Rejected: "bg-pom text-white",
};

export function StatusPill({ status, locale }: { status: StatusKey; locale: Locale }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-[9px] py-[3px] text-[11px] font-semibold ${STATUS_CLASS[status]}`}
    >
      {pick(STATUS_LABEL[status], locale)}
    </span>
  );
}
