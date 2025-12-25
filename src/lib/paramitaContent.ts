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
  return MAJALAH;
}

export async function getParamitaArtikelBySlug(slug: string): Promise<ParamitaArtikel | null> {
  return ARTIKEL.find((a) => a.slug === slug) ?? null;
}

export async function getParamitaMajalahBySlug(slug: string): Promise<ParamitaMajalah | null> {
  return MAJALAH.find((m) => m.slug === slug) ?? null;
}
