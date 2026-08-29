import { apiFetch } from './client';
import type {
  AuthTokens,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  VerifyEmailResponse,
} from './auth-types';

export interface AuthApi {
  register(input: RegisterInput): Promise<RegisterResponse>;
  login(input: LoginInput): Promise<LoginResponse>;
  refresh(refreshToken: string): Promise<LoginResponse>;
  logout(refreshToken: string): Promise<void>;
  me(accessToken: string): Promise<{ user: RegisterResponse['user'] }>;
  verifyEmail(token: string): Promise<VerifyEmailResponse>;
}

function authHeaders(accessToken?: string): HeadersInit {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export function createAuthApi(basePath = '/api'): AuthApi {
  return {
    async register(input) {
      return apiFetch<RegisterResponse>(`${basePath}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(input),
      });
    },

    async login(input) {
      return apiFetch<LoginResponse>(`${basePath}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(input),
      });
    },

    async refresh(refreshToken) {
      return apiFetch<LoginResponse>(`${basePath}/auth/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
    },

    async logout(refreshToken) {
      await apiFetch<void>(`${basePath}/auth/logout`, {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
    },

    async me(accessToken) {
      return apiFetch<{ user: RegisterResponse['user'] }>(`${basePath}/auth/me`, {
        method: 'GET',
        headers: authHeaders(accessToken),
      });
    },

    async verifyEmail(token) {
      return apiFetch<VerifyEmailResponse>(
        `${basePath}/auth/verify-email?token=${encodeURIComponent(token)}`,
        { method: 'GET' },
      );
    },
  };
}

export type { AuthTokens };
