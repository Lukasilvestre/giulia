"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import type {
  GeologicalInterval,
} from "@/types/geological";

import {
  findTimelinePath,
  formatIntervalAge,
  intervalDuration,
  intervalMidpoint,
} from "@/lib/timeline-navigation";

interface TimelineExplorerProps {
  intervals:
    GeologicalInterval[];

  initialFocus?: string;
}

function rankLabel(
  rank: string
) {
  const normalized =
    rank.toLowerCase();

  if (
    normalized.includes(
      "eon"
    )
  ) {
    return "Éon";
  }

  if (
    normalized.includes(
      "era"
    )
  ) {
    return "Era";
  }

  if (
    normalized.includes(
      "period"
    )
  ) {
    return "Período";
  }

  if (
    normalized.includes(
      "epoch"
    )
  ) {
    return "Época";
  }

  return rank;
}

export default function TimelineExplorer({
  intervals,
  initialFocus,
}: TimelineExplorerProps) {
  const initialPath =
    useMemo(
      () =>
        initialFocus
          ? findTimelinePath(
              intervals,
              initialFocus
            )
          : null,
      [
        intervals,
        initialFocus,
      ]
    );

  const defaultEon =
    intervals.find(
      (
        interval
      ) =>
        interval.children &&
        interval.children.length >
          0
    ) ??
    intervals[0];

  const [
    eonSlug,
    setEonSlug,
  ] =
    useState(
      initialPath?.[0]
        ?.slug ??
        defaultEon?.slug ??
        ""
    );

  const [
    eraSlug,
    setEraSlug,
  ] =
    useState(
      initialPath?.[1]
        ?.slug ??
        ""
    );

  const [
    periodSlug,
    setPeriodSlug,
  ] =
    useState(
      initialPath?.[2]
        ?.slug ??
        ""
    );

  const selectedEon =
    intervals.find(
      (
        interval
      ) =>
        interval.slug ===
        eonSlug
    );

  const eras =
    selectedEon?.children ??
    [];

  const selectedEra =
    eras.find(
      (
        interval
      ) =>
        interval.slug ===
        eraSlug
    );

  const periods =
    selectedEra?.children ??
    [];

  const selectedPeriod =
    periods.find(
      (
        interval
      ) =>
        interval.slug ===
        periodSlug
    );

  const selected =
    selectedPeriod ??
    selectedEra ??
    selectedEon;

  const selectedPath =
    [
      selectedEon,
      selectedEra,
      selectedPeriod,
    ].filter(
      (
        interval
      ): interval is GeologicalInterval =>
        Boolean(
          interval
        )
    );

  function selectEon(
    interval:
      GeologicalInterval
  ) {
    setEonSlug(
      interval.slug
    );

    setEraSlug("");
    setPeriodSlug("");
  }

  function selectEra(
    interval:
      GeologicalInterval
  ) {
    setEraSlug(
      interval.slug
    );

    setPeriodSlug("");
  }

  function selectPeriod(
    interval:
      GeologicalInterval
  ) {
    setPeriodSlug(
      interval.slug
    );
  }

  if (!selected) {
    return null;
  }

  const midpoint =
    intervalMidpoint(
      selected.startMa,
      selected.endMa
    );

  const duration =
    intervalDuration(
      selected.startMa,
      selected.endMa
    );

  return (
    <div className="timeline-v1">
      <nav className="timeline-path">
        <span>
          TEMPO GEOLÓGICO
        </span>

        {selectedPath.map(
          (
            interval,
            index
          ) => (
            <div
              key={
                interval.slug
              }
            >
              <span>
                →
              </span>

              <button
                type="button"
                onClick={() => {
                  if (
                    index === 0
                  ) {
                    selectEon(
                      interval
                    );
                  }

                  if (
                    index === 1
                  ) {
                    selectEra(
                      interval
                    );
                  }

                  if (
                    index === 2
                  ) {
                    selectPeriod(
                      interval
                    );
                  }
                }}
              >
                {
                  interval.namePt
                }
              </button>
            </div>
          )
        )}
      </nav>

      <div className="timeline-levels">
        <section className="timeline-level">
          <header>
            <span>
              01
            </span>

            <div>
              <small>
                NÍVEL
              </small>

              <h2>
                Éons
              </h2>
            </div>
          </header>

          <div className="timeline-level-list">
            {intervals.map(
              (
                interval
              ) => (
                <button
                  key={
                    interval.slug
                  }
                  type="button"
                  className={
                    interval.slug ===
                    selectedEon
                      ?.slug
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    selectEon(
                      interval
                    )
                  }
                >
                  <span>
                    {
                      interval.namePt
                    }
                  </span>

                  <small>
                    {formatIntervalAge(
                      interval.startMa,
                      interval.endMa
                    )}
                  </small>
                </button>
              )
            )}
          </div>
        </section>

        <section
          className={[
            "timeline-level",

            eras.length ===
            0
              ? "inactive"
              : "",
          ]
            .filter(
              Boolean
            )
            .join(" ")}
        >
          <header>
            <span>
              02
            </span>

            <div>
              <small>
                NÍVEL
              </small>

              <h2>
                Eras
              </h2>
            </div>
          </header>

          {eras.length >
          0 ? (
            <div className="timeline-level-list">
              {eras.map(
                (
                  interval
                ) => (
                  <button
                    key={
                      interval.slug
                    }
                    type="button"
                    className={
                      interval.slug ===
                      selectedEra
                        ?.slug
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      selectEra(
                        interval
                      )
                    }
                  >
                    <span>
                      {
                        interval.namePt
                      }
                    </span>

                    <small>
                      {formatIntervalAge(
                        interval.startMa,
                        interval.endMa
                      )}
                    </small>
                  </button>
                )
              )}
            </div>
          ) : (
            <p className="timeline-level-empty">
              Nenhuma subdivisão
              desse nível está
              cadastrada atualmente
              no GIULIA.
            </p>
          )}
        </section>

        <section
          className={[
            "timeline-level",

            periods.length ===
            0
              ? "inactive"
              : "",
          ]
            .filter(
              Boolean
            )
            .join(" ")}
        >
          <header>
            <span>
              03
            </span>

            <div>
              <small>
                NÍVEL
              </small>

              <h2>
                Períodos
              </h2>
            </div>
          </header>

          {periods.length >
          0 ? (
            <div className="timeline-level-list">
              {periods.map(
                (
                  interval
                ) => (
                  <button
                    key={
                      interval.slug
                    }
                    type="button"
                    className={
                      interval.slug ===
                      selectedPeriod
                        ?.slug
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      selectPeriod(
                        interval
                      )
                    }
                  >
                    <span>
                      {
                        interval.namePt
                      }
                    </span>

                    <small>
                      {formatIntervalAge(
                        interval.startMa,
                        interval.endMa
                      )}
                    </small>
                  </button>
                )
              )}
            </div>
          ) : (
            <p className="timeline-level-empty">
              Selecione uma era
              para explorar seus
              períodos.
            </p>
          )}
        </section>
      </div>

      <section className="timeline-selected">
        <div className="timeline-selected-main">
          <span className="eyebrow">
            SELECTED INTERVAL
          </span>

          <div className="timeline-selected-rank">
            {rankLabel(
              selected.rank
            )}
          </div>

          <h2>
            {
              selected.namePt
            }
          </h2>

          <div className="timeline-selected-english">
            {
              selected.name
            }
          </div>

          <p>
            {
              selected.description
            }
          </p>

          <div className="timeline-selected-actions">
            <Link
              href={`/interval/${selected.slug}`}
              className="timeline-primary-action"
            >
              Abrir intervalo →
            </Link>

            <Link
              href={`/search?q=${encodeURIComponent(
                selected.name
              )}`}
            >
              Buscar no GIULIA
              →
            </Link>
          </div>
        </div>

        <aside className="timeline-selected-data">
          <div>
            <span>
              INÍCIO
            </span>

            <strong>
              {
                selected.startMa
              }{" "}
              Ma
            </strong>
          </div>

          <div>
            <span>
              FIM
            </span>

            <strong>
              {selected.endMa ===
              0
                ? "Presente"
                : `${selected.endMa} Ma`}
            </strong>
          </div>

          <div>
            <span>
              DURAÇÃO
            </span>

            <strong>
              {duration.toLocaleString(
                "pt-BR",
                {
                  maximumFractionDigits:
                    2,
                }
              )}{" "}
              Ma
            </strong>
          </div>

          <div>
            <span>
              PONTO MÉDIO
            </span>

            <strong>
              {
                midpoint
              }{" "}
              Ma
            </strong>
          </div>
        </aside>
      </section>

      <section className="timeline-continue">
        <header>
          <span className="eyebrow">
            CONTINUE EXPLORING
          </span>

          <h2>
            Continue a partir de{" "}
            {
              selected.namePt
            }.
          </h2>
        </header>

        <div>
          <Link
            href={`/interval/${selected.slug}`}
          >
            <span>
              01
            </span>

            <strong>
              Dossiê
            </strong>

            <small>
              Dados e contexto
              científico
            </small>
          </Link>

          <Link
            href={`/fossils?interval=${encodeURIComponent(
              selected.name
            )}`}
          >
            <span>
              02
            </span>

            <strong>
              Fósseis
            </strong>

            <small>
              Pré-preencher este
              intervalo
            </small>
          </Link>

          <Link
            href={`/paleoearth?time=${midpoint}`}
          >
            <span>
              03
            </span>

            <strong>
              PaleoEarth
            </strong>

            <small>
              Usar {midpoint} Ma
              como idade inicial
            </small>
          </Link>

          <Link
            href={`/search?q=${encodeURIComponent(
              selected.name
            )}`}
          >
            <span>
              04
            </span>

            <strong>
              Busca
            </strong>

            <small>
              Conteúdo associado
            </small>
          </Link>
        </div>
      </section>
    </div>
  );
}