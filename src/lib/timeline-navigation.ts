import type {
  GeologicalInterval,
} from "@/types/geological";

export function findTimelinePath(
  intervals: GeologicalInterval[],
  slug: string
): GeologicalInterval[] | null {
  for (
    const interval
    of intervals
  ) {
    if (
      interval.slug === slug
    ) {
      return [
        interval,
      ];
    }

    if (
      interval.children?.length
    ) {
      const childPath =
        findTimelinePath(
          interval.children,
          slug
        );

      if (
        childPath
      ) {
        return [
          interval,
          ...childPath,
        ];
      }
    }
  }

  return null;
}

export function formatIntervalAge(
  startMa: number,
  endMa: number
) {
  const start =
    startMa.toLocaleString(
      "pt-BR",
      {
        maximumFractionDigits:
          3,
      }
    );

  const end =
    endMa === 0
      ? "presente"
      : `${endMa.toLocaleString(
          "pt-BR",
          {
            maximumFractionDigits:
              3,
          }
        )} Ma`;

  return `${start} Ma – ${end}`;
}

export function intervalMidpoint(
  startMa: number,
  endMa: number
) {
  return (
    Math.round(
      (
        (
          startMa +
          endMa
        ) /
        2
      ) *
        100
    ) /
    100
  );
}

export function intervalDuration(
  startMa: number,
  endMa: number
) {
  return Math.abs(
    startMa -
      endMa
  );
}