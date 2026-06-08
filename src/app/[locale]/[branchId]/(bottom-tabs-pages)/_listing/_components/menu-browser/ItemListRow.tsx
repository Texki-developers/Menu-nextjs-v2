"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { CustomerMenuItem } from "@/lib/api/menu";
import DietMark from "./DietMark";
import Photo from "./Photo";

interface ItemListRowProps {
  item: CustomerMenuItem;
  index: number;
}

const money = (n: number) => `AED ${n}`;

const isSpicy = (level?: string) => {
  if (!level) return false;
  const l = level.toLowerCase();
  return l !== "mild" && l !== "none" && l !== "";
};

const Flame = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="#EC5A2A">
    <path d="M12 2c1 3-2 4-2 7 0 1.5 1 2.5 2 2.5s2-1 1.5-3c2 1.5 3 4 3 6a6 6 0 11-12 0c0-3 2-5 3-7 1.5-2.5 3-3.5 4.5-5.5z" />
  </svg>
);

const ItemListRow = ({ item, index }: ItemListRowProps) => {
  const diet: "veg" | "nonveg" =
    item.type?.toLowerCase() === "veg" || item.type?.toLowerCase() === "vegan"
      ? "veg"
      : "nonveg";
  const spicy = isSpicy(item.spice_level);
  const primaryMedia =
    item.media?.find((m) => m.is_primary) ?? item.media?.[0];
  const hasImage = !!primaryMedia?.url;
  const hasDiscount =
    item.discount_price != null && item.discount_price < item.selling_price;
  const displayPrice = hasDiscount ? item.discount_price! : item.selling_price;
  const wasPrice = hasDiscount ? item.selling_price : undefined;
  const params = useParams<{ locale: string; branchId: string }>();
  const href = `/${params.locale}/${params.branchId}/${item.slug}`;

  return (
    <Link href={href} className="flex no-underline text-inherit" style={{ gap: 13 }}>
      <div className="relative shrink-0">
        {hasImage ? (
          <div
            className="relative overflow-hidden"
            style={{ width: 82, height: 82, borderRadius: 14 }}
          >
            <Image
              src={primaryMedia!.url}
              alt={item.name}
              fill
              sizes="82px"
              className="object-cover"
            />
          </div>
        ) : (
          <Photo
            label={item.name.split(" ")[0]}
            h={82}
            r={14}
            i={index}
            className="w-[82px]!"
          />
        )}
      </div>
      <div
        className="flex-1 flex flex-col min-w-0"
        style={{ gap: 3, paddingTop: 1 }}
      >
        <div className="flex items-center min-w-0" style={{ gap: 6 }}>
          <DietMark kind={diet} />
          <span
            className="font-bold whitespace-nowrap overflow-hidden text-ellipsis min-w-0 text-[#19150F]"
            style={{ fontSize: 15, letterSpacing: -0.2 }}
          >
            {item.name}
          </span>
          {spicy && (
            <span className="flex-shrink-0 flex">
              <Flame />
            </span>
          )}
        </div>
        <span
          className="overflow-hidden text-ellipsis whitespace-nowrap text-[#7A7062]"
          style={{ fontSize: 12, lineHeight: 1.3 }}
        >
          {item.description ?? ""}
        </span>
        <div
          className="flex items-center justify-between"
          style={{ marginTop: 4 }}
        >
          <div
            className="flex items-baseline whitespace-nowrap"
            style={{ gap: 6 }}
          >
            <span
              className="font-extrabold text-[#19150F]"
              style={{ fontSize: 15 }}
            >
              {money(displayPrice)}
            </span>
            {wasPrice != null && (
              <span
                className="text-[#A89E90] line-through"
                style={{ fontSize: 12 }}
              >
                {wasPrice}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex items-center font-extrabold rounded-[10px] bg-[#FBE7DC] text-[#EC5A2A]"
            style={{ height: 30, padding: "0 16px", fontSize: 13, border: "none" }}
          >
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ItemListRow;
