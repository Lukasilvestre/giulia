export interface PbdbOccurrence {
  occurrence_no: string | number;

  collection_no?: string | number;

  identified_name?: string;
  identified_rank?: string;

  accepted_name?: string;
  accepted_rank?: string;

  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;

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

  ref_title?: string;
  pub_title?: string;

  doi?: string;
}

export interface PbdbSearchQuery {
  taxon: string;

  interval?: string;

  country?: string;

  region?: string;

  limit: number;

  page: number;
}

export interface PbdbSearchResult {
  query: PbdbSearchQuery;

  count: number;

  returned: number;

  page: number;

  totalPages: number | null;

  hasPrevious: boolean;

  hasNext: boolean;

  records: PbdbOccurrence[];

  source: {
    database: string;
    api: string;
    requestUrl: string;
    retrievedAt: string;
  };
}

export interface PbdbOccurrenceResult {
  record: PbdbOccurrence;

  source: {
    database: string;
    api: string;
    requestUrl: string;
    retrievedAt: string;
  };
}