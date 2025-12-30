import type { Metadata } from "next";
import ParamitaClient from "./ParamitaClient";
import type { ParamitaArtikel, ParamitaMajalah } from "@/lib/paramitaContent";
import { getParamitaArtikelList, getParamitaMajalahList } from "@/lib/paramitaContent";

function toEpochMs(iso: string | null | undefined) {
  if (!iso) return -Infinity;
  const ms = Date.parse(iso);
  return Number.isFinite(ms) ? ms : -Infinity;
}

function pickImageSrc(...candidates: Array<string | null | undefined>) {
  for (const c of candidates) {
    if (typeof c !== "string") continue;
    const v = c.trim();
    if (!v) continue;

    // Absolute URL
    if (/^https?:\/\//i.test(v)) return v;
    // Protocol-relative URL
    if (v.startsWith("//")) return `https:${v}`;
    // Root-relative URL (served by this Next app)
    if (v.startsWith("/")) return v;
  }
  return undefined;
}

function pickLatestArtikel(artikel: ParamitaArtikel[]) {
  return artikel.reduce<ParamitaArtikel | null>((best, cur) => {
    const bestMs = best ? toEpochMs(best.metadata.createdAt) : -Infinity;
    const curMs = toEpochMs(cur.metadata.createdAt);
    return curMs > bestMs ? cur : best;
  }, null);
}

function pickLatestMajalah(majalah: ParamitaMajalah[]) {
  return majalah.reduce<ParamitaMajalah | null>((best, cur) => {
    const bestMs = best ? toEpochMs(best.createdAt) : -Infinity;
    const curMs = toEpochMs(cur.createdAt);
    return curMs > bestMs ? cur : best;
  }, null);
}

export const metadata: Metadata = { title: "Paramita" };

export default async function ParamitaPage() {
  const [artikel, majalah] = await Promise.all([getParamitaArtikelList(), getParamitaMajalahList()]);

  const latestArtikel = pickLatestArtikel(artikel);
  const latestMajalah = pickLatestMajalah(majalah);

  const latestArtikelMs = latestArtikel ? toEpochMs(latestArtikel.metadata.createdAt) : -Infinity;
  const latestMajalahMs = latestMajalah ? toEpochMs(latestMajalah.createdAt) : -Infinity;

  const rilisTerbaru =
    latestArtikelMs === -Infinity && latestMajalahMs === -Infinity
      ? null
      : latestArtikelMs >= latestMajalahMs
        ? {
            kind: "artikel" as const,
            title: latestArtikel!.metadata.title,
            description: latestArtikel!.metadata.subtitle,
            href: `/paramita/artikel/${latestArtikel!.metadata.id}`,
            thumbnailUrl: pickImageSrc(latestArtikel!.thumbnailUrl),
          }
        : {
            kind: "majalah" as const,
            title: latestMajalah!.title,
            description: latestMajalah!.description ?? latestMajalah!.subtitle,
            href: `/paramita/majalah/${latestMajalah!.id ?? latestMajalah!.slug}`,
            thumbnailUrl: pickImageSrc(latestMajalah!.thumbnailUrl),
          };

  return <ParamitaClient artikel={artikel} majalah={majalah} rilisTerbaru={rilisTerbaru} />;
}
