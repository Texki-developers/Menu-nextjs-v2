/**
 * Branch-scoped route builders. Paths are locale-agnostic — next-intl's
 * navigation `Link`/`useRouter` prepend the active locale automatically.
 */
export function branchRoutes(branchId: string) {
  const base = `/${branchId}`;
  return {
    welcome: `${base}/welcome`,
    menu: base,
    search: `${base}/search`,
    cart: `${base}/cart`,
    order: `${base}/order`,
    tab: `${base}/tab`,
    bill: `${base}/bill`,
    pay: `${base}/pay`,
    receipt: `${base}/receipt`,
  } as const;
}

export const DEFAULT_BRANCH = "saffra-dubai";
