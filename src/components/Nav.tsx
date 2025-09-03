import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="p-4 border-b border-foreground/10 bg-background text-foreground">
      <div className="container flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-kmbui.png"
            alt="Logo KMBUI"
            width={40}
            height={40}
            priority
          />
          <span className="font-semibold">KMBUI</span>
        </Link>
        <div className="flex items-center gap-6 ml-auto">
          <Link className="hover:text-primary transition-colors" href="/">Home</Link>
          <Link className="hover:text-primary transition-colors" href="/informasi-umum">Informasi Umum</Link>
          <Link className="hover:text-primary transition-colors" href="/organisasi">Organisasi</Link>
          <Link className="hover:text-primary transition-colors" href="/paramita">Paramita</Link>
        </div>
      </div>
    </nav>
  );
}
