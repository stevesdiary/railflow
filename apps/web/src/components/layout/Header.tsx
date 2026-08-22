import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: 'Book Ticket' },
  { to: '/search', label: 'Train Information' },
  { to: '/help', label: 'Help' },
];

export function Header() {
  const { status, user, logout } = useAuth();
  const isAuthed = status === 'authenticated';

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__brand" aria-label="RailFlow home">
          <span className="header__logo" aria-hidden="true">
            🚆
          </span>
          <span className="header__wordmark">RailFlow</span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          {isAuthed && user ? (
            <div className="header__user">
              <span className="header__user-name">Hi, {user.firstName}</span>
              <button type="button" className="header__logout" onClick={() => void logout()}>
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="header__auth">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary header__cta">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
