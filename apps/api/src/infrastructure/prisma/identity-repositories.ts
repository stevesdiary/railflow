import type { PrismaClient } from '../../generated/prisma/client.js';
import type {
  CreateUserInput,
  UserRecord,
  UserRepository,
  VerificationTokenRecord,
  VerificationTokenStore,
} from '../../modules/identity/auth.types.js';

function mapUser(user: {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): UserRecord {
  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
    emailVerifiedAt: user.emailVerifiedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateUserInput): Promise<UserRecord> {
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        passwordHash: input.passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
      },
    });
    return mapUser(user);
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? mapUser(user) : null;
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? mapUser(user) : null;
  }

  async markEmailVerified(id: string): Promise<UserRecord> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { emailVerifiedAt: new Date(), status: 'ACTIVE' },
    });
    return mapUser(user);
  }
}

function mapVerificationToken(token: {
  id: string;
  tokenHash: string;
  userId: string;
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
}): VerificationTokenRecord {
  return {
    id: token.id,
    tokenHash: token.tokenHash,
    userId: token.userId,
    expiresAt: token.expiresAt,
    usedAt: token.usedAt,
    createdAt: token.createdAt,
  };
}

export class PrismaVerificationTokenStore implements VerificationTokenStore {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: { tokenHash: string; userId: string; expiresAt: Date }): Promise<void> {
    await this.prisma.emailVerificationToken.create({ data: input });
  }

  async findByHash(tokenHash: string): Promise<VerificationTokenRecord | null> {
    const token = await this.prisma.emailVerificationToken.findUnique({ where: { tokenHash } });
    return token ? mapVerificationToken(token) : null;
  }

  async markUsed(id: string): Promise<boolean> {
    const result = await this.prisma.emailVerificationToken.updateMany({
      where: { id, usedAt: null },
      data: { usedAt: new Date() },
    });
    return result.count > 0;
  }
}
