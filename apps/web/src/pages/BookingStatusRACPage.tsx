import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function BookingStatusRACPage() {
  return (
    <div className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col gap-stack-lg">
      {/* Status Header */}
      <div className="bg-[#d69a00]/10 border border-[#d69a00] rounded-DEFAULT p-stack-md flex items-start gap-stack-md">
        <Icon name="info" className="text-[#d69a00] mt-1" style={{ fontVariationSettings: "'FILL' 1" }} />
        <div>
          <h1 className="font-title-md text-title-md text-on-surface mb-base">Booking Confirmed - RAC Status</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Your journey is confirmed. You are currently placed in Reservation Against Cancellation (RAC).</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Left Column: Primary Info */}
        <div className="md:col-span-2 flex flex-col gap-stack-lg">
          {/* RAC Details Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-stack-lg shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-md gap-stack-md">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase block mb-base">Current Status</span>
                <div className="flex items-center gap-stack-sm">
                  <span className="font-headline-lg text-headline-lg text-primary">RAC 12</span>
                  <span className="bg-[#d69a00]/10 text-[#d69a00] px-2 py-1 rounded-sm font-label-caps text-label-caps">WAITLISTED</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-stack-sm rounded-DEFAULT border border-outline-variant w-full md:w-auto">
                <span className="font-label-caps text-label-caps text-secondary uppercase block mb-base">PNR Number</span>
                <span className="font-data-mono text-data-mono text-primary font-bold">NR-8X9Y2Z</span>
              </div>
            </div>
            
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md pb-stack-md border-b border-outline-variant">
              <strong>What does this mean?</strong> You are confirmed to travel. You will be assigned a seat if a cancellation occurs, or a shared berth on the day of travel. You can board the train with this ticket.
            </p>
            
            {/* Status Progression */}
            <div>
              <span className="font-label-caps text-label-caps text-secondary uppercase block mb-stack-sm">Status Progression</span>
              <div className="relative flex items-center justify-between w-full max-w-md mt-4 mb-4">
                {/* Track */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant -translate-y-1/2 z-0"></div>
                <div className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-primary -translate-y-1/2 z-0"></div>
                
                {/* Steps */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-4 ring-surface-container-lowest"></div>
                  <span className="font-label-caps text-label-caps text-primary mt-1">Booked</span>
                </div>
                
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-surface-container-lowest border-2 border-[#d69a00] flex items-center justify-center ring-4 ring-surface-container-lowest">
                    <div className="w-2 h-2 rounded-full bg-[#d69a00]"></div>
                  </div>
                  <span className="font-label-caps text-label-caps text-[#d69a00] font-bold mt-1">RAC</span>
                </div>
                
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-surface-container-lowest border-2 border-outline-variant flex items-center justify-center ring-4 ring-surface-container-lowest"></div>
                  <span className="font-label-caps text-label-caps text-secondary mt-1">Confirmed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Journey Details Summary */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-stack-md shadow-sm flex flex-col gap-stack-sm">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="train" className="text-secondary" />
              <h2 className="font-title-md text-title-md text-on-surface">Lagos ➔ Ibadan</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-md">
              <div>
                <span className="font-label-caps text-label-caps text-secondary block">Date</span>
                <span className="font-body-md text-body-md text-on-surface">Oct 24, 2024</span>
              </div>
              <div>
                <span className="font-label-caps text-label-caps text-secondary block">Train</span>
                <span className="font-body-md text-body-md text-on-surface">Express 101</span>
              </div>
              <div>
                <span className="font-label-caps text-label-caps text-secondary block">Class</span>
                <span className="font-body-md text-body-md text-on-surface">Standard</span>
              </div>
              <div>
                <span className="font-label-caps text-label-caps text-secondary block">Passengers</span>
                <span className="font-body-md text-body-md text-on-surface">1 Adult</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Policy */}
        <div className="flex flex-col gap-stack-md">
          {/* Action Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-stack-md shadow-sm flex flex-col gap-stack-md">
            <h3 className="font-title-md text-title-md text-on-surface">Manage Booking</h3>
            <Button className="w-full flex items-center justify-center gap-2">
              <Icon name="download" />
              Download Ticket
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-error border-error hover:bg-error-container/20">
              <Icon name="cancel" />
              Cancel Booking
            </Button>
          </div>
          
          {/* Cancellation Policy Snippet */}
          <div className="bg-surface-container border border-outline-variant rounded-DEFAULT p-stack-md">
            <h4 className="font-body-md text-body-md font-bold text-on-surface mb-base flex items-center gap-2">
              <Icon name="policy" className="text-secondary" />
              Cancellation Policy
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              RAC tickets can be cancelled up to 30 minutes before departure with a minimal processing fee of ₦500.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
