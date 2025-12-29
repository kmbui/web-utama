"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from "pdfjs-dist";
import type { PDFPageProxy } from "pdfjs-dist";

// Use a CDN worker to avoid bundler/worker configuration issues in Next/Turbopack.
// Keep version aligned with installed pdfjs-dist.
GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";

type PdfFlipbookClientProps = {
  pdfUrl: string;
  title: string;
};

type PageSize = { width: number; height: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type PdfCanvasPageProps = {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  pageSize: PageSize;
  label: string;
};

const PdfCanvasPage = forwardRef<HTMLDivElement, PdfCanvasPageProps>(function PdfCanvasPage(
  { pdf, pageNumber, pageSize, label },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const page: PDFPageProxy = await pdf.getPage(pageNumber);
      if (cancelled) return;

      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min(pageSize.width / viewport.width, pageSize.height / viewport.height);
      const scaledViewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = Math.floor(scaledViewport.width);
      canvas.height = Math.floor(scaledViewport.height);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const renderTask = page.render({ canvasContext: ctx, viewport: scaledViewport });
      await renderTask.promise;
    })().catch(() => {
      // Keep UI resilient; errors are handled by parent state.
    });

    return () => {
      cancelled = true;
    };
  }, [pdf, pageNumber, pageSize.height, pageSize.width]);

  return (
    <div
      ref={ref}
      className="bg-white border border-neutral-100"
      style={{ width: pageSize.width, height: pageSize.height }}
      aria-label={label}
    >
      <div className="w-full h-full grid place-items-center">
        <canvas ref={canvasRef} className="max-w-full max-h-full" />
      </div>
    </div>
  );
});

export default function PdfFlipbookClient({ pdfUrl, title }: PdfFlipbookClientProps) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [portrait, setPortrait] = useState(true);

  // Keep a reasonable size that matches existing page widths.
  const pageSize = useMemo<PageSize>(() => {
    const width = 420;
    const height = 560;
    return { width, height };
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setError(null);
      setPdf(null);
      setNumPages(0);

      try {
        const loadingTask = getDocument({
          url: pdfUrl,
          // Avoid pdf.js internal caching; presigned URLs are short-lived.
          disableAutoFetch: false,
          disableStream: false,
        });

        const doc = await loadingTask.promise;
        if (cancelled) return;

        setPdf(doc);
        setNumPages(doc.numPages ?? 0);
      } catch {
        if (cancelled) return;
        setError("Gagal memuat PDF. Silakan refresh halaman.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");

    const update = (e?: MediaQueryListEvent) => {
      setPortrait(e?.matches ?? mq.matches);
    };

    update();

    // Prefer modern API; fall back at runtime if needed.
    try {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } catch {
      (mq as unknown as { addListener: (cb: (e: MediaQueryListEvent) => void) => void }).addListener(update);
      return () =>
        (mq as unknown as { removeListener: (cb: (e: MediaQueryListEvent) => void) => void }).removeListener(update);
    }
  }, []);

  const pages = useMemo(() => {
    const total = clamp(numPages, 0, 400);
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [numPages]);

  if (error) {
    return (
      <div className="bg-white border border-neutral-100 rounded-2xl shadow-lg p-6">
        <p className="sh4 text-neutral-900">{title}</p>
        <p className="b4 text-neutral-600 mt-2">{error}</p>
      </div>
    );
  }

  if (!pdf) {
    return (
      <div className="bg-white border border-neutral-100 rounded-2xl shadow-lg p-6">
        <p className="sh4 text-neutral-900">Memuat PDF…</p>
        <p className="b4 text-neutral-600 mt-2">Mohon tunggu sebentar.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="bg-white border border-neutral-100 rounded-2xl shadow-lg p-4 overflow-x-auto md:overflow-hidden">
        <div className="inline-block md:block md:w-fit md:mx-auto">
          <HTMLFlipBook
            style={{}}
            startPage={0}
            width={pageSize.width}
            height={pageSize.height}
            size="fixed"
            minWidth={pageSize.width}
            maxWidth={pageSize.width}
            minHeight={pageSize.height}
            maxHeight={pageSize.height}
            drawShadow
            flippingTime={600}
            usePortrait={portrait}
            startZIndex={0}
            autoSize
            showCover={false}
            maxShadowOpacity={0.2}
            className=""
            mobileScrollSupport
            clickEventForward
            useMouseEvents
            swipeDistance={30}
            showPageCorners
            disableFlipByClick={false}
          >
            {pages.map((pageNumber) => (
              <PdfCanvasPage
                key={pageNumber}
                pdf={pdf}
                pageNumber={pageNumber}
                pageSize={pageSize}
                label={`${title} halaman ${pageNumber}`}
              />
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      <p className="b5 text-neutral-600 mt-3">Klik atau drag untuk membalik halaman.</p>
    </div>
  );
}
