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

  organismSlug?: string;
}

export interface GeologicalEventEntry {
  age: string;
  title: string;
  type:
    | "evolution"
    | "geology"
    | "climate"
    | "extinction";
  description: string;
}

export interface FossilEntry {
  name: string;
  group: string;
  interval: string;
  description: string;

  organismSlug?: string;
}

export interface StratigraphicStage {
  name: string;
  namePt: string;

  startMa: number;
  endMa: number;
}

export interface StratigraphicDivision {
  id: string;

  name: string;
  namePt: string;

  chronostratigraphicName: string;

  startMa: number;
  endMa: number;

  stages: StratigraphicStage[];
}

export interface ScientificReference {
  id: string;
  institution: string;
  title: string;
  role: string;

  url?: string;
}

export interface IntervalScientificContent {
  slug: string;

  tagline: string;
  summary: string;

  facts: ScientificFact[];

  stratigraphy?: StratigraphicDivision[];

  earth: ScientificSection;
  climate: ScientificSection;

  fauna: LifeEntry[];
  flora: LifeEntry[];

  events: GeologicalEventEntry[];

  fossils: FossilEntry[];

  references: ScientificReference[];
}
