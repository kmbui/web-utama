import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import { getParamitaArtikelBySlug } from "@/lib/paramitaContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = await getParamitaArtikelBySlug(slug);
  return { title: artikel?.title ?? "Artikel" };
}

export default async function ParamitaArtikelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = await getParamitaArtikelBySlug(slug);
  if (!artikel) notFound();

  return (
    <main className="bg-neutral-50">
      <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <Link
          href="/paramita/artikel"
          aria-label="Kembali ke Artikel"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white shadow-md"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

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
