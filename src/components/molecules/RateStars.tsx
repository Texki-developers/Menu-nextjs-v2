"use client";

interface RateStarsProps {
  rating: number;
  onSet: (n: number) => void;
}

/** Five-star rating row. */
export function RateStars({ rating, onSet }: RateStarsProps) {
  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onSet(n)}
          aria-label={`Rate ${n}`}
          className="cursor-pointer border-0 bg-transparent text-[30px] leading-none text-saffron"
        >
          {n <= rating ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}
