export interface PbdbOccurrence {
  occurrence_no: string | number;

  collection_no?: string | number;

  identified_name?: string;
  identified_rank?: string;

  accepted_name?: string;
  accepted_rank?: string;

  early_interval?: string;
  late_interval?: string;

  max_ma?: number | string;
  min_ma?: number | string;

  lng?: number | string;
  lat?: number | string;

  cc?: string;
  state?: string;

  formation?: string;
  stratgroup?: string;
  member?: string;

  environment?: string;

  reference_no?: string | number;

  ref_author?: string;
  ref_pubyr?: string | number;
}

export interface PbdbSearchResult {
  query: {
    taxon: string;
    interval?: string;
    limit: number;
  };

  count: number;

  records: PbdbOccurrence[];

  source: {
    database: string;
    api: string;
    requestUrl: string;
    retrievedAt: string;
  };
}