const STORAGE_KEY = "menu.cart_token";

const randomUuid = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export function getCartToken(): string {
  if (typeof window === "undefined") return "";
  let token = window.localStorage.getItem(STORAGE_KEY);
  if (!token) {
    token = randomUuid();
    window.localStorage.setItem(STORAGE_KEY, token);
  }
  return token;
}

export function resetCartToken(): string {
  if (typeof window === "undefined") return "";
  const token = randomUuid();
  window.localStorage.setItem(STORAGE_KEY, token);
  return token;
}

export const newCartItemId = randomUuid;
