"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  GeoJsonObject,
} from "geojson";

interface ReconstructionResponse {
  input: {
    lat: number;
    lng: number;
    time: number;
  };

  model: string;

  point: unknown;
}

interface CoastlineResponse {
  time: number;

  model: string;

  coastlines: unknown;
}

interface PaleoCoordinate {
  lat: number;
  lng: number;
}

function isObject(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

function extractPoint(
  value: unknown
): PaleoCoordinate | null {
  if (!isObject(value)) {
    return null;
  }

  if (
    value.type ===
      "FeatureCollection" &&
    Array.isArray(
      value.features
    )
  ) {
    for (
      const feature
      of value.features
    ) {
      const result =
        extractPoint(
          feature
        );

      if (result) {
        return result;
      }
    }
  }

  if (
    value.type === "Feature" &&
    isObject(
      value.geometry
    )
  ) {
    return extractPoint(
      value.geometry
    );
  }

  if (
    value.type === "Point" &&
    Array.isArray(
      value.coordinates
    )
  ) {
    const lng =
      Number(
        value.coordinates[0]
      );

    const lat =
      Number(
        value.coordinates[1]
      );

    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      return {
        lat,
        lng,
      };
    }
  }

  return null;
}

interface PaleoMapProps {
  coastlines: unknown;
  paleoPoint: PaleoCoordinate;
  time: number;
}

function PaleoMap({
  coastlines,
  paleoPoint,
  time,
}: PaleoMapProps) {
  const container =
    useRef<HTMLDivElement | null>(
      null
    );

  useEffect(() => {
    if (!container.current) {
      return;
    }

    let disposed = false;

    let map:
      | import("leaflet").Map
      | null = null;

    async function initialize() {
      const L =
        await import(
          "leaflet"
        );

      if (
        disposed ||
        !container.current
      ) {
        return;
      }

      map =
        L.map(
          container.current,
          {
            crs:
              L.CRS.EPSG4326,

            minZoom: 1,

            maxZoom: 7,

            zoomControl: true,

            attributionControl:
              false,
          }
        );

      map.setView(
        [0, 0],
        1
      );

      /*
       * Grade geográfica.
       */
      for (
        let lat = -60;
        lat <= 60;
        lat += 30
      ) {
        const points:
          [number, number][] =
          [];

        for (
          let lng = -180;
          lng <= 180;
          lng += 5
        ) {
          points.push([
            lat,
            lng,
          ]);
        }

        L.polyline(
          points,
          {
            color:
              "#24342e",

            weight: 1,

            opacity: 0.55,

            interactive:
              false,
          }
        ).addTo(map);
      }

      for (
        let lng = -150;
        lng <= 150;
        lng += 30
      ) {
        const points:
          [number, number][] =
          [];

        for (
          let lat = -85;
          lat <= 85;
          lat += 5
        ) {
          points.push([
            lat,
            lng,
          ]);
        }

        L.polyline(
          points,
          {
            color:
              "#24342e",

            weight: 1,

            opacity: 0.55,

            interactive:
              false,
          }
        ).addTo(map);
      }

      try {
        const layer =
          L.geoJSON(
            coastlines as GeoJsonObject,
            {
              style: () => ({
                color:
                  "#d6c684",

                weight:
                  1.35,

                opacity:
                  0.9,

                fill:
                  false,
              }),
            }
          );

        layer.addTo(map);
      } catch (
        error
      ) {
        console.error(
          "Erro ao desenhar GeoJSON:",
          error
        );
      }

      const marker =
        L.circleMarker(
          [
            paleoPoint.lat,
            paleoPoint.lng,
          ],
          {
            radius: 8,

            color:
              "#8fd19e",

            fillColor:
              "#8fd19e",

            fillOpacity:
              0.9,

            weight: 2,
          }
        );

      marker
        .addTo(map)
        .bindTooltip(
          `Paleoposição — ${time} Ma`,
          {
            permanent:
              false,

            direction:
              "top",
          }
        );

      map.setView(
        [
          paleoPoint.lat,
          paleoPoint.lng,
        ],
        2
      );

      window.setTimeout(
        () => {
          map?.invalidateSize();
        },
        0
      );
    }

    void initialize();

    return () => {
      disposed = true;

      if (map) {
        map.remove();
      }
    };
  }, [
    coastlines,
    paleoPoint,
    time,
  ]);

  return (
    <div
      ref={container}
      className="paleoearth-map"
      aria-label={`Reconstrução paleogeográfica para ${time} milhões de anos`}
    />
  );
}

async function getJson(
  url: string
): Promise<unknown> {
  const response =
    await fetch(url);

  const raw =
    await response.text();

  let data: unknown;

  try {
    data =
      JSON.parse(raw);
  } catch {
    throw new Error(
      `Resposta inválida do servidor (HTTP ${response.status}).`
    );
  }

  if (!response.ok) {
    if (
      isObject(data) &&
      typeof data.error ===
        "string"
    ) {
      throw new Error(
        data.error
      );
    }

    throw new Error(
      `Erro HTTP ${response.status}.`
    );
  }

  return data;
}

interface PaleoEarthExplorerProps {
  initialLat?: string;
  initialLng?: string;
  initialTime?: string;
  sourceTaxon?: string;
  sourceOccurrence?: string;
  autoReconstruct?: boolean;
}

export default function PaleoEarthExplorer({
  initialLat,
  initialLng,
  initialTime,
  sourceTaxon,
  sourceOccurrence,
  autoReconstruct = false,
}: PaleoEarthExplorerProps) {
  const autoRun =
    useRef(false);

  const reconstructionForm =
    useRef<HTMLFormElement | null>(null);
  const [lat, setLat] =
    useState(initialLat ?? "45");

  const [lng, setLng] =
    useState(initialLng ?? "-104");

  const [time, setTime] =
    useState(initialTime ?? "67");

  const [
    reconstruction,
    setReconstruction,
  ] =
    useState<ReconstructionResponse | null>(
      null
    );

  const [
    coastlines,
    setCoastlines,
  ] =
    useState<CoastlineResponse | null>(
      null
    );

  const [
    paleoPoint,
    setPaleoPoint,
  ] =
    useState<PaleoCoordinate | null>(
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

  useEffect(() => {
    if (
      autoReconstruct &&
      !autoRun.current
    ) {
      autoRun.current = true;
      reconstructionForm.current?.requestSubmit();
    }
  }, [autoReconstruct]);

  async function reconstruct(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const parsedLat =
      Number(lat);

    const parsedLng =
      Number(lng);

    const parsedTime =
      Number(time);

    if (
      !Number.isFinite(
        parsedLat
      ) ||
      !Number.isFinite(
        parsedLng
      ) ||
      !Number.isFinite(
        parsedTime
      )
    ) {
      setError(
        "Informe valores numéricos válidos."
      );

      return;
    }

    setLoading(true);
    setError(null);

    try {
      const pointParams =
        new URLSearchParams({
          lat:
            String(
              parsedLat
            ),

          lng:
            String(
              parsedLng
            ),

          time:
            String(
              parsedTime
            ),
        });

      const coastParams =
        new URLSearchParams({
          time:
            String(
              parsedTime
            ),
        });

      const [
        pointData,
        coastlineData,
      ] =
        await Promise.all([
          getJson(
            `/api/gplates/reconstruct?${pointParams.toString()}`
          ),

          getJson(
            `/api/gplates/coastlines?${coastParams.toString()}`
          ),
        ]);

      const pointResponse =
        pointData as ReconstructionResponse;

      const coastlineResponse =
        coastlineData as CoastlineResponse;

      const extracted =
        extractPoint(
          pointResponse.point
        );

      if (!extracted) {
        throw new Error(
          "O GPlates não retornou uma paleoposição utilizável para esta localidade e idade."
        );
      }

      setReconstruction(
        pointResponse
      );

      setCoastlines(
        coastlineResponse
      );

      setPaleoPoint(
        extracted
      );
    } catch (err) {
      setReconstruction(
        null
      );

      setCoastlines(
        null
      );

      setPaleoPoint(
        null
      );

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
    <div className="paleoearth-explorer">
      <form
        ref={reconstructionForm}
        className="paleoearth-controls"
        onSubmit={
          reconstruct
        }
      >
        <div>
          <label
            htmlFor="paleo-lat"
          >
            Latitude atual
          </label>

          <input
            id="paleo-lat"
            type="number"
            step="any"
            value={lat}
            onChange={(
              event
            ) =>
              setLat(
                event.target
                  .value
              )
            }
          />
        </div>

        <div>
          <label
            htmlFor="paleo-lng"
          >
            Longitude atual
          </label>

          <input
            id="paleo-lng"
            type="number"
            step="any"
            value={lng}
            onChange={(
              event
            ) =>
              setLng(
                event.target
                  .value
              )
            }
          />
        </div>

        <div>
          <label
            htmlFor="paleo-time"
          >
            Idade (Ma)
          </label>

          <input
            id="paleo-time"
            type="number"
            min="0"
            max="410"
            step="0.1"
            value={time}
            onChange={(
              event
            ) =>
              setTime(
                event.target
                  .value
              )
            }
          />
        </div>

        <button
          type="submit"
          disabled={
            loading
          }
        >
          {loading
            ? "Reconstruindo..."
            : "Reconstruir Terra"}
        </button>
      </form>

      <div className="paleoearth-presets">
        <span>
          Exemplos:
        </span>

        <button
          type="button"
          onClick={() => {
            setLat("45");
            setLng("-104");
            setTime("67");
          }}
        >
          América do Norte —
          67 Ma
        </button>

        <button
          type="button"
          onClick={() => {
            setLat("-30");
            setLng("-51");
            setTime("100");
          }}
        >
          Sul do Brasil —
          100 Ma
        </button>

        <button
          type="button"
          onClick={() => {
            setLat("30");
            setLng("30");
            setTime("150");
          }}
        >
          Norte da África —
          150 Ma
        </button>
      </div>

      {error && (
        <div className="paleoearth-error">
          <strong>
            Reconstrução não
            concluída
          </strong>

          <p>{error}</p>
        </div>
      )}

      {!reconstruction &&
        !error && (
          <div className="paleoearth-placeholder">
            <span>
              PALEOEARTH
            </span>

            <h2>
              Selecione uma
              localidade e volte no
              tempo.
            </h2>

            <p>
              O GIULIA utilizará um
              modelo tectônico do
              GPlates para
              reconstruir a posição
              da localidade e as
              costas continentais
              para a idade
              escolhida.
            </p>
          </div>
        )}

      {reconstruction &&
        coastlines &&
        paleoPoint && (
          <div className="paleoearth-result">
            {(sourceTaxon ||
              sourceOccurrence) && (
              <div className="paleoearth-reconstruction-source">
                <span>
                  RECONSTRUÇÃO DE OCORRÊNCIA
                </span>

                {sourceTaxon && (
                  <strong>
                    <i>
                      {sourceTaxon}
                    </i>
                  </strong>
                )}

                {sourceOccurrence && (
                  <small>
                    PBDB #
                    {sourceOccurrence}
                  </small>
                )}
              </div>
            )}

            <header className="paleoearth-result-header">
              <div>
                <span className="eyebrow">
                  PALEOGEOGRAPHIC
                  RECONSTRUCTION
                </span>

                <h2>
                  {reconstruction
                    .input.time.toLocaleString(
                      "pt-BR"
                    )}{" "}
                  Ma
                </h2>

                <p>
                  Reconstrução da
                  localidade usando
                  o modelo{" "}
                  <strong>
                    {
                      reconstruction.model
                    }
                  </strong>
                  .
                </p>
              </div>

              <div className="paleoearth-model">
                <span>
                  MODEL
                </span>

                <strong>
                  {
                    reconstruction.model
                  }
                </strong>
              </div>
            </header>

            <div className="paleoearth-comparison">
              <article>
                <span>
                  PRESENT-DAY
                  LOCALITY
                </span>

                <strong>
                  {
                    reconstruction
                      .input.lat
                  }
                  °,{" "}
                  {
                    reconstruction
                      .input.lng
                  }
                  °
                </strong>

                <small>
                  Coordenada atual
                  fornecida ao modelo
                </small>
              </article>

              <div className="paleoearth-arrow">
                →
              </div>

              <article>
                <span>
                  PALEOPOSITION
                </span>

                <strong>
                  {paleoPoint.lat.toFixed(
                    3
                  )}
                  °,{" "}
                  {paleoPoint.lng.toFixed(
                    3
                  )}
                  °
                </strong>

                <small>
                  Coordenada
                  reconstruída em{" "}
                  {
                    reconstruction
                      .input.time
                  }{" "}
                  Ma
                </small>
              </article>
            </div>

            <PaleoMap
              coastlines={
                coastlines.coastlines
              }
              paleoPoint={
                paleoPoint
              }
              time={
                reconstruction
                  .input.time
              }
            />

            <div className="paleoearth-method-note">
              <span>
                INTERPRETAÇÃO
              </span>

              <p>
                A paleoposição não é
                simplesmente uma
                coordenada histórica
                armazenada. Ela é uma
                reconstrução
                produzida a partir de
                um modelo de
                movimentos tectônicos.
                Resultados podem
                variar entre modelos
                de reconstrução.
              </p>
            </div>
          </div>
        )}
    </div>
  );
}