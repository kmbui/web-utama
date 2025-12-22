import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
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

        {/* Wave Overlay - Creates the white curved section */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src="/wave-hero.svg"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: 'center' }}
            priority
          />
        </div>

        {/* Content - Positioned in the white area of the wave */}
        <div className="relative h-full flex items-center justify-end pr-6 md:pr-10 lg:pr-16 xl:pr-20">
          <div className="max-w-md lg:max-w-lg text-right space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Keluarga Mahasiswa Buddhis
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
              Universitas Indonesia
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed">
              Keluarga Mahasiswa Buddhis Universitas Indonesia (KMBUI) adalah suatu organisasi keagamaan Buddha
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative -mt-11 bg-gray-50 py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - About Us Text */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              About Us
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Keluarga Mahasiswa Buddhis Universitas Indonesia (KMBUI) adalah suatu organisasi keagamaan yang telah berdiri sejak tahun ....
            </p>
          </div>

          {/* Right - Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Berdiri Sejak Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                Berdiri Sejak
              </h3>
              <p className="text-4xl md:text-5xl font-bold text-primary">
                1988
              </p>
            </div>

            {/* Anggota Aktif Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                Anggota Aktif
              </h3>
              <p className="text-4xl md:text-5xl font-bold text-primary">
                400
              </p>
            </div>

            {/* Alumni Card - Spans full width on mobile */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center sm:col-span-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                Alumni
              </h3>
              <p className="text-4xl md:text-5xl font-bold text-primary">
                30000+
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                Sejak 1988
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proker Rutin Section */}
      <section className="relative py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#F4F4FB' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
            Proker Rutin
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Puja Rutin */}
            <div className="relative rounded-3xl overflow-hidden h-80 group">
              <div className="absolute inset-0 bg-gray-800">
                {/* Placeholder for background image */}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Puja Rutin</h3>
              </div>
            </div>

            {/* Card 2 - Waisak */}
            <div className="relative rounded-3xl overflow-hidden h-80 group">
              <div className="absolute inset-0 bg-gray-800">
                {/* Placeholder for background image */}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Waisak</h3>
              </div>
            </div>

            {/* Card 3 - PPD */}
            <div className="relative rounded-3xl overflow-hidden h-80 group">
              <div className="absolute inset-0 bg-gray-800">
                {/* Placeholder for background image */}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">PPD</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rilis Terbaru Section */}
      <section className="relative bg-white py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
            Rilis Terbaru
          </h2>

          <div className="relative">
            {/* Carousel Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-gray-200 rounded-2xl aspect-square"></div>
              
              {/* Card 2 */}
              <div className="bg-gray-200 rounded-2xl aspect-square"></div>
              
              {/* Card 3 */}
              <div className="bg-gray-200 rounded-2xl aspect-square"></div>
              
              {/* Card 4 */}
              <div className="bg-gray-200 rounded-2xl aspect-square"></div>
            </div>

            {/* Navigation Button */}
            <button
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

