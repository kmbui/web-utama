import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import { getParamitaMajalahBySlug } from "@/lib/paramitaContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const majalah = await getParamitaMajalahBySlug(slug);
  return { title: majalah?.title ?? "Majalah" };
}

export default async function ParamitaMajalahDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const majalah = await getParamitaMajalahBySlug(slug);
  if (!majalah) notFound();

  return (
    <main className="bg-neutral-50">
      <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <Link
          href="/paramita/majalah"
          aria-label="Kembali ke Majalah"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white shadow-md"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        <h1 className="sh1 text-primary-700">{majalah.title}</h1>
        <p className="b4 text-neutral-600 mt-2">{majalah.subtitle}</p>

        <div className="mt-8 bg-white border border-neutral-100 rounded-2xl shadow-lg p-6">
          <MarkdownContent markdown={majalah.markdown} />
        </div>
      </div>
    </main>
  );
}
