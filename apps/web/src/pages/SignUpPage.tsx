import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ApiError } from '../lib/api';
import { useAuth } from '../lib/auth';
import { AuthLayout } from '../components/auth/AuthLayout';
import './SignUpPage.css';

function passwordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 8) return 'weak';
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const variety = Number(hasLetter) + Number(hasNumber) + Number(hasSpecial);
  if (variety >= 3 && password.length >= 12) return 'strong';
  return variety >= 2 ? 'medium' : 'weak';
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export function SignUpPage() {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const strength = passwordStrength(password);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!firstName.trim()) errors.firstName = 'First name is required.';
    if (!lastName.trim()) errors.lastName = 'Last name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
    if (password.length < 8) errors.password = 'Password must be at least 8 characters.';
    if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.';
    if (!acceptedTerms) errors.terms = 'You must accept the terms to continue.';
    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setError(null);
    setSubmitting(true);

    try {
      await register({ email, password, firstName: firstName.trim(), lastName: lastName.trim() });
      setRegisteredEmail(email);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to create your account.');
    } finally {
      setSubmitting(false);
    }
  }

  if (registeredEmail) {
    return (
      <AuthLayout>
        <div className="auth-card__heading">
          <h1 className="text-heading">Check your email</h1>
          <p className="text-sm text-muted">Account created successfully.</p>
        </div>

        <p className="auth-alert auth-alert--success">
          We sent a verification link to <strong>{registeredEmail}</strong>. Open it to verify your
          email, then log in.
        </p>

        <Link to="/login" className="btn btn-primary btn-block">
          Go to login
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="auth-card__heading">
        <h1 className="text-heading">Create your account</h1>
        <p className="text-sm text-muted">Book train journeys across Nigeria.</p>
      </div>

      {error ? (
        <p className="auth-alert auth-alert--error" role="alert">
          {error}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} noValidate>
        <div className="signup-grid">
          <div className="field">
            <label className="field-label" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              className="input"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {fieldErrors.firstName ? (
              <span className="field-error">{fieldErrors.firstName}</span>
            ) : null}
          </div>

          <div className="field">
            <label className="field-label" htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              className="input"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {fieldErrors.lastName ? (
              <span className="field-error">{fieldErrors.lastName}</span>
            ) : null}
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email ? <span className="field-error">{fieldErrors.email}</span> : null}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password ? (
            <div className="strength">
              <span className={`strength__bar strength__bar--${strength}`} />
              <span className="strength__label text-xs">
                {strength === 'strong'
                  ? 'Strong password'
                  : strength === 'medium'
                    ? 'Medium password'
                    : 'Use 8+ characters with letters and numbers'}
              </span>
            </div>
          ) : null}
          {fieldErrors.password ? (
            <span className="field-error">{fieldErrors.password}</span>
          ) : null}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            className="input"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {fieldErrors.confirmPassword ? (
            <span className="field-error">{fieldErrors.confirmPassword}</span>
          ) : null}
        </div>

        <div className="field terms">
          <label className="terms__label text-sm">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>
              I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>.
            </span>
          </label>
          {fieldErrors.terms ? <span className="field-error">{fieldErrors.terms}</span> : null}
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="auth-card__footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </AuthLayout>
  );
}
