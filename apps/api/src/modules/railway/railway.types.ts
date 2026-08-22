export interface PublicStation {
  id: string;
  code: string;
  name: string;
  city: string;
  state: string | null;
  latitude: string | null;
  longitude: string | null;
}

export interface PublicTrainStop {
  id: string;
  sequence: number;
  arrivalTime: string | null;
  departureTime: string | null;
  dayOffset: number;
  station: {
    code: string;
    name: string;
    city: string;
  };
}

export interface PublicCoach {
  id: string;
  coachNumber: string;
  capacity: number;
  class: {
    code: string;
    name: string;
  };
}

export interface PublicTrainSummary {
  id: string;
  number: string;
  name: string;
  type: string;
  status: string;
  stopCount: number;
  origin: { code: string; name: string } | null;
  destination: { code: string; name: string } | null;
}

export interface PublicTrain {
  id: string;
  number: string;
  name: string;
  type: string;
  status: string;
  stops: PublicTrainStop[];
  coaches: PublicCoach[];
}

export interface PublicClass {
  id: string;
  code: string;
  name: string;
  description: string | null;
}

export interface PublicQuota {
  id: string;
  code: string;
  name: string;
  description: string | null;
  priority: number;
}

export interface PublicFare {
  id: string;
  from: { code: string; name: string; city: string };
  to: { code: string; name: string; city: string };
  class: { code: string; name: string };
  amount: number;
  currency: string;
}

export interface RailwayRepository {
  listStations(query?: string): Promise<PublicStation[]>;
  getStationByCode(code: string): Promise<PublicStation | null>;
  listTrains(): Promise<PublicTrainSummary[]>;
  getTrainByNumber(number: string): Promise<PublicTrain | null>;
  listClasses(): Promise<PublicClass[]>;
  listQuotas(): Promise<PublicQuota[]>;
  listFares(fromCode?: string, toCode?: string, classCode?: string): Promise<PublicFare[]>;
}
