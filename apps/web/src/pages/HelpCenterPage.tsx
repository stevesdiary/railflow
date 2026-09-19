import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function HelpCenterPage() {
  const categories = [
    { icon: 'star', title: 'Popular Questions' },
    { icon: 'confirmation_number', title: 'Booking Help' },
    { icon: 'payments', title: 'Payment Help' },
    { icon: 'currency_exchange', title: 'Cancellation & Refunds' },
    { icon: 'hourglass_empty', title: 'RAC & Waitlist' },
    { icon: 'info', title: 'Travel Information' },
    { icon: 'person', title: 'Account Help' },
    { icon: 'security', title: 'Security & Privacy' },
  ];

  const topArticles = [
    'How to check my PNR status',
    'Understanding RAC booking',
    'Refund policy for late trains',
    'Baggage allowance and restrictions',
  ];

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">
      {/* Hero Section */}
      <section className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-8 md:p-12 text-center flex flex-col items-center gap-stack-md shadow-sm">
        <h1 className="font-display-lg text-display-lg text-primary md:text-5xl text-4xl mb-2">Help Center</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-4">
          Find answers to common questions about booking, travel policies, and account management.
        </p>
        <div className="relative w-full max-w-2xl mx-auto">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl" />
          <input 
            className="w-full h-14 pl-12 pr-4 bg-surface border border-outline-variant rounded-full font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/70 shadow-sm" 
            placeholder="How can we help you today?" 
            type="text"
          />
        </div>
      </section>

      {/* Help Categories Grid */}
      <section className="w-full">
        <h2 className="font-title-md text-title-md text-on-surface mb-stack-md">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-stack-md">
          {categories.map((cat, index) => (
            <a key={index} className="group flex flex-col items-start gap-stack-sm p-6 bg-surface border border-outline-variant rounded-lg hover:border-primary hover:shadow-sm transition-all" href="#">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                <Icon name={cat.icon} style={{ fontVariationSettings: "'FILL' 1" }} />
              </div>
              <h3 className="font-title-md text-title-md text-on-surface text-lg">{cat.title}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* Top Articles */}
      <section className="w-full">
        <h2 className="font-title-md text-title-md text-on-surface mb-stack-md flex items-center gap-2">
          <Icon name="article" className="text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }} />
          Top Articles
        </h2>
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <ul className="divide-y divide-outline-variant">
            {topArticles.map((article, index) => (
              <li key={index}>
                <a className="flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors group" href="#">
                  <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">{article}</span>
                  <Icon name="chevron_right" className="text-outline group-hover:text-primary transition-colors" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="w-full mt-stack-lg border-t border-outline-variant pt-stack-lg flex flex-col items-center text-center pb-stack-lg">
        <h2 className="font-title-md text-title-md text-on-surface mb-2">Still need help?</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">Our customer support team is available 24/7 to assist you.</p>
        <Button className="py-3 px-8 rounded-full transition-colors flex items-center gap-2 active:scale-95 duration-200">
          <Icon name="support_agent" className="text-[20px]" />
          Contact Support
        </Button>
      </section>
    </div>
  );
}
