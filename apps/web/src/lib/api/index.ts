export { apiFetch, ApiError, type ApiErrorDetails } from './client';
export { createAuthApi, type AuthApi } from './auth';
export { createSearchApi, type SearchApi } from './search';
export { createInventoryApi, type InventoryApi } from './inventory';
export type {
  AuthTokens,
  LoginInput,
  LoginResponse,
  PublicUser,
  RegisterInput,
  RegisterResponse,
  VerifyEmailResponse,
} from './auth-types';
export type {
  PublicSearchClass,
  PublicSearchJourney,
  PublicSearchResult,
  PublicStation,
  PublicStationRef,
} from './search';
export type {
  PublicCoachSeatMap,
  PublicHeldSeat,
  PublicSeatMap,
  PublicSeatMapSeat,
  PublicSeatStatus,
} from './inventory';
