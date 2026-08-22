import { Link } from 'react-router-dom';
import { JourneySearch } from '../components/journey/JourneySearch';
import './HomePage.css';

const QUICK_ACTIONS = [
  { label: 'Search trains', description: 'Find journeys and fares' },
  { label: 'Manage booking', description: 'View or change a booking' },
  { label: 'Check PNR', description: 'Verify your ticket status' },
  { label: 'Download ticket', description: 'Get your digital ticket' },
];

const POPULAR_ROUTES = [
  { route: 'Lagos (Idu) → Ibadan', price: 'from ₦4,500' },
  { route: 'Kaduna → Abuja (Rigasa)', price: 'from ₦3,200' },
  { route: 'Port Harcourt → Lagos (Idu)', price: 'from ₦6,800' },
  { route: 'Jos → Kaduna', price: 'from ₦3,900' },
];

const BENEFITS = [
  {
    title: 'Secure payment',
    description: 'Pay safely with Paystack-powered checkout and instant confirmation.',
  },
  {
    title: 'Real-time availability',
    description: 'Live seat availability with clear status for every coach and class.',
  },
  {
    title: 'Digital ticket',
    description: 'Receive your PNR instantly and travel with a ticket on your phone.',
  },
  {
    title: 'Easy cancellation',
    description: 'Manage and cancel bookings online with transparent refunds.',
  },
];

const FAQS = [
  {
    q: 'How do I book a train ticket?',
    a: 'Search your journey, select seats, add passenger details and pay securely. Your PNR and digital ticket are issued instantly.',
  },
  {
    q: 'What does RAC and waitlist mean?',
    a: 'RAC reserves a berth in the coach with a reduced seat, while waitlist means a berth is not yet available. Your status updates automatically.',
  },
  {
    q: 'How do I cancel a booking?',
    a: 'Go to My Bookings, choose the booking, and follow the cancellation flow. Refunds are processed to your original payment method.',
  },
];

export function HomePage() {
  return (
    <div className="homepage">
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">Book train journeys across Nigeria in seconds</h1>
            <p className="hero__subtitle">
              Search schedules, compare fares and reserve your seat — securely and in real time.
            </p>
          </div>

          <div className="hero__search">
            <JourneySearch />
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="container section quick-actions">
        <div className="quick-actions__grid">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.label} to="/search" className="quick-action card">
              <span className="quick-action__label">{action.label}</span>
              <span className="quick-action__description text-sm text-muted">
                {action.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular routes */}
      <section className="container section">
        <h2 className="text-heading homepage__section-title">Popular routes</h2>
        <div className="popular-routes">
          {POPULAR_ROUTES.map((route) => (
            <Link key={route.route} to="/search" className="popular-route card">
              <span className="popular-route__name">{route.route}</span>
              <span className="popular-route__price text-sm">{route.price}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why book online */}
      <section className="section why-online">
        <div className="container">
          <h2 className="text-heading homepage__section-title">Why book online</h2>
          <div className="benefits">
            {BENEFITS.map((benefit) => (
              <article key={benefit.title} className="benefit card">
                <h3 className="benefit__title">{benefit.title}</h3>
                <p className="benefit__description text-sm text-muted">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="container section">
        <h2 className="text-heading homepage__section-title">Frequently asked questions</h2>
        <div className="faq">
          {FAQS.map((item) => (
            <details key={item.q} className="faq__item card">
              <summary className="faq__question">{item.q}</summary>
              <p className="faq__answer text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
