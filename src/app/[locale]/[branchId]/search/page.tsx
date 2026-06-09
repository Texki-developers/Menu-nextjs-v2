"use client";

import { use, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, X } from "lucide-react";
import { BackButton } from "@/components/atoms/back-button";
import { useMenuSelectionStore } from "@/stores/menuSelectionStore";
import { useDebouncedValue } from "@/hooks/useDebouncedValue.hook";
import { useSearchItems } from "@/lib/queries/use-menu-cascade";
import { getBranchMenus } from "@/lib/api/menu";
import ItemListRow from "../(bottom-tabs-pages)/_listing/_components/menu-browser/ItemListRow";
import { SkRow } from "../(bottom-tabs-pages)/_listing/_components/menu-browser/Skeletons";
import EmptyState from "../(bottom-tabs-pages)/_listing/_components/menu-browser/EmptyState";

interface SearchPageProps {
  params: Promise<{ branchId: string }>;
}

const SearchPage = ({ params }: SearchPageProps) => {
  const { branchId } = use(params);

  const selectedMenuId = useMenuSelectionStore((s) => s.selectedMenuId);

  // Fall back to the active/first menu when arriving without a selection
  // (e.g. a deep link or hard refresh on /search).
  const { data: menus } = useQuery({
    queryKey: ["menus", branchId],
    queryFn: () => getBranchMenus(branchId),
    enabled: !selectedMenuId,
  });
  const menuId =
    selectedMenuId ??
    menus?.find((m) => m.is_currently_active)?.id ??
    menus?.[0]?.id ??
    null;

  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 300);
  const trimmed = debounced.trim();
  const hasQuery = trimmed !== "";

  const searchParams = useMemo(() => ({ query: trimmed }), [trimmed]);
  const { data, isLoading, isError } = useSearchItems(
    branchId,
    menuId,
    searchParams,
    hasQuery,
  );
  const results = data ?? [];

  return (
    <div className="min-h-dvh bg-gray-50 flex flex-col">
      {/* Search header */}
      <div className="bg-white px-4 pt-5 pb-3 border-b border-gray-100 flex items-center gap-2 sticky top-0 z-10">
        <BackButton />
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon size={18} />
          </span>
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-9 py-2.5 text-base outline-none focus:border-gray-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-1"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-[18px] pt-4 pb-24">
        {!hasQuery ? (
          <div className="flex flex-col items-center text-center pt-24 px-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <SearchIcon size={34} className="text-gray-400" />
            </div>
            <p className="text-gray-900 font-bold text-lg">Search the menu</p>
            <p className="text-gray-500 text-sm mt-1">
              Find dishes by name or description.
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col gap-[18px]">
            <SkRow />
            <SkRow />
            <SkRow />
          </div>
        ) : isError ? (
          <EmptyState
            glyph={<SearchIcon size={28} className="text-[#A89E90]" />}
            title="Couldn't search"
            body="Please try again in a moment."
          />
        ) : results.length === 0 ? (
          <EmptyState
            glyph={<SearchIcon size={28} className="text-[#A89E90]" />}
            title={`No results for “${trimmed}”`}
            body="Try a different name or keyword."
          />
        ) : (
          <div className="menu-home-font flex flex-col gap-[18px]">
            <span className="text-[#7A7062] text-[13px] font-semibold">
              {results.length} {results.length === 1 ? "result" : "results"}
            </span>
            {results.map((item, i) => (
              <ItemListRow key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
