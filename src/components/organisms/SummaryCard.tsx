interface Row {
  k: string;
  v: string;
}

/** Generic bill/summary card: labelled rows + emphasised total. */
export function SummaryCard({
  rows,
  totalKey,
  totalValue,
}: {
  rows: Row[];
  totalKey: string;
  totalValue: string;
}) {
  return (
    <div className="rounded-[18px] border border-line bg-white p-4">
      {rows.map((r) => (
        <div key={r.k} className="flex justify-between py-[5px] text-sm text-muted">
          <span>{r.k}</span>
          <span className="font-mono text-ink">{r.v}</span>
        </div>
      ))}
      <div className="mt-2 flex items-baseline justify-between border-t border-line pt-[11px]">
        <span className="text-base font-bold text-ink">{totalKey}</span>
        <span className="font-mono text-xl font-semibold text-ink">{totalValue}</span>
      </div>
    </div>
  );
}
