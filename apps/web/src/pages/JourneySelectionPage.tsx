import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { JourneySearch } from '../components/journey/JourneySearch';
import { createSearchApi, ApiError, type PublicSearchJourney } from '../lib/api';
import './JourneySelectionPage.css';

type Availability = 'available' | 'limited' | 'rac' | 'waitlist' | 'soldout';

interface JourneyCard {
  id: string;
  train: string;
  trainName: string;
  route: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: string;
  classes: Array<{ code: string; name: string; fare: number }>;
  fare: number;
  availability: Availability;
  seatsLeft?: number;
}

const AVAILABILITY_LABELS: Record<Availability, string> = {
  available: 'Available',
  limited: 'Limited',
  rac: 'RAC',
  waitlist: 'Waitlist',
  soldout: 'Sold out',
};

const AVAILABILITY_BADGE: Record<Availability, string> = {
  available: 'badge-avail',
  limited: 'badge-limited',
  rac: 'badge-rac',
  waitlist: 'badge-waitlist',
  soldout: 'badge-soldout',
};

function formatNaira(value: number): string {
  return `₦${value.toLocaleString('en-NG')}`;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) {
    return `${mins}m`;
  }
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

function stopsLabel(stopCount: number): string {
  if (stopCount <= 1) {
    return 'Non-stop';
  }
  return `${stopCount - 1} stop${stopCount - 1 > 1 ? 's' : ''}`;
}

function availabilityFor(journey: PublicSearchJourney): {
  availability: Availability;
  seatsLeft?: number;
} {
  const [cheapest] = [...journey.classes].sort((a, b) => a.availableSeats - b.availableSeats);
  if (!cheapest) {
    return { availability: 'soldout' };
  }
  const ratio = cheapest.capacity > 0 ? cheapest.availableSeats / cheapest.capacity : 0;
  if (cheapest.availableSeats === 0) {
    return { availability: 'soldout' };
  }
  if (ratio < 0.25) {
    return { availability: 'waitlist', seatsLeft: cheapest.availableSeats };
  }
  if (ratio < 0.5) {
    return { availability: 'limited', seatsLeft: cheapest.availableSeats };
  }
  return { availability: 'available' };
}

function toCard(journey: PublicSearchJourney): JourneyCard {
  const { availability, seatsLeft } = availabilityFor(journey);
  const cheapest = journey.classes[0];
  return {
    id: journey.journeyId,
    train: journey.train.number,
    trainName: journey.train.name,
    route: `${journey.from.name} → ${journey.to.name}`,
    depart: journey.departureTime,
    arrive: journey.arrivalTime,
    duration: formatDuration(journey.durationMinutes),
    stops: stopsLabel(journey.stopCount),
    classes: journey.classes.map((cls) => ({ code: cls.code, name: cls.name, fare: cls.fare })),
    fare: cheapest?.fare ?? 0,
    availability,
    seatsLeft,
  };
}

export function JourneySelectionPage() {
  const [searchParams] = useSearchParams();
  const params = useMemo(
    () => ({
      origin: searchParams.get('origin') ?? '',
      destination: searchParams.get('destination') ?? '',
      date: searchParams.get('date') ?? '',
      passengers: Number(searchParams.get('passengers') ?? 1),
    }),
    [searchParams],
  );

  const hasQuery = Boolean(params.origin && params.destination && params.date);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<{
    from: string;
    to: string;
    journeys: JourneyCard[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasQuery) {
      setStatus('idle');
      setResult(null);
      return;
    }
    let cancelled = false;
    setStatus('loading');
    setError(null);
    const searchApi = createSearchApi();
    searchApi
      .searchJourneys(params.origin, params.destination, params.date)
      .then((data) => {
        if (cancelled) {
          return;
        }
        setResult({
          from: data.from.name,
          to: data.to.name,
          journeys: data.journeys.map(toCard),
        });
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (cancelled) {
          return;
        }
        setError(err instanceof ApiError ? err.message : 'Journeys could not be loaded.');
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [params.origin, params.destination, params.date, hasQuery]);

  return (
    <div className="journey-selection">
      <section className="journey-selection__search">
        <div className="container">
          <JourneySearch variant="bar" initial={params} />
        </div>
      </section>

      {!hasQuery ? (
        <section className="container journey-selection__empty">
          <div className="card journey-selection__empty-card">
            <h2 className="text-heading">Search for a journey</h2>
            <p className="text-muted">
              Choose your origin, destination and travel date to see available trains.
            </p>
          </div>
        </section>
      ) : null}

      {hasQuery && status === 'loading' ? (
        <section className="container journey-selection__results">
          <div className="journey-list" aria-busy="true">
            {[0, 1, 2].map((index) => (
              <div key={index} className="journey-card card journey-card--skeleton" />
            ))}
          </div>
        </section>
      ) : null}

      {hasQuery && status === 'error' ? (
        <section className="container journey-selection__results">
          <div className="card journey-selection__empty-card" role="alert">
            <h2 className="text-heading">Something went wrong</h2>
            <p className="text-muted">{error}</p>
          </div>
        </section>
      ) : null}

      {hasQuery && status === 'success' && result ? (
        <section className="container journey-selection__results">
          <div className="journey-selection__summary">
            <h1 className="text-subheading">
              {result.from} <span aria-hidden="true">→</span> {result.to}
            </h1>
            <p className="text-sm text-muted">
              {params.date} · {params.passengers} passenger{params.passengers > 1 ? 's' : ''}
            </p>
          </div>

          {result.journeys.length === 0 ? (
            <div className="card journey-selection__empty-card">
              <h2 className="text-heading">No journeys found</h2>
              <p className="text-muted">
                No trains run between {result.from} and {result.to} on this date. Try another day.
              </p>
            </div>
          ) : (
            <div className="journey-list">
              {result.journeys.map((journey) => (
                <article key={journey.id} className="journey-card card">
                  <div className="journey-card__time">
                    <span className="journey-card__clock">{journey.depart}</span>
                    <span className="journey-card__route text-xs">{journey.route}</span>
                    <span className="journey-card__clock">{journey.arrive}</span>
                  </div>

                  <div className="journey-card__meta">
                    <div className="journey-card__train">
                      <span className="journey-card__train-name text-sm">
                        {journey.train} · {journey.trainName}
                      </span>
                      <span className="text-xs text-muted">
                        {journey.duration} · {journey.stops}
                      </span>
                    </div>
                    <div className="journey-card__classes">
                      {journey.classes.map((cls) => (
                        <span key={cls.code} className="journey-card__class text-xs">
                          {cls.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="journey-card__status">
                    <span className={`badge ${AVAILABILITY_BADGE[journey.availability]}`}>
                      {AVAILABILITY_LABELS[journey.availability]}
                    </span>
                    {journey.seatsLeft ? (
                      <span className="text-xs text-muted">{journey.seatsLeft} seats left</span>
                    ) : null}
                  </div>

                  <div className="journey-card__booking">
                    <span className="journey-card__fare">{formatNaira(journey.fare)}</span>
                    {journey.availability === 'soldout' ? (
                      <button type="button" className="btn btn-ghost" disabled>
                        Sold out
                      </button>
                    ) : (
                      <Link
                        to={`/journey/${journey.id}`}
                        state={{ journey }}
                        className="btn btn-primary"
                        aria-label={`Select ${journey.train} to ${journey.route}`}
                      >
                        Select seats
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}
