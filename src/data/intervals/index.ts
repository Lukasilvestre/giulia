import type {
  IntervalScientificContent,
} from "@/types/interval-content";

import cretaceousContent from "./cretaceous";

import {
  cretaceousStratigraphy,
} from "./cretaceous-stratigraphy";

import {
  scientificReferenceUrls,
} from "@/data/reference-links";

function addReferenceUrls(
  content: IntervalScientificContent
): IntervalScientificContent {
  return {
    ...content,

    references: content.references.map(
      (reference) => ({
        ...reference,

        url:
          scientificReferenceUrls[
            reference.id
          ],
      })
    ),
  };
}

const intervalContents: Record<
  string,
  IntervalScientificContent
> = {
  cretaceous: addReferenceUrls({
    ...cretaceousContent,

    stratigraphy:
      cretaceousStratigraphy,
  }),
};

export function getIntervalContent(
  slug: string
): IntervalScientificContent | undefined {
  return intervalContents[slug];
}
