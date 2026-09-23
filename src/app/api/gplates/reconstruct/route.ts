import {
  NextResponse,
} from "next/server";

import {
  reconstructPoint,
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

  const lat =
    Number(
      searchParams.get(
        "lat"
      )
    );

  const lng =
    Number(
      searchParams.get(
        "lng"
      )
    );

  const time =
    Number(
      searchParams.get(
        "time"
      )
    );

  if (
    !searchParams.has("lat") ||
    !searchParams.has("lng") ||
    !searchParams.has("time")
  ) {
    return NextResponse.json(
      {
        error:
          "Informe lat, lng e time.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const result =
      await reconstructPoint({
        lat,
        lng,
        time,
      });

    return NextResponse.json(
      result
    );
  } catch (error) {
    console.error(
      "GPlates reconstruction error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro ao executar reconstrução paleogeográfica.",
      },
      {
        status: 502,
      }
    );
  }
}