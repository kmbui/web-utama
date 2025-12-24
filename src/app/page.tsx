"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type RilisItem = { id: string; title: string; subtitle: string };
type ProgramItem = { id: string; title: string; subtitle?: string };

const RILIS_ITEMS: RilisItem[] = [
  { id: "rilis-1", title: "Viriya", subtitle: "Paramita 59" },
  { id: "rilis-2", title: "Viriya", subtitle: "Paramita 59" },
  { id: "rilis-3", title: "Viriya", subtitle: "Paramita 59" },
  { id: "rilis-4", title: "Viriya", subtitle: "Paramita 59" },
  { id: "rilis-5", title: "Viriya", subtitle: "Paramita 59" },
  { id: "rilis-6", title: "Viriya", subtitle: "Paramita 59" },
];

const PROGRAM_ITEMS: ProgramItem[] = [
  { id: "proker-1", title: "Bakti Sosial KMBUI (Baksos)" },
  { id: "proker-2", title: "PPMB (Penerimaan dan Pembekalan Mahasiswa Baru)" },
  { id: "proker-3", title: "Program Kerja" },
  { id: "proker-4", title: "Program Kerja" },
];

function getCarouselWindow<T>(items: T[], start: number, count: number): T[] {
  if (items.length === 0) return [];
  const normalizedStart = ((start % items.length) + items.length) % items.length;
  return Array.from({ length: Math.min(count, items.length) }, (_, i) => items[(normalizedStart + i) % items.length]);
}

function CountUpAnimation({ end, duration, suffix = "" }: { end: number; duration: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export default function Home() {
  const [rilisStart, setRilisStart] = useState(0);
  const [rilisAnim, setRilisAnim] = useState("");
  const rilisTimer = useRef<number | null>(null);

  const [programStart, setProgramStart] = useState(0);
  const [programAnim, setProgramAnim] = useState("");
  const programTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rilisTimer.current) window.clearTimeout(rilisTimer.current);
      if (programTimer.current) window.clearTimeout(programTimer.current);
    };
  }, []);

  const triggerRilis = (dir: "prev" | "next") => {
    if (RILIS_ITEMS.length === 0) return;
    setRilisAnim(dir === "next" ? "animate-carousel-next" : "animate-carousel-prev");
    setRilisStart((prev) => (dir === "next" ? prev + 1 : prev - 1));
    if (rilisTimer.current) window.clearTimeout(rilisTimer.current);
    rilisTimer.current = window.setTimeout(() => setRilisAnim(""), 340);
  };

  const triggerProgram = (dir: "prev" | "next") => {
    if (PROGRAM_ITEMS.length === 0) return;
    setProgramAnim(dir === "next" ? "animate-carousel-next" : "animate-carousel-prev");
    setProgramStart((prev) => (dir === "next" ? prev + 1 : prev - 1));
    if (programTimer.current) window.clearTimeout(programTimer.current);
    programTimer.current = window.setTimeout(() => setProgramAnim(""), 340);
  };

  const rilisWindow = getCarouselWindow(RILIS_ITEMS, rilisStart, 4);
  const programWindow = getCarouselWindow(PROGRAM_ITEMS, programStart, 2);

  return (
    <main className="m-0 p-0">
      {/* Hero Section */}
      <section className="relative w-full h-screen m-0 p-0">
        {/* Background Image - Full Width */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/kmbui-1.png"
            alt="KMBUI Activities"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay - Darker on the right side */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-l from-black/70 via-black/40 to-transparent pointer-events-none"></div>

        {/* Content - Positioned on the right side */}
        <div className="relative h-full flex items-center justify-end pr-6 md:pr-10 lg:pr-16 xl:pr-20">
          <div className="max-w-md lg:max-w-lg text-right space-y-4 md:space-y-6">
            <h2 className="text-white leading-tight drop-shadow-lg">
              Keluarga Mahasiswa Buddhis
            </h2>
            <h2 className="text-primary-100 drop-shadow-lg">
              Universitas Indonesia
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/95 leading-relaxed drop-shadow-md">
              Keluarga Mahasiswa Buddhis Universitas Indonesia (KMBUI) merupakan sebuah Unit Kegiatan Mahasiswa (UKM) di tingkat universitas yang berkedudukan di Universitas Indonesia dan bergerak pada bidang kerohanian Buddha serta kegiatan sosial kemasyarakatan.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative -mt-11 bg-primary-100 py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - About Us Text */}
          <div className="space-y-6">
            <h2 className="sh1 text-primary-700">
              About Us
            </h2>
            <p className="b2 text-neutral-900">
              Keluarga Mahasiswa Buddhis Universitas Indonesia (KMBUI) merupakan sebuah Unit Kegiatan Mahasiswa (UKM) di tingkat universitas yang berkedudukan di Universitas Indonesia dan bergerak pada bidang kerohanian Buddha serta kegiatan sosial kemasyarakatan.
            </p>
          </div>

          {/* Right - Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Berdiri Sejak Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <h3 className="sh3 text-neutral-900 mb-3">
                Berdiri Sejak
              </h3>
              <p className="h2 text-primary-700">
                1988
              </p>
            </div>

            {/* Anggota Aktif Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <h3 className="sh3 text-neutral-900 mb-3">
                Anggota Aktif
              </h3>
              <p className="h2 text-primary-700">
                <CountUpAnimation end={400} duration={2000} />
              </p>
            </div>

            {/* Alumni Card - Spans full width on mobile */}
            <div className="bg-white rounded-2xl shadow-md p-8 text-center sm:col-span-2">
              <h3 className="sh3 text-neutral-900 mb-3">
                Alumni
              </h3>
              <p className="h2 text-primary-700">
                <CountUpAnimation end={30000} duration={2500} suffix="+" />
              </p>
              <p className="sh3 text-neutral-900 mt-2">
                Sejak 1988
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rilis Terbaru Section */}
      <section className="relative bg-white py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="sh1 text-primary-700 mb-12">
            Rilis Terbaru
          </h2>

          <div className="relative">
            {/* Carousel Container */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${rilisAnim}`}>
              {rilisWindow.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-2xl p-4 border border-neutral-100">
                  <div className="bg-gray-200 rounded-xl aspect-square mb-4"></div>
                  <h3 className="sh4 text-neutral-900">{item.title}</h3>
                  <p className="b4 text-neutral-600">{item.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Navigation Button - Previous */}
            <button
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors shadow-lg"
              aria-label="Previous"
              onClick={() => triggerRilis("prev")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Navigation Button */}
            <button
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors shadow-lg"
              aria-label="Next"
              onClick={() => triggerRilis("next")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Program Kerja Section */}
      <section className="relative py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="sh1 text-primary-700 mb-12">
            Program Kerja
          </h2>

          <div className="relative">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${programAnim}`}>
              {programWindow.map((item) => (
                <div key={item.id} className="relative rounded-3xl overflow-hidden h-80 group">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-400/50 to-gray-700">
                    {/* Placeholder for background image */}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-primary-700 rounded-full mx-auto mb-4"></div>
                      <h3 className="sh3 font-semibold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Button - Previous */}
            <button
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors shadow-lg"
              aria-label="Previous"
              onClick={() => triggerProgram("prev")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Navigation Button */}
            <button
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors shadow-lg"
              aria-label="Next"
              onClick={() => triggerProgram("next")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

