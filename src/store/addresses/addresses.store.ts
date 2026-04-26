"use client";

import { create } from "zustand";
import {
  AddressInput,
  CustomerAddress,
  createAddress,
  deleteAddress,
  listAddresses,
  setDefaultAddress,
  updateAddress,
} from "@/lib/api/addresses";
import { ApiError } from "@/lib/api/client";

interface AddressesState {
  addresses: CustomerAddress[];
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  loaded: boolean;
  fetch: () => Promise<void>;
  add: (input: AddressInput) => Promise<CustomerAddress | null>;
  update: (id: string, input: Partial<AddressInput>) => Promise<CustomerAddress | null>;
  remove: (id: string) => Promise<boolean>;
  makeDefault: (id: string) => Promise<CustomerAddress | null>;
  reset: () => void;
}

const pickError = (err: unknown): string => {
  if (err instanceof ApiError) {
    const body = err.body as { message?: string | string[] } | undefined;
    const msg = body?.message;
    if (Array.isArray(msg)) return msg.join(", ");
    if (typeof msg === "string") return msg;
    return err.message;
  }
  return err instanceof Error ? err.message : "Something went wrong";
};

export const useAddressesStore = create<AddressesState>((set, get) => ({
  addresses: [],
  isLoading: false,
  isMutating: false,
  error: null,
  loaded: false,

  async fetch() {
    set({ isLoading: true, error: null });
    try {
      const addresses = await listAddresses();
      set({ addresses, isLoading: false, loaded: true });
    } catch (err) {
      set({ isLoading: false, error: pickError(err) });
    }
  },

  async add(input) {
    set({ isMutating: true, error: null });
    try {
      const created = await createAddress(input);
      set({ addresses: [...get().addresses, created], isMutating: false });
      return created;
    } catch (err) {
      set({ isMutating: false, error: pickError(err) });
      return null;
    }
  },

  async update(id, input) {
    set({ isMutating: true, error: null });
    try {
      const updated = await updateAddress(id, input);
      set({
        addresses: get().addresses.map((a) =>
          a._id === id ? updated : updated.is_default ? { ...a, is_default: false } : a,
        ),
        isMutating: false,
      });
      return updated;
    } catch (err) {
      set({ isMutating: false, error: pickError(err) });
      return null;
    }
  },

  async remove(id) {
    set({ isMutating: true, error: null });
    try {
      await deleteAddress(id);
      const remaining = get().addresses.filter((a) => a._id !== id);
      const noDefault = remaining.length > 0 && !remaining.some((a) => a.is_default);
      if (noDefault) remaining[0] = { ...remaining[0], is_default: true };
      set({ addresses: remaining, isMutating: false });
      return true;
    } catch (err) {
      set({ isMutating: false, error: pickError(err) });
      return false;
    }
  },

  async makeDefault(id) {
    set({ isMutating: true, error: null });
    try {
      const updated = await setDefaultAddress(id);
      set({
        addresses: get().addresses.map((a) => ({
          ...a,
          is_default: a._id === id,
        })),
        isMutating: false,
      });
      return updated;
    } catch (err) {
      set({ isMutating: false, error: pickError(err) });
      return null;
    }
  },

  reset: () => set({ addresses: [], loaded: false, error: null }),
}));
