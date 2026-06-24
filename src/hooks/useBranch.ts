"use client";

import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { branchRoutes } from "@/constants/routes";

/** Branch id + locale-aware navigation helpers for the current route. */
export function useBranch() {
  const params = useParams();
  const branchId = String(params.branchId);
  const router = useRouter();
  const routes = branchRoutes(branchId);
  return {
    branchId,
    routes,
    go: (href: string) => router.push(href),
    replace: (href: string) => router.replace(href),
  };
}
