import {
  NextResponse,
} from "next/server";

import {
  searchPbdbOccurrences,
} from "@/lib/pbdb";

export const dynamic =
  "force-dynamic";

const RS_BOUNDS = {
  latMin: -33.8,
  latMax: -27.0,

  lngMin: -57.7,
  lngMax: -49.6,
};

export async function GET(
  request: Request
) {
  const {
    searchParams,
  } = new URL(
    request.url
  );

  const taxon =
    searchParams
      .get("taxon")
      ?.trim();

  const interval =
    searchParams
      .get("interval")
      ?.trim();

  const country =
    searchParams
      .get("country")
      ?.trim()
      .toUpperCase();

  const region =
    searchParams
      .get("region")
      ?.trim()
      .toLowerCase();

  const limit =
    Number(
      searchParams.get(
        "limit"
      ) ?? "50"
    );

  const page =
    Number(
      searchParams.get(
        "page"
      ) ?? "1"
    );

  if (
    !taxon ||
    taxon.length < 2
  ) {
    return NextResponse.json(
      {
        error:
          "Informe um táxon com pelo menos dois caracteres.",
      },
      {
        status: 400,
      }
    );
  }

  const safeLimit =
    Number.isFinite(limit)
      ? Math.min(
          Math.max(
            Math.floor(
              limit
            ),
            10
          ),
          100
        )
      : 50;

  const safePage =
    Number.isFinite(page)
      ? Math.max(
          Math.floor(
            page
          ),
          1
        )
      : 1;

  try {
    const result =
      await searchPbdbOccurrences({
        taxon,

        interval:
          interval ||
          undefined,

        country:
          region === "rs"
            ? "BR"
            : country ||
              undefined,

        region:
          region ||
          undefined,

        bounds:
          region === "rs"
            ? RS_BOUNDS
            : undefined,

        limit:
          safeLimit,

        page:
          safePage,
      });

    return NextResponse.json(
      result
    );
  } catch (error) {
    console.error(
      "Erro ao consultar PBDB:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível consultar a Paleobiology Database.",
      },
      {
        status: 502,
      }
    );
  }
}