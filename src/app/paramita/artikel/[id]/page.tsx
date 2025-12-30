import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import MarkdownContent from "@/components/MarkdownContent";
import { getParamitaArtikelBySlug, getParamitaArtikelMarkdownById } from "@/lib/paramitaContent";

function formatDate(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artikel = await getParamitaArtikelBySlug(id);
  return { title: artikel?.metadata.title ?? "Artikel" };
}

export default async function ParamitaArtikelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artikel = await getParamitaArtikelBySlug(id);
  if (!artikel) notFound();

  const artikelId = artikel.metadata.id;
  const markdown = (await getParamitaArtikelMarkdownById(artikelId)) ?? "_Konten belum tersedia._";
  const date = formatDate(artikel.metadata.updatedAt || artikel.metadata.createdAt);

  return (
    <main className="bg-neutral-50">
      <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <BackButton
          fallbackHref="/paramita/artikel"
          ariaLabel="Kembali"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white shadow-md"
        />

        <h1 className="sh1 text-primary-700">{artikel.metadata.title}</h1>
        <p className="b4 text-neutral-600 mt-2">{artikel.metadata.subtitle}</p>

        <div className="mt-4 flex items-center gap-2 text-neutral-600 b5">
          <span className="inline-flex items-center rounded-md bg-primary-700 px-2 py-1 text-white b5">
            {artikel.metadata.theme}
          </span>
          {artikel.metadata.writer ? <span>{artikel.metadata.writer}</span> : null}
          {date ? (
            <>
              <span>·</span>
              <span>{date}</span>
            </>
          ) : null}
        </div>

        <div className="mt-8 bg-white border border-neutral-100 rounded-2xl shadow-lg p-6">
          <MarkdownContent markdown={markdown} />
        </div>
      </div>
    </main>
  );
}
