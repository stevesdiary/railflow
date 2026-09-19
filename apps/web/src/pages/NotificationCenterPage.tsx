import { useState } from 'react';
import { Icon } from '../components/ui/Icon';

export function NotificationCenterPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your journey from Lagos to Ibadan has been confirmed.',
      meta: 'PNR: NR-8X9Y2Z',
      time: '10 mins ago',
      isNew: true,
      icon: 'confirmation_number',
    },
    {
      id: 2,
      type: 'refund',
      title: 'Refund Processed',
      message: 'Your cancellation refund has been successfully processed to your original payment method.',
      meta: 'Amount: ₦ 8,250',
      time: '2 hours ago',
      isNew: true,
      icon: 'payments',
    },
    {
      id: 3,
      type: 'rac',
      title: 'RAC Status Update',
      message: 'Your Waitlist ticket has been upgraded to RAC (Reservation Against Cancellation).',
      meta: 'PNR: NR-RAC456',
      time: '1 day ago',
      isNew: false,
      icon: 'info',
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isNew: false } : n));
  };

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col md:flex-row gap-gutter">
      {/* Sidebar Filter */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-surface border border-outline-variant rounded p-stack-md sticky top-24">
          <h2 className="font-title-md text-title-md text-on-surface mb-stack-md">Categories</h2>
          <ul className="space-y-stack-sm">
            <li>
              <button 
                className={`w-full text-left px-3 py-2 rounded font-body-md flex justify-between items-center group transition-colors ${activeCategory === 'all' ? 'bg-surface-container-high text-on-surface' : 'hover:bg-surface-container-low text-on-surface-variant'}`}
                onClick={() => setActiveCategory('all')}
              >
                <span>All Notifications</span>
                <span className="bg-primary text-on-primary font-label-caps text-label-caps px-2 py-0.5 rounded-full">
                  {notifications.filter(n => n.isNew).length}
                </span>
              </button>
            </li>
            {['Booking', 'Payment', 'Journey', 'RAC & Waitlist', 'Refund', 'Account'].map((category) => (
              <li key={category}>
                <button 
                  className={`w-full text-left px-3 py-2 rounded font-body-md flex justify-between items-center group transition-colors ${activeCategory === category.toLowerCase() ? 'bg-surface-container-high text-on-surface' : 'hover:bg-surface-container-low text-on-surface-variant'}`}
                  onClick={() => setActiveCategory(category.toLowerCase())}
                >
                  <span>{category}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-stack-lg pt-stack-md border-t border-outline-variant">
            <button className="text-primary hover:text-surface-tint font-body-sm flex items-center gap-2 transition-colors">
              <Icon name="tune" className="text-[18px]" />
              Notification Preferences
            </button>
          </div>
        </div>
      </aside>

      {/* Notification List */}
      <section className="flex-grow flex flex-col gap-stack-md">
        <div className="flex justify-between items-end border-b border-outline-variant pb-stack-sm">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Notifications</h1>
          <button className="text-primary hover:text-surface-tint font-body-sm transition-colors mb-1" onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>

        <div className="flex flex-col gap-base">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-surface border border-outline-variant rounded p-stack-md relative hover:shadow-[0_4px_6px_-1px_rgba(26,38,52,0.1)] transition-shadow group flex gap-stack-md">
              {notification.isNew && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l"></div>
              )}
              <div className={`flex-shrink-0 pt-1 ${notification.isNew ? 'text-primary' : 'text-secondary'}`}>
                <Icon name={notification.icon} style={{ fontVariationSettings: "'FILL' 1" }} />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                    {notification.title}
                    {notification.isNew && (
                      <span className="bg-primary-container text-on-primary-container font-label-caps text-label-caps px-2 py-0.5 rounded">NEW</span>
                    )}
                  </h3>
                  <span className="font-body-sm text-secondary">{notification.time}</span>
                </div>
                <p className="font-body-md text-on-surface-variant mb-2">{notification.message}</p>
                <div className="flex items-center gap-4 font-data-mono text-data-mono text-secondary">
                  <span>{notification.meta}</span>
                </div>
              </div>
              {notification.isNew && (
                <div className="flex-shrink-0 flex flex-col justify-start opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 text-secondary hover:text-primary transition-colors" title="Mark as read" onClick={() => markAsRead(notification.id)}>
                    <Icon name="mark_email_read" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
