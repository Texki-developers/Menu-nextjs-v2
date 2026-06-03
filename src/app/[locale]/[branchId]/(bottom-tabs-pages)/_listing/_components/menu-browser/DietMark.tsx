type DietKind = "veg" | "nonveg";

interface DietMarkProps {
  kind: DietKind;
}

const DietMark = ({ kind }: DietMarkProps) => {
  const color = kind === "veg" ? "#2E9E5B" : "#C0392B";
  return (
    <span
      className="inline-flex items-center justify-center flex-shrink-0 rounded-[3px]"
      style={{ width: 15, height: 15, border: `1.5px solid ${color}` }}
    >
      <span
        className="rounded-full"
        style={{ width: 7, height: 7, background: color }}
      />
    </span>
  );
};

export default DietMark;
