import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSearchApi, type PublicStation } from '../../lib/api';
import './JourneySearch.css';

export interface JourneySearchValues {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

export function JourneySearch({
  initial,
  variant = 'widget',
}: {
  initial?: Partial<JourneySearchValues>;
  variant?: 'widget' | 'bar';
}) {
  const navigate = useNavigate();
  const [stations, setStations] = useState<PublicStation[]>([]);
  const [stationsError, setStationsError] = useState<string | null>(null);
  const [values, setValues] = useState<JourneySearchValues>({
    origin: initial?.origin ?? '',
    destination: initial?.destination ?? '',
    date: initial?.date ?? todayISO(),
    passengers: initial?.passengers ?? 1,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const searchApi = createSearchApi();
    searchApi
      .listStations()
      .then((data) => {
        if (!cancelled) {
          setStations(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStationsError('Stations could not be loaded. Please try again.');
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.origin || !values.destination) {
      setError('Select both origin and destination stations.');
      return;
    }
    if (values.origin === values.destination) {
      setError('Origin and destination must be different.');
      return;
    }
    setError(null);
    const params = new URLSearchParams({
      origin: values.origin,
      destination: values.destination,
      date: values.date,
      passengers: String(values.passengers),
    });
    navigate(`/search?${params.toString()}`);
  }

  function set(key: keyof JourneySearchValues, value: string | number) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      className={`journey-search journey-search--${variant}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="journey-search__row">
        <div className="field">
          <label className="field-label" htmlFor="origin">
            From
          </label>
          <select
            id="origin"
            className="select"
            value={values.origin}
            onChange={(e) => set('origin', e.target.value)}
          >
            <option value="">Select station</option>
            {stations.map((station) => (
              <option key={station.id} value={station.code}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="destination">
            To
          </label>
          <select
            id="destination"
            className="select"
            value={values.destination}
            onChange={(e) => set('destination', e.target.value)}
          >
            <option value="">Select station</option>
            {stations.map((station) => (
              <option key={station.id} value={station.code}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="date">
            Travel date
          </label>
          <input
            id="date"
            className="input"
            type="date"
            min={todayISO()}
            value={values.date}
            onChange={(e) => set('date', e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="passengers">
            Passengers
          </label>
          <input
            id="passengers"
            className="input"
            type="number"
            min={1}
            max={8}
            value={values.passengers}
            onChange={(e) => set('passengers', Number(e.target.value))}
            required
          />
        </div>

        <div className="journey-search__action">
          <button type="submit" className="btn btn-primary btn-lg">
            Search Trains
          </button>
        </div>
      </div>

      {error ? (
        <p className="journey-search__error" role="alert">
          {error}
        </p>
      ) : null}
      {stationsError ? (
        <p className="journey-search__error" role="alert">
          {stationsError}
        </p>
      ) : null}
    </form>
  );
}
