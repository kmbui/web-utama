"use client";

import { useEffect, useRef, useState, type MutableRefObject, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ParamitaMajalah } from "@/lib/paramitaContent";

type ArtikelItem = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  author: string;
  date: string;
  excerpt: string;
};

type MajalahItem = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
};

const ARTIKEL_ITEMS: ArtikelItem[] = [
  {
    id: "artikel-1",
    title: "Judul Artikel",
    subtitle: "Subjudul Artikel",
    tag: "Tema",
    author: "Nama Penulis",
    date: "07/09/2025",
    excerpt: "Cuplikan isi artikel",
  },
  {
    id: "artikel-2",
    title: "Judul Artikel",
    subtitle: "Subjudul Artikel",
    tag: "Tema",
    author: "Nama Penulis",
    date: "07/09/2025",
    excerpt: "Cuplikan isi artikel",
  },
  {
    id: "artikel-3",
    title: "Judul Artikel",
    subtitle: "Subjudul Artikel",
    tag: "Tema",
    author: "Nama Penulis",
    date: "07/09/2025",
    excerpt: "Cuplikan isi artikel",
  },
  {
    id: "artikel-4",
    title: "Judul Artikel",
    subtitle: "Subjudul Artikel",
    tag: "Tema",
    author: "Nama Penulis",
    date: "07/09/2025",
    excerpt: "Cuplikan isi artikel",
  },
];

const MAJALAH_ITEMS: MajalahItem[] = [
  { id: "viriya-paramita-59", title: "Viriya", description: "Paramita 59" },
  { id: "viriya-paramita-59-2", title: "Viriya", description: "Paramita 59" },
  { id: "viriya-paramita-59-3", title: "Viriya", description: "Paramita 59" },
];

function getShortText(text: string, maxLen = 90) {
  const trimmed = text.trim();
  if (trimmed.length <= maxLen) return trimmed;
  return `${trimmed.slice(0, maxLen).trim()}…`;
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return dir === "left" ? (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ) : (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function ParamitaClient({
  majalah,
}: {
  majalah: ParamitaMajalah[];
}) {
  const artikelRef = useRef<HTMLDivElement | null>(null);
  const majalahRef = useRef<HTMLDivElement | null>(null);

  const mountedRef = useRef(true);

  const [artikelAnim, setArtikelAnim] = useState("");
  const [majalahAnim, setMajalahAnim] = useState("");

  const [showArtikelNav, setShowArtikelNav] = useState(false);
  const [showMajalahNav, setShowMajalahNav] = useState(false);

  const artikelTimer = useRef<number | null>(null);
  const majalahTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const triggerScroll = (opts: {
    dir: "prev" | "next";
    ref: RefObject<HTMLDivElement | null>;
    setAnim: (v: string) => void;
    timerRef: MutableRefObject<number | null>;
    amount: number;
  }) => {
    const { dir, ref, setAnim, timerRef, amount } = opts;
    const el = ref.current;
    if (!el) return;

    setAnim(dir === "next" ? "animate-carousel-next" : "animate-carousel-prev");

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return;
      setAnim("");
    }, 340);

    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  const majalahItems: MajalahItem[] = (majalah?.length ? majalah : []).map((m) => ({
    id: m.id != null ? String(m.id) : (m.slug ?? ""),
    title: m.title,
    description: m.description ?? m.subtitle ?? "",
    thumbnailUrl: m.thumbnailUrl,
  }));

  const resolvedMajalahItems = majalahItems.length ? majalahItems : MAJALAH_ITEMS;
  const artikelCount = ARTIKEL_ITEMS.length;
  const majalahCount = resolvedMajalahItems.length;

  useEffect(() => {
    const canScroll = (el: HTMLDivElement | null) => {
      if (!el) return false;
      // Small tolerance to avoid off-by-1 layout rounding.
      return el.scrollWidth - el.clientWidth > 8;
    };

    const update = () => {
      setShowArtikelNav(canScroll(artikelRef.current));
      setShowMajalahNav(canScroll(majalahRef.current));
    };

    update();

    const artikelEl = artikelRef.current;
    const majalahEl = majalahRef.current;

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (ro && artikelEl) ro.observe(artikelEl);
    if (ro && majalahEl) ro.observe(majalahEl);

    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [artikelCount, majalahCount]);

  return (
    <main className="bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <h1 className="h1 text-primary-700">Paramita</h1>

        {/* Rilis Terbaru */}
        <section className="mt-8 md:mt-10">
          <h2 className="sh1 text-primary-700">Rilis Terbaru</h2>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <h3 className="sh2 text-primary-700">Judul</h3>
              <p className="b4 text-muted-foreground">Deskripsi Singkat</p>

              <div className="pt-6">
                <button
                  type="button"
                  className="btn btn-primary rounded-full px-8 py-3"
                  aria-label="Akses sekarang"
                >
                  Akses Sekarang
                  <span className="ml-2 inline-grid place-items-center h-6 w-6 rounded-full bg-white/15">
                    <ChevronIcon dir="right" />
                  </span>
                </button>
              </div>
            </div>

            <div className="md:justify-self-end">
              <div className="bg-neutral-100 rounded-2xl w-full max-w-[360px] aspect-square" />
            </div>
          </div>
        </section>

        {/* Artikel */}
        <section id="artikel" className="mt-12 md:mt-14">
          <div className="flex items-center justify-between">
            <h2 className="sh1 text-primary-700">Artikel</h2>
            <Link
              href="/paramita/artikel"
              className="sh5 text-primary-500 flex items-center gap-2 hover:underline"
              aria-label="Lihat semua artikel"
            >
              Lihat Semua
              <ChevronIcon dir="right" />
            </Link>
          </div>

          <div className="relative mt-6">
            <div ref={artikelRef} className="overflow-x-auto no-scrollbar scroll-smooth">
              <div className={`flex gap-6 pb-2 ${artikelAnim}`}>
                {ARTIKEL_ITEMS.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white border border-neutral-100 rounded-2xl shadow-lg min-w-[280px] max-w-[320px] overflow-hidden"
                  >
                    <div className="bg-neutral-100 aspect-[16/9]" />

                    <div className="p-4">
                      <h3 className="sh4 text-neutral-900">{item.title}</h3>
                      <p className="b4 text-neutral-600">{item.subtitle}</p>

                      <div className="mt-2 flex items-center gap-2 text-neutral-600 b5">
                        <span className="inline-flex items-center rounded-md bg-primary-700 px-2 py-1 text-white b5">
                          {item.tag}
                        </span>
                        <span>{item.author}</span>
                        <span>·</span>
                        <span>{item.date}</span>
                      </div>

                      <div className="mt-3 border-t border-neutral-100 pt-3">
                        <p className="b4 text-neutral-600">{item.excerpt}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {showArtikelNav ? (
              <>
                <button
                  onClick={() =>
                    triggerScroll({
                      dir: "prev",
                      ref: artikelRef,
                      setAnim: setArtikelAnim,
                      timerRef: artikelTimer,
                      amount: 320,
                    })
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                  aria-label="Previous artikel"
                >
                  <ChevronIcon dir="left" />
                </button>

                <button
                  onClick={() =>
                    triggerScroll({
                      dir: "next",
                      ref: artikelRef,
                      setAnim: setArtikelAnim,
                      timerRef: artikelTimer,
                      amount: 320,
                    })
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center z-10"
                  aria-label="Next artikel"
                >
                  <ChevronIcon dir="right" />
                </button>
              </>
            ) : null}
          </div>
        </section>

        {/* Majalah */}
        <section id="majalah" className="mt-12 md:mt-14">
          <div className="flex items-center justify-between">
            <h2 className="sh1 text-primary-700">Majalah</h2>
            <Link
              href="/paramita/majalah"
              className="sh5 text-primary-500 flex items-center gap-2 hover:underline"
              aria-label="Lihat semua majalah"
            >
              Lihat Semua
              <ChevronIcon dir="right" />
            </Link>
          </div>

          <div className="relative mt-6">
            <div ref={majalahRef} className="overflow-x-auto no-scrollbar scroll-smooth">
              <div className={`flex gap-6 pb-2 ${majalahAnim}`}>
                {resolvedMajalahItems.map((item, idx) => (
                  <article
                    key={item.id ? item.id : `majalah-${idx}`}
                    className="bg-white border border-neutral-100 rounded-2xl shadow-lg min-w-[220px] max-w-[240px] overflow-hidden"
                  >
                    <Link
                      href={`/paramita/majalah/${item.id}`}
                      aria-label={`Buka majalah ${item.title}`}
                      className="block p-4"
                    >
                      {item.thumbnailUrl ? (
                        <div className="relative rounded-2xl bg-neutral-100 aspect-[3/4] overflow-hidden">
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.title}
                            fill
                            unoptimized
                            sizes="(min-width: 1024px) 240px, (min-width: 640px) 220px, 70vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="rounded-2xl bg-neutral-100 aspect-[3/4]" />
                      )}
                      <div className="mt-4">
                        <h3 className="sh4 text-neutral-900">{item.title}</h3>
                        {item.description ? (
                          <p className="b4 text-neutral-600">{getShortText(item.description)}</p>
                        ) : null}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {showMajalahNav ? (
              <>
                <button
                  onClick={() =>
                    triggerScroll({
                      dir: "prev",
                      ref: majalahRef,
                      setAnim: setMajalahAnim,
                      timerRef: majalahTimer,
                      amount: 260,
                    })
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                  aria-label="Previous majalah"
                >
                  <ChevronIcon dir="left" />
                </button>

                <button
                  onClick={() =>
                    triggerScroll({
                      dir: "next",
                      ref: majalahRef,
                      setAnim: setMajalahAnim,
                      timerRef: majalahTimer,
                      amount: 260,
                    })
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center z-10"
                  aria-label="Next majalah"
                >
                  <ChevronIcon dir="right" />
                </button>
              </>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
