export type StudyItemType =
  | "organism"
  | "occurrence";

export interface StudyItemMetadata {
  group?: string;

  temporalRange?: string;

  age?: string;

  formation?: string;

  environment?: string;

  location?: string;

  coordinates?: string;

  pbdbOccurrence?: string;

  reconstructionAge?: number;
}

export interface StudyItem {
  id: string;

  type: StudyItemType;

  title: string;

  subtitle?: string;

  href: string;

  savedAt: string;

  note?: string;

  metadata: StudyItemMetadata;
}

export type NewStudyItem =
  Omit<
    StudyItem,
    "savedAt" | "note"
  >;