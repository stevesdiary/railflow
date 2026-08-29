import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { createInventoryApi, ApiError } from '../lib/api';
import { useAuth } from '../lib/auth/AuthContext';
import type { PublicHeldSeat, PublicSeatMap, PublicSeatMapSeat } from '../lib/api';
import './JourneyDetailsPage.css';

interface JourneySummaryState {
  journeyId: string;
  train: { number: string; name: string };
  from: { code: string; name: string; city: string };
  to: { code: string; name: string; city: string };
  departureTime: string;
  arrivalTime: string;
  classes: Array<{ code: string; name: string }>;
}

const MAX_SELECTABLE = 6;

function formatCountdown(expiresAt: string): string {
  const remaining = Math.max(0, new Date(expiresAt).getTime() - Date.now());
  const minutes = Math.floor(remaining / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function JourneyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const summary = (location.state as JourneySummaryState | null) ?? null;
  const { status: authStatus, accessToken } = useAuth();

  const [seatMap, setSeatMap] = useState<PublicSeatMap | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [holding, setHolding] = useState(false);
  const [holdError, setHoldError] = useState<string | null>(null);
  const [heldSeats, setHeldSeats] = useState<PublicHeldSeat[] | null>(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState<string | null>(null);
  const [releasing, setReleasing] = useState(false);
  const [, setNow] = useState(Date.now());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    let cancelled = false;
    setStatus('loading');
    setError(null);
    const inventoryApi = createInventoryApi();
    inventoryApi
      .getSeatMap(id)
      .then((map) => {
        if (cancelled) {
          return;
        }
        setSeatMap(map);
        const firstClass = map.coaches[0]?.class.code ?? null;
        setSelectedClass(firstClass);
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (cancelled) {
          return;
        }
        setError(err instanceof ApiError ? err.message : 'Seat map could not be loaded.');
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!holdExpiresAt) {
      return;
    }
    timerRef.current = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [holdExpiresAt]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const coachesForClass = useMemo(() => {
    if (!seatMap || !selectedClass) {
      return [];
    }
    return seatMap.coaches.filter((coach) => coach.class.code === selectedClass);
  }, [seatMap, selectedClass]);

  const classes = useMemo(() => {
    if (!seatMap) {
      return [];
    }
    const seen = new Map<string, { code: string; name: string }>();
    for (const coach of seatMap.coaches) {
      if (!seen.has(coach.class.code)) {
        seen.set(coach.class.code, coach.class);
      }
    }
    return [...seen.values()];
  }, [seatMap]);

  function toggleSeat(seat: PublicSeatMapSeat) {
    if (seat.status !== 'AVAILABLE' || heldSeats) {
      return;
    }
    setSelectedSeats((prev) => {
      const next = new Set(prev);
      if (next.has(seat.id)) {
        next.delete(seat.id);
        return next;
      }
      if (next.size >= MAX_SELECTABLE) {
        return prev;
      }
      next.add(seat.id);
      return next;
    });
  }

  async function handleHold() {
    if (!id || !selectedClass || !accessToken || selectedSeats.size === 0) {
      return;
    }
    const seatNumbers: string[] = [];
    for (const coach of coachesForClass) {
      for (const seat of coach.seats) {
        if (selectedSeats.has(seat.id)) {
          seatNumbers.push(seat.seatNumber);
        }
      }
    }
    setHolding(true);
    setHoldError(null);
    try {
      const result = await createInventoryApi().holdSeats(
        {
          journeyId: id,
          classCode: selectedClass,
          count: selectedSeats.size,
          preferredSeatNumbers: seatNumbers,
        },
        accessToken,
      );
      setHeldSeats(result.heldSeats);
      setHoldExpiresAt(result.expiresAt);
      setSelectedSeats(new Set());
    } catch (err) {
      setHoldError(err instanceof ApiError ? err.message : 'Seats could not be held.');
    } finally {
      setHolding(false);
    }
  }

  async function handleRelease() {
    if (!heldSeats || !accessToken) {
      return;
    }
    setReleasing(true);
    try {
      await createInventoryApi().releaseHolds(
        heldSeats.map((seat) => seat.id),
        accessToken,
      );
      setHeldSeats(null);
      setHoldExpiresAt(null);
    } catch (err) {
      setHoldError(err instanceof ApiError ? err.message : 'Seats could not be released.');
    } finally {
      setReleasing(false);
    }
  }

  const showUnavailable =
    coachesForClass.length > 0 &&
    coachesForClass.every((coach) => coach.seats.every((seat) => seat.status !== 'AVAILABLE'));

  return (
    <div className="container section journey-details">
      <div className="journey-details__header">
        <Link to="/search" className="btn btn-ghost">
          ← Back to results
        </Link>
        <div className="journey-details__title">
          <h1 className="text-heading">
            {summary
              ? `${summary.train.number} · ${summary.train.name}`
              : seatMap
                ? `${seatMap.train.number} · ${seatMap.train.name}`
                : 'Journey details'}
          </h1>
          <p className="text-muted">
            {summary
              ? `${summary.from.name} → ${summary.to.name} · dep ${summary.departureTime} · arr ${summary.arrivalTime}`
              : 'Select your seats'}
          </p>
        </div>
      </div>

      {status === 'loading' ? (
        <div className="card journey-details__card" aria-busy="true">
          <p className="text-muted">Loading seat map…</p>
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="card journey-details__card" role="alert">
          <h2 className="text-heading">Something went wrong</h2>
          <p className="text-muted">{error}</p>
        </div>
      ) : null}

      {status === 'success' && seatMap ? (
        <>
          <div className="journey-details__classes">
            {classes.map((cls) => (
              <button
                key={cls.code}
                type="button"
                className={`btn ${selectedClass === cls.code ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => {
                  setSelectedClass(cls.code);
                  setSelectedSeats(new Set());
                }}
              >
                {cls.name}
              </button>
            ))}
          </div>

          {heldSeats ? (
            <div className="card journey-details__hold">
              <h2 className="text-subheading">Seats held for you</h2>
              <p className="text-muted">
                {heldSeats.length} seat{heldSeats.length > 1 ? 's' : ''} ·{' '}
                {heldSeats.map((seat) => seat.seat.seatNumber).join(', ')}
              </p>
              {holdExpiresAt ? (
                <p className="journey-details__countdown text-sm">
                  Hold expires in <strong>{formatCountdown(holdExpiresAt)}</strong>
                </p>
              ) : null}
              <div className="journey-details__actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleRelease}
                  disabled={releasing}
                >
                  {releasing ? 'Releasing…' : 'Release seats'}
                </button>
                <Link to="/" className="btn btn-primary">
                  Continue to booking
                </Link>
              </div>
            </div>
          ) : (
            <div className="card journey-details__card">
              <div className="journey-details__selection">
                <p className="text-sm text-muted">
                  {selectedSeats.size} of {MAX_SELECTABLE} seats selected
                </p>
                <div className="journey-details__legend">
                  <span className="seat-legend">
                    <i className="seat-dot seat-dot--avail" /> Available
                  </span>
                  <span className="seat-legend">
                    <i className="seat-dot seat-dot--held" /> Held
                  </span>
                  <span className="seat-legend">
                    <i className="seat-dot seat-dot--unavailable" /> Unavailable
                  </span>
                </div>
              </div>

              {coachesForClass.map((coach) => (
                <div key={coach.id} className="journey-details__coach">
                  <h3 className="text-sm">
                    Coach {coach.coachNumber} · {coach.class.name} ({coach.capacity} seats)
                  </h3>
                  <div
                    className="seat-grid"
                    role="grid"
                    aria-label={`Coach ${coach.coachNumber} seats`}
                  >
                    {coach.seats.map((seat) => {
                      const isSelected = selectedSeats.has(seat.id);
                      const canSelect = seat.status === 'AVAILABLE' && !heldSeats;
                      return (
                        <button
                          key={seat.id}
                          type="button"
                          role="gridcell"
                          aria-label={`Seat ${seat.seatNumber}, ${seat.status.toLowerCase()}`}
                          aria-pressed={isSelected}
                          disabled={!canSelect}
                          className={`seat seat--${seat.status.toLowerCase()}${isSelected ? ' seat--selected' : ''}`}
                          onClick={() => toggleSeat(seat)}
                          title={`${seat.seatNumber}${seat.status === 'AVAILABLE' ? '' : ` · ${seat.status.toLowerCase()}`}`}
                        >
                          {seat.seatNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {showUnavailable ? (
                <div className="card journey-details__empty">
                  <p className="text-muted">No seats are available in this class.</p>
                </div>
              ) : null}

              {holdError ? (
                <p className="journey-details__error text-sm" role="alert">
                  {holdError}
                </p>
              ) : null}

              {authStatus !== 'authenticated' ? (
                <div className="journey-details__actions">
                  <Link to="/login" className="btn btn-primary">
                    Sign in to hold seats
                  </Link>
                </div>
              ) : (
                <div className="journey-details__actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleHold}
                    disabled={holding || selectedSeats.size === 0}
                  >
                    {holding
                      ? 'Holding seats…'
                      : `Hold ${selectedSeats.size} seat${selectedSeats.size === 1 ? '' : 's'}`}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
