"use client";

import { FileText, Link2, MapPin } from "lucide-react";

export default function HubungiKamiPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Hubungi Kami
          </h1>

          {/* Social Media Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <h3 className="h3 font-bold text-gray-900 mb-6">Media Sosial KMBUI</h3>
            <p className="text-gray-700 mb-4">
              Ikuti media sosial kami untuk mendapatkan informasi terbaru tentang kegiatan dan program KMBUI:
            </p>
            <a
              href="https://linktr.ee/ukmkmbui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors hover:no-underline"
            >
              <Link2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              Instagram, TikTok & More
            </a>
          </section>

          {/* Location Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <h3 className="font-bold text-gray-900 mb-6">Lokasi Sekretariat</h3>
            <div className="space-y-4">
              <div>
                <h3 className="sh3 font-semibold text-gray-900 mb-2">
                  Pusat Kegiatan Mahasiswa (Pusgiwa) Universitas Indonesia
                </h3>
                <p className="text-gray-700 mb-4">
                  Jl. Prof. Dr. Fuad Hassan, Kukusan, Kecamatan Beji, Kota Depok, Jawa Barat 16425
                </p>
              </div>
              <a
                href="https://www.google.co.id/maps/place/Pusat+Kegiatan+Mahasiswa+(Pusgiwa)+Universitas+Indonesia/@-6.3653828,106.821749,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69ede360e863e9:0xd8f72fb9dd41569d!8m2!3d-6.3653881!4d106.8243239!16s%2Fg%2F11c178dn82?entry=ttu&g_ep=EgoyMDI1MDcwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors hover:no-underline"
              >
                <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
                Lihat di Google Maps
              </a>
            </div>
          </section>

          {/* SOP Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <h3 className="font-bold text-gray-900 mb-6">SOP Kerja Sama</h3>
            <p className="text-gray-700 mb-6">
              Untuk kerja sama dengan KMBUI, silakan mengacu pada Standard Operating Procedure (SOP) berikut:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SOP Humas External */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="sh3 font-semibold text-gray-900 mb-3">
                  SOP Humas Eksternal
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Untuk kerja sama dengan KMB/Vihara/Cetiya/Organisasi Buddhis lainnya
                </p>
                <a
                  href="https://bit.ly/SOPEksternalHumasKMBUIXXXIII"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm hover:no-underline"
                >
                  <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Lihat SOP
                </a>
              </div>

              {/* SOP HALO External UI */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="sh3 font-semibold text-gray-900 mb-3">
                  SOP HALO Eksternal UI
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Untuk kerja sama dengan organisasi di lingkungan Universitas Indonesia
                </p>
                <a
                  href="https://docs.google.com/document/d/1VB8KhD1Haj2Qtzl5ZhZIcXdZPpXPsOXDcE1DRtSpIfo/edit?tab=t.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm hover:no-underline"
                >
                  <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Lihat SOP
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
