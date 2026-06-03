interface ListHeadingProps {
  name: string;
  count: number;
}

const ListHeading = ({ name, count }: ListHeadingProps) => {
  return (
    <div
      className="flex items-baseline"
      style={{ gap: 8 }}
    >
      <span
        className="rounded-full bg-[#EC5A2A]"
        style={{ width: 4, height: 16 }}
      />
      <h3
        className="m-0 font-extrabold whitespace-nowrap text-[#19150F]"
        style={{ fontSize: 16, letterSpacing: -0.2 }}
      >
        {name}
      </h3>
      <span
        className="font-semibold whitespace-nowrap text-[#7A7062]"
        style={{ fontSize: 12.5 }}
      >
        {count} dishes
      </span>
    </div>
  );
};

export default ListHeading;
