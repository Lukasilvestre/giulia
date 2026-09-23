"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  PbdbOccurrence,
} from "@/types/pbdb";

interface PbdbMapProps {
  records: PbdbOccurrence[];
}

interface GeoOccurrence {
  record: PbdbOccurrence;
  lat: number;
  lng: number;
}

function toCoordinate(
  value: string | number | undefined
): number | null {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

function getOccurrenceName(
  occurrence: PbdbOccurrence
) {
  return (
    occurrence.accepted_name ??
    occurrence.identified_name ??
    "Táxon não informado"
  );
}

function getOccurrenceAge(
  occurrence: PbdbOccurrence
) {
  if (
    occurrence.max_ma !== undefined &&
    occurrence.min_ma !== undefined
  ) {
    return `${occurrence.max_ma} – ${occurrence.min_ma} Ma`;
  }

  if (
    occurrence.early_interval &&
    occurrence.late_interval &&
    occurrence.early_interval !==
      occurrence.late_interval
  ) {
    return `${occurrence.early_interval} – ${occurrence.late_interval}`;
  }

  return (
    occurrence.early_interval ??
    occurrence.late_interval ??
    "Idade não informada"
  );
}

export default function PbdbMap({
  records,
}: PbdbMapProps) {
  const mapElement =
    useRef<HTMLDivElement | null>(
      null
    );

  const [
    selected,
    setSelected,
  ] = useState<PbdbOccurrence | null>(
    null
  );

  const geoOccurrences =
    useMemo<GeoOccurrence[]>(() => {
      return records
        .map((record) => {
          const lat =
            toCoordinate(
              record.lat
            );

          const lng =
            toCoordinate(
              record.lng
            );

          if (
            lat === null ||
            lng === null ||
            lat < -90 ||
            lat > 90 ||
            lng < -180 ||
            lng > 180
          ) {
            return null;
          }

          return {
            record,
            lat,
            lng,
          };
        })
        .filter(
          (
            item
          ): item is GeoOccurrence =>
            item !== null
        );
    }, [records]);

  useEffect(() => {
    if (
      !mapElement.current ||
      geoOccurrences.length === 0
    ) {
      return;
    }

    let disposed = false;

    let mapInstance:
      | import("leaflet").Map
      | null = null;

    async function initializeMap() {
      const L =
        await import("leaflet");

      if (
        disposed ||
        !mapElement.current
      ) {
        return;
      }

      mapInstance =
        L.map(
          mapElement.current,
          {
            worldCopyJump: true,
            minZoom: 2,
          }
        ).setView(
          [15, 0],
          2
        );

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,

          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(mapInstance);

      const coordinates:
        [number, number][] = [];

      for (
        const occurrence
        of geoOccurrences
      ) {
        const {
          record,
          lat,
          lng,
        } = occurrence;

        coordinates.push([
          lat,
          lng,
        ]);

        const marker =
          L.circleMarker(
            [lat, lng],
            {
              radius: 6,

              color:
                "#d6c684",

              fillColor:
                "#d6c684",

              fillOpacity:
                0.72,

              weight: 1.5,
            }
          );

        marker.addTo(
          mapInstance
        );

        marker.bindTooltip(
          getOccurrenceName(
            record
          ),
          {
            direction: "top",
          }
        );

        marker.on(
          "click",
          () => {
            setSelected(
              record
            );
          }
        );
      }

      if (
        coordinates.length ===
        1
      ) {
        mapInstance.setView(
          coordinates[0],
          6
        );
      }

      if (
        coordinates.length >
        1
      ) {
        const bounds =
          L.latLngBounds(
            coordinates
          );

        mapInstance.fitBounds(
          bounds,
          {
            padding: [35, 35],

            maxZoom: 6,
          }
        );
      }

      window.setTimeout(
        () => {
          mapInstance
            ?.invalidateSize();
        },
        0
      );
    }

    void initializeMap();

    return () => {
      disposed = true;

      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [geoOccurrences]);

  if (
    geoOccurrences.length === 0
  ) {
    return (
      <section className="pbdb-map-empty">
        <span className="eyebrow">
          OCCURRENCE MAP
        </span>

        <h3>
          Nenhuma coordenada
          disponível
        </h3>

        <p>
          Os registros retornados nesta
          consulta não possuem
          coordenadas geográficas
          utilizáveis.
        </p>
      </section>
    );
  }

  return (
    <section className="pbdb-map-section">
      <header className="pbdb-map-header">
        <div>
          <span className="eyebrow">
            OCCURRENCE MAP
          </span>

          <h3>
            Distribuição das
            ocorrências
          </h3>

          <p>
            Localidades atuais de
            registros cadastrados na
            Paleobiology Database.
          </p>
        </div>

        <div className="pbdb-map-counter">
          <strong>
            {
              geoOccurrences.length
            }
          </strong>

          <span>
            com coordenadas
          </span>
        </div>
      </header>

      <div className="pbdb-map-layout">
        <div
          ref={mapElement}
          className="pbdb-map"
          aria-label="Mapa das ocorrências fósseis"
        />

        <aside className="pbdb-map-sidebar">
          {!selected ? (
            <div className="pbdb-map-instruction">
              <span>
                SELECIONE UM PONTO
              </span>

              <p>
                Clique em uma
                ocorrência no mapa para
                visualizar seus
                metadados.
              </p>
            </div>
          ) : (
            <div className="pbdb-selected-occurrence">
              <span className="eyebrow">
                SELECTED OCCURRENCE
              </span>

              <h4>
                <i>
                  {
                    getOccurrenceName(
                      selected
                    )
                  }
                </i>
              </h4>

              <div className="pbdb-selected-data">
                <div>
                  <span>
                    Idade
                  </span>

                  <strong>
                    {
                      getOccurrenceAge(
                        selected
                      )
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Formação
                  </span>

                  <strong>
                    {
                      selected.formation ??
                      "—"
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Ambiente
                  </span>

                  <strong>
                    {
                      selected.environment ??
                      "—"
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    País
                  </span>

                  <strong>
                    {
                      selected.cc ??
                      "—"
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Região
                  </span>

                  <strong>
                    {
                      selected.state ??
                      "—"
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Coordenadas
                  </span>

                  <strong>
                    {selected.lat ??
                      "—"}
                    {", "}
                    {selected.lng ??
                      "—"}
                  </strong>
                </div>

                <div>
                  <span>
                    PBDB occurrence
                  </span>

                  <strong>
                    #
                    {
                      selected.occurrence_no
                    }
                  </strong>
                </div>
              </div>
            </div>
          )}

          <div className="pbdb-map-warning">
            <strong>
              Coordenada atual
            </strong>

            <p>
              Estes pontos representam
              a localização geográfica
              cadastrada para a
              ocorrência fóssil. Eles
              ainda não representam a
              posição paleogeográfica
              do organismo.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}