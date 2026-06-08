"use client";

import { Heart } from "lucide-react";
import { useFavourites } from "@/lib/queries/use-favourites";
import ItemListRow from "../../_listing/_components/menu-browser/ItemListRow";
import EmptyState from "../../_listing/_components/menu-browser/EmptyState";
import { BackButton } from "@/components/atoms/back-button";

const SavedItemsPage = () => {
  const { data: items, isLoading, isError } = useFavourites();

  return (
    <div className="menu-home-font flex flex-col min-h-dvh bg-[#FBF9F6] text-[#19150F]">
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <BackButton />
        <h1 className="text-xl font-extrabold tracking-tight">Saved Items</h1>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-[18px] px-[18px] pt-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-[13px]">
              <span className="sk w-[82px] h-[82px] rounded-[14px] shrink-0" />
              <div className="flex-1 flex flex-col gap-2 pt-1">
                <span className="sk h-[14px] w-[70%] rounded-md" />
                <span className="sk h-[11px] w-[90%] rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          glyph={<Heart size={28} className="text-[#A89E90]" />}
          title="Sign in to see saved items"
          body="Log in to your account to view the dishes you've saved."
        />
      ) : !items || items.length === 0 ? (
        <EmptyState
          glyph={<Heart size={28} className="text-[#A89E90]" />}
          title="No saved items yet"
          body="Tap the heart on any dish to save it here for quick access."
        />
      ) : (
        <div className="flex flex-col gap-[18px] pt-2 pb-24">
          {items.map((item, i) => (
            <ItemListRow key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedItemsPage;
