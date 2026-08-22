import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AuthApi, LoginInput, LoginResponse, RegisterInput, PublicUser } from '../api';
import { tokenStore, type StoredUser } from './token-store';

type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

export interface AuthState {
  status: AuthStatus;
  user: PublicUser | null;
  accessToken: string | null;
  login: (input: LoginInput) => Promise<LoginResponse>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

function toStoredUser(user: PublicUser): StoredUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
    emailVerified: user.emailVerified,
  };
}

export function AuthProvider({ authApi, children }: { authApi: AuthApi; children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<PublicUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const refreshToken = tokenStore.getRefreshToken();
      if (!refreshToken) {
        if (!cancelled) setStatus('anonymous');
        return;
      }

      try {
        const result = await authApi.refresh(refreshToken);
        tokenStore.setSession(result.accessToken, result.refreshToken, toStoredUser(result.user));
        if (!cancelled) {
          setAccessToken(result.accessToken);
          setUser(result.user);
          setStatus('authenticated');
        }
      } catch {
        tokenStore.clear();
        if (!cancelled) setStatus('anonymous');
      }
    }

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, [authApi]);

  const login = useCallback(
    async (input: LoginInput) => {
      const result = await authApi.login(input);
      tokenStore.setSession(result.accessToken, result.refreshToken, toStoredUser(result.user));
      setAccessToken(result.accessToken);
      setUser(result.user);
      setStatus('authenticated');
      return result;
    },
    [authApi],
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      await authApi.register(input);
    },
    [authApi],
  );

  const logout = useCallback(async () => {
    const refreshToken = tokenStore.getRefreshToken();
    if (refreshToken) {
      try {
        await authApi.logout(refreshToken);
      } catch {
        // Local session is still cleared even if the server call fails.
      }
    }
    tokenStore.clear();
    setAccessToken(null);
    setUser(null);
    setStatus('anonymous');
  }, [authApi]);

  const verifyEmail = useCallback(
    async (token: string) => {
      await authApi.verifyEmail(token);
    },
    [authApi],
  );

  const value = useMemo(
    () => ({ status, user, accessToken, login, register, logout, verifyEmail }),
    [status, user, accessToken, login, register, logout, verifyEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
