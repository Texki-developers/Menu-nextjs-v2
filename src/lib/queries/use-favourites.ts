"use client";

import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";
import {
  addFavourite,
  listFavouriteIds,
  listFavourites,
  removeFavourite,
} from "@/lib/api/favourites";

const IDS_KEY = ["favourite-ids"] as const;
const LIST_KEY = ["favourites"] as const;

const isUnauthorized = (err: unknown) =>
  err instanceof ApiError && err.status === 401;

/**
 * Source of truth for heart state across the listing + detail screens.
 * A guest (not logged in) resolves with an empty set and `isGuest === true`.
 */
export function useFavouriteIds() {
  const query = useQuery({
    queryKey: IDS_KEY,
    queryFn: listFavouriteIds,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ids: new Set(query.data ?? []),
    isGuest: isUnauthorized(query.error),
    isLoading: query.isLoading,
  };
}

export function useFavourites() {
  return useQuery({
    queryKey: LIST_KEY,
    queryFn: listFavourites,
    retry: false,
  });
}

/**
 * Returns a `toggle(menuItemId, isCurrentlyFavourite)` callback.
 * Optimistically flips the id in the cache; rolls back on error.
 * Logged-out guests are routed to the login screen instead.
 */
export function useToggleFavourite() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<{ locale: string; branchId: string }>();
  const { isGuest } = useFavouriteIds();

  const mutation = useMutation({
    mutationFn: ({
      menuItemId,
      next,
    }: {
      menuItemId: string;
      next: boolean;
    }) => (next ? addFavourite(menuItemId) : removeFavourite(menuItemId)),
    onMutate: async ({ menuItemId, next }) => {
      await queryClient.cancelQueries({ queryKey: IDS_KEY });
      const previous = queryClient.getQueryData<string[]>(IDS_KEY) ?? [];
      const updated = next
        ? Array.from(new Set([menuItemId, ...previous]))
        : previous.filter((id) => id !== menuItemId);
      queryClient.setQueryData<string[]>(IDS_KEY, updated);
      return { previous };
    },
    onError: (err, _vars, context) => {
      if (context) queryClient.setQueryData(IDS_KEY, context.previous);
      if (isUnauthorized(err)) {
        router.push(`/${params.locale}/${params.branchId}/login`);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: IDS_KEY });
      queryClient.invalidateQueries({ queryKey: LIST_KEY });
    },
  });

  const toggle = useCallback(
    (menuItemId: string, isCurrentlyFavourite: boolean) => {
      if (isGuest) {
        router.push(`/${params.locale}/${params.branchId}/login`);
        return;
      }
      mutation.mutate({ menuItemId, next: !isCurrentlyFavourite });
    },
    [isGuest, mutation, router, params.locale, params.branchId],
  );

  return { toggle, isPending: mutation.isPending };
}
