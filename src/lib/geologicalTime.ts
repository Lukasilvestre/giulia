import type { GeologicalInterval } from "@/types/geological";
import { geologicalTimescale } from "@/data/geological-timescale";

export function findIntervalBySlug(
  slug: string,
  intervals: GeologicalInterval[] = geologicalTimescale
): GeologicalInterval | undefined {
  for (const interval of intervals) {
    if (interval.slug === slug) {
      return interval;
    }

    if (interval.children) {
      const result = findIntervalBySlug(
        slug,
        interval.children
      );

      if (result) {
        return result;
      }
    }
  }

  return undefined;
}

export function findIntervalPath(
  slug: string,
  intervals: GeologicalInterval[] = geologicalTimescale,
  path: GeologicalInterval[] = []
): GeologicalInterval[] | undefined {
  for (const interval of intervals) {
    const currentPath = [...path, interval];

    if (interval.slug === slug) {
      return currentPath;
    }

    if (interval.children) {
      const result = findIntervalPath(
        slug,
        interval.children,
        currentPath
      );

      if (result) {
        return result;
      }
    }
  }

  return undefined;
}
