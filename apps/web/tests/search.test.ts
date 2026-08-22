import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSearchApi } from '../src/lib/api/search';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('searchApi', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('lists stations', async () => {
    const stations = [{ id: 's1', code: 'LAG', name: 'Lagos (Iganmu)', city: 'Lagos' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ stations })));
    const result = await createSearchApi().listStations();
    expect(result).toEqual(stations);
  });

  it('passes a station query parameter', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ stations: [] })));
    await createSearchApi().listStations('lag');
    expect(fetch).toHaveBeenCalledWith(
      '/api/stations?query=lag',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('searches journeys with from, to and date query parameters', async () => {
    const result = {
      from: { code: 'LAG', name: 'Lagos (Iganmu)', city: 'Lagos' },
      to: { code: 'ABJ', name: 'Abuja (Idu)', city: 'Abuja' },
      date: '2026-08-10',
      journeys: [],
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(result)));
    await createSearchApi().searchJourneys('LAG', 'ABJ', '2026-08-10');
    expect(fetch).toHaveBeenCalledWith(
      '/api/search?from=LAG&to=ABJ&date=2026-08-10',
      expect.objectContaining({ method: 'GET' }),
    );
  });
});
