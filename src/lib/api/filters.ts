import { apiFetch, API_BASE_URL } from "./client";

export enum FilterType {
  SINGLE = "single",
  MULTI = "multi",
  RANGE = "range",
}

export enum FilterSource {
  TYPE = "type",
  SPICE_LEVEL = "spice_level",
  TAG = "tag",
  FEATURED = "featured",
  PRICE = "price",
}

export enum SortField {
  PRICE = "price",
  NAME = "name",
  FEATURED = "featured",
  CREATED_AT = "created_at",
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface FilterOption {
  label: string;
  value: string;
  sort_order?: number;
}

export interface FilterRange {
  label: string;
  min: number;
  max?: number | null;
  sort_order?: number;
}

export interface FilterDefinition {
  _id: string;
  name: string;
  type: FilterType;
  source: FilterSource;
  options: FilterOption[];
  ranges: FilterRange[];
  sort_order: number;
  is_active: boolean;
}

export interface SortOptionDefinition {
  _id: string;
  label: string;
  field: SortField;
  direction: SortDirection;
  is_default: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface FiltersResponse {
  filters: FilterDefinition[];
  sort_options: SortOptionDefinition[];
}

export async function getBranchFilters(branchId: string): Promise<FiltersResponse | null> {
  if (!API_BASE_URL) return null;
  try {
    return await apiFetch<FiltersResponse>(`/public/branches/${branchId}/filters`, {
      revalidate: 60,
    });
  } catch (err) {
    console.error("[getBranchFilters] failed:", err);
    return null;
  }
}
