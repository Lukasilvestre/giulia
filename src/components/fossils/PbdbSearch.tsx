"use client";

import {
  FormEvent,
  useState,
} from "react";

import PbdbMap from "@/components/fossils/PbdbMap";

import type {
  PbdbOccurrence,
  PbdbSearchResult,
} from "@/types/pbdb";

interface PbdbSearchProps {
  initialTaxon?: string;
  initialInterval?: string;
}

function valueOrDash(
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

function formatAge(
  occurrence: PbdbOccurrence
) {
  const max =
    occurrence.max_ma;

  const min =
    occurrence.min_ma;

  if (
    max !== undefined &&
    min !== undefined
  ) {
    return `${max} – ${min} Ma`;
  }

  if (max !== undefined) {
    return `${max} Ma`;
  }

  if (min !== undefined) {
    return `${min} Ma`;
  }

  const early =
    occurrence.early_interval;

  const late =
    occurrence.late_interval;

  if (
    early &&
    late &&
    early !== late
  ) {
    return `${early} – ${late}`;
  }

  return (
    early ??
    late ??
    "Idade não informada"
  );
}

export default function PbdbSearch({
  initialTaxon = "",
  initialInterval = "",
}: PbdbSearchProps) {
  const [taxon, setTaxon] =
    useState(initialTaxon);

  const [
    interval,
    setInterval,
  ] = useState(initialInterval);

  const [result, setResult] =
    useState<PbdbSearchResult | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(
      null
    );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const cleanTaxon =
      taxon.trim();

    if (!cleanTaxon) {
      setError(
        "Digite um táxon para pesquisar."
      );

      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params =
        new URLSearchParams({
          taxon: cleanTaxon,
          limit: "50",
        });

      if (
        interval.trim()
      ) {
        params.set(
          "interval",
          interval.trim()
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
        data = JSON.parse(raw);
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
            `Erro HTTP ${response.status} ao consultar a PBDB.`
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

  return (
    <div className="pbdb-explorer">
      <form
        className="pbdb-search-form"
        onSubmit={handleSubmit}
      >
        <div className="pbdb-field pbdb-main-field">
          <label htmlFor="pbdb-taxon">
            Táxon
          </label>

          <input
            id="pbdb-taxon"
            type="text"
            value={taxon}
            onChange={(event) =>
              setTaxon(
                event.target.value
              )
            }
            placeholder="Ex.: Tyrannosaurus"
            autoComplete="off"
          />
        </div>

        <div className="pbdb-field">
          <label htmlFor="pbdb-interval">
            Intervalo
          </label>

          <input
            id="pbdb-interval"
            type="text"
            value={interval}
            onChange={(event) =>
              setInterval(
                event.target.value
              )
            }
            placeholder="Ex.: Cretaceous"
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="pbdb-search-button"
          disabled={loading}
        >
          {loading
            ? "Consultando..."
            : "Buscar ocorrências"}
        </button>
      </form>

      <div className="pbdb-examples">
        <span>
          Experimente:
        </span>

        {[
          "Tyrannosaurus",
          "Triceratops",
          "Ammonoidea",
          "Mosasauridae",
        ].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() =>
              setTaxon(name)
            }
          >
            {name}
          </button>
        ))}
      </div>

      {error && (
        <div className="pbdb-error">
          <strong>
            Consulta não concluída
          </strong>

          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="pbdb-results">
          <header className="pbdb-results-header">
            <div>
              <span className="eyebrow">
                LIVE PBDB DATA
              </span>

              <h2>
                {result.query.taxon}
              </h2>

              <p>
                {result.count.toLocaleString(
                  "pt-BR"
                )}{" "}
                ocorrência(s) encontrada(s).
                A interface mostra até{" "}
                {
                  result.query
                    .limit
                }{" "}
                registros por consulta.
              </p>
            </div>

            <div className="pbdb-live-status">
              <span />
              LIVE
            </div>
          </header>

          
          <PbdbMap records={result.records} />

          {result.records.length ===
          0 ? (
            <div className="pbdb-empty">
              Nenhuma ocorrência foi
              retornada para estes
              filtros.
            </div>
          ) : (
            <div className="pbdb-record-list">
              {result.records.map(
                (
                  occurrence,
                  index
                ) => {
                  const name =
                    occurrence.accepted_name ??
                    occurrence.identified_name ??
                    "Táxon não informado";

                  return (
                    <article
                      key={`${occurrence.occurrence_no}-${index}`}
                      className="pbdb-record"
                    >
                      <div className="pbdb-record-number">
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div className="pbdb-record-main">
                        <span className="pbdb-record-rank">
                          {valueOrDash(
                            occurrence.accepted_rank
                          )}
                        </span>

                        <h3>
                          <i>
                            {name}
                          </i>
                        </h3>

                        {occurrence.identified_name &&
                          occurrence.identified_name !==
                            name && (
                            <small>
                              Identificado
                              como:{" "}
                              {
                                occurrence.identified_name
                              }
                            </small>
                          )}

                        <div className="pbdb-record-tags">
                          <span>
                            {formatAge(
                              occurrence
                            )}
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
                            {valueOrDash(
                              occurrence.formation
                            )}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Ambiente
                          </span>

                          <strong>
                            {valueOrDash(
                              occurrence.environment
                            )}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Coordenadas
                          </span>

                          <strong>
                            {occurrence.lat !==
                              undefined &&
                            occurrence.lng !==
                              undefined
                              ? `${occurrence.lat}, ${occurrence.lng}`
                              : "—"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            PBDB occurrence
                          </span>

                          <strong>
                            #
                            {
                              occurrence.occurrence_no
                            }
                          </strong>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}

          <footer className="pbdb-source-footer">
            <div>
              <span>
                FONTE DOS DADOS
              </span>

              <strong>
                Paleobiology Database
              </strong>

              <small>
                PBDB Data Service 1.2
              </small>
            </div>

            <a
              href={
                result.source
                  .requestUrl
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver consulta original ↗
            </a>
          </footer>
        </div>
      )}
    </div>
  );
}