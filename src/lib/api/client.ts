export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export class ApiError extends Error {
  constructor(message: string, public status: number, public body?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  revalidate?: number | false;
  /** If true, return the raw response without unwrapping the { success, data } envelope. */
  raw?: boolean;
}

const buildUrl = (path: string, query?: RequestOptions["query"]): string => {
  const base = API_BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${cleanPath}`);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
};

const REFRESH_PATH = "/auth/customer/refresh";
const NO_REFRESH_PATHS = [REFRESH_PATH, "/auth/customer/login", "/auth/customer/logout"];

let refreshPromise: Promise<boolean> | null = null;

const refreshOnce = (): Promise<boolean> => {
  if (!refreshPromise) {
    refreshPromise = fetch(buildUrl(REFRESH_PATH), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      }) as Promise<boolean>;
  }
  return refreshPromise;
};

const performRequest = (
  path: string,
  query: RequestOptions["query"],
  body: unknown,
  revalidate: number | false | undefined,
  headers: HeadersInit | undefined,
  rest: Omit<RequestInit, "body">,
) =>
  fetch(buildUrl(path, query), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next:
      revalidate !== undefined
        ? { revalidate: revalidate === false ? 0 : revalidate }
        : undefined,
  });

export async function apiFetch<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError("NEXT_PUBLIC_API_BASE_URL is not configured", 0);
  }
  const { query, body, revalidate, headers, raw, ...rest } = opts;

  let res = await performRequest(path, query, body, revalidate, headers, rest);

  if (
    res.status === 401 &&
    typeof window !== "undefined" &&
    !NO_REFRESH_PATHS.some((p) => path.startsWith(p))
  ) {
    const refreshed = await refreshOnce();
    if (refreshed) {
      res = await performRequest(path, query, body, revalidate, headers, rest);
    }
  }

  if (!res.ok) {
    let errBody: unknown = undefined;
    try {
      errBody = await res.json();
    } catch {}
    throw new ApiError(`Request failed: ${res.status} ${res.statusText}`, res.status, errBody);
  }

  if (res.status === 204) return undefined as T;
  const json = await res.json();
  if (raw) return json as T;
  if (json && typeof json === "object" && "data" in json && "success" in json) {
    return (json as ApiEnvelope<T>).data;
  }
  return json as T;
}
