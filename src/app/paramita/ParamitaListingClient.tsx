"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ParamitaArtikel, ParamitaMajalah } from "@/lib/paramitaContent";

function markdownToPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s{0,3}[-*+]\s+/gm, "")
    .replace(/^\s{0,3}\d+\.\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(markdown: string, maxLen = 120) {
  const text = markdownToPlainText(markdown);
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trim()}…`;
}

function SearchIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(handle);
  }, [delayMs, value]);

  return debounced;
}

export default function ParamitaListingClient({
  active,
  artikel,
  majalah,
}: {
  active: "artikel" | "majalah";
  artikel: ParamitaArtikel[];
  majalah: ParamitaMajalah[];
}) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 250);

  const placeholder = active === "artikel" ? "Cari artikel di sini..." : "Cari majalah di sini...";

  const artikelItems = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return artikel;
    return artikel.filter((item) =>
      [item.title, item.subtitle, item.author, item.tag].some((v) =>
        v.toLowerCase().includes(q),
      ),
    );
  }, [artikel, debouncedQuery]);

  const majalahItems = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return majalah;
    return majalah.filter((item) =>
      [item.title, item.description ?? ""].some((v) => v.toLowerCase().includes(q)),
    );
  }, [majalah, debouncedQuery]);

  const getShortText = (text: string, maxLen = 90) => {
    const trimmed = text.trim();
    if (trimmed.length <= maxLen) return trimmed;
    return `${trimmed.slice(0, maxLen).trim()}…`;
  };

  return (
    <main className="bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Link
              href="/paramita"
              aria-label="Kembali ke Paramita"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white shadow-md"
            >
              <BackArrowIcon />
            </Link>

            <div className="flex items-center gap-8">
            <Link
              href="/paramita/artikel"
              className={`sh2 ${
                active === "artikel"
                  ? "text-primary-700 underline underline-offset-8"
                  : "text-neutral-900"
              }`}
            >
              Artikel
            </Link>
            <Link
              href="/paramita/majalah"
              className={`sh2 ${
                active === "majalah"
                  ? "text-primary-700 underline underline-offset-8"
                  : "text-neutral-900"
              }`}
            >
              Majalah
            </Link>
            </div>
          </div>

          <div className="relative w-full md:w-[520px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-full border border-neutral-100 bg-white px-5 py-3 pr-12 b4 text-neutral-900 placeholder:text-neutral-600 shadow-sm"
              aria-label="Cari"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600">
              <SearchIcon />
            </span>
          </div>
        </div>

        {active === "artikel" ? (
          <section className="mt-8">
            {artikelItems.length === 0 ? (
              <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm p-8 text-center">
                <p className="sh3 text-neutral-900">Artikel tidak ditemukan</p>
                <p className="b4 text-neutral-600 mt-2">Coba kata kunci lain.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {artikelItems.map((item) => (
                  <article
                    key={item.slug}
                    className="bg-white border border-neutral-100 rounded-2xl shadow-lg overflow-hidden"
                  >
                    <Link href={`/paramita/artikel/${item.slug}`} className="block">
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
                          <p className="b4 text-neutral-600">{getExcerpt(item.markdown)}</p>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : (
          <section className="mt-8">
            {majalahItems.length === 0 ? (
              <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm p-8 text-center">
                <p className="sh3 text-neutral-900">Majalah tidak ditemukan</p>
                <p className="b4 text-neutral-600 mt-2">Coba kata kunci lain.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {majalahItems.map((item) => (
                  <article
                    key={item.slug}
                    className="bg-white border border-neutral-100 rounded-2xl shadow-lg overflow-hidden"
                  >
                    <Link href={`/paramita/majalah/${item.slug}`} className="block p-4">
                      {item.thumbnailUrl ? (
                        <div className="relative rounded-2xl bg-neutral-100 aspect-[3/4] overflow-hidden">
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.title}
                            fill
                            unoptimized
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
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
            )}
          </section>
        )}
      </div>
    </main>
  );
}
