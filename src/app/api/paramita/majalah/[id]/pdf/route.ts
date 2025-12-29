import { backendFetchJson } from "@/lib/backend";

export const dynamic = "force-dynamic";

type BackendMagazineDetail = {
  fileUrl: string;
};

function pickHeader(upstream: Headers, name: string): [string, string] | null {
  const value = upstream.get(name);
  return value ? [name, value] : null;
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id: idParam } = await context.params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) {
    return new Response("Invalid id", { status: 400 });
  }

  // 1) Resolve presigned PDF URL from backend (API-key protected).
  let detail: BackendMagazineDetail;
  try {
    detail = await backendFetchJson<BackendMagazineDetail>(`/api/v1/magazines/${id}`, {
      cache: "no-store",
    });
  } catch {
    // If the API returns 403/404, backendFetchJson throws. Keep response generic.
    return new Response("Not found", { status: 404 });
  }

  if (!detail.fileUrl) {
    return new Response("Not found", { status: 404 });
  }

  // 2) Proxy the PDF itself. This avoids CORS issues when pdf.js fetches.
  const range = req.headers.get("range") ?? undefined;

  const upstream = await fetch(detail.fileUrl, {
    cache: "no-store",
    headers: range ? { range } : undefined,
  });

  if (!upstream.ok && upstream.status !== 206) {
    // Surface upstream status for easier debugging.
    return new Response(`Upstream PDF fetch failed (${upstream.status})`, {
      status: 502,
    });
  }

  const headers = new Headers();

  // Preserve headers pdf.js relies on for range streaming.
  for (const entry of [
    pickHeader(upstream.headers, "content-type"),
    pickHeader(upstream.headers, "content-length"),
    pickHeader(upstream.headers, "content-range"),
    pickHeader(upstream.headers, "accept-ranges"),
    pickHeader(upstream.headers, "etag"),
    pickHeader(upstream.headers, "last-modified"),
  ]) {
    if (entry) headers.set(entry[0], entry[1]);
  }

  if (!headers.get("content-type")) {
    headers.set("content-type", "application/pdf");
  }

  headers.set("cache-control", "no-store");
  headers.set("content-disposition", `inline; filename="paramita-${id}.pdf"`);

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}
