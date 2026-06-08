import {
  FilterSource,
  type FilterDefinition,
  type SortOptionDefinition,
} from "@/lib/api/filters";
import type { SearchItemsParams } from "@/lib/api/menu";

/**
 * Translates the filter store's raw state (selectedFilters keyed by filter _id,
 * plus the active sort id) into flat search API params, using the filter/sort
 * definitions to resolve each selection's source and price ranges.
 */
export function normalizeFilters(
  selectedFilters: Record<string, string[]>,
  activeSortId: string | null,
  filters: FilterDefinition[],
  sortOptions: SortOptionDefinition[],
): SearchItemsParams {
  const params: SearchItemsParams = {};
  const filterById = new Map(filters.map((f) => [f._id, f]));

  const typeValues: string[] = [];
  const spiceValues: string[] = [];
  const tagValues: string[] = [];

  for (const [filterId, values] of Object.entries(selectedFilters)) {
    if (!values.length) continue;
    const def = filterById.get(filterId);
    if (!def) continue;

    switch (def.source) {
      case FilterSource.TYPE:
        typeValues.push(...values);
        break;
      case FilterSource.SPICE_LEVEL:
        spiceValues.push(...values);
        break;
      case FilterSource.TAG:
        tagValues.push(...values);
        break;
      case FilterSource.FEATURED:
        params.featured = true;
        break;
      case FilterSource.PRICE: {
        // RANGE filters store the range label; resolve it to min/max.
        const range = def.ranges.find((r) => values.includes(r.label));
        if (range) {
          if (typeof range.min === "number") params.price_min = range.min;
          if (typeof range.max === "number" && range.max != null)
            params.price_max = range.max;
        }
        break;
      }
    }
  }

  if (typeValues.length) params.type = typeValues.join(",");
  if (spiceValues.length) params.spice_level = spiceValues.join(",");
  if (tagValues.length) params.tags = tagValues.join(",");

  if (activeSortId) {
    const sort = sortOptions.find((s) => s._id === activeSortId);
    if (sort) {
      params.sort_by = sort.field;
      params.sort_order = sort.direction;
    }
  }

  return params;
}
