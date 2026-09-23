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
          Geological Interactive Universe
          of Life in Ages
        </span>
      </Link>

      <nav className="nav-links">
        <Link href="/">
          Início
        </Link>

        <Link href="/timeline">
          Tempo
        </Link>

        <Link href="/paleoearth">
          Terra
        </Link>

        <span className="disabled-link">
          Vida
        </span>

        <Link href="/fossils">
          Fósseis
        </Link>

        <span className="disabled-link">
          Estudo
        </span>
      </nav>
    </header>
  );
}