import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../common/auth/require-auth.js';
import { getPrisma } from '../../infrastructure/prisma/prisma.js';
import { PrismaBookingRepository } from '../../infrastructure/prisma/booking-repositories.js';
import type { BookingRepository } from './booking.types.js';
import type { CreateBookingInput } from './booking.types.js';
import { BookingService } from './booking.service.js';

export function buildDefaultBookingRepository(): BookingRepository {
  return new PrismaBookingRepository(getPrisma());
}

export function registerBookingModule(
  app: FastifyInstance,
  repository: BookingRepository,
  holdTtlSeconds: number,
): void {
  const service = new BookingService(repository);

  app.post('/bookings', { preHandler: authenticate }, async (request, reply) => {
    const userId = request.user.sub;
    const body = request.body as Partial<CreateBookingInput>;
    const idempotencyKey = request.headers['idempotency-key'];
    const result = await service.createBooking(
      userId,
      {
        journeyId: String(body.journeyId ?? ''),
        classCode: String(body.classCode ?? ''),
        fromStationCode: String(body.fromStationCode ?? ''),
        toStationCode: String(body.toStationCode ?? ''),
        holdIds: Array.isArray(body.holdIds) ? body.holdIds : [],
        passengers: Array.isArray(body.passengers) ? body.passengers : [],
      },
      holdTtlSeconds,
      typeof idempotencyKey === 'string' ? idempotencyKey : null,
    );
    if (result.replayed) {
      return reply.code(200).send({ booking: result.booking, replayed: true });
    }
    return reply.code(201).send({ booking: result.booking, replayed: false });
  });

  app.get('/bookings', { preHandler: authenticate }, async (request) => {
    const bookings = await service.listBookings(request.user.sub);
    return { bookings };
  });

  app.get('/bookings/:reference', { preHandler: authenticate }, async (request) => {
    const params = request.params as { reference: string };
    const booking = await service.getBooking(params.reference, request.user.sub);
    return { booking };
  });

  app.post('/bookings/:reference/cancel', { preHandler: authenticate }, async (request) => {
    const params = request.params as { reference: string };
    const booking = await service.cancelBooking(params.reference, request.user.sub);
    return { booking };
  });
}
