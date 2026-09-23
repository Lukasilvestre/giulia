export interface TaxonomicEntry {
  rank: string;
  name: string;
}

export interface OrganismReference {
  institution: string;
  title: string;
  url: string;
}

export interface Organism {
  id: string;
  slug: string;

  scientificName: string;
  displayName: string;

  rank: "species" | "genus" | "family" | "group";

  group: string;

  temporalRange: {
    startMa: number;
    endMa: number;
    label: string;
  };

  diet?: string;
  locomotion?: string;

  length?: string;
  mass?: string;

  distribution: string[];
  environment: string[];

  description: string;

  classification: TaxonomicEntry[];

  highlights: string[];

  evidenceNotes?: string[];

  parentInterval: {
    name: string;
    slug: string;
  };

  references: OrganismReference[];
}
