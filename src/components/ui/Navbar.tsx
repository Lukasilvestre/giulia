import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link
        href="/"
        className="brand"
      >
        <span className="brand-name">
          GIULIA
        </span>

        <span className="brand-subtitle">
          Geological Interactive Universe of Life in Ages
        </span>
      </Link>

      <nav className="nav-links">
        <Link href="/timeline">
          Tempo
        </Link>

        <Link href="/organisms">
          Vida
        </Link>

        <Link href="/fossils">
          Fósseis
        </Link>

        <Link href="/paleoearth">
          Terra
        </Link>

        <Link href="/search">
          Busca
        </Link>

        <Link href="/study">
          Estudo
        </Link>

        <Link href="/about">
          Sobre
        </Link>
      </nav>
    </header>
  );
}