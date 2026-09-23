export interface ScientificFact {
  label: string;
  value: string;
  detail?: string;
}

export interface ScientificSection {
  title: string;
  introduction: string;
  paragraphs: string[];
  highlights?: string[];
  sources?: string[];
}

export interface LifeEntry {
  name: string;
  subtitle?: string;
  description: string;
  tags?: string[];
}

export interface GeologicalEventEntry {
  age: string;
  title: string;
  type: "evolution" | "geology" | "climate" | "extinction";
  description: string;
}

export interface FossilEntry {
  name: string;
  group: string;
  interval: string;
  description: string;
}

export interface ScientificReference {
  id: string;
  institution: string;
  title: string;
  role: string;
}

export interface IntervalScientificContent {
  slug: string;

  tagline: string;
  summary: string;

  facts: ScientificFact[];

  earth: ScientificSection;
  climate: ScientificSection;

  fauna: LifeEntry[];
  flora: LifeEntry[];

  events: GeologicalEventEntry[];

  fossils: FossilEntry[];

  references: ScientificReference[];
}