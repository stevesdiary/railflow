import argon2 from 'argon2';

export interface Argon2Options {
  memoryCost?: number;
  timeCost?: number;
  parallelism?: number;
}

export async function hashPassword(password: string, options: Argon2Options = {}): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: options.memoryCost ?? 65_536,
    timeCost: options.timeCost ?? 3,
    parallelism: options.parallelism ?? 4,
  });
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}
