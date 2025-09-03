import Link from "next/link";

export default function Nav() {
  return (
    <nav className="p-4 border-b border-foreground/10 bg-background text-foreground flex gap-6">
      <Link className="hover:text-primary transition-colors" href="/">Home</Link>
      <Link className="hover:text-primary transition-colors" href="/informasi-umum">Informasi Umum</Link>
      <Link className="hover:text-primary transition-colors" href="/organisasi">Organisasi</Link>
      <Link className="hover:text-primary transition-colors" href="/paramita">Paramita</Link>
      <Link className="hover:text-primary transition-colors" href="/hubungi-kami">Hubungi Kami</Link>
    </nav>
  );
}
