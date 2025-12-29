import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import MarkdownContent from "@/components/MarkdownContent";
import { getParamitaArtikelBySlug } from "@/lib/paramitaContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artikel = await getParamitaArtikelBySlug(id);
  return { title: artikel?.title ?? "Artikel" };
}

export default async function ParamitaArtikelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artikel = await getParamitaArtikelBySlug(id);
  if (!artikel) notFound();

  return (
    <main className="bg-neutral-50">
      <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <BackButton
          fallbackHref="/paramita/artikel"
          ariaLabel="Kembali"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white shadow-md"
        />

        <h1 className="sh1 text-primary-700">{artikel.title}</h1>
        <p className="b4 text-neutral-600 mt-2">{artikel.subtitle}</p>

        <div className="mt-4 flex items-center gap-2 text-neutral-600 b5">
          <span className="inline-flex items-center rounded-md bg-primary-700 px-2 py-1 text-white b5">
            {artikel.tag}
          </span>
          <span>{artikel.author}</span>
          <span>·</span>
          <span>{artikel.date}</span>
        </div>

        <div className="mt-8 bg-white border border-neutral-100 rounded-2xl shadow-lg p-6">
          <MarkdownContent markdown={artikel.markdown} />
        </div>
      </div>
    </main>
  );
}
