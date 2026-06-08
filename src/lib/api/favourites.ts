import { apiFetch } from "./client";
import type { CustomerMenuItem } from "./menu";

export async function listFavouriteIds(): Promise<string[]> {
  const res = await apiFetch<{ menu_item_ids: string[] }>(
    "/customer/me/favourites/ids",
    { credentials: "include", cache: "no-store" },
  );
  return res.menu_item_ids ?? [];
}

export async function listFavourites(): Promise<CustomerMenuItem[]> {
  const res = await apiFetch<{ items: CustomerMenuItem[] }>(
    "/customer/me/favourites",
    { credentials: "include", cache: "no-store" },
  );
  return res.items ?? [];
}

export async function addFavourite(menuItemId: string): Promise<void> {
  await apiFetch<unknown>("/customer/me/favourites", {
    method: "POST",
    body: { menu_item_id: menuItemId },
    credentials: "include",
  });
}

export async function removeFavourite(menuItemId: string): Promise<void> {
  await apiFetch<unknown>(`/customer/me/favourites/${menuItemId}`, {
    method: "DELETE",
    credentials: "include",
  });
}
