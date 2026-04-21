"use client";

import Image from "next/image";
import { getCategoryIcon } from "./category-icons";

interface CategoryCardProps {
  title: string;
  icon?: string;
  imageUrl?: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, imageUrl, onClick }) => {
  const Icon = getCategoryIcon(icon);
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
    >
      <div className="w-20 h-20 rounded-2xl overflow-hidden relative bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill sizes="80px" className="object-cover" />
        ) : (
          <Icon className="w-9 h-9 text-gray-700" />
        )}
      </div>
      <span className="text-sm font-medium text-center line-clamp-1">{title}</span>
    </button>
  );
};

export default CategoryCard;
