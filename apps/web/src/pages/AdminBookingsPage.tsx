import { Icon } from '../components/ui/Icon';

export function AdminBookingsPage() {
  return (
    <div className="max-w-container-max mx-auto h-full flex flex-col items-center justify-center text-center p-stack-lg">
      <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center text-secondary mb-stack-md">
        <Icon name="confirmation_number" className="text-3xl" />
      </div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Bookings Dashboard</h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
        This sub-dashboard is currently under construction. Please check back later for detailed booking management and resolution flows.
      </p>
    </div>
  );
}
