import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteName = "Keluarga Mahasiswa Buddhis Universitas Indonesia (KMBUI)";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteDescription =
  "Keluarga Mahasiswa Buddhis Universitas Indonesia (KMBUI) adalah organisasi kemahasiswaan Buddhis di Universitas Indonesia yang berfokus pada pengembangan spiritual, sosial, dan kebersamaan mahasiswa Buddhis.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | KMBUI",
  },
  description: siteDescription,
  applicationName: "KMBUI",
  keywords: [
    "KMBUI",
    "Keluarga Mahasiswa Buddhis UI",
    "Universitas Indonesia",
    "Organisasi Mahasiswa",
    "Buddhis UI",
    "Komunitas Mahasiswa",
  ],
  authors: [{ name: "KMBUI" }],
  creator: "KMBUI",
  publisher: "KMBUI",
  category: "Organization",
  alternates: { canonical: "/" },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: "KMBUI",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/logo-kmbui.png",
    shortcut: "/logo-kmbui.png",
    apple: "/logo-kmbui.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
  className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-neutral-50 m-0 p-0 min-h-screen flex flex-col`}
      >
  {/* Organization JSON-LD for richer SEO */}
  <script
    type="application/ld+json"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        alternateName: "KMBUI",
        url: siteUrl,
  logo: "/logo-kmbui.png",
      }),
    }}
  />
  <Nav />
  <div className="flex-1 bg-neutral-50">
    {children}
  </div>
  <Footer />
      </body>
    </html>
  );
}
