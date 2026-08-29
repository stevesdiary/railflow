import { Link } from 'react-router-dom';
import './Footer.css';

const FOOTER_COLUMNS = [
  {
    title: 'Company',
    links: ['About us', 'Careers', 'News', 'Contact'],
  },
  {
    title: 'Travel Info',
    links: ['Stations', 'Train schedules', 'Fares', 'Safety'],
  },
  {
    title: 'Support',
    links: ['Help center', 'Refunds', 'RAC & waitlist', 'FAQs'],
  },
  {
    title: 'Legal',
    links: ['Terms of service', 'Privacy policy', 'Cookie policy'],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="header__brand">
            <span className="header__logo" aria-hidden="true">
              🚆
            </span>
            <span className="header__wordmark">RailFlow</span>
          </Link>
          <p className="footer__tagline">
            Secure online booking for train journeys across Nigeria.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.title} className="footer__column" aria-label={column.title}>
            <h3 className="footer__heading">{column.title}</h3>
            <ul className="footer__list">
              {column.links.map((label) => (
                <li key={label}>
                  <Link to="/" className="footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="text-sm text-muted">
            © {new Date().getFullYear()} RailFlow. All rights reserved.
          </span>
          <span className="text-sm text-muted">Fares shown in Naira (₦)</span>
        </div>
      </div>
    </footer>
  );
}
