import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function SystemStatesLibraryPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col items-center py-margin-desktop">
      <div className="max-w-container-max w-full px-margin-mobile md:px-margin-desktop">
        <header className="mb-stack-lg">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">System States Library</h1>
          <p className="font-body-md text-body-md text-secondary">A reference collection of high-fidelity feedback states for the Nigerian Railway booking flow.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* State 1: Skeleton Loading */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded p-gutter flex flex-col">
            <h2 className="font-title-md text-title-md text-on-surface mb-stack-md flex items-center gap-stack-sm">
              <Icon name="hourglass_empty" className="text-secondary" />
              Skeleton Loading
            </h2>
            <div className="flex-grow flex flex-col gap-stack-md">
              <div className="border border-outline-variant rounded p-stack-md flex flex-col gap-stack-sm animate-pulse">
                <div className="flex justify-between items-center border-b border-outline-variant pb-stack-sm">
                  <div className="h-6 w-24 bg-surface-variant rounded"></div>
                  <div className="h-4 w-16 bg-surface-variant rounded"></div>
                </div>
                <div className="flex justify-between items-center py-stack-sm">
                  <div className="flex flex-col gap-base">
                    <div className="h-5 w-20 bg-surface-variant rounded"></div>
                    <div className="h-4 w-32 bg-surface-variant rounded"></div>
                  </div>
                  <div className="h-[2px] flex-grow mx-stack-md bg-surface-variant"></div>
                  <div className="flex flex-col gap-base items-end">
                    <div className="h-5 w-20 bg-surface-variant rounded"></div>
                    <div className="h-4 w-32 bg-surface-variant rounded"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-stack-sm">
                  <div className="h-8 w-24 bg-surface-variant rounded"></div>
                  <div className="h-10 w-32 bg-surface-variant rounded"></div>
                </div>
              </div>
            </div>
          </section>

          {/* State 2: No Search Results */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded p-gutter flex flex-col justify-center items-center text-center">
            <Icon name="search_off" className="text-secondary mb-stack-md text-[48px]" />
            <h2 className="font-title-md text-title-md text-on-surface mb-stack-sm">No Trains Found</h2>
            <p className="font-body-md text-body-md text-secondary mb-stack-lg max-w-sm">We couldn't find any scheduled trains matching your current route and date. Try adjusting your search criteria.</p>
            <div className="flex gap-stack-md">
              <Button onClick={() => navigate('/search')}>Modify Search</Button>
              <Button variant="outline" onClick={() => navigate('/schedule')}>View Full Schedule</Button>
            </div>
          </section>

          {/* State 3: Journey Sold Out */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded p-gutter flex flex-col justify-center items-center text-center">
            <Icon name="event_busy" className="text-error mb-stack-md text-[48px]" />
            <h2 className="font-title-md text-title-md text-on-surface mb-stack-sm">Journey Sold Out</h2>
            <p className="font-body-md text-body-md text-secondary mb-stack-lg max-w-sm">All classes on the 08:30 Express to Abuja are currently fully booked. Join the waitlist or check alternate departures.</p>
            <div className="flex flex-col w-full max-w-sm gap-stack-sm">
              <Button variant="outline" className="flex justify-center items-center gap-stack-sm" onClick={() => navigate('/search-results')}>
                <Icon name="history" className="text-[18px]" /> Alternate Times
              </Button>
              <Button variant="outline" onClick={() => navigate('/booking-status-waitlist/1')}>Join Waitlist</Button>
            </div>
          </section>

          {/* State 4: Session Expired */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded p-gutter flex flex-col justify-center items-center text-center">
            <Icon name="timer_off" className="text-[#332200] mb-stack-md text-[48px]" />
            <h2 className="font-title-md text-title-md text-on-surface mb-stack-sm">Session Expired</h2>
            <p className="font-body-md text-body-md text-secondary mb-stack-lg max-w-sm">For your security, your session has timed out. Don't worry, your selected seats are held for another 5 minutes.</p>
            <Button className="flex justify-center items-center gap-stack-sm" onClick={() => navigate('/login')}>
              <Icon name="login" className="text-[18px]" /> Log In to Continue
            </Button>
          </section>

          {/* State 5: Maintenance */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded p-gutter flex flex-col justify-center items-center text-center md:col-span-2">
            <Icon name="engineering" className="text-on-surface-variant mb-stack-md text-[48px]" />
            <h2 className="font-title-md text-title-md text-on-surface mb-stack-sm">Scheduled Maintenance</h2>
            <p className="font-body-md text-body-md text-secondary mb-stack-md max-w-lg">The booking system is currently undergoing scheduled infrastructure upgrades to improve your experience. Existing tickets remain valid for travel.</p>
            <div className="bg-surface border border-outline-variant rounded p-stack-md mb-stack-lg w-full max-w-md flex flex-col gap-base text-left">
              <div className="flex justify-between">
                <span className="font-body-sm text-body-sm text-secondary">Expected Uptime:</span>
                <span className="font-data-mono text-data-mono text-on-surface">14:00 WAT</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body-sm text-body-sm text-secondary">Offline Alternative:</span>
                <span className="font-body-sm text-body-sm text-on-surface font-semibold">Station Kiosks Open</span>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.location.reload()}>Refresh Status</Button>
          </section>
        </div>
      </div>
    </div>
  );
}
