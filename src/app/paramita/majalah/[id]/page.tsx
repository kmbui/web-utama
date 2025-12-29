import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import MarkdownContent from "@/components/MarkdownContent";
import { getParamitaMajalahBySlug } from "@/lib/paramitaContent";
import PdfFlipbookClient from "./PdfFlipbookClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const majalah = await getParamitaMajalahBySlug(id);
  return { title: majalah?.title ?? "Majalah" };
}

export default async function ParamitaMajalahDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const majalah = await getParamitaMajalahBySlug(id);
  if (!majalah) notFound();

  const majalahId = majalah.id ?? (/^\d+$/.test(id) ? Number(id) : null);
  const hasPdf = Boolean(majalah.fileUrl && majalahId);

  return (
    <main className="bg-neutral-50">
      <div className={`${hasPdf ? "max-w-6xl" : "max-w-3xl"} mx-auto px-6 py-10 md:py-14`}>
        <BackButton
          fallbackHref="/paramita/majalah"
          ariaLabel="Kembali"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white shadow-md"
        />

        <h1 className="sh1 text-primary-700">{majalah.title}</h1>
        {majalah.subtitle ? (
          <p className="b4 text-neutral-600 mt-2">{majalah.subtitle}</p>
        ) : null}

        {hasPdf ? (
          <PdfFlipbookClient pdfUrl={`/api/paramita/majalah/${majalahId}/pdf`} title={majalah.title} />
        ) : null}

        {hasPdf ? null : (
          <div className="mt-8 bg-white border border-neutral-100 rounded-2xl shadow-lg p-6">
            <MarkdownContent markdown={majalah.markdown} />
          </div>
        )}
      </div>
    </main>
  );
}
