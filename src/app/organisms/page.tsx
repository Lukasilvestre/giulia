import Link from "next/link";

import {
  organisms,
} from "@/data/organisms";

export default function OrganismsPage() {
  return (
    <section className="organisms-index">
      <header className="organisms-index-hero">
        <span className="eyebrow">
          LIFE THROUGH TIME
        </span>

        <h1>
          Explore a vida do
          passado.
        </h1>

        <p>
          Organismos e grupos
          paleobiológicos conectados
          ao tempo geológico, registro
          fóssil, distribuição e
          reconstruções
          paleogeográficas.
        </p>
      </header>

      <div className="organisms-index-meta">
        <span>
          CATÁLOGO ATUAL
        </span>

        <strong>
          {
            organisms.length
          }{" "}
          entidades
        </strong>
      </div>

      <div className="organism-index-grid">
        {organisms.map(
          (organism) => (
            <Link
              key={
                organism.id
              }
              href={`/organisms/${organism.slug}`}
              className="organism-index-card"
            >
              <div className="organism-index-visual">
                <span>
                  {
                    organism.group
                  }
                </span>
              </div>

              <div className="organism-index-content">
                <span className="organism-index-rank">
                  {
                    organism.rank
                  }
                </span>

                <h2>
                  <i>
                    {
                      organism.scientificName
                    }
                  </i>
                </h2>

                <div className="organism-index-time">
                  {
                    organism.temporalRange.startMa
                  }
                  {" – "}
                  {
                    organism.temporalRange.endMa
                  }{" "}
                  Ma
                </div>

                <p>
                  {
                    organism.description
                  }
                </p>

                <span className="organism-index-open">
                  Explorar organismo →
                </span>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}