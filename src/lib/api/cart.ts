import { apiFetch } from "./client";
import { getCartToken } from "@/lib/cart/token";

export interface CartItemMedia {
  url: string;
  alt_text?: string;
}

export interface CartItemLine {
  cart_item_id: string;
  menu_item_id: string;
  name: string;
  slug?: string;
  image?: CartItemMedia;
  variant_uuid?: string;
  variant_label?: string;
  extras: { extra_uuid: string; label: string; price: number }[];
  unit_price: number;
  quantity: number;
  line_total: number;
  note?: string;
  is_available: boolean;
  unavailable_reason?: string;
}

export interface CartTotals {
  subtotal: number;
  item_count: number;
  total_quantity: number;
}

export interface CartResponse {
  cart_token: string;
  user_id?: string;
  branch_id: string;
  organization_id: string;
  items: CartItemLine[];
  totals: CartTotals;
  status: string;
  expires_at: string;
}

export interface AddCartItemPayload {
  cart_item_id: string;
  menu_item_id: string;
  variant_uuid?: string;
  extra_uuids?: string[];
  quantity: number;
  note?: string;
}

export interface UpdateCartItemPayload {
  quantity?: number;
  variant_uuid?: string;
  extra_uuids?: string[];
  note?: string;
}

const cartHeaders = (): Record<string, string> => ({ "x-cart-token": getCartToken() });

const base = (branchId: string) => `/public/branches/${branchId}/cart`;

export const getCart = (branchId: string) =>
  apiFetch<CartResponse>(base(branchId), { headers: cartHeaders(), cache: "no-store" });

export const addCartItem = (branchId: string, payload: AddCartItemPayload) =>
  apiFetch<CartResponse>(`${base(branchId)}/items`, {
    method: "POST",
    headers: cartHeaders(),
    body: payload,
  });

export const updateCartItem = (
  branchId: string,
  cartItemId: string,
  payload: UpdateCartItemPayload,
) =>
  apiFetch<CartResponse>(`${base(branchId)}/items/${cartItemId}`, {
    method: "PATCH",
    headers: cartHeaders(),
    body: payload,
  });

export const removeCartItem = (branchId: string, cartItemId: string) =>
  apiFetch<CartResponse>(`${base(branchId)}/items/${cartItemId}`, {
    method: "DELETE",
    headers: cartHeaders(),
  });

export const clearCart = (branchId: string) =>
  apiFetch<void>(base(branchId), { method: "DELETE", headers: cartHeaders() });

export const mergeGuestCart = (branchId: string, guestCartToken: string) =>
  apiFetch<CartResponse>(`${base(branchId)}/merge`, {
    method: "POST",
    headers: cartHeaders(),
    body: { guest_cart_token: guestCartToken },
    credentials: "include",
  });
