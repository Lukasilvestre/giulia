import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-v1">
      <section className="home-v1-hero">
        <div>
          <span className="eyebrow">
            GEOLOGICAL INTERACTIVE
            UNIVERSE OF LIFE IN AGES
          </span>

          <h1>
            Explore a Terra
            através do tempo.
          </h1>

          <p>
            GIULIA conecta tempo
            geológico, organismos,
            ocorrências fósseis,
            reconstruções
            paleogeográficas e
            ferramentas de estudo em
            uma única experiência de
            exploração científica.
          </p>

          <div className="home-v1-actions">
            <Link
              href="/timeline"
              className="home-v1-primary"
            >
              Explorar tempo →
            </Link>

            <Link href="/search">
              Buscar no GIULIA
              →
            </Link>
          </div>
        </div>

        <div className="home-v1-time">
          <div className="home-v1-time-orbit">
            <span>
              4.567 Ga
            </span>

            <strong>
              TERRA
            </strong>

            <span>
              PRESENTE
            </span>
          </div>
        </div>
      </section>

      <section className="home-v1-core">
        <header>
          <span className="eyebrow">
            CORE EXPLORATION
          </span>

          <h2>
            Comece pelo tempo.
          </h2>

          <p>
            A Timeline é o eixo
            principal do GIULIA.
            Ela organiza a navegação
            entre éons, eras e
            períodos antes de
            conectar outras fontes
            de informação.
          </p>
        </header>

        <Link
          href="/timeline"
          className="home-timeline-preview"
        >
          <div>
            <span>
              ÉON
            </span>

            <strong>
              Fanerozoico
            </strong>
          </div>

          <span>
            →
          </span>

          <div>
            <span>
              ERA
            </span>

            <strong>
              Mesozoico
            </strong>
          </div>

          <span>
            →
          </span>

          <div>
            <span>
              PERÍODO
            </span>

            <strong>
              Cretáceo
            </strong>
          </div>

          <span className="home-timeline-open">
            Explorar escala →
          </span>
        </Link>
      </section>

      <section className="home-v1-modules">
        <header>
          <span className="eyebrow">
            GIULIA MODULES
          </span>

          <h2>
            Uma exploração,
            múltiplas perspectivas.
          </h2>
        </header>

        <div className="home-module-grid">
          <Link href="/timeline">
            <span>
              01
            </span>

            <small>
              GEOLOGICAL TIME
            </small>

            <h3>
              Tempo
            </h3>

            <p>
              Navegação hierárquica
              por éons, eras e
              períodos.
            </p>

            <strong>
              Abrir →
            </strong>
          </Link>

          <Link href="/organisms">
            <span>
              02
            </span>

            <small>
              LIFE
            </small>

            <h3>
              Vida
            </h3>

            <p>
              Organismos conectados
              aos intervalos em que
              viveram.
            </p>

            <strong>
              Abrir →
            </strong>
          </Link>

          <Link href="/fossils">
            <span>
              03
            </span>

            <small>
              FOSSIL RECORD
            </small>

            <h3>
              Fósseis
            </h3>

            <p>
              Exploração de
              ocorrências através
              da PBDB.
            </p>

            <strong>
              Abrir →
            </strong>
          </Link>

          <Link href="/paleoearth">
            <span>
              04
            </span>

            <small>
              PLATE RECONSTRUCTION
            </small>

            <h3>
              Terra
            </h3>

            <p>
              Reconstruções de
              paleoposição e
              paleocostas.
            </p>

            <strong>
              Abrir →
            </strong>
          </Link>

          <Link href="/study">
            <span>
              05
            </span>

            <small>
              RESEARCH WORKSPACE
            </small>

            <h3>
              Estudo
            </h3>

            <p>
              Coleções, notas,
              comparação e
              exportação.
            </p>

            <strong>
              Abrir →
            </strong>
          </Link>

          <Link href="/search">
            <span>
              06
            </span>

            <small>
              DISCOVERY
            </small>

            <h3>
              Busca
            </h3>

            <p>
              Encontre intervalos,
              organismos e continue
              para o registro
              fóssil.
            </p>

            <strong>
              Abrir →
            </strong>
          </Link>
        </div>
      </section>

      <section className="home-v1-flow">
        <span className="eyebrow">
          SCIENTIFIC FLOW
        </span>

        <h2>
          Do tempo à evidência.
        </h2>

        <div>
          <span>
            TEMPO
          </span>

          <b>→</b>

          <span>
            VIDA
          </span>

          <b>→</b>

          <span>
            FÓSSIL
          </span>

          <b>→</b>

          <span>
            LOCALIDADE
          </span>

          <b>→</b>

          <span>
            PALEOEARTH
          </span>

          <b>→</b>

          <span>
            ESTUDO
          </span>
        </div>
      </section>
    </main>
  );
}