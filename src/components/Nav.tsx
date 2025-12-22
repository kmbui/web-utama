import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Nav() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
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
            className="text-gray-900 hover:text-blue-600 transition-colors font-medium" 
            href="/"
          >
            Home
          </Link>
          
          <Link 
            className="text-gray-900 hover:text-blue-600 transition-colors font-medium flex items-center gap-1" 
            href="/informasi-umum"
          >
            Informasi Umum
            <ChevronDown className="w-4 h-4" />
          </Link>
          
          <Link 
            className="text-gray-900 hover:text-blue-600 transition-colors font-medium flex items-center gap-1" 
            href="/organisasi"
          >
            Organisasi
            <ChevronDown className="w-4 h-4" />
          </Link>
          
          <Link 
            className="text-gray-900 hover:text-blue-600 transition-colors font-medium flex items-center gap-1" 
            href="/paramita"
          >
            Paramita
            <ChevronDown className="w-4 h-4" />
          </Link>
          
          <Link 
            className="text-gray-900 hover:text-blue-600 transition-colors font-medium" 
            href="/hubungi-kami"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </nav>
  );
}
