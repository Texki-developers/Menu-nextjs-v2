import type { Localized, StatusKey } from "@/lib/menu";

export type PayMode = "AT_COUNTER" | "ONLINE" | "BOTH";

/**
 * Restaurant-level config. In the real app this comes from branch settings;
 * for the design it is fixed here.
 */
export const RESTAURANT = {
  name: { en: "Saffra", ar: "صفرا" } as Localized,
  tagline: { en: "Modern Gulf grill · Dubai", ar: "مشاوي خليجية حديثة · دبي" } as Localized,
  table: { en: "Table 12", ar: "طاولة ١٢" } as Localized,
  requiresWaiterConfirm: false,
  payMode: "BOTH" as PayMode,
  serviceRate: 0.1,
  vatRate: 0.05,
};

/** Status flow for the live tracker. */
export function stepsFor(confirm: boolean): StatusKey[] {
  return confirm
    ? ["Placed", "Confirmed", "Preparing", "Ready", "Served"]
    : ["Placed", "Preparing", "Ready", "Served"];
}
