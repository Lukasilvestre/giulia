import {
  NextResponse,
} from "next/server";

import {
  GPLATES_MODEL,
  reconstructCoastlines,
} from "@/lib/gplates";

export const dynamic =
  "force-dynamic";

export async function GET(
  request: Request
) {
  const {
    searchParams,
  } = new URL(
    request.url
  );

  if (
    !searchParams.has(
      "time"
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Informe time em milhões de anos.",
      },
      {
        status: 400,
      }
    );
  }

  const time =
    Number(
      searchParams.get(
        "time"
      )
    );

  try {
    const coastlines =
      await reconstructCoastlines(
        time
      );

    return NextResponse.json({
      time,

      model:
        GPLATES_MODEL,

      coastlines,

      source: {
        service:
          "GPlates Web Service",

        endpoint:
          "coastlines",

        retrievedAt:
          new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(
      "GPlates coastlines error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível reconstruir as costas.",
      },
      {
        status: 502,
      }
    );
  }
}