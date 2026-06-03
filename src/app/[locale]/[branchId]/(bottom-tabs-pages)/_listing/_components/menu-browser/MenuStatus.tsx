export type MenuStatusState = "live" | "upcoming" | "ended";

interface MenuStatusProps {
  state: MenuStatusState;
  light?: boolean;
}

const MAP: Record<MenuStatusState, { c: string; label: string }> = {
  live: { c: "#2E9E5B", label: "Serving now" },
  upcoming: { c: "#F2B01E", label: "Upcoming" },
  ended: { c: "#A89E90", label: "Ended" },
};

const MenuStatus = ({ state, light = false }: MenuStatusProps) => {
  const d = MAP[state];
  return (
    <span className="inline-flex items-center" style={{ gap: 5 }}>
      <span
        className="rounded-full"
        style={{
          width: 7,
          height: 7,
          background: d.c,
          boxShadow: state === "live" ? `0 0 0 3px ${d.c}22` : "none",
        }}
      />
      <span
        className="whitespace-nowrap font-bold"
        style={{
          fontSize: 10.5,
          letterSpacing: 0.2,
          color: light ? "rgba(255,255,255,0.78)" : d.c,
        }}
      >
        {d.label}
      </span>
    </span>
  );
};

export default MenuStatus;
