"use client";

import Link from "next/link";

import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PbdbMap from "@/components/fossils/PbdbMap";
import SaveToStudyButton from "@/components/study/SaveToStudyButton";

import {
  buildPaleoEarthUrl,
  getOccurrenceAgeLabel,
  getOccurrenceName,
  getOccurrenceReconstructionAge,
} from "@/lib/pbdb-utils";

import type {
  PbdbOccurrence,
  PbdbSearchResult,
} from "@/types/pbdb";

interface PbdbSearchProps {
  initialTaxon?: string;
  initialInterval?: string;
  initialCountry?: string;
  initialRegion?: string;
  autoSearch?: boolean;
}

interface SearchInput {
  taxon: string;
  interval: string;
  country: string;
  region: string;
  page: number;
}

function includesText(
  value:
    | string
    | number
    | undefined,
  query: string
) {
  if (!query) {
    return true;
  }

  return String(
    value ?? ""
  )
    .toLowerCase()
    .includes(
      query.toLowerCase()
    );
}

export default function PbdbSearch({
  initialTaxon = "",
  initialInterval = "",
  initialCountry = "",
  initialRegion = "",
  autoSearch = false,
}: PbdbSearchProps) {
  const [taxon, setTaxon] =
    useState(
      initialTaxon
    );

  const [
    interval,
    setInterval,
  ] =
    useState(
      initialInterval
    );

  const [
    country,
    setCountry,
  ] =
    useState(
      initialCountry
    );

  const [
    region,
    setRegion,
  ] =
    useState(
      initialRegion
    );

  const [
    limit,
    setLimit,
  ] =
    useState(50);

  const [
    result,
    setResult,
  ] =
    useState<PbdbSearchResult | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  const [
    stateFilter,
    setStateFilter,
  ] =
    useState("");

  const [
    formationFilter,
    setFormationFilter,
  ] =
    useState("");

  const [
    environmentFilter,
    setEnvironmentFilter,
  ] =
    useState("");

  const automaticSearchExecuted =
    useRef(false);

  async function runSearch({
    taxon:
      searchTaxon,
    interval:
      searchInterval,
    country:
      searchCountry,
    region:
      searchRegion,
    page,
  }: SearchInput) {
    const cleanTaxon =
      searchTaxon.trim();

    if (
      cleanTaxon.length < 2
    ) {
      setError(
        "Digite um táxon com pelo menos dois caracteres."
      );

      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params =
        new URLSearchParams();

      params.set(
        "taxon",
        cleanTaxon
      );

      params.set(
        "limit",
        String(limit)
      );

      params.set(
        "page",
        String(page)
      );

      if (
        searchInterval.trim()
      ) {
        params.set(
          "interval",
          searchInterval.trim()
        );
      }

      if (
        searchCountry.trim()
      ) {
        params.set(
          "country",
          searchCountry
            .trim()
            .toUpperCase()
        );
      }

      if (
        searchRegion.trim()
      ) {
        params.set(
          "region",
          searchRegion.trim()
        );
      }

      const response =
        await fetch(
          `/api/pbdb/occurrences?${params.toString()}`
        );

      const raw =
        await response.text();

      let data: unknown;

      try {
        data =
          JSON.parse(raw);
      } catch {
        throw new Error(
          `A API retornou uma resposta inválida (HTTP ${response.status}).`
        );
      }

      if (!response.ok) {
        const errorData =
          data as {
            error?: string;
          };

        throw new Error(
          errorData.error ??
            `Erro HTTP ${response.status}.`
        );
      }

      setResult(
        data as PbdbSearchResult
      );
    } catch (err) {
      setResult(null);

      setError(
        err instanceof Error
          ? err.message
          : "Erro desconhecido."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      !autoSearch ||
      !initialTaxon ||
      automaticSearchExecuted.current
    ) {
      return;
    }

    automaticSearchExecuted.current =
      true;

    void runSearch({
      taxon:
        initialTaxon,

      interval:
        initialInterval,

      country:
        initialCountry,

      region:
        initialRegion,

      page: 1,
    });
  }, [
    autoSearch,
    initialTaxon,
    initialInterval,
    initialCountry,
    initialRegion,
  ]);

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    await runSearch({
      taxon,
      interval,
      country,
      region,
      page: 1,
    });
  }

  function selectBrazil() {
    setCountry("BR");
    setRegion("");
  }

  function selectRS() {
    setCountry("BR");
    setRegion("rs");
  }

  function clearRegion() {
    setCountry("");
    setRegion("");
  }

  const filteredRecords =
    useMemo(() => {
      if (!result) {
        return [];
      }

      return result.records.filter(
        (
          occurrence:
            PbdbOccurrence
        ) => {
          return (
            includesText(
              occurrence.state,
              stateFilter
            ) &&
            includesText(
              occurrence.formation,
              formationFilter
            ) &&
            includesText(
              occurrence.environment,
              environmentFilter
            )
          );
        }
      );
    }, [
      result,
      stateFilter,
      formationFilter,
      environmentFilter,
    ]);

  return (
    <div className="pbdb-explorer">
      <form
        className="pbdb-search-form pbdb-search-form-v2"
        onSubmit={
          handleSubmit
        }
      >
        <div className="pbdb-field pbdb-main-field">
          <label htmlFor="pbdb-taxon">
            Táxon
          </label>

          <input
            id="pbdb-taxon"
            type="text"
            value={taxon}
            onChange={(
              event
            ) =>
              setTaxon(
                event.target.value
              )
            }
            placeholder="Ex.: Dinosauria"
          />
        </div>

        <div className="pbdb-field">
          <label htmlFor="pbdb-interval">
            Intervalo
          </label>

          <input
            id="pbdb-interval"
            type="text"
            value={
              interval
            }
            onChange={(
              event
            ) =>
              setInterval(
                event.target.value
              )
            }
            placeholder="Ex.: Cretaceous"
          />
        </div>

        <div className="pbdb-field">
          <label htmlFor="pbdb-country">
            País
          </label>

          <input
            id="pbdb-country"
            type="text"
            maxLength={2}
            value={
              country
            }
            onChange={(
              event
            ) =>
              setCountry(
                event.target.value.toUpperCase()
              )
            }
            placeholder="BR"
          />
        </div>

        <div className="pbdb-field">
          <label htmlFor="pbdb-limit">
            Por página
          </label>

          <select
            id="pbdb-limit"
            value={limit}
            onChange={(
              event
            ) =>
              setLimit(
                Number(
                  event.target.value
                )
              )
            }
          >
            <option value={25}>
              25
            </option>

            <option value={50}>
              50
            </option>

            <option value={100}>
              100
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="pbdb-search-button"
          disabled={
            loading
          }
        >
          {loading
            ? "Consultando..."
            : "Buscar"}
        </button>
      </form>

      <div className="pbdb-region-presets">
        <span>
          RECORTES
        </span>

        <button
          type="button"
          onClick={
            clearRegion
          }
          className={
            !country &&
            !region
              ? "active"
              : ""
          }
        >
          Global
        </button>

        <button
          type="button"
          onClick={
            selectBrazil
          }
          className={
            country ===
              "BR" &&
            !region
              ? "active"
              : ""
          }
        >
          Brasil
        </button>

        <button
          type="button"
          onClick={
            selectRS
          }
          className={
            region ===
            "rs"
              ? "active"
              : ""
          }
        >
          Rio Grande do Sul
        </button>
      </div>

      {region === "rs" && (
        <p className="pbdb-region-note">
          O recorte do Rio Grande do Sul utiliza
          uma caixa geográfica aproximada sobre
          as coordenadas atuais das ocorrências.
        </p>
      )}

      {loading && (
        <div className="pbdb-loading">
          <span className="eyebrow">
            PALEOBIOLOGY DATABASE
          </span>

          <h3>
            Consultando registros...
          </h3>
        </div>
      )}

      {error && (
        <div className="pbdb-error">
          <strong>
            Consulta não concluída
          </strong>

          <p>{error}</p>
        </div>
      )}

      {result &&
        !loading && (
          <div className="pbdb-results">
            <header className="pbdb-results-header">
              <div>
                <span className="eyebrow">
                  LIVE PBDB DATA
                </span>

                <h2>
                  {
                    result.query.taxon
                  }
                </h2>

                <p>
                  {result.count.toLocaleString(
                    "pt-BR"
                  )}{" "}
                  registro(s) encontrados.
                  Esta página contém{" "}
                  {
                    result.returned
                  }
                  .
                </p>
              </div>

              <div className="pbdb-live-status">
                <span />
                LIVE
              </div>
            </header>

            <div className="pbdb-query-summary">
              {result.query.interval && (
                <span>
                  Intervalo:{" "}
                  <strong>
                    {
                      result.query.interval
                    }
                  </strong>
                </span>
              )}

              {result.query.country && (
                <span>
                  País:{" "}
                  <strong>
                    {
                      result.query.country
                    }
                  </strong>
                </span>
              )}

              {result.query.region ===
                "rs" && (
                <span>
                  Região:{" "}
                  <strong>
                    Rio Grande do Sul
                  </strong>
                </span>
              )}

              <span>
                Página:{" "}
                <strong>
                  {result.page}
                  {result.totalPages
                    ? ` / ${result.totalPages}`
                    : ""}
                </strong>
              </span>
            </div>

            {result.records.length >
              0 && (
              <PbdbMap
                records={
                  result.records
                }
              />
            )}

            <section className="pbdb-local-filters">
              <header>
                <span className="eyebrow">
                  FILTER CURRENT PAGE
                </span>

                <h3>
                  Refine os registros carregados
                </h3>

                <p>
                  Estes filtros atuam somente nos
                  registros presentes na página
                  atual.
                </p>
              </header>

              <div>
                <input
                  type="text"
                  value={
                    stateFilter
                  }
                  onChange={(
                    event
                  ) =>
                    setStateFilter(
                      event.target.value
                    )
                  }
                  placeholder="Estado / região"
                />

                <input
                  type="text"
                  value={
                    formationFilter
                  }
                  onChange={(
                    event
                  ) =>
                    setFormationFilter(
                      event.target.value
                    )
                  }
                  placeholder="Formação"
                />

                <input
                  type="text"
                  value={
                    environmentFilter
                  }
                  onChange={(
                    event
                  ) =>
                    setEnvironmentFilter(
                      event.target.value
                    )
                  }
                  placeholder="Ambiente"
                />
              </div>
            </section>

            <div className="pbdb-record-count">
              Exibindo{" "}
              <strong>
                {
                  filteredRecords.length
                }
              </strong>{" "}
              registro(s) nesta página.
            </div>

            <div className="pbdb-record-list">
              {filteredRecords.map(
                (
                  occurrence,
                  index
                ) => {
                  const name =
                    getOccurrenceName(
                      occurrence
                    );

                  const paleoUrl =
                    buildPaleoEarthUrl(
                      occurrence
                    );

                  return (
                    <article
                      key={`${occurrence.occurrence_no}-${index}`}
                      className="pbdb-record"
                    >
                      <div className="pbdb-record-number">
                        {String(
                          index +
                            1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div className="pbdb-record-main">
                        <span className="pbdb-record-rank">
                          {occurrence.accepted_rank ??
                            "occurrence"}
                        </span>

                        <h3>
                          <i>
                            {
                              name
                            }
                          </i>
                        </h3>

                        <div className="pbdb-record-tags">
                          <span>
                            {
                              getOccurrenceAgeLabel(
                                occurrence
                              )
                            }
                          </span>

                          {occurrence.cc && (
                            <span>
                              {
                                occurrence.cc
                              }
                            </span>
                          )}

                          {occurrence.state && (
                            <span>
                              {
                                occurrence.state
                              }
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pbdb-record-details">
                        <div>
                          <span>
                            Formação
                          </span>

                          <strong>
                            {occurrence.formation ??
                              "—"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Ambiente
                          </span>

                          <strong>
                            {occurrence.environment ??
                              "—"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            PBDB
                          </span>

                          <strong>
                            #
                            {
                              occurrence.occurrence_no
                            }
                          </strong>
                        </div>

                        <div className="pbdb-record-actions">
                          <SaveToStudyButton
                            compact
                            item={{
                              id:
                                String(
                                  occurrence.occurrence_no
                                ),

                              type:
                                "occurrence",

                              title:
                                name,

                              subtitle:
                                `PBDB #${occurrence.occurrence_no}`,

                              href:
                                `/fossils/occurrence/${occurrence.occurrence_no}`,

                              metadata: {
                                age:
                                  getOccurrenceAgeLabel(
                                    occurrence
                                  ),

                                formation:
                                  occurrence.formation,

                                environment:
                                  occurrence.environment,

                                location:
                                  [
                                    occurrence.state,
                                    occurrence.cc,
                                  ]
                                    .filter(Boolean)
                                    .join(", "),

                                coordinates:
                                  occurrence.lat !== undefined &&
                                  occurrence.lng !== undefined
                                    ? `${occurrence.lat}, ${occurrence.lng}`
                                    : undefined,

                                pbdbOccurrence:
                                  String(
                                    occurrence.occurrence_no
                                  ),

                                reconstructionAge:
                                  getOccurrenceReconstructionAge(
                                    occurrence
                                  ) ?? undefined,
                              },
                            }}
                          />
                          <Link
                            href={`/fossils/occurrence/${occurrence.occurrence_no}`}
                          >
                            Abrir registro →
                          </Link>

                          {paleoUrl && (
                            <Link
                              href={
                                paleoUrl
                              }
                            >
                              PaleoEarth →
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>

            <nav className="pbdb-pagination">
              <button
                type="button"
                disabled={
                  !result.hasPrevious ||
                  loading
                }
                onClick={() =>
                  void runSearch({
                    taxon,
                    interval,
                    country,
                    region,
                    page:
                      Math.max(
                        result.page -
                          1,
                        1
                      ),
                  })
                }
              >
                ← Página anterior
              </button>

              <span>
                Página{" "}
                <strong>
                  {
                    result.page
                  }
                </strong>
                {result.totalPages &&
                  ` de ${result.totalPages}`}
              </span>

              <button
                type="button"
                disabled={
                  !result.hasNext ||
                  loading
                }
                onClick={() =>
                  void runSearch({
                    taxon,
                    interval,
                    country,
                    region,
                    page:
                      result.page +
                      1,
                  })
                }
              >
                Próxima página →
              </button>
            </nav>

            <footer className="pbdb-source-footer pbdb-provenance">
              <div>
                <span>
                  PROVENIÊNCIA
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
                    result.source.retrievedAt
                  ).toLocaleString(
                    "pt-BR"
                  )}
                </small>
              </div>

              <a
                href={
                  result.source.requestUrl
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir consulta PBDB ↗
              </a>
            </footer>
          </div>
        )}
    </div>
  );
}