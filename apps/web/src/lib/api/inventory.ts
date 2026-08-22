import { apiFetch } from './client';

export type PublicSeatStatus = 'AVAILABLE' | 'HELD' | 'BOOKED' | 'CANCELLED' | 'MAINTENANCE';

export interface PublicSeatMapSeat {
  id: string;
  seatNumber: string;
  seatType: string;
  position: number | null;
  status: PublicSeatStatus;
}

export interface PublicCoachSeatMap {
  id: string;
  coachNumber: string;
  capacity: number;
  class: { code: string; name: string };
  seats: PublicSeatMapSeat[];
}

export interface PublicSeatMap {
  journeyId: string;
  train: {
    id: string;
    number: string;
    name: string;
    type: string;
  };
  coaches: PublicCoachSeatMap[];
}

export interface PublicHeldSeat {
  id: string;
  journeyId: string;
  seat: { seatNumber: string; seatType: string };
  coach: { coachNumber: string };
  class: { code: string; name: string };
  expiresAt: string | null;
}

export interface HoldSeatsResult {
  heldSeats: PublicHeldSeat[];
  expiresAt: string;
}

export interface InventoryApi {
  getSeatMap(journeyId: string): Promise<PublicSeatMap>;
  holdSeats(
    input: { journeyId: string; classCode: string; count: number; preferredSeatNumbers?: string[] },
    accessToken: string,
  ): Promise<HoldSeatsResult>;
  releaseHolds(holdIds: string[], accessToken: string): Promise<{ released: number }>;
}

function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

export function createInventoryApi(basePath = '/api'): InventoryApi {
  return {
    async getSeatMap(journeyId) {
      return apiFetch<PublicSeatMap>(
        `${basePath}/journeys/${encodeURIComponent(journeyId)}/seats`,
        { method: 'GET' },
      );
    },

    async holdSeats(input, accessToken) {
      return apiFetch<HoldSeatsResult>(`${basePath}/inventory/holds`, {
        method: 'POST',
        headers: authHeaders(accessToken),
        body: JSON.stringify(input),
      });
    },

    async releaseHolds(holdIds, accessToken) {
      return apiFetch<{ released: number }>(`${basePath}/inventory/holds/release`, {
        method: 'POST',
        headers: authHeaders(accessToken),
        body: JSON.stringify({ holdIds }),
      });
    },
  };
}
