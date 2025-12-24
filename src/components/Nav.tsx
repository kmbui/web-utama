"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const [showInfoDropdown, setShowInfoDropdown] = useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-kmbui.png"
            alt="Logo KMBUI"
            width={48}
            height={48}
            priority
            className="object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link 
            className="text-neutral-900 hover:text-neutral-900 transition-colors font-medium" 
            href="/"
          >
            Home
          </Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setShowInfoDropdown(true)}
            onMouseLeave={() => setShowInfoDropdown(false)}
          >
            <Link 
              className="text-neutral-900 hover:text-neutral-900 transition-colors font-medium flex items-center gap-1" 
              href="/informasi-umum"
            >
              Informasi Umum
              <ChevronDown className="w-4 h-4" />
            </Link>
            
            {showInfoDropdown && (
              <div className="absolute top-full left-0 pt-2 w-48 z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <Link
                    href="/informasi-umum#sejarah"
                    className="block px-4 py-2 text-neutral-900 hover:bg-gray-100 transition-colors"
                  >
                    Sejarah
                  </Link>
                  <Link
                    href="/informasi-umum#visi-misi"
                    className="block px-4 py-2 text-neutral-900 hover:bg-gray-100 transition-colors"
                  >
                    Visi Misi
                  </Link>
                  <Link
                    href="/informasi-umum#makna-logo"
                    className="block px-4 py-2 text-neutral-900 hover:bg-gray-100 transition-colors"
                  >
                    Makna Logo
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setShowOrgDropdown(true)}
            onMouseLeave={() => setShowOrgDropdown(false)}
          >
            <Link 
              className="text-neutral-900 hover:text-neutral-900 transition-colors font-medium flex items-center gap-1" 
              href="/organisasi"
            >
              Organisasi
              <ChevronDown className="w-4 h-4" />
            </Link>
            
            {showOrgDropdown && (
              <div className="absolute top-full left-0 pt-2 w-48 z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <Link
                    href="/organisasi"
                    className="block px-4 py-2 text-neutral-900 hover:bg-gray-100 transition-colors"
                  >
                    Struktur Organisasi
                  </Link>
                  <Link
                    href="/organisasi#departments-section"
                    className="block px-4 py-2 text-neutral-900 hover:bg-gray-100 transition-colors"
                  >
                    Departemen
                  </Link>
                  <Link
                    href="/organisasi#kepanitiaan-section"
                    className="block px-4 py-2 text-neutral-900 hover:bg-gray-100 transition-colors"
                  >
                    Kepanitiaan
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link 
            className="text-neutral-900 hover:text-neutral-900 transition-colors font-medium flex items-center gap-1" 
            href="/paramita"
          >
            Paramita
            <ChevronDown className="w-4 h-4" />
          </Link>
          
          <Link 
            className="text-neutral-900 hover:text-neutral-900 transition-colors font-medium" 
            href="/hubungi-kami"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </nav>
  );
}
