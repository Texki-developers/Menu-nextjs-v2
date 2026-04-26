import { apiFetch } from "./client";

export interface AddressCoordinates {
  lat: number;
  lng: number;
}

export interface CustomerAddress {
  _id: string;
  label?: string;
  line1: string;
  line2?: string;
  area?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
  contact_phone?: string;
  notes?: string;
  coordinates?: AddressCoordinates;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}

export type AddressInput = Omit<CustomerAddress, "_id" | "is_default" | "created_at" | "updated_at"> & {
  is_default?: boolean;
};

export async function listAddresses(): Promise<CustomerAddress[]> {
  return apiFetch<CustomerAddress[]>("/customer/me/addresses", {
    credentials: "include",
    cache: "no-store",
  });
}

export async function createAddress(input: AddressInput): Promise<CustomerAddress> {
  return apiFetch<CustomerAddress>("/customer/me/addresses", {
    method: "POST",
    body: input,
    credentials: "include",
  });
}

export async function updateAddress(
  id: string,
  input: Partial<AddressInput>,
): Promise<CustomerAddress> {
  return apiFetch<CustomerAddress>(`/customer/me/addresses/${id}`, {
    method: "PATCH",
    body: input,
    credentials: "include",
  });
}

export async function deleteAddress(id: string): Promise<void> {
  await apiFetch<void>(`/customer/me/addresses/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function setDefaultAddress(id: string): Promise<CustomerAddress> {
  return apiFetch<CustomerAddress>(`/customer/me/addresses/${id}/default`, {
    method: "POST",
    credentials: "include",
  });
}
