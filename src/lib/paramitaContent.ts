import { backendFetch, backendFetchJson, getBackendEnv } from "./backend";

export type ParamitaArtikel = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  author: string;
  date: string;
  markdown: string;
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
    slug: "judul-artikel-1",
    title: "Judul Artikel",
    subtitle: "Subjudul Artikel",
    tag: "Tema",
    author: "Nama Penulis",
    date: "07/09/2025",
    markdown: `# Judul Artikel\n\n_Subjudul Artikel_\n\nArtikel ini adalah **dummy** untuk menguji rendering markdown dari backend.\n\n## Poin Utama\n\n- Ini bullet pertama\n- Ini bullet kedua\n- Ini bullet ketiga\n\n> Kutipan singkat yang relevan dengan topik artikel.\n\n### Penutup\n\nTerima kasih sudah membaca. Untuk info lebih lanjut, lihat [Paramita](https://example.com).\n`,
  },
  {
    slug: "judul-artikel-2",
    title: "Judul Artikel",
    subtitle: "Subjudul Artikel",
    tag: "Tema",
    author: "Nama Penulis",
    date: "07/09/2025",
    markdown: `# Judul Artikel\n\nBerikut contoh markdown dengan **teks tebal**, _miring_, dan daftar bernomor:\n\n1. Langkah pertama\n2. Langkah kedua\n3. Langkah ketiga\n\n\`inline code\` juga harus rapi.\n`,
  },
  {
    slug: "judul-artikel-3",
    title: "Judul Artikel",
    subtitle: "Subjudul Artikel",
    tag: "Tema",
    author: "Nama Penulis",
    date: "07/09/2025",
    markdown: `# Judul Artikel\n\nIni paragraf pembuka.\n\n## Subbagian\n\n- Item A\n- Item B\n\n\n---\n\nCatatan: konten ini dummy.\n`,
  },
];

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
  return ARTIKEL;
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
    };
  } catch (err) {
    console.error(`[Paramita] Failed to fetch /api/v1/magazines/${id}.`, err);
    return null;
  }
}

export async function getParamitaArtikelBySlug(slug: string): Promise<ParamitaArtikel | null> {
  return ARTIKEL.find((a) => a.slug === slug) ?? null;
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
