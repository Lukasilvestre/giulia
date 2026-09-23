import type { Organism } from "@/types/organism";

import tyrannosaurusRex from "./tyrannosaurus-rex";
import triceratops from "./triceratops";

export const organisms: Organism[] = [
  tyrannosaurusRex,
  triceratops,
];

export function getOrganismBySlug(
  slug: string
): Organism | undefined {
  return organisms.find(
    (organism) =>
      organism.slug === slug
  );
}
