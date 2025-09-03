import Link from "next/link";

export default function Nav() {
  return (
    <nav className="p-4 border-b flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/informasi-umum">Informasi Umum</Link>
      <Link href="/organisasi">Organisasi</Link>
      <Link href="/paramita">Paramita</Link>
      <Link href="/hubungi-kami">Hubungi Kami</Link>
    </nav>
  );
}
