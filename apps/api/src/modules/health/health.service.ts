import type { HealthzResponse, ReadyzResponse } from '@railflow/contracts';

export interface HealthDependencies {
  serviceName?: string;
  checkDatabase: () => Promise<boolean>;
}

export class HealthService {
  private readonly serviceName: string;

  constructor(private readonly deps: HealthDependencies) {
    this.serviceName = deps.serviceName ?? 'railflow-api';
  }

  liveness(): HealthzResponse {
    return {
      status: 'ok',
      service: this.serviceName,
      timestamp: new Date().toISOString(),
    };
  }

  async readiness(): Promise<ReadyzResponse> {
    const started = performance.now();
    let databaseOk = false;
    try {
      databaseOk = await this.deps.checkDatabase();
    } catch {
      databaseOk = false;
    }
    const latencyMs = Math.round(performance.now() - started);

    const checks = [
      {
        name: 'database',
        status: databaseOk ? ('ok' as const) : ('down' as const),
        latencyMs,
      },
    ];

    const ready = checks.every((check) => check.status === 'ok');

    return {
      status: ready ? ('ready' as const) : ('not_ready' as const),
      service: this.serviceName,
      timestamp: new Date().toISOString(),
      checks,
    };
  }
}
