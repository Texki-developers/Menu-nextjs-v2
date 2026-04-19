"use client";

import Image from "next/image";

interface CategoryCardProps {
  imageUrl: string;
  title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-20 h-20 rounded-2xl overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <span className="text-sm font-medium text-center">{title}</span>
    </div>
  );
};

export default CategoryCard;

