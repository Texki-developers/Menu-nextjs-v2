"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { listCategories, listItems, searchItems } from "@/lib/api/menu";
import type { SearchItemsParams } from "@/lib/api/menu";

export function useCategories(branchId: string, menuId: string | null) {
  return useQuery({
    queryKey: ["categories", branchId, menuId],
    queryFn: () => listCategories(branchId, menuId as string),
    enabled: !!menuId,
  });
}

export function useItems(
  branchId: string,
  categoryId: string | null,
  menuId: string | null,
) {
  return useQuery({
    queryKey: ["items", branchId, menuId, categoryId],
    queryFn: () => listItems(branchId, categoryId as string, menuId as string),
    enabled: !!categoryId && !!menuId,
  });
}

export function useSearchItems(
  branchId: string,
  menuId: string | null,
  params: SearchItemsParams,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["search-items", branchId, menuId, params],
    queryFn: () => searchItems(branchId, menuId as string, params),
    enabled: enabled && !!menuId,
    placeholderData: keepPreviousData,
  });
}
