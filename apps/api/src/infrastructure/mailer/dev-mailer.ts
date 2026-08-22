import type { FastifyBaseLogger } from 'fastify';
import type { EmailMessage, Mailer } from '../../modules/identity/auth.types.js';

export class DevMailer implements Mailer {
  constructor(private readonly logger: FastifyBaseLogger) {}

  async send(message: EmailMessage): Promise<void> {
    this.logger.info(
      { to: message.to, subject: message.subject },
      `[DEV MAILER] ${message.subject}\n${message.text}`,
    );
  }
}
