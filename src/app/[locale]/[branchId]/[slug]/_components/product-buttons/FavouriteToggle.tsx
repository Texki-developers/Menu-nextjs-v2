"use client";

import { FavoriteButton } from "@/components/atoms/favorite-button";
import { useFavouriteIds, useToggleFavourite } from "@/lib/queries/use-favourites";

interface FavouriteToggleProps {
  menuItemId: string;
}

const FavouriteToggle = ({ menuItemId }: FavouriteToggleProps) => {
  const { ids } = useFavouriteIds();
  const { toggle } = useToggleFavourite();
  const isFavourite = ids.has(menuItemId);

  return (
    <FavoriteButton
      isFavorite={isFavourite}
      onToggle={() => toggle(menuItemId, isFavourite)}
    />
  );
};

export default FavouriteToggle;
