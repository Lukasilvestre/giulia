import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getOrganismBySlug,
  organisms,
} from "@/data/organisms";

interface OrganismPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return organisms.map(
    (organism) => ({
      slug: organism.slug,
    })
  );
}

export default async function OrganismPage({
  params,
}: OrganismPageProps) {
  const { slug } = await params;

  const organism =
    getOrganismBySlug(slug);

  if (!organism) {
    notFound();
  }

  const duration =
    organism.temporalRange.startMa -
    organism.temporalRange.endMa;

  const pbdbTaxon =
    organism.pbdbTaxon ??
    organism.scientificName;

  return (
    <section className="organism-page">
      <div className="organism-breadcrumbs">
        <Link href="/">
          GIULIA
        </Link>

        <span>/</span>

        <Link
          href={`/interval/${organism.parentInterval.slug}`}
        >
          {organism.parentInterval.name}
        </Link>

        <span>/</span>

        <span>
          {organism.displayName}
        </span>
      </div>

      <header className="organism-hero">
        <div className="organism-hero-text">
          <span className="eyebrow">
            ORGANISM EXPLORER
          </span>

          <h1>
            <i>
              {organism.scientificName}
            </i>
          </h1>

          <span className="organism-group">
            {organism.group}
          </span>

          <p>
            {organism.description}
          </p>

          <div className="organism-actions">
            <Link
              href={`/fossils?taxon=${encodeURIComponent(
                pbdbTaxon
              )}&interval=Cretaceous`}
              className="organism-primary-action"
            >
              Buscar registros fósseis →
            </Link>

            <Link
              href={`/interval/${organism.parentInterval.slug}`}
              className="organism-secondary-action"
            >
              Explorar {organism.parentInterval.name}
            </Link>
          </div>
        </div>

        <div className="organism-visual">
          <span>
            PALEOART
          </span>

          <small>
            imagem científica será
            adicionada posteriormente
          </small>
        </div>
      </header>

      <section className="organism-facts">
        <article>
          <span>Intervalo</span>

          <strong>
            {
              organism.temporalRange
                .startMa
            }
            {" – "}
            {
              organism.temporalRange
                .endMa
            }{" "}
            Ma
          </strong>

          <small>
            {
              organism.temporalRange
                .label
            }
          </small>
        </article>

        {organism.diet && (
          <article>
            <span>Dieta</span>
            <strong>
              {organism.diet}
            </strong>
          </article>
        )}

        {organism.length && (
          <article>
            <span>Comprimento</span>
            <strong>
              {organism.length}
            </strong>
          </article>
        )}

        {organism.mass && (
          <article>
            <span>Massa</span>
            <strong>
              {organism.mass}
            </strong>
          </article>
        )}

        {organism.locomotion && (
          <article>
            <span>Locomoção</span>
            <strong>
              {organism.locomotion}
            </strong>
          </article>
        )}
      </section>

      <section className="organism-time-section">
        <div className="organism-section-heading">
          <span className="eyebrow">
            DEEP TIME
          </span>

          <h2>
            Quando viveu?
          </h2>

          <p>
            {organism.displayName} está
            registrado em uma parcela de
            aproximadamente{" "}
            {duration.toLocaleString(
              "pt-BR"
            )}{" "}
            milhões de anos do registro
            geológico considerado aqui.
          </p>
        </div>

        <div className="organism-time-scale">
          <div className="time-scale-labels">
            <span>
              {
                organism.temporalRange
                  .startMa
              }{" "}
              Ma
            </span>

            <span>
              {
                organism.temporalRange
                  .endMa
              }{" "}
              Ma
            </span>
          </div>

          <div className="organism-time-bar">
            <div />
          </div>
        </div>
      </section>

      <section className="organism-two-columns">
        <div>
          <span className="eyebrow">
            TAXONOMIA
          </span>

          <h2>
            Posição na árvore da vida
          </h2>

          <div className="taxonomy-tree">
            {organism.classification.map(
              (entry, index) => (
                <div
                  className="taxonomy-entry"
                  key={`${entry.rank}-${entry.name}`}
                  style={{
                    marginLeft: `${
                      index * 16
                    }px`,
                  }}
                >
                  <span>
                    {entry.rank}
                  </span>

                  <strong>
                    {entry.name}
                  </strong>
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <span className="eyebrow">
            DISTRIBUIÇÃO
          </span>

          <h2>
            Onde viveu?
          </h2>

          <div className="distribution-panel">
            {organism.distribution.map(
              (location) => (
                <span
                  key={location}
                >
                  {location}
                </span>
              )
            )}
          </div>

          <h3 className="environment-title">
            Ambiente
          </h3>

          <div className="distribution-panel">
            {organism.environment.map(
              (environment) => (
                <span
                  key={environment}
                >
                  {environment}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="organism-two-columns">
        <div>
          <span className="eyebrow">
            CHARACTERISTICS
          </span>

          <h2>
            Características principais
          </h2>

          <div className="organism-highlight-list">
            {organism.highlights.map(
              (highlight) => (
                <div
                  key={highlight}
                >
                  <span />
                  {highlight}
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <span className="eyebrow">
            EVIDENCE
          </span>

          <h2>
            O que os fósseis indicam?
          </h2>

          <div className="organism-highlight-list">
            {organism.evidenceNotes?.map(
              (note) => (
                <div key={note}>
                  <span />
                  {note}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="organism-references">
        <div className="organism-section-heading">
          <span className="eyebrow">
            SOURCES
          </span>

          <h2>
            Referências
          </h2>
        </div>

        {organism.references.map(
          (reference, index) => (
            <article
              key={reference.url}
            >
              <span>
                {String(
                  index + 1
                ).padStart(2, "0")}
              </span>

              <div>
                <small>
                  {
                    reference.institution
                  }
                </small>

                <h3>
                  {reference.title}
                </h3>

                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir fonte ↗
                </a>
              </div>
            </article>
          )
        )}
      </section>
    </section>
  );
}
