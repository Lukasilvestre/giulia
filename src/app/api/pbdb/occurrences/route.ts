import { NextResponse } from "next/server";

import { searchPbdbOccurrences } from "@/lib/pbdb";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const taxon = searchParams.get("taxon")?.trim();
  const interval = searchParams.get("interval")?.trim();

  const limitParam = searchParams.get("limit");
  const parsedLimit = Number(limitParam ?? "50");

  if (!taxon || taxon.length < 2) {
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

  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(Math.floor(parsedLimit), 1), 100)
    : 50;

  try {
    const result = await searchPbdbOccurrences({
      taxon,
      interval: interval || undefined,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao consultar PBDB:", error);

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