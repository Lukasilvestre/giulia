import {
  NextResponse,
} from "next/server";

import {
  getPbdbOccurrence,
} from "@/lib/pbdb";

export const dynamic =
  "force-dynamic";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  {
    params,
  }: RouteProps
) {
  const {
    id,
  } =
    await params;

  try {
    const result =
      await getPbdbOccurrence(
        id
      );

    return NextResponse.json(
      result
    );
  } catch (error) {
    console.error(
      "PBDB occurrence error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível recuperar a ocorrência.",
      },
      {
        status: 502,
      }
    );
  }
}