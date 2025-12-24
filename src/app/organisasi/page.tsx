"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { OrganizationChart } from "primereact/organizationchart";
import type { TreeNode } from "primereact/treenode";
import "./organisasi.css";

export default function OrganisasiPage() {
  const [selectedDept, setSelectedDept] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const orgChartScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = orgChartScrollRef.current;
    if (!el) return;

    const center = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      el.scrollLeft = Math.round(maxScroll / 2);
    };

    center();
    window.addEventListener("resize", center);
    return () => window.removeEventListener("resize", center);
  }, []);

  const getDeptCardTitle = (name: string) => {
    const match = name.match(/\(([^)]+)\)/);
    if (match?.[1]) return match[1];
    return name;
  };

  const getPairIndices = (total: number, start: number) => {
    if (total <= 0) return [0, 0] as const;
    if (total === 1) return [0, 0] as const;
    const first = ((start % total) + total) % total;
    const second = (first + 1) % total;
    return [first, second] as const;
  };

  const departments = [
    {
      id: "bph",
      name: "Badan Pengurus Harian (BPH)",
      description: "Kepengurusan inti atau Badan Pengurus Harian terdiri dari Koordinator Internal, Bendahara Umum, Ketua Umum, Sekretaris Umum, dan Koordinator Eksternal."
    },
    {
      id: "kalyanamitta",
      name: "Kalyanamitta",
      description: "Departemen Kalyanamitta berperan dalam mengenalkan dan mengembangkan praktik Dhamma yang diajarkan oleh Sang Buddha. Program-programnya dirancang agar menyenangkan, bermanfaat, serta dapat meningkatkan kebijaksanaan anggota KMBUI. Kegiatan yang dilakukan antara lain Puja Rutin dan Pembinaan Pengembangan Dhamma atau PPD."
    },
    {
      id: "pengsos",
      name: "Pengembangan Sosial (Pengsos)",
      description: "Departemen Pengembangan Sosial atau Pengsos menjadi roda penggerak dalam menumbuhkan rasa kemanusiaan, mewujudkan Dhamma dalam kehidupan, dan menumbuhkan cinta kasih kepada sesama. Departemen ini menjadi wadah bagi anggota KMBUI dalam menumbuhkan kepedulian dan melakukan pengabdian kepada masyarakat. Program kerja yang dijalankan adalah UI Berbagi, Socio Care, Care n Give, serta kegiatan paruh kedua berupa pencarian desa pengabdian dan penyusunan laporan pengembangan sosial."
    },
    {
      id: "creative-events",
      name: "Creative Events",
      description: "Departemen Acara Kreatif atau Creative Events merupakan wadah untuk mempererat hubungan dan membangun kebersamaan antar anggota KMBUI melalui kegiatan kreatif dan inovatif. Program kerjanya meliputi Birthday Chronicle, KMBUI Challenge, Gathering, dan KMBUI Fest."
    },
    {
      id: "rnd",
      name: "Research and Development (RnD)",
      description: "Departemen Penelitian dan Pengembangan atau Research and Development memiliki tugas mengembangkan kemampuan sumber daya manusia serta memantau kinerja dan kualitas individu maupun program kerja di dalam KMBUI. Program kerjanya adalah Kelompok Studi Buddhis atau KOSIB, Kaderisasi Anggota Menjadi Pemimpin yang Terampil dan Mandiri atau KAMERY, Kepemimpinan Pengurus Guna Optimalisasi Organisasi atau KPGO, Apresiasi Program dan Proker Outstanding atau APPRO, Program Magang KMBUI, serta Evaluasi dan Dokumentasi Internal atau EDI."
    },
    {
      id: "kestari",
      name: "Kesekretariatan (Kestari)",
      description: "Departemen Kesekretariatan bertugas dalam pengurusan dan pelayanan administrasi untuk seluruh kebutuhan surat-menyurat, pengelolaan dan perawatan inventaris, pengelolaan sekretariat KMBUI, agenda program kerja dari setiap departemen, serta penyusunan dan pemeliharaan database anggota. Program kerja Departemen Kesekretariatan antara lain Sistem Informasi Persuratan, Administrasi, dan Perpustakaan Digital."
    },
    {
      id: "paramita",
      name: "PARAMITA",
      description: "Departemen Publikasi, Dokumentasi, dan Informasi yang dikenal dengan nama Departemen Paramita berfokus pada bidang desain, publikasi, dan informasi. Departemen ini mengelola media sosial KMBUI serta bertanggung jawab atas pembuatan dan penerbitan majalah Paramita. Program kerjanya mencakup Majalah Paramita edisi ke-59, KMBUInfo, KMBUInterlude, dan ParamitaLoka."
    },
    {
      id: "finance",
      name: "Finance",
      description: "Departemen Keuangan atau Finance bertanggung jawab dalam memfasilitasi seluruh program kerja di setiap departemen melalui pengelolaan keuangan yang memadai. Departemen ini melaksanakan berbagai kegiatan penggalangan dana. Program kerjanya antara lain DonTap, penjualan merchandise, pemberian hadiah kejutan, dan Dana KMBUI."
    },
    {
      id: "humas",
      name: "Hubungan Masyarakat (Humas)",
      description: "Departemen Hubungan Masyarakat atau Humas berperan sebagai wajah representatif KMBUI. Tugasnya adalah membangun dan mempertahankan hubungan dengan pihak eksternal, seperti Keluarga Mahasiswa Buddhis dari universitas lain, vihara atau cetiya, serta organisasi Buddhis lainnya. Program yang dijalankan antara lain Volundangan, Anjangsana, dan Studi Banding."
    },
    {
      id: "halo",
      name: "HALO",
      description: "Departemen Hubungan Alumni dan Lintas Organisasi atau HALO berfokus pada pembangunan hubungan antara anggota aktif dengan alumni KMBUI. Selain itu, departemen ini juga menjaga komunikasi dan hubungan dengan organisasi lain yang ada di lingkungan Universitas Indonesia. Programnya mencakup Penerimaan dan Seleksi Anggota Baru, Seminar Inspiratif Wawasan Alumni dan Lintas Organisasi atau SIWALI, serta kegiatan lintas organisasi."
    }
  ];

  const events = [
    {
      id: "baksos",
      name: "Bakti Sosial KMBUI (Baksos)",
      description: "Baksos KMBUI adalah kegiatan pengabdian masyarakat dalam mengatasi permasalahan sosial dalam lingkungan masyarakat, khususnya di bidang kesehatan untuk meningkatkan kesadaran dan pengetahuan masyarakat terhadap pentingnya menjaga kesehatan."
    },
    {
      id: "ppmb",
      name: "PPMB (Penerimaan dan Pembekalan Mahasiswa Baru)",
      description: "PPMB merupakan acara yang bertujuan untuk menyambut mahasiswa-mahasiswi baru UI guna memperkenalkan dan menyambut mereka sebagai anggota baru KMBUI dan kepada dunia kampus."
    },
    {
      id: "kathina",
      name: "Kathina Puja",
      description: "Kathina merupakan acara yang bertujuan untuk memberikan kesempatan kepada anggota KMBUI dalam melakukan penghimpunan kebajikan yang besar bersama-sama, mempererat kekeluargaan antaranggota aktif KMBUI dan alumni, serta untuk meningkatkan perkembangan spiritual."
    },
    {
      id: "makrab",
      name: "Malam Keakraban (Makrab)",
      description: "Makrab KMBUI adalah acara yang diselenggarakan oleh kepanitiaan yang tersusun atas mahasiswa baru untuk mempererat silaturahmi antara seluruh elemen KMBUI dan mendekatkan mahasiswa baru sebagai saudara yang harmonis."
    }
  ];

  const scrollToDepartment = (deptId: string) => {
    const index = departments.findIndex(d => d.id === deptId);
    if (index !== -1) {
      setSelectedDept(index);
      const element = document.getElementById('departments-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const nodeTemplate = (node: TreeNode) => {
    const deptId = node.label?.toString().toLowerCase().replace(/\s+/g, '-').replace(/\(|\)/g, '');
    const isDepartment = departments.some(d => d.id === deptId || d.name.toLowerCase().includes(node.label?.toString().toLowerCase() || ''));
    
    return (
      <div
        className={node.className}
        onClick={() => {
          if (isDepartment) {
            scrollToDepartment(deptId || '');
          }
        }}
        style={{ cursor: isDepartment ? 'pointer' : 'default' }}
      >
        {node.label}
      </div>
    );
  };

  const data: TreeNode[] = [
    {
      label: "Ketua Umum",
      className: "bg-[#313aa3] text-white px-8 py-4 rounded-lg font-semibold shadow-md",
      expanded: true,
      children: [
        {
          label: "Internal",
          className: "bg-[#4a52b8] text-white px-6 py-3 rounded-lg font-semibold shadow-md",
          expanded: true,
          children: [
            { label: "Kalyanamitta", className: "bg-[#6b73d1] text-white px-4 py-3 rounded-lg font-semibold shadow-md text-sm cursor-pointer hover:bg-[#7a82d9] transition-colors" },
            { label: "Pengsos", className: "bg-[#6b73d1] text-white px-4 py-3 rounded-lg font-semibold shadow-md text-sm cursor-pointer hover:bg-[#7a82d9] transition-colors" },
            { label: "Creative Events", className: "bg-[#6b73d1] text-white px-4 py-3 rounded-lg font-semibold shadow-md text-sm cursor-pointer hover:bg-[#7a82d9] transition-colors" },
            { label: "Rnd", className: "bg-[#6b73d1] text-white px-4 py-3 rounded-lg font-semibold shadow-md text-sm cursor-pointer hover:bg-[#7a82d9] transition-colors" },
          ],
        },
        {
          label: "Sekretaris Umum",
          className: "bg-[#4a52b8] text-white px-6 py-3 rounded-lg font-semibold shadow-md",
          expanded: true,
          children: [
            { label: "Kestari", className: "bg-[#6b73d1] text-white px-4 py-3 rounded-lg font-semibold shadow-md text-sm cursor-pointer hover:bg-[#7a82d9] transition-colors" },
          ],
        },
        {
          label: "Bendahara Umum",
          className: "bg-[#4a52b8] text-white px-6 py-3 rounded-lg font-semibold shadow-md",
          expanded: true,
          children: [
            { label: "PARAMITA", className: "bg-[#6b73d1] text-white px-4 py-3 rounded-lg font-semibold shadow-md text-sm cursor-pointer hover:bg-[#7a82d9] transition-colors" },
            { label: "Finance", className: "bg-[#6b73d1] text-white px-4 py-3 rounded-lg font-semibold shadow-md text-sm cursor-pointer hover:bg-[#7a82d9] transition-colors" },
          ],
        },
        {
          label: "Eksternal",
          className: "bg-[#4a52b8] text-white px-6 py-3 rounded-lg font-semibold shadow-md",
          expanded: true,
          children: [
            { label: "Humas", className: "bg-[#6b73d1] text-white px-4 py-3 rounded-lg font-semibold shadow-md text-sm cursor-pointer hover:bg-[#7a82d9] transition-colors" },
            { label: "HALO", className: "bg-[#6b73d1] text-white px-4 py-3 rounded-lg font-semibold shadow-md text-sm cursor-pointer hover:bg-[#7a82d9] transition-colors" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <main className="min-h-screen">
        <section className="bg-primary-700 px-6 md:px-12 lg:px-20 pt-16 md:pt-20 lg:pt-24">
          <div className="max-w-7xl mx-auto">
            <h1 className="h1 text-white text-center">Organisasi</h1>
            <div className="mt-10 flex justify-center">
              <Image
                src="/foto-org.png"
                alt="Foto Organisasi KMBUI"
                width={1600}
                height={800}
                priority
                className="h-auto w-full max-w-6xl object-contain animate-fade-up"
              />
            </div>
          </div>
        </section>

        <div className="bg-neutral-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Organization Chart Section */}
            <section>
              <h2 className="sh1 text-gray-900 mb-12 text-center">Struktur Organisasi</h2>

              <div
                ref={orgChartScrollRef}
                className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 overflow-x-auto"
              >
                <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
              </div>
            </section>
          </div>

          {/* Departemen Section (full-width without vw breakout to avoid horizontal overflow) */}
          <section
            id="departments-section"
            className="scroll-mt-24 bg-neutral-100 py-10 md:py-12 mt-16 overflow-x-hidden"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative">
                <div className="mb-8">
                  <h3 className="sh2 text-primary-700">Meet Our Team</h3>
                  <h2 className="sh1 text-primary-700">Departemen KMBUI</h2>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(() => {
                      const [a, b] = getPairIndices(departments.length, selectedDept);
                      const cards = [departments[a], departments[b]];
                      return cards.map((dept, index) => (
                        <article key={dept.id} className="dept-card rounded-2xl bg-white shadow-lg overflow-hidden">
                          <div className="relative h-32">
                            <div className="absolute inset-0 bg-neutral-100" />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-primary-700/60" />
                            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary-700/70" />
                          </div>

                          <div
                            className={`dept-card__body relative px-6 pb-6 pt-8 ${index === 0 ? "pl-8" : ""} ${index === 1 ? "pr-8" : ""}`}
                          >
                            <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-primary-700 ring-4 ring-white" />
                            <h3 className="text-lg font-semibold text-gray-900">{getDeptCardTitle(dept.name)}</h3>
                            <p className="dept-card__desc mt-2 text-sm text-gray-700 leading-relaxed text-justify">
                              {dept.description}
                            </p>
                          </div>
                        </article>
                      ));
                    })()}
                  </div>

                  <button
                    onClick={() => setSelectedDept((prev) => (prev === 0 ? departments.length - 1 : prev - 1))}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                    aria-label="Previous department"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setSelectedDept((prev) => (prev === departments.length - 1 ? 0 : prev + 1))}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                    aria-label="Next department"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-6 mt-16 overflow-x-hidden">
            {/* Program Kerja Section */}
            <section id="kepanitiaan-section" className="scroll-mt-24">
              <div className="relative">
                <div className="mb-8">
                  <h2 className="sh1 text-primary-700">Program Kerja</h2>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(() => {
                      const [a, b] = getPairIndices(events.length, selectedEvent);
                      const cards = [events[a], events[b]];
                      return cards.map((event) => (
                        <article key={event.id} className="rounded-2xl bg-white shadow-lg overflow-hidden">
                          <div className="relative h-56 md:h-64">
                            <div className="absolute inset-0 bg-neutral-100" />
                            <div className="absolute inset-0 bg-black/35" />
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-primary-700" />

                            <div className="absolute inset-x-0 bottom-5 px-6">
                              <p className="text-center text-white font-semibold leading-snug">
                                {event.name}
                              </p>
                            </div>
                          </div>
                        </article>
                      ));
                    })()}
                  </div>

                  <button
                    onClick={() => setSelectedEvent((prev) => (prev === 0 ? events.length - 1 : prev - 1))}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                    aria-label="Previous program kerja"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => setSelectedEvent((prev) => (prev === events.length - 1 ? 0 : prev + 1))}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                    aria-label="Next program kerja"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
