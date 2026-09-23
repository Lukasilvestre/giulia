import type {
  IntervalScientificContent,
} from "@/types/interval-content";

import {
  geologicalTimescale,
} from "@/data/geological-timescale";

import {
  findTimelinePath,
} from "@/lib/timeline-navigation";

import {
  cretaceousContent,
} from "./cretaceous";

import {
  buildGenericIntervalContent,
} from "./generic";

export {
  cretaceousContent,
};

export const intervalContents:
  Record<
    string,
    IntervalScientificContent
  > = {
    cretaceous:
      cretaceousContent,
  };

export function getIntervalContent(
  slug: string
):
  | IntervalScientificContent
  | undefined {
  const curated =
    intervalContents[
      slug
    ];

  if (curated) {
    return curated;
  }

  const path =
    findTimelinePath(
      geologicalTimescale,
      slug
    );

  if (
    !path ||
    path.length === 0
  ) {
    return undefined;
  }

  const interval =
    path[
      path.length -
        1
    ];

  return buildGenericIntervalContent(
    interval,
    path
  );
}