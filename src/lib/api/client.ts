export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export class ApiError extends Error {
  constructor(message: string, public status: number, public body?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  revalidate?: number | false;
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

export async function apiFetch<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError("NEXT_PUBLIC_API_BASE_URL is not configured", 0);
  }
  const { query, body, revalidate, headers, ...rest } = opts;
  const res = await fetch(buildUrl(path, query), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next: revalidate !== undefined ? { revalidate: revalidate === false ? 0 : revalidate } : undefined,
  });

  if (!res.ok) {
    let errBody: unknown = undefined;
    try {
      errBody = await res.json();
    } catch {}
    throw new ApiError(`Request failed: ${res.status} ${res.statusText}`, res.status, errBody);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
