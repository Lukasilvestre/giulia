import type { IntervalScientificContent } from "@/types/interval-content";

import cretaceousContent from "./cretaceous";

const intervalContents: Record<string, IntervalScientificContent> = {
  cretaceous: cretaceousContent,
};

export function getIntervalContent(
  slug: string
): IntervalScientificContent | undefined {
  return intervalContents[slug];
}