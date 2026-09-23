import type {
  PbdbOccurrence,
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

interface SearchOptions {
  taxon: string;
  interval?: string;
  limit?: number;
}

export async function searchPbdbOccurrences({
  taxon,
  interval,
  limit = 50,
}: SearchOptions): Promise<PbdbSearchResult> {
  const safeLimit = Math.min(
    Math.max(limit, 1),
    100
  );

  const params =
    new URLSearchParams();

  params.set(
    "base_name",
    taxon
  );

  /*
   * IMPORTANTE:
   * vocab=pbdb faz a API retornar
   * nomes completos de campos:
   *
   * occurrence_no
   * accepted_name
   * early_interval
   * formation
   * lat
   * lng
   * etc.
   */
  params.set(
    "vocab",
    "pbdb"
  );

  params.set(
    "show",
    "coords,loc,strat,env,ref,ident"
  );

  params.set(
    "limit",
    String(safeLimit)
  );

  if (interval) {
    params.set(
      "interval",
      interval
    );
  }

  const requestUrl =
    `${PBDB_API}/occs/list.json?${params.toString()}`;

  console.log(
    "PBDB request:",
    requestUrl
  );

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
      `PBDB HTTP ${response.status}: ${raw.slice(
        0,
        300
      )}`
    );
  }

  let data: RawPbdbResponse;

  try {
    data =
      JSON.parse(
        raw
      ) as RawPbdbResponse;
  } catch {
    throw new Error(
      "A PBDB retornou uma resposta que não é JSON válido."
    );
  }

  if (
    data.errors &&
    data.errors.length > 0
  ) {
    throw new Error(
      `PBDB: ${data.errors.join(
        " | "
      )}`
    );
  }

  const records =
    Array.isArray(data.records)
      ? data.records
      : [];

  return {
    query: {
      taxon,
      interval,
      limit: safeLimit,
    },

    count: records.length,

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