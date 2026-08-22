import { apiFetch } from './client';

export interface PublicStation {
  id: string;
  code: string;
  name: string;
  city: string;
  state: string | null;
  latitude: string | null;
  longitude: string | null;
}

export interface PublicStationRef {
  code: string;
  name: string;
  city: string;
}

export interface PublicSearchClass {
  code: string;
  name: string;
  fare: number;
  currency: string;
  availableSeats: number;
  capacity: number;
}

export interface PublicSearchJourney {
  journeyId: string;
  train: {
    id: string;
    number: string;
    name: string;
    type: string;
  };
  from: PublicStationRef;
  to: PublicStationRef;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stopCount: number;
  classes: PublicSearchClass[];
}

export interface PublicSearchResult {
  from: PublicStationRef;
  to: PublicStationRef;
  date: string;
  journeys: PublicSearchJourney[];
}

export interface SearchApi {
  listStations(query?: string): Promise<PublicStation[]>;
  searchJourneys(from: string, to: string, date: string): Promise<PublicSearchResult>;
}

export function createSearchApi(basePath = '/api'): SearchApi {
  return {
    async listStations(query) {
      const params = query ? `?query=${encodeURIComponent(query)}` : '';
      const body = await apiFetch<{ stations: PublicStation[] }>(`${basePath}/stations${params}`, {
        method: 'GET',
      });
      return body.stations;
    },

    async searchJourneys(from, to, date) {
      const params = new URLSearchParams({ from, to, date });
      return apiFetch<PublicSearchResult>(`${basePath}/search?${params.toString()}`, {
        method: 'GET',
      });
    },
  };
}
