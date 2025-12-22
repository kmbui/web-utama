"use client";

import { useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import type { TreeNode } from "primereact/treenode";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "./organisasi.css";

export default function OrganisasiPage() {
  const [selectedDept, setSelectedDept] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(0);

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
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Organization Chart Section */}
          <section>
            <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Struktur Organisasi
            </h1>

            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 overflow-x-auto">
              <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
            </div>
          </section>

          {/* Departments Section */}
          <section id="departments-section" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Departemen</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              {/* Previous Button */}
              <button
                onClick={() => setSelectedDept((prev) => (prev === 0 ? departments.length - 1 : prev - 1))}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous department"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Next Button */}
              <button
                onClick={() => setSelectedDept((prev) => (prev === departments.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Next department"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[600px]">
                {/* Left - Image Placeholder */}
                <div className="relative bg-blue-300 h-64 lg:h-auto flex items-center justify-center order-2 lg:order-1">
                  <span className="text-4xl font-bold text-white">
                    {departments[selectedDept].name}
                  </span>
                </div>

                {/* Right - Content */}
                <div className="p-8 lg:p-12 lg:px-16 flex flex-col justify-between overflow-y-auto order-1 lg:order-2 lg:h-[600px]">
                  <div className="flex-1 overflow-y-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {departments[selectedDept].name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {departments[selectedDept].description}
                    </p>
                  </div>
                  
                  {/* Dots Navigation */}
                  <div className="flex gap-2 mt-6 flex-wrap">
                    {departments.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDept(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === selectedDept ? "bg-black" : "bg-gray-300"
                        }`}
                        aria-label={`Go to ${departments[index].name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Kepanitiaan Section */}
          <section id="kepanitiaan-section" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Kepanitiaan</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              {/* Previous Button */}
              <button
                onClick={() => setSelectedEvent((prev) => (prev === 0 ? events.length - 1 : prev - 1))}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous event"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Next Button */}
              <button
                onClick={() => setSelectedEvent((prev) => (prev === events.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg transition-all"
                aria-label="Next event"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[600px]">
                {/* Left - Image Placeholder */}
                <div className="relative bg-purple-300 h-64 lg:h-auto flex items-center justify-center order-2 lg:order-1">
                  <span className="text-4xl font-bold text-white">
                    {events[selectedEvent].name}
                  </span>
                </div>

                {/* Right - Content */}
                <div className="p-8 lg:p-12 lg:px-16 flex flex-col justify-between overflow-y-auto order-1 lg:order-2 lg:h-[600px]">
                  <div className="flex-1 overflow-y-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {events[selectedEvent].name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {events[selectedEvent].description}
                    </p>
                  </div>
                  
                  {/* Dots Navigation */}
                  <div className="flex gap-2 mt-6 flex-wrap">
                    {events.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedEvent(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === selectedEvent ? "bg-black" : "bg-gray-300"
                        }`}
                        aria-label={`Go to ${events[index].name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
