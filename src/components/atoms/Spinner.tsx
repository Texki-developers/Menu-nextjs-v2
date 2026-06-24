/** Spinning ring used inside the "Processing…" button. */
export function Spinner({ size = 18 }: { size?: number }) {
  return (
    <span
      className="animate-spin-slow inline-block rounded-full"
      style={{
        width: size,
        height: size,
        border: "2.5px solid rgba(255,255,255,.4)",
        borderTopColor: "#fff",
      }}
    />
  );
}
