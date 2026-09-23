import {
  geologicalTimescale,
} from "@/data/geological-timescale";

import {
  organisms,
} from "@/data/organisms";

import type {
  GeologicalInterval,
} from "@/types/geological";

export interface GiuliaSearchResult {
  type:
    | "interval"
    | "organism";

  title: string;

  subtitle: string;

  href: string;
}

function normalize(
  value: string
) {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase();
}

function flattenIntervals(
  intervals:
    GeologicalInterval[]
): GeologicalInterval[] {
  return intervals.flatMap(
    (
      interval
    ) => [
      interval,

      ...(interval.children
        ? flattenIntervals(
            interval.children
          )
        : []),
    ]
  );
}

export function searchGiulia(
  query: string
): GiuliaSearchResult[] {
  const q =
    normalize(
      query.trim()
    );

  if (
    q.length < 2
  ) {
    return [];
  }

  const intervals =
    flattenIntervals(
      geologicalTimescale
    )
      .filter(
        (
          interval
        ) =>
          normalize(
            interval.name
          ).includes(q) ||
          normalize(
            interval.namePt
          ).includes(q) ||
          normalize(
            interval.description
          ).includes(q)
      )
      .map(
        (
          interval
        ): GiuliaSearchResult => ({
          type:
            "interval",

          title:
            interval.namePt,

          subtitle:
            `${interval.rank} · ${interval.startMa}–${interval.endMa} Ma`,

          href:
            `/interval/${interval.slug}`,
        })
      );

  const life =
    organisms
      .filter(
        (
          organism
        ) =>
          normalize(
            organism.scientificName
          ).includes(q) ||
          normalize(
            organism.displayName
          ).includes(q) ||
          normalize(
            organism.group
          ).includes(q) ||
          normalize(
            organism.description
          ).includes(q)
      )
      .map(
        (
          organism
        ): GiuliaSearchResult => ({
          type:
            "organism",

          title:
            organism.scientificName,

          subtitle:
            `${organism.group} · ${organism.temporalRange.label}`,

          href:
            `/organisms/${organism.slug}`,
        })
      );

  return [
    ...intervals,
    ...life,
  ].slice(
    0,
    30
  );
}