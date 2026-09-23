import type {
  PbdbOccurrence,
} from "@/types/pbdb";

export function getOccurrenceName(
  occurrence: PbdbOccurrence
): string {
  return (
    occurrence.accepted_name ??
    occurrence.identified_name ??
    "Táxon não informado"
  );
}

export function getOccurrenceAgeLabel(
  occurrence: PbdbOccurrence
): string {
  const max =
    occurrence.max_ma !== undefined
      ? Number(occurrence.max_ma)
      : null;

  const min =
    occurrence.min_ma !== undefined
      ? Number(occurrence.min_ma)
      : null;

  if (
    max !== null &&
    min !== null &&
    Number.isFinite(max) &&
    Number.isFinite(min)
  ) {
    return `${max.toLocaleString(
      "pt-BR"
    )} – ${min.toLocaleString(
      "pt-BR"
    )} Ma`;
  }

  const early =
    occurrence.early_interval;

  const late =
    occurrence.late_interval;

  if (
    early &&
    late &&
    early !== late
  ) {
    return `${early} – ${late}`;
  }

  return (
    early ??
    late ??
    "Idade não informada"
  );
}

export function getOccurrenceReconstructionAge(
  occurrence: PbdbOccurrence
): number | null {
  const max =
    Number(
      occurrence.max_ma
    );

  const min =
    Number(
      occurrence.min_ma
    );

  if (
    Number.isFinite(max) &&
    Number.isFinite(min)
  ) {
    return (
      Math.round(
        ((max + min) / 2) *
          100
      ) / 100
    );
  }

  if (
    Number.isFinite(max)
  ) {
    return max;
  }

  if (
    Number.isFinite(min)
  ) {
    return min;
  }

  return null;
}

export function getOccurrenceCoordinates(
  occurrence: PbdbOccurrence
): {
  lat: number;
  lng: number;
} | null {
  const lat =
    Number(
      occurrence.lat
    );

  const lng =
    Number(
      occurrence.lng
    );

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return null;
  }

  return {
    lat,
    lng,
  };
}

export function buildPaleoEarthUrl(
  occurrence: PbdbOccurrence
): string | null {
  const coordinates =
    getOccurrenceCoordinates(
      occurrence
    );

  const time =
    getOccurrenceReconstructionAge(
      occurrence
    );

  if (
    !coordinates ||
    time === null
  ) {
    return null;
  }

  const params =
    new URLSearchParams({
      lat:
        String(
          coordinates.lat
        ),

      lng:
        String(
          coordinates.lng
        ),

      time:
        String(time),

      taxon:
        getOccurrenceName(
          occurrence
        ),

      occurrence:
        String(
          occurrence.occurrence_no
        ),
    });

  if (
    occurrence.formation
  ) {
    params.set(
      "formation",
      occurrence.formation
    );
  }

  return `/paleoearth?${params.toString()}`;
}