import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ApiError } from '../lib/api';
import { useAuth } from '../lib/auth';
import { AuthLayout } from '../components/auth/AuthLayout';

type VerifyState = 'verifying' | 'success' | 'error';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuth();
  const token = searchParams.get('token');

  const [state, setState] = useState<VerifyState>('verifying');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!token) {
        setState('error');
        setMessage('This verification link is missing its token.');
        return;
      }

      try {
        await verifyEmail(token);
        if (!cancelled) setState('success');
      } catch (err) {
        if (!cancelled) {
          setState('error');
          setMessage(
            err instanceof ApiError ? err.message : 'We could not verify this email address.',
          );
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [token, verifyEmail]);

  return (
    <AuthLayout>
      <div className="auth-card__heading">
        <h1 className="text-heading">
          {state === 'success'
            ? 'Email verified'
            : state === 'error'
              ? 'Verification failed'
              : 'Verifying…'}
        </h1>
      </div>

      {state === 'verifying' ? <p className="text-sm text-muted">Please wait…</p> : null}

      {state === 'success' ? (
        <>
          <p className="auth-alert auth-alert--success">
            Your email has been verified. You can now log in and book journeys.
          </p>
          <Link to="/login" className="btn btn-primary btn-block">
            Go to login
          </Link>
        </>
      ) : null}

      {state === 'error' ? (
        <>
          <p className="auth-alert auth-alert--error" role="alert">
            {message}
          </p>
          <p className="text-sm text-muted">
            If the link expired, you can request a new verification link after logging in.
          </p>
          <Link to="/login" className="btn btn-secondary btn-block">
            Back to login
          </Link>
        </>
      ) : null}
    </AuthLayout>
  );
}
