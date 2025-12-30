"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ParamitaArtikel, ParamitaMajalah } from "@/lib/paramitaContent";

function formatDate(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

function toEpochMs(iso: string | null | undefined) {
  if (!iso) return -Infinity;
  const ms = Date.parse(iso);
  return Number.isFinite(ms) ? ms : -Infinity;
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

function ChevronDownIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

type SortMode = "newest" | "oldest";

function SortDropdown({
  value,
  onChange,
}: {
  value: SortMode;
  onChange: (v: SortMode) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (e.target instanceof Node && !root.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const label = value === "newest" ? "Newest" : "Oldest";

  return (
    <div ref={rootRef} className="relative w-full rounded-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-full border border-neutral-100 bg-white px-5 py-3 pr-12 b4 text-neutral-900 shadow-sm text-left"
        aria-label="Urutkan"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {label}
        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-neutral-600 sm:right-6">
          <ChevronDownIcon />
        </span>
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Urutkan"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm"
        >
          <button
            type="button"
            role="option"
            aria-selected={value === "newest"}
            onClick={() => {
              onChange("newest");
              setOpen(false);
            }}
            className={`w-full px-5 py-3 text-left b4 ${
              value === "newest" ? "bg-primary-700 text-white" : "text-neutral-900 hover:bg-neutral-50"
            }`}
          >
            Newest
          </button>
          <button
            type="button"
            role="option"
            aria-selected={value === "oldest"}
            onClick={() => {
              onChange("oldest");
              setOpen(false);
            }}
            className={`w-full px-5 py-3 text-left b4 ${
              value === "oldest" ? "bg-primary-700 text-white" : "text-neutral-900 hover:bg-neutral-50"
            }`}
          >
            Oldest
          </button>
        </div>
      ) : null}
    </div>
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
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const debouncedQuery = useDebouncedValue(query, 250);

  const placeholder = active === "artikel" ? "Cari artikel di sini..." : "Cari majalah di sini...";

  const artikelItems = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    const filtered = !q
      ? artikel
      : artikel.filter((item) =>
      [
        item.metadata.title,
        item.metadata.subtitle,
        item.metadata.writer,
        item.metadata.theme,
      ].some((v) => (v ?? "").toLowerCase().includes(q)),
    );

    const epochFor = (a: ParamitaArtikel) => toEpochMs(a.metadata.createdAt);
    return filtered
      .slice()
      .sort((a, b) => (sortMode === "oldest" ? epochFor(a) - epochFor(b) : epochFor(b) - epochFor(a)));
  }, [artikel, debouncedQuery, sortMode]);

  const majalahItems = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    const filtered = !q
      ? majalah
      : majalah.filter((item) =>
          [item.title, item.description ?? ""].some((v) => v.toLowerCase().includes(q)),
        );

    const epochFor = (m: ParamitaMajalah) => toEpochMs(m.createdAt);
    return filtered
      .slice()
      .sort((a, b) => (sortMode === "oldest" ? epochFor(a) - epochFor(b) : epochFor(b) - epochFor(a)));
  }, [majalah, debouncedQuery, sortMode]);

  const isArtikelDataEmpty = artikel.length === 0;
  const isMajalahDataEmpty = majalah.length === 0;
  const isActiveDataEmpty = active === "artikel" ? isArtikelDataEmpty : isMajalahDataEmpty;

  const getShortText = (text: string, maxLen = 90) => {
    const trimmed = text.trim();
    if (trimmed.length <= maxLen) return trimmed;
    return `${trimmed.slice(0, maxLen).trim()}…`;
  };

  return (
    <main className={`bg-neutral-50 ${isActiveDataEmpty ? "min-h-screen" : ""}`}>
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

          <div className="flex flex-col gap-3 w-full md:w-auto md:flex-row md:items-center md:justify-end">
            <div className="relative w-full md:w-[420px]">
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

            <div className="w-full md:w-[220px]">
              <SortDropdown value={sortMode} onChange={setSortMode} />
            </div>
          </div>
        </div>

        {active === "artikel" ? (
          <section className="mt-8">
            {isArtikelDataEmpty ? (
              <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm p-8 text-center">
                <p className="sh3 text-neutral-900">Belum ada artikel</p>
                <p className="b4 text-neutral-600 mt-2">Artikel Paramita akan tampil di sini.</p>
              </div>
            ) : artikelItems.length === 0 ? (
              <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm p-8 text-center">
                <p className="sh3 text-neutral-900">Artikel tidak ditemukan</p>
                <p className="b4 text-neutral-600 mt-2">Coba kata kunci lain.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {artikelItems.map((item) => (
                  <article
                    key={item.metadata.id}
                    className="bg-white border border-neutral-100 rounded-2xl shadow-lg overflow-hidden"
                  >
                    <Link href={`/paramita/artikel/${item.metadata.id}`} className="block">
                      {item.thumbnailUrl ? (
                        <div className="relative bg-neutral-100 aspect-[16/9] overflow-hidden">
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.metadata.title}
                            fill
                            unoptimized
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="bg-neutral-100 aspect-[16/9]" />
                      )}
                      <div className="p-4">
                        <h3 className="sh4 text-neutral-900">{item.metadata.title}</h3>
                        <p className="b4 text-neutral-600">{item.metadata.subtitle}</p>

                        <div className="mt-2 flex items-center gap-2 text-neutral-600 b5">
                          <span className="inline-flex items-center rounded-md bg-primary-700 px-2 py-1 text-white b5">
                            {item.metadata.theme}
                          </span>
                          {item.metadata.writer ? <span>{item.metadata.writer}</span> : null}
                          {formatDate(item.metadata.updatedAt || item.metadata.createdAt) ? (
                            <>
                              <span>·</span>
                              <span>{formatDate(item.metadata.updatedAt || item.metadata.createdAt)}</span>
                            </>
                          ) : null}
                        </div>

                        <div className="mt-3 border-t border-neutral-100 pt-3">
                          <p className="b4 text-neutral-600">{getShortText(item.metadata.subtitle || "", 140)}</p>
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
            {isMajalahDataEmpty ? (
              <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm p-8 text-center">
                <p className="sh3 text-neutral-900">Belum ada majalah</p>
                <p className="b4 text-neutral-600 mt-2">Majalah Paramita akan tampil di sini.</p>
              </div>
            ) : majalahItems.length === 0 ? (
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
