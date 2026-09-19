import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function BookingStatusWaitlistPage() {
  return (
    <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">
      <div className="grid grid-cols-12 gap-gutter">
        {/* Left Column: Status & Journey */}
        <div className="col-span-12 lg:col-span-8 space-y-stack-lg">
          {/* Status Header Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-lg flex flex-col gap-stack-md shadow-sm">
            <div className="flex items-center gap-stack-sm text-[#F59E0B] mb-stack-sm">
              <Icon name="hourglass_empty" className="text-[#F59E0B]" style={{ fontVariationSettings: "'FILL' 1" }} />
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Waitlist Status</h1>
            </div>
            
            <div className="flex flex-col md:flex-row gap-gutter">
              <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded p-stack-md flex-1 flex items-center justify-between">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-base">INITIAL POSITION</p>
                  <p className="font-display-lg text-display-lg text-on-surface">WL 14</p>
                </div>
                <Icon name="arrow_forward" className="text-outline-variant text-4xl" />
              </div>
              <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded p-stack-md flex-1 flex items-center justify-between">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-base">CURRENT POSITION</p>
                  <p className="font-display-lg text-display-lg text-on-surface font-bold">WL 8</p>
                </div>
                <Icon name="sync" className="text-[#F59E0B] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} />
              </div>
            </div>
            
            {/* Visual Timeline */}
            <div className="mt-stack-lg relative pt-stack-md mb-stack-md">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant -z-10 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-[#F59E0B] -z-10 -translate-y-1/2"></div>
              <div className="flex justify-between relative">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-surface-container-lowest text-on-primary">
                    <Icon name="check" className="text-sm" />
                  </div>
                  <span className="font-body-sm text-body-sm font-bold text-on-surface mt-base">Booked</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center border-2 border-surface-container-lowest text-on-surface shadow-[0_0_0_4px_rgba(245,158,11,0.2)]">
                    <Icon name="more_horiz" className="text-sm" style={{ fontVariationSettings: "'FILL' 1" }} />
                  </div>
                  <span className="font-body-sm text-body-sm font-bold text-on-surface mt-base">Waitlisted</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border-2 border-surface-container-lowest text-outline">
                    <Icon name="train" className="text-sm" />
                  </div>
                  <span className="font-body-sm text-body-sm text-outline mt-base">Confirmed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Journey Summary Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
            {/* Train Info */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md">
              <div className="flex items-center gap-stack-sm mb-stack-md">
                <Icon name="directions_railway" className="text-primary" />
                <h2 className="font-title-md text-title-md text-on-surface">Train Details</h2>
              </div>
              <p className="font-data-mono text-data-mono text-on-surface-variant">NRC-Express 104</p>
              <div className="flex items-center gap-stack-sm mt-stack-sm">
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface">Lagos</span>
                  <span className="font-body-sm text-body-sm text-outline">08:00 AM</span>
                </div>
                <div className="flex-1 border-t-2 border-dashed border-outline-variant relative">
                  <Icon name="arrow_forward" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-outline-variant bg-surface-container-lowest px-1 text-sm" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-title-md text-title-md text-on-surface">Ibadan</span>
                  <span className="font-body-sm text-body-sm text-outline">10:30 AM</span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-stack-md">12 October 2024 • 2h 30m</p>
            </div>
            
            {/* Passenger & PNR */}
            <div className="flex flex-col gap-stack-md">
              <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex-1">
                <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm">PNR NUMBER</h2>
                <div className="font-data-mono text-data-mono text-title-md text-on-surface tracking-wider bg-surface-variant p-stack-sm rounded text-center mb-stack-md border border-outline-variant">
                  NR-8X9Y2Z
                </div>
                <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm">PASSENGER</h2>
                <p className="font-body-md text-body-md font-bold text-on-surface">Oluwaseun Adebayo</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Adult Male • Standard Class</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Rules & Actions */}
        <div className="col-span-12 lg:col-span-4 space-y-stack-lg">
          {/* Educational Section */}
          <div className="bg-surface-container-low border border-outline-variant rounded p-stack-md">
            <div className="flex items-start gap-stack-sm mb-stack-sm">
              <Icon name="info" className="text-primary mt-1" />
              <div>
                <h3 className="font-title-md text-title-md text-on-surface mb-base">What does Waitlist mean?</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Travel is <strong>NOT yet confirmed</strong>. You currently do not have an allocated seat. As confirmed passengers cancel, your position will move up. You may be promoted to RAC (Reservation Against Cancellation) or Fully Confirmed.
                </p>
              </div>
            </div>
          </div>
          
          {/* Rules & Refunds */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-md">Rules &amp; Refunds</h3>
            <ul className="space-y-stack-sm font-body-sm text-body-sm text-on-surface-variant">
              <li className="flex items-start gap-stack-sm">
                <Icon name="policy" className="text-outline text-sm mt-0.5" />
                If ticket remains waitlisted at chart preparation (4 hours before departure), it is automatically cancelled.
              </li>
              <li className="flex items-start gap-stack-sm">
                <Icon name="currency_exchange" className="text-outline text-sm mt-0.5" />
                Full refund (minus nominal clerkage fee) is processed within 3-5 working days for auto-cancelled waitlist tickets.
              </li>
            </ul>
          </div>
          
          {/* Actions */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex flex-col gap-stack-md">
            <Button variant="outline" className="w-full text-error border-error hover:bg-error-container/20">
              Cancel Waitlist Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
