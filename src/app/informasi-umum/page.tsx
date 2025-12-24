"use client";

import Image from "next/image";

export default function InformasiUmumPage() {
  const visiText =
    "KMBUI sebagai wadah meningkatkan kepercayaan terhadap Triratna, tempat menanam jasa serta mengembangkan minat dan bakat mahasiswa buddhis Universitas Indonesia.";

  const misiItems = [
    "Meningkatkan minat KMBUI untuk belajar Dhamma dan meningkatkan keyakinan kepada Triratna.",
    "Membangun nilai kekeluargaan UKM KMBUI.",
    "Menjalin hubungan baik dengan stakeholder UKM KMBUI.",
    "Memanfaatkan UKM KMBUI sebagai langkah awal untuk mempersiapkan mahasiswa buddhis UI dalam memberikan manfaat bagi masyarakat.",
    "Mengintegrasikan program kerja UKM KMBUI dengan KMB BEM FKUI.",
  ];

  return (
    <>
      <main className="min-h-screen">
        {/* About Us Section */}
        <section className="bg-primary-700 py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Text */}
              <div>
                <h1 className="text-white mb-6">About Us</h1>
                <p className="b1 text-white/95 leading-relaxed">
                  Keluarga Mahasiswa Buddhis Universitas Indonesia (KMBUI) merupakan sebuah Unit Kegiatan Mahasiswa (UKM) di tingkat universitas yang berkedudukan di Universitas Indonesia dan bergerak pada bidang kerohanian Buddha serta kegiatan sosial kemasyarakatan.
                </p>
              </div>

              {/* Right - Auto-scrolling Image Columns */}
              <div className="relative h-[500px] overflow-visible">
                <div className="absolute inset-x-0 -top-16 -bottom-16 md:-top-20 md:-bottom-20 lg:-top-24 lg:-bottom-24 grid grid-cols-2 gap-4">
                  {/* Left Column - Scrolls Up */}
                  <div className="overflow-hidden relative h-full">
                    <div className="flex flex-col gap-4 animate-scroll-up">
                      <div className="bg-gray-300 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-400 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-500 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-600 rounded-xl h-40 w-full flex-shrink-0"></div>
                      {/* Duplicate for seamless loop */}
                      <div className="bg-gray-300 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-400 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-500 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-600 rounded-xl h-40 w-full flex-shrink-0"></div>
                    </div>
                  </div>

                  {/* Right Column - Scrolls Down */}
                  <div className="overflow-hidden relative h-full">
                    <div className="flex flex-col gap-4 animate-scroll-down">
                      <div className="bg-gray-600 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-500 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-400 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-300 rounded-xl h-40 w-full flex-shrink-0"></div>
                      {/* Duplicate for seamless loop */}
                      <div className="bg-gray-600 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-500 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-400 rounded-xl h-40 w-full flex-shrink-0"></div>
                      <div className="bg-gray-300 rounded-xl h-40 w-full flex-shrink-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sejarah Section */}
        <section id="sejarah" className="bg-neutral-50 py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20 relative">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="sh1 text-primary-700 text-center mb-16">Sejarah</h2>

            <div className="overflow-x-auto no-scrollbar">
              <div className="mx-auto w-[1361px] max-w-none">
                <Image
                  src="/sejarah.svg"
                  alt="Sejarah KMBUI"
                  width={1361}
                  height={718}
                  className="h-auto w-full max-w-none no-scrollbar"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Visi Misi Section */}
        <section id="visi-misi" className="bg-neutral-50 py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left - Text */}
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="sh1 text-black">Visi</h2>
                  <p className="b2 text-black/80 leading-relaxed">{visiText}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="sh1 text-black">Misi</h2>
                  <ul className="b2 text-black/80 list-disc pl-6 space-y-2">
                    {misiItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right - Illustration */}
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/visi-misi.svg"
                  alt="Ilustrasi Visi dan Misi"
                  width={640}
                  height={640}
                  className="h-auto w-full max-w-[520px]"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Makna Logo Section */}
        <section id="makna-logo" className="bg-neutral-50 py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-primary-50 border border-border rounded-3xl shadow-lg px-8 py-10 md:px-12 md:py-14">
              <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-center">
                {/* Left - Logo */}
                <div className="flex justify-center lg:justify-start">
                  <Image
                    src="/logo-kmbui.png"
                    alt="Logo KMBUI"
                    width={320}
                    height={320}
                    className="h-auto w-full max-w-[320px]"
                    priority
                  />
                </div>

                {/* Right - Content */}
                <div className="space-y-5">
                  <h2 className="sh1 text-black">Makna Logo KMBUI</h2>

                  <div className="space-y-4">
                    <p className="b2 text-black">Lambang KMBUI terdiri dari:</p>
                    <ul className="b3 text-black list-disc pl-6 space-y-2">
                      <li>
                        Gambar ujung pena yang mengarah ke segala arah dan berpusat pada gambar stupa yang melambangkan
                        pengetahuan dari berbagai disiplin ilmu, sebagaimana anggota KMBUI sebagai mahasiswa berasal dari
                        berbagai fakultas.
                      </li>
                      <li>Gambar teratai dan stupa yang terletak di tengah melambangkan Buddha Dharma.</li>
                      <li>Lingkaran yang di dalamnya bertuliskan Keluarga Mahasiswa Buddhis Universitas Indonesia.</li>
                    </ul>
                    <p className="b3 text-black leading-relaxed">
                      Lambang KMBUI tersebut berwarna biru yang melambangkan bakti. Lambang digunakan untuk stempel dan
                      bendera organisasi dengan warna dasar bendera/emblem adalah kuning yang melambangkan kebijaksanaan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
