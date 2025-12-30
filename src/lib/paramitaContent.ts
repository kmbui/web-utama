import { backendFetch, backendFetchJson, getBackendEnv } from "./backend";

export type ParamitaArtikel = {
  metadata: {
    id: number;
    title: string;
    subtitle: string;
    theme: string;
    writer: string;
    thumbnailUri: string;
    contentUri: string;
    status: string;
    updatedAt: string | null;
    createdAt: string | null;
    deletedAt: string | null;
  };
  thumbnailUrl: string;
};

export type ParamitaMajalah = {
  slug: string;
  title: string;
  subtitle: string;
  markdown: string;
  id?: number;
  description?: string;
  thumbnailUri?: string;
  thumbnailUrl?: string;
  fileUrl?: string;
  resourceUri?: string;
  status?: string;
  updatedAt?: string | null;
  createdAt?: string | null;
  deletedAt?: string | null;
};

type BackendMagazineItem = {
  metadata: {
    id: number;
    title: string;
    description: string;
    thumbnailUri: string;
    resourceUri: string;
    status: string;
    updatedAt: string | null;
    createdAt: string | null;
    deletedAt: string | null;
  };
  thumbnailUrl: string;
};

type BackendMagazineDetail = {
  metadata: {
    id: number;
    title: string;
    description: string;
    thumbnailUri: string;
    resourceUri: string;
    status: string;
    updatedAt: string | null;
    createdAt: string | null;
    deletedAt: string | null;
  };
  thumbnailUrl: string;
  fileUrl: string;
};

const ARTIKEL: ParamitaArtikel[] = [
  {
    metadata: {
      id: 1,
      title: "Judul Artikel",
      subtitle: "Subjudul Artikel",
      theme: "Tema",
      writer: "Nama Penulis",
      thumbnailUri: "",
      contentUri: "local://artikel/1",
      status: "published",
      updatedAt: "2025-09-07T00:00:00.000Z",
      createdAt: "2025-09-07T00:00:00.000Z",
      deletedAt: null,
    },
    thumbnailUrl: "",
  },
  {
    metadata: {
      id: 2,
      title: "Judul Artikel",
      subtitle: "Subjudul Artikel",
      theme: "Tema",
      writer: "Nama Penulis",
      thumbnailUri: "",
      contentUri: "local://artikel/2",
      status: "published",
      updatedAt: "2025-09-07T00:00:00.000Z",
      createdAt: "2025-09-07T00:00:00.000Z",
      deletedAt: null,
    },
    thumbnailUrl: "",
  },
  {
    metadata: {
      id: 3,
      title: "Judul Artikel",
      subtitle: "Subjudul Artikel",
      theme: "Tema",
      writer: "Nama Penulis",
      thumbnailUri: "",
      contentUri: "local://artikel/3",
      status: "published",
      updatedAt: "2025-09-07T00:00:00.000Z",
      createdAt: "2025-09-07T00:00:00.000Z",
      deletedAt: null,
    },
    thumbnailUrl: "",
  },
];

const ARTIKEL_MARKDOWN_BY_ID: Record<number, string> = {
  1: `# Judul Artikel\n\n_Subjudul Artikel_\n\nArtikel ini adalah **dummy** untuk menguji rendering markdown dari backend.\n\n## Poin Utama\n\n- Ini bullet pertama\n- Ini bullet kedua\n- Ini bullet ketiga\n\n> Kutipan singkat yang relevan dengan topik artikel.\n\n### Penutup\n\nTerima kasih sudah membaca. Untuk info lebih lanjut, lihat [Paramita](https://example.com).\n`,
  2: `# Judul Artikel\n\nBerikut contoh markdown dengan **teks tebal**, _miring_, dan daftar bernomor:\n\n1. Langkah pertama\n2. Langkah kedua\n3. Langkah ketiga\n\n\`inline code\` juga harus rapi.\n`,
  3: `# Judul Artikel\n\nIni paragraf pembuka.\n\n## Subbagian\n\n- Item A\n- Item B\n\n\n---\n\nCatatan: konten ini dummy.\n`,
};

const MAJALAH: ParamitaMajalah[] = [
  {
    slug: "viriya-paramita-59",
    title: "Viriya",
    subtitle: "Paramita 59",
    markdown: `# Viriya\n\n**Paramita 59**\n\nSelamat datang di majalah Paramita edisi ini.\n\n## Rubrik\n\n- Editorial\n- Feature\n- Interlude\n\n### Highlight\n\nBerikut highlight singkat dari edisi ini.\n`,
  },
  {
    slug: "viriya-paramita-59-2",
    title: "Viriya",
    subtitle: "Paramita 59",
    markdown: `# Viriya\n\nKonten majalah dummy untuk menguji tampilan markdown.\n\n## Daftar Isi\n\n1. Pembuka\n2. Cerita\n3. Penutup\n`,
  },
  {
    slug: "viriya-paramita-59-3",
    title: "Viriya",
    subtitle: "Paramita 59",
    markdown: `# Viriya\n\nKonten dummy lain untuk variasi data.\n`,
  },
];

export async function getParamitaArtikelList(): Promise<ParamitaArtikel[]> {
  const env = getBackendEnv();
  if (!env) return ARTIKEL;

  // Some deployments serve the API under /api/v1/* and route other paths (like /articles)
  // to object storage. Try both.
  const candidates = ["/articles", "/api/v1/articles"];

  for (const path of candidates) {
    try {
      // Backend returns short-lived presigned URLs (if any), so we must not cache.
      return await backendFetchJson<ParamitaArtikel[]>(path, {
        cache: "no-store",
      });
    } catch {
      // Try next candidate.
    }
  }

  console.error("[Paramita] Failed to fetch articles from backend (tried /articles and /api/v1/articles)."
  );
  // If env is configured but backend fails, prefer an empty list over dummy data.
  return [];
}

export async function getParamitaMajalahList(): Promise<ParamitaMajalah[]> {
  const env = getBackendEnv();
  if (!env) return MAJALAH;

  try {
    const magazines = await backendFetchJson<BackendMagazineItem[]>("/api/v1/magazines", {
      // Backend returns short-lived presigned URLs (e.g. X-Amz-Expires=30),
      // so we must not cache this response.
      cache: "no-store",
    });

    return magazines.map((item) => ({
      slug: String(item.metadata.id),
      title: item.metadata.title,
      subtitle: "",
      markdown: item.metadata.description ?? "",
      id: item.metadata.id,
      description: item.metadata.description,
      thumbnailUri: item.metadata.thumbnailUri,
      thumbnailUrl: item.thumbnailUrl,
      resourceUri: item.metadata.resourceUri,
      status: item.metadata.status,
      createdAt: item.metadata.createdAt,
      updatedAt: item.metadata.updatedAt,
      deletedAt: item.metadata.deletedAt,
    }));
  } catch (err) {
    console.error("[Paramita] Failed to fetch /api/v1/magazines; falling back to local data.", err);
    return MAJALAH;
  }
}

export async function getParamitaMajalahById(id: number): Promise<ParamitaMajalah | null> {
  const env = getBackendEnv();
  if (!env) return null;

  try {
    const res = await backendFetch(`/api/v1/magazines/${id}`, {
      // Response includes short-lived presigned URLs.
      cache: "no-store",
    });

    if (res.status === 403 || res.status === 404) return null;
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Backend request failed (${res.status} ${res.statusText}) ${text}`.trim());
    }

    const item = (await res.json()) as BackendMagazineDetail;
    return {
      slug: String(item.metadata.id),
      title: item.metadata.title,
      subtitle: "",
      markdown: item.metadata.description ?? "",
      id: item.metadata.id,
      description: item.metadata.description,
      thumbnailUri: item.metadata.thumbnailUri,
      thumbnailUrl: item.thumbnailUrl,
      fileUrl: item.fileUrl,
      resourceUri: item.metadata.resourceUri,
      status: item.metadata.status,
      createdAt: item.metadata.createdAt,
      updatedAt: item.metadata.updatedAt,
      deletedAt: item.metadata.deletedAt,
    };
  } catch (err) {
    console.error(`[Paramita] Failed to fetch /api/v1/magazines/${id}.`, err);
    return null;
  }
}

export async function getParamitaArtikelById(id: number): Promise<ParamitaArtikel | null> {
  const list = await getParamitaArtikelList();
  return list.find((a) => a.metadata.id === id) ?? null;
}

export async function getParamitaArtikelMarkdownById(id: number): Promise<string | null> {
  const env = getBackendEnv();
  if (!env) return ARTIKEL_MARKDOWN_BY_ID[id] ?? null;

  const artikel = await getParamitaArtikelById(id);
  if (!artikel?.metadata.contentUri) return null;

  const contentUri = artikel.metadata.contentUri;

  try {
    // contentUri is expected to point to a markdown resource.
    // It might be an absolute URL (e.g. presigned) or a backend path that still
    // needs API-key auth. Support both.
    const res = contentUri.startsWith("http")
      ? await fetch(contentUri, {
          cache: "no-store",
          headers: { accept: "text/markdown,text/plain,application/json;q=0.9,*/*;q=0.8" },
        })
      : await backendFetch(contentUri.startsWith("/") ? contentUri : `/${contentUri}`, {
          cache: "no-store",
          headers: { accept: "text/markdown,text/plain,application/json;q=0.9,*/*;q=0.8" },
        });
    if (!res.ok) return null;

    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const json = (await res.json().catch(() => null)) as unknown;
      if (json && typeof json === "object") {
        const obj = json as Record<string, unknown>;
        const markdown = obj.markdown;
        const content = obj.content;
        if (typeof markdown === "string") return markdown;
        if (typeof content === "string") return content;
      }
      return JSON.stringify(json);
    }

    return await res.text();
  } catch (err) {
    console.error(`[Paramita] Failed to fetch article content for id=${id}.`, err);
    return null;
  }
}

export async function getParamitaArtikelBySlug(slug: string): Promise<ParamitaArtikel | null> {
  // Routes use numeric IDs (e.g. /paramita/artikel/24).
  if (/^\d+$/.test(slug)) {
    return getParamitaArtikelById(Number(slug));
  }
  return null;
}

export async function getParamitaMajalahBySlug(slug: string): Promise<ParamitaMajalah | null> {
  const local = MAJALAH.find((m) => m.slug === slug);
  if (local) return local;

  const env = getBackendEnv();
  if (!env) return null;

  // Our routes use numeric IDs from backend (e.g. /paramita/majalah/24).
  if (/^\d+$/.test(slug)) {
    const id = Number(slug);
    return getParamitaMajalahById(id);
  }

  const list = await getParamitaMajalahList();
  return list.find((m) => m.slug === slug) ?? null;
}
