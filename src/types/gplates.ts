export interface GPlatesReconstructionResult {
  input: {
    lat: number;
    lng: number;
    time: number;
  };

  model: string;

  point: unknown;

  source: {
    service: string;
    endpoint: string;
    model: string;
    retrievedAt: string;
  };
}