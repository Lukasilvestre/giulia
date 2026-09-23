export type GeologicalRank =
  | "eon"
  | "era"
  | "period"
  | "epoch"
  | "age";

export interface GeologicalInterval {
  id: string;
  name: string;
  namePt: string;
  slug: string;
  rank: GeologicalRank;
  startMa: number;
  endMa: number;
  description: string;
  color: string;
  children?: GeologicalInterval[];
}
