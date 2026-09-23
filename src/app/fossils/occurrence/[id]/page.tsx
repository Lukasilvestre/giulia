import Link from "next/link";

import SaveToStudyButton from "@/components/study/SaveToStudyButton";

import {
  getPbdbOccurrence,
} from "@/lib/pbdb";

import {
  buildPaleoEarthUrl,
  getOccurrenceAgeLabel,
  getOccurrenceName,
  getOccurrenceReconstructionAge,
} from "@/lib/pbdb-utils";

export const dynamic =
  "force-dynamic";

interface OccurrencePageProps {
  params: Promise<{
    id: string;
  }>;
}

function show(
  value:
    | string
    | number
    | undefined
) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "—";
  }

  return String(value);
}

export default async function OccurrencePage({
  params,
}: OccurrencePageProps) {
  const {
    id,
  } =
    await params;

  let data;

  try {
    data =
      await getPbdbOccurrence(
        id
      );
  } catch (error) {
    return (
      <section className="occurrence-page">
        <div className="occurrence-error">
          <span className="eyebrow">
            PBDB OCCURRENCE
          </span>

          <h1>
            Registro não disponível.
          </h1>

          <p>
            {error instanceof Error
              ? error.message
              : "Não foi possível recuperar a ocorrência."}
          </p>

          <Link href="/fossils">
            Voltar ao Fossil Explorer →
          </Link>
        </div>
      </section>
    );
  }

  const {
    record,
    source,
  } =
    data;

  const name =
    getOccurrenceName(
      record
    );

  const paleoUrl =
    buildPaleoEarthUrl(
      record
    );

  const reconstructionAge =
    getOccurrenceReconstructionAge(
      record
    );

  return (
    <section className="occurrence-page">
      <nav className="occurrence-breadcrumb">
        <Link href="/">
          GIULIA
        </Link>

        <span>→</span>

        <Link href="/fossils">
          Fósseis
        </Link>

        <span>→</span>

        <span>
          PBDB #
          {
            record.occurrence_no
          }
        </span>
      </nav>

      <header className="occurrence-hero">
        <div>
          <span className="eyebrow">
            PALEOBIOLOGY DATABASE OCCURRENCE
          </span>

          <h1>
            <i>
              {name}
            </i>
          </h1>

          <p>
            Registro individual de ocorrência
            paleontológica proveniente da
            Paleobiology Database.
          </p>
        </div>

        <div className="occurrence-id">
          <span>
            OCCURRENCE
          </span>

          <strong>
            #
            {
              record.occurrence_no
            }
          </strong>
        </div>
      </header>

      
      <div className="occurrence-study-action">
        <SaveToStudyButton
          item={{
            id:
              String(
                record.occurrence_no
              ),

            type:
              "occurrence",

            title:
              name,

            subtitle:
              `PBDB #${record.occurrence_no}`,

            href:
              `/fossils/occurrence/${record.occurrence_no}`,

            metadata: {
              age:
                getOccurrenceAgeLabel(
                  record
                ),

              formation:
                record.formation,

              environment:
                record.environment,

              location:
                [
                  record.state,
                  record.cc,
                ]
                  .filter(Boolean)
                  .join(", "),

              coordinates:
                record.lat !== undefined &&
                record.lng !== undefined
                  ? `${record.lat}, ${record.lng}`
                  : undefined,

              pbdbOccurrence:
                String(
                  record.occurrence_no
                ),

              reconstructionAge:
                reconstructionAge ??
                undefined,
            },
          }}
        />
      </div>

      <section className="occurrence-summary-grid">
        <article>
          <span>
            IDADE
          </span>

          <strong>
            {
              getOccurrenceAgeLabel(
                record
              )
            }
          </strong>
        </article>

        <article>
          <span>
            LOCALIDADE
          </span>

          <strong>
            {show(
              record.state
            )}
            {record.cc
              ? `, ${record.cc}`
              : ""}
          </strong>
        </article>

        <article>
          <span>
            FORMAÇÃO
          </span>

          <strong>
            {show(
              record.formation
            )}
          </strong>
        </article>

        <article>
          <span>
            AMBIENTE
          </span>

          <strong>
            {show(
              record.environment
            )}
          </strong>
        </article>
      </section>

      <div className="occurrence-content-grid">
        <section className="occurrence-panel">
          <span className="eyebrow">
            IDENTIFICATION
          </span>

          <h2>
            Identificação
          </h2>

          <dl>
            <div>
              <dt>
                Nome identificado
              </dt>

              <dd>
                {show(
                  record.identified_name
                )}
              </dd>
            </div>

            <div>
              <dt>
                Nome aceito
              </dt>

              <dd>
                {show(
                  record.accepted_name
                )}
              </dd>
            </div>

            <div>
              <dt>
                Ranking
              </dt>

              <dd>
                {show(
                  record.accepted_rank
                )}
              </dd>
            </div>

            <div>
              <dt>
                Collection
              </dt>

              <dd>
                #
                {show(
                  record.collection_no
                )}
              </dd>
            </div>
          </dl>
        </section>

        <section className="occurrence-panel">
          <span className="eyebrow">
            TAXONOMY
          </span>

          <h2>
            Classificação
          </h2>

          <dl>
            <div>
              <dt>
                Filo
              </dt>

              <dd>
                {show(
                  record.phylum
                )}
              </dd>
            </div>

            <div>
              <dt>
                Classe
              </dt>

              <dd>
                {show(
                  record.class
                )}
              </dd>
            </div>

            <div>
              <dt>
                Ordem
              </dt>

              <dd>
                {show(
                  record.order
                )}
              </dd>
            </div>

            <div>
              <dt>
                Família
              </dt>

              <dd>
                {show(
                  record.family
                )}
              </dd>
            </div>

            <div>
              <dt>
                Gênero
              </dt>

              <dd>
                {show(
                  record.genus
                )}
              </dd>
            </div>
          </dl>
        </section>

        <section className="occurrence-panel">
          <span className="eyebrow">
            STRATIGRAPHY
          </span>

          <h2>
            Estratigrafia
          </h2>

          <dl>
            <div>
              <dt>
                Intervalo inicial
              </dt>

              <dd>
                {show(
                  record.early_interval
                )}
              </dd>
            </div>

            <div>
              <dt>
                Intervalo final
              </dt>

              <dd>
                {show(
                  record.late_interval
                )}
              </dd>
            </div>

            <div>
              <dt>
                Grupo
              </dt>

              <dd>
                {show(
                  record.stratgroup
                )}
              </dd>
            </div>

            <div>
              <dt>
                Formação
              </dt>

              <dd>
                {show(
                  record.formation
                )}
              </dd>
            </div>

            <div>
              <dt>
                Membro
              </dt>

              <dd>
                {show(
                  record.member
                )}
              </dd>
            </div>
          </dl>
        </section>

        <section className="occurrence-panel">
          <span className="eyebrow">
            GEOGRAPHY
          </span>

          <h2>
            Geografia
          </h2>

          <dl>
            <div>
              <dt>
                País
              </dt>

              <dd>
                {show(
                  record.cc
                )}
              </dd>
            </div>

            <div>
              <dt>
                Estado / região
              </dt>

              <dd>
                {show(
                  record.state
                )}
              </dd>
            </div>

            <div>
              <dt>
                Latitude
              </dt>

              <dd>
                {show(
                  record.lat
                )}
              </dd>
            </div>

            <div>
              <dt>
                Longitude
              </dt>

              <dd>
                {show(
                  record.lng
                )}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      {paleoUrl && (
        <section className="occurrence-paleoearth">
          <div>
            <span className="eyebrow">
              PALEOEARTH
            </span>

            <h2>
              Reconstrua esta ocorrência.
            </h2>

            <p>
              O GIULIA pode utilizar as
              coordenadas atuais deste
              registro e uma idade
              representativa de{" "}
              <strong>
                {
                  reconstructionAge
                }{" "}
                Ma
              </strong>{" "}
              para executar a reconstrução
              paleogeográfica.
            </p>
          </div>

          <Link
            href={
              paleoUrl
            }
            className="occurrence-paleo-button"
          >
            Abrir no PaleoEarth →
          </Link>
        </section>
      )}

      <section className="occurrence-reference">
        <span className="eyebrow">
          REFERENCE
        </span>

        <h2>
          Referência associada
        </h2>

        <dl>
          <div>
            <dt>
              Autor
            </dt>

            <dd>
              {show(
                record.ref_author
              )}
            </dd>
          </div>

          <div>
            <dt>
              Ano
            </dt>

            <dd>
              {show(
                record.ref_pubyr
              )}
            </dd>
          </div>

          <div>
            <dt>
              Reference ID
            </dt>

            <dd>
              #
              {show(
                record.reference_no
              )}
            </dd>
          </div>
        </dl>
      </section>

      <footer className="occurrence-provenance">
        <div>
          <span>
            DATA PROVENANCE
          </span>

          <strong>
            Paleobiology Database
          </strong>

          <small>
            PBDB Data Service 1.2
          </small>

          <small>
            Recuperado em{" "}
            {new Date(
              source.retrievedAt
            ).toLocaleString(
              "pt-BR"
            )}
          </small>
        </div>

        <a
          href={
            source.requestUrl
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Consulta original ↗
        </a>
      </footer>
    </section>
  );
}