interface PhotoProps {
  label: string;
  h?: number;
  r?: number;
  i?: number;
  className?: string;
}

const TINTS: [string, string][] = [
  ["#EFE7DC", "#E8DECF"],
  ["#ECE6DD", "#E2DAcc"],
  ["#EEE4D6", "#E6D9C6"],
  ["#E9E6DE", "#DED9CC"],
  ["#F0E6D8", "#E8DAC6"],
  ["#EAE5DB", "#DFD7C8"],
];

const Photo = ({ label, h = 120, r = 14, i = 0, className }: PhotoProps) => {
  const [a, b] = TINTS[i % TINTS.length];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{
        height: h,
        borderRadius: r,
        background: `repeating-linear-gradient(135deg, ${a}, ${a} 10px, ${b} 10px, ${b} 20px)`,
      }}
    >
      <span
        className="menu-home-mono uppercase"
        style={{
          fontSize: 9.5,
          letterSpacing: 1,
          color: "rgba(25,21,15,0.34)",
          background: "rgba(251,249,246,0.55)",
          padding: "2px 7px",
          borderRadius: 5,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default Photo;
