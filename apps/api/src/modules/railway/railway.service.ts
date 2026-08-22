import { NotFoundError, ValidationError } from '../../common/errors/app-error.js';
import type {
  PublicClass,
  PublicFare,
  PublicQuota,
  PublicStation,
  PublicTrain,
  PublicTrainSummary,
  RailwayRepository,
} from './railway.types.js';

const MAX_QUERY_LENGTH = 50;

export class RailwayService {
  constructor(private readonly repository: RailwayRepository) {}

  async listStations(query?: string): Promise<PublicStation[]> {
    const trimmed = this.normalizeQuery(query);
    return this.repository.listStations(trimmed);
  }

  async getStationByCode(code: string): Promise<PublicStation> {
    const station = await this.repository.getStationByCode(code);
    if (!station) {
      throw new NotFoundError(`Station not found: ${code}`);
    }
    return station;
  }

  async listTrains(): Promise<PublicTrainSummary[]> {
    return this.repository.listTrains();
  }

  async getTrainByNumber(number: string): Promise<PublicTrain> {
    const train = await this.repository.getTrainByNumber(number);
    if (!train) {
      throw new NotFoundError(`Train not found: ${number}`);
    }
    return train;
  }

  async listClasses(): Promise<PublicClass[]> {
    return this.repository.listClasses();
  }

  async listQuotas(): Promise<PublicQuota[]> {
    return this.repository.listQuotas();
  }

  async listFares(fromCode?: string, toCode?: string, classCode?: string): Promise<PublicFare[]> {
    const from = this.normalizeCode(fromCode);
    const to = this.normalizeCode(toCode);
    const classCodeNorm = this.normalizeCode(classCode);

    if (from && to && from.toUpperCase() === to.toUpperCase()) {
      throw new ValidationError('Origin and destination must differ');
    }

    return this.repository.listFares(from, to, classCodeNorm);
  }

  private normalizeQuery(query?: string): string | undefined {
    if (query === undefined || query === '') {
      return undefined;
    }
    const trimmed = query.trim();
    if (trimmed.length > MAX_QUERY_LENGTH) {
      throw new ValidationError('Search query is too long');
    }
    return trimmed;
  }

  private normalizeCode(code?: string): string | undefined {
    if (code === undefined || code === '') {
      return undefined;
    }
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length > 10) {
      throw new ValidationError('Station/class code is too long');
    }
    return trimmed;
  }
}
