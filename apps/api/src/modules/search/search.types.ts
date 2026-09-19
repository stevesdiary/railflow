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
  from: { code: string; name: string; city: string };
  to: { code: string; name: string; city: string };
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stopCount: number;
  classes: PublicSearchClass[];
  availability: {
    availableSeats: number;
    capacity: number;
    status: 'AVAILABLE' | 'LIMITED' | 'SOLD_OUT';
  };
}

export interface PublicSearchResult {
  from: { code: string; name: string; city: string };
  to: { code: string; name: string; city: string };
  date: string;
  journeys: PublicSearchJourney[];
}

export interface SearchJourneyRow {
  journeyId: string;
  journeyDate: Date;
  train: {
    id: string;
    number: string;
    name: string;
    type: string;
  };
  stops: Array<{
    sequence: number;
    arrivalTime: string | null;
    departureTime: string | null;
    dayOffset: number;
    station: { code: string; name: string; city: string };
  }>;
  classes: Array<{
    code: string;
    name: string;
    capacity: number;
    availableSeats: number;
  }>;
  fares: Array<{ classCode: string; amount: number; currency: string }>;
}

export interface SearchRepository {
  searchJourneys(fromCode: string, toCode: string, date: Date): Promise<SearchJourneyRow[]>;
}

export interface SearchCache {
  get(key: string): Promise<PublicSearchResult | null>;
  set(key: string, value: PublicSearchResult, ttlSeconds: number): Promise<void>;
}
