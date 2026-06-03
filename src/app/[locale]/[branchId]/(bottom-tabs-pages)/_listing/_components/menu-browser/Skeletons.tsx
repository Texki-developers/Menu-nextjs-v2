export const SkRow = () => (
  <div className="flex px-[18px]" style={{ gap: 13 }}>
    <span
      className="sk flex-shrink-0"
      style={{ width: 82, height: 82, borderRadius: 14 }}
    />
    <div
      className="flex-1 flex flex-col"
      style={{ gap: 8, paddingTop: 4 }}
    >
      <span className="sk" style={{ height: 14, width: "70%", borderRadius: 6 }} />
      <span className="sk" style={{ height: 11, width: "90%", borderRadius: 6 }} />
      <div
        className="flex justify-between"
        style={{ marginTop: 6 }}
      >
        <span className="sk" style={{ height: 14, width: 54, borderRadius: 6 }} />
        <span className="sk" style={{ height: 30, width: 62, borderRadius: 10 }} />
      </div>
    </div>
  </div>
);

export const ChipsSkeleton = () => (
  <div className="flex px-[18px]" style={{ gap: 8 }}>
    {[74, 62, 66, 58].map((w, i) => (
      <span
        key={i}
        className="sk flex-shrink-0"
        style={{ width: w, height: 34, borderRadius: 99 }}
      />
    ))}
  </div>
);
