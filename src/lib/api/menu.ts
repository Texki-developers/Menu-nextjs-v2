import { apiFetch, API_BASE_URL } from "./client";
import { productsConfig } from "@/app/[locale]/[branchId]/(bottom-tabs-pages)/_listing/_components/products/products.config";
import type { ProductConfig } from "@/app/[locale]/[branchId]/(bottom-tabs-pages)/_listing/_components/products/products.config";

export interface BranchInfo {
  id: string;
  name: string;
  organization_id: string;
  phone?: string;
  email?: string;
  address_detail?: Record<string, unknown>;
  operating_hours?: Record<string, unknown>[];
  status: string;
}

export interface MenuItemMedia {
  url: string;
  type?: string;
  format?: string;
  is_primary?: boolean;
  order?: number;
  alt_text?: string;
}

export interface CustomerMenuItem {
  id: string;
  product_id: string;
  name: string;
  slug: string;
  description?: string;
  type: string;
  spice_level?: string;
  is_featured: boolean;
  calories?: number;
  tags: string[];
  allergens: string[];
  base_price: number;
  selling_price: number;
  discount_price?: number;
  is_available: boolean;
  prep_time?: string;
  max_quantity?: number;
  media: MenuItemMedia[];
}

export interface CustomerCategory {
  id: string;
  name: string;
  icon?: string;
  image_url?: string;
  items: CustomerMenuItem[];
}

export interface BranchMenuResponse {
  branch: BranchInfo;
  categories: CustomerCategory[];
}

export const toProductConfig = (item: CustomerMenuItem): ProductConfig => {
  const primaryMedia = item.media?.find((m) => m.is_primary) ?? item.media?.[0];
  const price = item.discount_price ?? item.selling_price;
  return {
    id: item.id,
    slug: item.slug,
    title: item.name,
    description: item.description,
    image: primaryMedia?.url ?? "",
    price,
    originalPrice: item.discount_price ? item.selling_price : undefined,
    isVeg: item.type?.toLowerCase() === "veg" || item.type?.toLowerCase() === "vegan",
    isCustomizable: false,
    bestseller: item.is_featured,
    images: item.media?.map((m) => m.url).filter(Boolean),
    type: item.type,
    spiceLevel: item.spice_level,
    tags: item.tags,
    isFeatured: item.is_featured,
  };
};

export async function getBranchMenu(branchId: string): Promise<BranchMenuResponse | null> {
  if (!API_BASE_URL) return null;
  try {
    return await apiFetch<BranchMenuResponse>(`/public/branches/${branchId}/menu`, {
      revalidate: 60,
    });
  } catch (err) {
    console.error("[getBranchMenu] failed:", err);
    return null;
  }
}

export interface BranchMenuSummary {
  id: string;
  name: string;
  type: string;
  description?: string;
  schedule?: Record<string, unknown>;
  is_currently_active: boolean;
}

interface BranchMenusResponse {
  menus: BranchMenuSummary[];
}

export async function getBranchMenus(branchId: string): Promise<BranchMenuSummary[]> {
  if (!API_BASE_URL) return [];
  try {
    const res = await apiFetch<BranchMenusResponse>(`/public/branches/${branchId}/menus`, {
      revalidate: 60,
    });
    return res?.menus ?? [];
  } catch (err) {
    console.error("[getBranchMenus] failed:", err);
    return [];
  }
}

export interface CategorySummary {
  id: string;
  name: string;
  icon?: string;
  image_url?: string;
  item_count: number;
}

interface CategoriesResponse {
  categories: CategorySummary[];
}

export async function listCategories(
  branchId: string,
  menuId: string,
): Promise<CategorySummary[]> {
  const res = await apiFetch<CategoriesResponse>(
    `/public/branches/${branchId}/menus/${menuId}/categories`,
  );
  return res?.categories ?? [];
}

interface ItemsResponse {
  items: CustomerMenuItem[];
}

export async function listItems(
  branchId: string,
  categoryId: string,
  menuId: string,
): Promise<CustomerMenuItem[]> {
  const res = await apiFetch<ItemsResponse>(
    `/public/branches/${branchId}/categories/${categoryId}/items`,
    { query: { menuId } },
  );
  return res?.items ?? [];
}

export async function getProducts(branchId: string): Promise<ProductConfig[]> {
  const menu = await getBranchMenu(branchId);
  if (!menu) return productsConfig;
  return menu.categories.flatMap((cat) => cat.items.map(toProductConfig));
}

export interface ProductVariant {
  variant_uuid: string;
  label: string;
  price: number;
  is_default: boolean;
  sort_order: number;
  is_available: boolean;
}

export interface ProductExtra {
  extra_uuid: string;
  label: string;
  price: number;
  is_default: boolean;
  sort_order: number;
  is_available: boolean;
}

export interface ProductDetail {
  id: string;
  product_id: string;
  name: string;
  slug: string;
  description?: string;
  type: string;
  spice_level?: string;
  is_featured: boolean;
  is_alcohol: boolean;
  calories?: number;
  nutritional_info?: {
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
  };
  tags: string[];
  allergens: string[];
  base_price: number;
  selling_price: number;
  discount_price?: number;
  is_available: boolean;
  prep_time?: string;
  max_quantity?: number;
  max_extras?: number;
  media: MenuItemMedia[];
  variants: ProductVariant[];
  extras: ProductExtra[];
  special_note?: string;
  warning_note?: string;
  rating?: number | null;
  review_count: number;
}

export interface ProductDetailResponse {
  branch: BranchInfo;
  item: ProductDetail;
}

export async function getProductDetail(
  branchId: string,
  slug: string,
): Promise<ProductDetailResponse | null> {
  if (!API_BASE_URL) return null;
  try {
    return await apiFetch<ProductDetailResponse>(
      `/public/branches/${branchId}/items/${slug}`,
      { revalidate: 60 },
    );
  } catch (err) {
    console.error("[getProductDetail] failed:", err);
    return null;
  }
}
