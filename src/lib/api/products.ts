import { apiFetch, API_BASE_URL } from "./client";
import { productsConfig } from "@/app/[locale]/[branchId]/(bottom-tabs-pages)/_listing/_components/products/products.config";
import type { ProductConfig } from "@/app/[locale]/[branchId]/(bottom-tabs-pages)/_listing/_components/products/products.config";

export interface ApiProduct {
  id: string | number;
  slug: string;
  title: string;
  image: string;
  price: number | string;
  originalPrice?: number | string;
  description?: string;
  rating?: number;
  isVeg?: boolean;
  isCustomizable?: boolean;
  bestseller?: boolean;
  vendorName?: string;
  deliveryTime?: string;
  images?: string[];
  sizes?: { id: string; label: string; price: number | string }[];
  extras?: { id: string; label: string; price: number | string }[];
}

export interface GetProductsResponse {
  data: ApiProduct[];
}

const toProductConfig = (p: ApiProduct): ProductConfig => ({
  ...p,
  id: String(p.id),
});

export async function getProducts(branchId: string): Promise<ProductConfig[]> {
  if (!API_BASE_URL) {
    return productsConfig;
  }
  try {
    const res = await apiFetch<GetProductsResponse | ApiProduct[]>("/products", {
      query: { branchId },
      revalidate: 60,
    });
    const list = Array.isArray(res) ? res : res.data;
    return list.map(toProductConfig);
  } catch (err) {
    console.error("[getProducts] falling back to mock:", err);
    return productsConfig;
  }
}
