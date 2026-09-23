import type {
  PbdbOccurrence,
  PbdbOccurrenceResult,
  PbdbSearchResult,
} from "@/types/pbdb";

const PBDB_API =
  "https://paleobiodb.org/data1.2";

interface RawPbdbResponse {
  records?: PbdbOccurrence[];

  records_found?: number;

  records_returned?: number;

  warnings?: string[];

  errors?: string[];
}

interface SearchBounds {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

interface SearchOptions {
  taxon: string;

  interval?: string;

  country?: string;

  region?: string;

  bounds?: SearchBounds;

  limit?: number;

  page?: number;
}

function parsePbdbJson(
  raw: string
): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(
      "A Paleobiology Database retornou uma resposta que não é JSON válido."
    );
  }
}

function getPbdbErrors(
  data: unknown
): string[] {
  if (
    typeof data !== "object" ||
    data === null
  ) {
    return [];
  }

  const errors =
    (data as {
      errors?: unknown;
    }).errors;

  if (!Array.isArray(errors)) {
    return [];
  }

  return errors.filter(
    (
      item
    ): item is string =>
      typeof item === "string"
  );
}

export async function searchPbdbOccurrences({
  taxon,
  interval,
  country,
  region,
  bounds,
  limit = 50,
  page = 1,
}: SearchOptions): Promise<PbdbSearchResult> {
  const safeLimit =
    Math.min(
      Math.max(
        Math.floor(limit),
        10
      ),
      100
    );

  const safePage =
    Math.max(
      Math.floor(page),
      1
    );

  const offset =
    (safePage - 1) *
    safeLimit;

  const params =
    new URLSearchParams();

  params.set(
    "base_name",
    taxon
  );

  params.set(
    "vocab",
    "pbdb"
  );

  params.set(
    "show",
    [
      "coords",
      "loc",
      "strat",
      "env",
      "ref",
      "ident",
      "class",
    ].join(",")
  );

  params.set(
    "limit",
    String(safeLimit)
  );

  params.set(
    "offset",
    String(offset)
  );

  if (interval) {
    params.set(
      "interval",
      interval
    );
  }

  if (country) {
    params.set(
      "cc",
      country
    );
  }

  if (bounds) {
    params.set(
      "latmin",
      String(bounds.latMin)
    );

    params.set(
      "latmax",
      String(bounds.latMax)
    );

    params.set(
      "lngmin",
      String(bounds.lngMin)
    );

    params.set(
      "lngmax",
      String(bounds.lngMax)
    );
  }

  const requestUrl =
    `${PBDB_API}/occs/list.json?${params.toString()}`;

  const response =
    await fetch(
      requestUrl,
      {
        headers: {
          Accept:
            "application/json",
        },

        cache:
          "no-store",
      }
    );

  const raw =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `PBDB HTTP ${response.status}: ${raw.slice(
        0,
        300
      )}`
    );
  }

  const parsed =
    parsePbdbJson(raw);

  const errors =
    getPbdbErrors(
      parsed
    );

  if (errors.length > 0) {
    throw new Error(
      `PBDB: ${errors.join(
        " | "
      )}`
    );
  }

  const data =
    parsed as RawPbdbResponse;

  const records =
    Array.isArray(
      data.records
    )
      ? data.records
      : [];

  const count =
    typeof data.records_found ===
    "number"
      ? data.records_found
      : records.length;

  const returned =
    typeof data.records_returned ===
    "number"
      ? data.records_returned
      : records.length;

  const totalPages =
    count >= 0
      ? Math.max(
          Math.ceil(
            count /
              safeLimit
          ),
          1
        )
      : null;

  return {
    query: {
      taxon,
      interval,
      country,
      region,
      limit:
        safeLimit,
      page:
        safePage,
    },

    count,

    returned,

    page:
      safePage,

    totalPages,

    hasPrevious:
      safePage > 1,

    hasNext:
      totalPages !== null
        ? safePage <
          totalPages
        : records.length ===
          safeLimit,

    records,

    source: {
      database:
        "Paleobiology Database",

      api:
        "PBDB Data Service 1.2",

      requestUrl,

      retrievedAt:
        new Date().toISOString(),
    },
  };
}

export async function getPbdbOccurrence(
  id: string | number
): Promise<PbdbOccurrenceResult> {
  const cleanId =
    String(id).replace(
      /^occ:/i,
      ""
    );

  if (
    !/^\d+$/.test(
      cleanId
    )
  ) {
    throw new Error(
      "Identificador de ocorrência inválido."
    );
  }

  const params =
    new URLSearchParams();

  params.set(
    "id",
    `occ:${cleanId}`
  );

  params.set(
    "vocab",
    "pbdb"
  );

  params.set(
    "show",
    "full"
  );

  const requestUrl =
    `${PBDB_API}/occs/single.json?${params.toString()}`;

  const response =
    await fetch(
      requestUrl,
      {
        headers: {
          Accept:
            "application/json",
        },

        cache:
          "no-store",
      }
    );

  const raw =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `PBDB HTTP ${response.status}: ${raw.slice(
        0,
        300
      )}`
    );
  }

  const parsed =
    parsePbdbJson(raw);

  const errors =
    getPbdbErrors(
      parsed
    );

  if (errors.length > 0) {
    throw new Error(
      `PBDB: ${errors.join(
        " | "
      )}`
    );
  }

  let record:
    | PbdbOccurrence
    | undefined;

  if (
    typeof parsed ===
      "object" &&
    parsed !== null
  ) {
    const data =
      parsed as {
        records?: unknown;
        record?: unknown;
        occurrence_no?: unknown;
      };

    if (
      Array.isArray(
        data.records
      )
    ) {
      record =
        data.records[0] as
          | PbdbOccurrence
          | undefined;
    } else if (
      data.record &&
      typeof data.record ===
        "object"
    ) {
      record =
        data.record as
          PbdbOccurrence;
    } else if (
      data.occurrence_no !==
      undefined
    ) {
      record =
        parsed as
          PbdbOccurrence;
    }
  }

  if (!record) {
    throw new Error(
      "A ocorrência não foi encontrada na PBDB."
    );
  }

  return {
    record,

    source: {
      database:
        "Paleobiology Database",

      api:
        "PBDB Data Service 1.2",

      requestUrl,

      retrievedAt:
        new Date().toISOString(),
    },
  };
}