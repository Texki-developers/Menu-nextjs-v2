"use client";

import { create } from "zustand";
import {
  addCartItem,
  clearCart as clearCartApi,
  getCart,
  removeCartItem,
  updateCartItem,
  type AddCartItemPayload,
  type CartResponse,
  type UpdateCartItemPayload,
} from "@/lib/api/cart";
import { newCartItemId } from "@/lib/cart/token";

interface CartState {
  cart: CartResponse | null;
  branchId: string | null;
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;

  fetch: (branchId: string) => Promise<void>;
  add: (
    branchId: string,
    input: Omit<AddCartItemPayload, "cart_item_id"> & { cart_item_id?: string },
  ) => Promise<void>;
  update: (branchId: string, cartItemId: string, payload: UpdateCartItemPayload) => Promise<void>;
  remove: (branchId: string, cartItemId: string) => Promise<void>;
  clear: (branchId: string) => Promise<void>;
}

const pickError = (err: unknown): string => {
  if (err && typeof err === "object" && "body" in err) {
    const body = (err as { body?: { message?: string | string[] } }).body;
    if (body?.message) return Array.isArray(body.message) ? body.message[0] : body.message;
  }
  return err instanceof Error ? err.message : "Something went wrong";
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  branchId: null,
  isLoading: false,
  isMutating: false,
  error: null,

  async fetch(branchId) {
    set({ isLoading: true, error: null, branchId });
    try {
      const cart = await getCart(branchId);
      set({ cart, isLoading: false });
    } catch (err) {
      set({ isLoading: false, error: pickError(err) });
    }
  },

  async add(branchId, input) {
    set({ isMutating: true, error: null, branchId });
    try {
      const cart = await addCartItem(branchId, {
        cart_item_id: input.cart_item_id ?? newCartItemId(),
        menu_item_id: input.menu_item_id,
        variant_uuid: input.variant_uuid,
        extra_uuids: input.extra_uuids,
        quantity: input.quantity,
        note: input.note,
      });
      set({ cart, isMutating: false });
    } catch (err) {
      set({ isMutating: false, error: pickError(err) });
      throw err;
    }
  },

  async update(branchId, cartItemId, payload) {
    set({ isMutating: true, error: null });
    try {
      const cart = await updateCartItem(branchId, cartItemId, payload);
      set({ cart, isMutating: false });
    } catch (err) {
      set({ isMutating: false, error: pickError(err) });
      throw err;
    }
  },

  async remove(branchId, cartItemId) {
    set({ isMutating: true, error: null });
    try {
      const cart = await removeCartItem(branchId, cartItemId);
      set({ cart, isMutating: false });
    } catch (err) {
      set({ isMutating: false, error: pickError(err) });
      throw err;
    }
  },

  async clear(branchId) {
    set({ isMutating: true, error: null });
    try {
      await clearCartApi(branchId);
      set({ cart: null, isMutating: false });
    } catch (err) {
      set({ isMutating: false, error: pickError(err) });
      throw err;
    }
  },
}));

export const selectTotalQuantity = (s: CartState) => s.cart?.totals.total_quantity ?? 0;
export const selectSubtotal = (s: CartState) => s.cart?.totals.subtotal ?? 0;
