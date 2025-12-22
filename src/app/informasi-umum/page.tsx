"use client";

import { useState } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";

export default function InformasiUmumPage() {
  const [sejarahSlide, setSejarahSlide] = useState(0);
  const [visiMisiSlide, setVisiMisiSlide] = useState(0);

  const sejarahSlides = [
    {
      title: "Era Awal (1960-1989)",
      content: "KMBUI pertama kali berdiri pada tahun 1960-an. Pada tanggal 11 September 1988, KMBUI resmi didirikan kembali. Pada tahun yang sama, AD/ART (Anggaran Dasar/Anggaran Rumah Tangga) ditetapkan dan Logo serta Mars KMBUI diciptakan. Setahun kemudian pada 1989, Departemen Adik Asuh KMBUI lahir, menandai awal dari berbagai program kerja departemen yang ada hingga saat ini."
    },
    {
      title: "Era Pertumbuhan (1993-2007)",
      content: "Tahun 1993 menandai terbitnya PARAMITA edisi 1, majalah yang menjadi wadah publikasi KMBUI. Pada tahun 2001, diresmikannya Pembina KMBUI memperkuat struktur organisasi. Tahun 2002 menjadi tahun penting dengan diakuinya KMBUI resmi sebagai UKM dan diluncurkannya Website KMBUI (kmbui.net). Kemudian pada 2003, Amandemen I AD/ART KMBUI dan Manual Book PARAMITA disusun. Tahun 2007 menjadi tonggak sejarah dengan berdirinya KMB SM FKUI dan diadakannya Baksos KMBUI pertama kali."
    },
    {
      title: "Era Modern (2008-2020)",
      content: "Pada 2008, Album Kenangan KMBUI diterbitkan dan Pelatihan calon Ketua menjadi calon BPH dimulai. Tahun 2013 dan 2014 melihat koordinasi yang lebih baik dengan Komisi Salemba berkoordinasi dengan ketua KMBUI. Tahun 2016 ditandai dengan Desa Binaan KMBUI. Pada 2017, PPD & KPO menjadi program kerja departemen. Tahun 2018 mencatat integrasi tim website, sementara 2019 melihat Amandemen II AD/ART dan pembentukan Departemen Kestari. Akhirnya pada 2020, Sistem Kesekretariatan dibuat dan Jaket KMBUI diluncurkan, menandai modernisasi organisasi."
    }
  ];

  const visiMisiSlides = [
    {
      title: "Visi",
      content: "KMBUI sebagai wadah meningkatkan kepercayaan terhadap Triratna, tempat menanam jasa serta mengembangkan minat dan bakat mahasiswa buddhis Universitas Indonesia"
    },
    {
      title: "Misi",
      content: "1. Meningkatkan minat KMBUI untuk belajar Dhamma dan meningkatkan keyakinan kepada Triratna.\n\n2. Membangun nilai kekeluargaan UKM KMBUI.\n\n3. Menjalin hubungan baik dengan stakeholder UKM KMBUI.\n\n4. Memanfaatkan UKM KMBUI sebagai langkah awal untuk mempersiapkan mahasiswa buddhis UI dalam memberikan manfaat bagi masyarakat.\n\n5. Mengintegrasikan program kerja UKM KMBUI dengan KMB BEM FKUI."
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-6 space-y-16">
          {/* Sejarah Section */}
          <section id="sejarah" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Sejarah</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              {/* Previous Button */}
              <button
                onClick={() => setSejarahSlide((prev) => (prev === 0 ? sejarahSlides.length - 1 : prev - 1))}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Next Button */}
              <button
                onClick={() => setSejarahSlide((prev) => (prev === sejarahSlides.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[600px]">
                {/* Left - Text Content */}
                <div className="p-8 lg:p-12 lg:pl-16 lg:pr-8 flex flex-col justify-between overflow-y-auto">
                  <div className="flex-1 overflow-y-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {sejarahSlides[sejarahSlide].title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {sejarahSlides[sejarahSlide].content}
                    </p>
                  </div>
                  
                  {/* Dots Navigation */}
                  <div className="flex gap-2 mt-6">
                    {sejarahSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSejarahSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === sejarahSlide ? "bg-black" : "bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right - Image */}
                <div className="relative bg-blue-300 h-64 lg:h-auto flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">Sejarah</span>
                </div>
              </div>
            </div>
          </section>

          {/* Visi Misi Section */}
          <section id="visi-misi" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Visi Misi</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              {/* Previous Button */}
              <button
                onClick={() => setVisiMisiSlide((prev) => (prev === 0 ? visiMisiSlides.length - 1 : prev - 1))}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Next Button */}
              <button
                onClick={() => setVisiMisiSlide((prev) => (prev === visiMisiSlides.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[600px]">
                {/* Left - Image */}
                <div className="relative bg-blue-300 h-64 lg:h-auto flex items-center justify-center order-2 lg:order-1">
                  <span className="text-4xl font-bold text-white">
                    {visiMisiSlides[visiMisiSlide].title}
                  </span>
                </div>

                {/* Right - Text Content */}
                <div className="p-8 lg:p-12 lg:pl-8 lg:pr-16 flex flex-col justify-between overflow-y-auto order-1 lg:order-2">
                  <div className="flex-1 overflow-y-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {visiMisiSlides[visiMisiSlide].title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {visiMisiSlides[visiMisiSlide].content}
                    </p>
                  </div>
                  
                  {/* Dots Navigation */}
                  <div className="flex gap-2 mt-6">
                    {visiMisiSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setVisiMisiSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === visiMisiSlide ? "bg-black" : "bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Makna Logo Section */}
          <section id="makna-logo" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Makna Logo</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left - Logo */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 relative">
                    <Image
                      src="/logo-kmbui.png"
                      alt="Logo KMBUI"
                      width={192}
                      height={192}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right - Content */}
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Bentuk Gambar dan Makna
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Lambang KMBUI terdiri dari:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-4">
                    <li>Gambar ujung pena yang mengarah ke segala arah dan berpusat pada gambar stupa yang melambangkan pengetahuan dari berbagai disiplin ilmu, sebagaimana anggota KMBUI sebagai mahasiswa berasal dari berbagai fakultas.</li>
                    <li>Gambar teratai dan stupa yang terletak di tengah melambangkan Buddha Dharma.</li>
                    <li>Lingkaran yang di dalamnya bertuliskan Keluarga Mahasiswa Buddhis Universitas Indonesia.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Lambang KMBUI tersebut berwarna biru yang melambangkan bakti. Lambang digunakan untuk stempel dan bendera organisasi dengan warna dasar bendera/emblem adalah kuning yang melambangkan kebijaksanaan.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors">
              Contact 1
            </button>
            <button className="px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors">
              Contact 2
            </button>
            <button className="px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors">
              Contact 3
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
