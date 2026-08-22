import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email('A valid email is required').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(72),
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('A valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export const verifyEmailQuerySchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});
