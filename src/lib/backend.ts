import "server-only";

type BackendEnv = {
  baseUrl: string;
  apiKey: string;
};

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "");
}

export function getBackendEnv(): BackendEnv | null {
  const baseUrl = process.env.BACKEND_BASE_URL;
  const apiKey = process.env.BACKEND_API_KEY;

  if (!baseUrl || !apiKey) return null;

  return {
    baseUrl: normalizeBaseUrl(baseUrl),
    apiKey,
  };
}

export async function backendFetch(inputPath: string, init?: RequestInit) {
  const env = getBackendEnv();
  if (!env) {
    throw new Error(
      "Missing BACKEND_BASE_URL and/or BACKEND_API_KEY in environment.",
    );
  }

  const url = inputPath.startsWith("http")
    ? inputPath
    : `${env.baseUrl}${inputPath.startsWith("/") ? "" : "/"}${inputPath}`;

  const headers = new Headers(init?.headers);
  headers.set("accept", "application/json");
  // Most common API key header. Adjust if your backend expects a different header name.
  headers.set("x-api-key", env.apiKey);

  return fetch(url, {
    ...init,
    headers,
  });
}

export async function backendFetchJson<T>(inputPath: string, init?: RequestInit): Promise<T> {
  const res = await backendFetch(inputPath, init);

  if (!res.ok) {
    const contentType = res.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? JSON.stringify(await res.json().catch(() => null))
      : await res.text().catch(() => "");

    throw new Error(`Backend request failed (${res.status} ${res.statusText}) ${body}`.trim());
  }

  return res.json() as Promise<T>;
}
