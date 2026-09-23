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

const levels = [
  {
    title: "Éons",
    number: "01",
  },
  {
    title: "Eras",
    number: "02",
  },
  {
    title: "Períodos",
    number: "03",
  },
  {
    title: "Épocas / séries",
    number: "04",
  },
];

function rankLabel(
  rank: string
) {
  switch (
    rank
  ) {
    case "eon":
      return "Éon";

    case "era":
      return "Era";

    case "period":
      return "Período";

    case "epoch":
      return "Época / série";

    case "age":
      return "Idade";

    default:
      return rank;
  }
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

  const defaultInterval =
    intervals.find(
      (
        interval
      ) =>
        interval.slug ===
        "phanerozoic"
    ) ??
    intervals[0];

  const [
    selectedPath,
    setSelectedPath,
  ] =
    useState<
      GeologicalInterval[]
    >(
      initialPath ??
        (
          defaultInterval
            ? [
                defaultInterval,
              ]
            : []
        )
    );

  function optionsAtLevel(
    level:
      number
  ):
    GeologicalInterval[] {
    if (
      level === 0
    ) {
      return intervals;
    }

    return (
      selectedPath[
        level - 1
      ]?.children ??
      []
    );
  }

  function selectInterval(
    level:
      number,
    interval:
      GeologicalInterval
  ) {
    setSelectedPath(
      (
        current
      ) => [
        ...current.slice(
          0,
          level
        ),

        interval,
      ]
    );
  }

  function returnToLevel(
    index: number
  ) {
    setSelectedPath(
      (
        current
      ) =>
        current.slice(
          0,
          index +
            1
        )
    );
  }

  const selected =
    selectedPath[
      selectedPath.length -
        1
    ];

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

  const canUsePaleoEarth =
    midpoint <= 410;

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
                onClick={() =>
                  returnToLevel(
                    index
                  )
                }
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
        {levels.map(
          (
            level,
            levelIndex
          ) => {
            const options =
              optionsAtLevel(
                levelIndex
              );

            const active =
              selectedPath[
                levelIndex
              ];

            return (
              <section
                key={
                  level.title
                }
                className={[
                  "timeline-level",

                  options.length ===
                  0
                    ? "inactive"
                    : "",
                ]
                  .filter(
                    Boolean
                  )
                  .join(
                    " "
                  )}
              >
                <header>
                  <span>
                    {
                      level.number
                    }
                  </span>

                  <div>
                    <small>
                      NÍVEL
                    </small>

                    <h2>
                      {
                        level.title
                      }
                    </h2>
                  </div>
                </header>

                {options.length >
                0 ? (
                  <div className="timeline-level-list">
                    {options.map(
                      (
                        interval
                      ) => (
                        <button
                          key={
                            interval.slug
                          }
                          type="button"
                          className={
                            active
                              ?.slug ===
                            interval.slug
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            selectInterval(
                              levelIndex,
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
                    Nenhuma
                    subdivisão
                    cadastrada neste
                    nível.
                  </p>
                )}
              </section>
            );
          }
        )}
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
              Buscar no GIULIA →
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
                    3,
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
              Atlas
            </strong>

            <small>
              Contexto e
              subdivisões
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
              Consultar PBDB
            </small>
          </Link>

          {canUsePaleoEarth ? (
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
                Reconstruir em{" "}
                {midpoint} Ma
              </small>
            </Link>
          ) : (
            <div className="timeline-disabled-card">
              <span>
                03
              </span>

              <strong>
                PaleoEarth
              </strong>

              <small>
                Fora do limite
                atual do modelo
                tectônico utilizado.
              </small>
            </div>
          )}

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
              Conteúdo relacionado
            </small>
          </Link>
        </div>
      </section>
    </div>
  );
}