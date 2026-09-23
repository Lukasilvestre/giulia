import type {
  GPlatesReconstructionResult,
} from "@/types/gplates";

const GPLATES_API =
  "https://gws.gplates.org";

export const GPLATES_MODEL =
  "ZAHIROVIC2022";

interface ReconstructionOptions {
  lat: number;
  lng: number;
  time: number;
}

function validateTime(
  time: number
) {
  if (
    !Number.isFinite(time) ||
    time < 0 ||
    time > 410
  ) {
    throw new Error(
      "O modelo ZAHIROVIC2022 suporta reconstruções entre 0 e 410 Ma."
    );
  }
}

export async function reconstructPoint({
  lat,
  lng,
  time,
}: ReconstructionOptions): Promise<GPlatesReconstructionResult> {
  if (
    !Number.isFinite(lat) ||
    lat < -90 ||
    lat > 90
  ) {
    throw new Error(
      "Latitude inválida."
    );
  }

  if (
    !Number.isFinite(lng) ||
    lng < -180 ||
    lng > 180
  ) {
    throw new Error(
      "Longitude inválida."
    );
  }

  validateTime(time);

  const params =
    new URLSearchParams({
      lats: String(lat),
      lons: String(lng),
      time: String(time),
      model: GPLATES_MODEL,
    });

  const requestUrl =
    `${GPLATES_API}/reconstruct/reconstruct_points/?${params.toString()}&fc`;

  const response =
    await fetch(
      requestUrl,
      {
        headers: {
          Accept:
            "application/json",
        },

        cache: "no-store",
      }
    );

  const raw =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `GPlates HTTP ${response.status}: ${raw.slice(
        0,
        300
      )}`
    );
  }

  let point: unknown;

  try {
    point =
      JSON.parse(raw);
  } catch {
    throw new Error(
      "O GPlates Web Service retornou uma resposta que não é JSON válido."
    );
  }

  return {
    input: {
      lat,
      lng,
      time,
    },

    model:
      GPLATES_MODEL,

    point,

    source: {
      service:
        "GPlates Web Service",

      endpoint:
        "reconstruct_points",

      model:
        GPLATES_MODEL,

      retrievedAt:
        new Date().toISOString(),
    },
  };
}

export async function reconstructCoastlines(
  time: number
): Promise<unknown> {
  validateTime(time);

  const params =
    new URLSearchParams({
      time: String(time),
      model: GPLATES_MODEL,
      wrap: "true",
    });

  const requestUrl =
    `${GPLATES_API}/reconstruct/coastlines/?${params.toString()}`;

  const response =
    await fetch(
      requestUrl,
      {
        headers: {
          Accept:
            "application/json",
        },

        cache: "no-store",
      }
    );

  const raw =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `GPlates coastlines HTTP ${response.status}: ${raw.slice(
        0,
        300
      )}`
    );
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(
      "O GPlates retornou costas paleogeográficas em formato inválido."
    );
  }
}