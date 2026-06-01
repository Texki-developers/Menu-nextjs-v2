"use client";

import { useQuery } from "@tanstack/react-query";
import { listCategories, listItems } from "@/lib/api/menu";

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
