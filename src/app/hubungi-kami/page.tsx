"use client";

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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Media Sosial KMBUI</h2>
            <p className="text-gray-700 mb-4">
              Ikuti media sosial kami untuk mendapatkan informasi terbaru tentang kegiatan dan program KMBUI:
            </p>
            <a
              href="https://linktr.ee/ukmkmbui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors hover:no-underline"
              style={{ color: 'white' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.511 5.853a.5.5 0 0 1 .98 0l2.059 8.5a.5.5 0 0 1-.48.647H7.93a.5.5 0 0 1-.48-.647l2.059-8.5ZM8.52 14.5h6.96l-1.582 6.539a.5.5 0 0 1-.98 0L8.52 14.5Z"/>
              </svg>
              Instagram, TikTok & More
            </a>
          </section>

          {/* Location Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lokasi Sekretariat</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
                style={{ color: 'white' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Lihat di Google Maps
              </a>
            </div>
          </section>

          {/* SOP Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">SOP Kerja Sama</h2>
            <p className="text-gray-700 mb-6">
              Untuk kerja sama dengan KMBUI, silakan mengacu pada Standard Operating Procedure (SOP) berikut:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SOP Humas External */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
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
                  style={{ color: 'white' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                  Lihat SOP
                </a>
              </div>

              {/* SOP HALO External UI */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
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
                  style={{ color: 'white' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
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
