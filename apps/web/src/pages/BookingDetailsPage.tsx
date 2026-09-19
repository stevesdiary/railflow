import { useParams, useLocation } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function BookingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const status = location.state?.status || 'confirmed'; // 'confirmed', 'rac', 'waitlist'

  return (
    <div className="flex-grow px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto w-full mb-stack-lg">
      {/* PNR Header & Status */}
      {status === 'confirmed' && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg gap-stack-md">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Booking Management</h1>
            <div className="flex items-center gap-stack-sm text-secondary">
              <span className="font-body-md text-body-md">PNR:</span>
              <span className="font-data-mono text-data-mono text-primary font-bold tracking-widest bg-surface-container-highest px-2 py-1 rounded">
                {id || 'NR-8X9Y2Z'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded border border-primary/20">
            <Icon name="check_circle" style={{ fontVariationSettings: "'FILL' 1" }} />
            <span className="font-title-md text-title-md">Confirmed</span>
          </div>
        </div>
      )}

      {status === 'rac' && (
        <div className="mb-stack-lg">
          <div className="bg-[#d69a00]/10 border border-[#d69a00] rounded p-stack-md flex items-start gap-stack-md">
            <Icon name="info" className="text-[#d69a00] mt-1" style={{ fontVariationSettings: "'FILL' 1" }} />
            <div>
              <h1 className="font-title-md text-title-md text-on-surface mb-base">Booking Confirmed - RAC Status</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Your journey is confirmed. You are currently placed in Reservation Against Cancellation (RAC).</p>
            </div>
          </div>
        </div>
      )}

      {status === 'waitlist' && (
        <div className="mb-stack-lg">
          <div className="bg-surface-container border border-outline-variant rounded p-stack-md flex items-start gap-stack-md">
            <Icon name="pending_actions" className="text-secondary mt-1" />
            <div>
              <h1 className="font-title-md text-title-md text-on-surface mb-base">Waitlisted</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Your booking is currently on the waitlist. You will be notified if a seat becomes available.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
        {/* Left Column: Main Journey Details */}
        <div className="lg:col-span-2 flex flex-col gap-stack-lg">
          {/* Journey Details Card */}
          <section className="bg-surface border border-outline-variant rounded p-stack-md relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex justify-between items-start mb-stack-md pl-2">
              <div>
                <h2 className="font-title-md text-title-md text-on-surface mb-1">Lagos Express 101</h2>
                <p className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
                  <Icon name="train" className="text-[16px]" /> Express Train
                </p>
              </div>
              <button className="text-primary hover:bg-surface-container px-2 py-1 rounded transition-colors text-sm font-medium flex items-center gap-1 border border-transparent hover:border-outline-variant">
                <Icon name="map" className="text-[16px]" /> View Route
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-stack-sm sm:gap-stack-md bg-surface-container-lowest border border-outline-variant p-stack-sm rounded ml-2">
              {/* Origin */}
              <div className="flex-1 text-center sm:text-left p-2">
                <div className="font-body-sm text-body-sm text-secondary mb-1">Origin</div>
                <div className="font-title-md text-title-md text-on-surface mb-1">Lagos</div>
                <div className="font-data-mono text-data-mono text-on-surface-variant">08:00 AM</div>
                <div className="font-body-sm text-body-sm text-secondary mt-1">24 Oct 2024</div>
              </div>
              
              {/* Visual Thread */}
              <div className="flex flex-col items-center justify-center px-4 w-full sm:w-auto">
                <div className="font-body-sm text-body-sm text-secondary mb-1">2h 15m</div>
                <div className="flex items-center w-full">
                  <div className="w-2 h-2 rounded-full border-2 border-primary bg-white"></div>
                  <div className="h-[2px] bg-outline-variant w-16 sm:w-24"></div>
                  <div className="w-2 h-2 rounded-full border-2 border-primary bg-primary"></div>
                </div>
                <div className="font-body-sm text-body-sm text-secondary mt-1">Non-stop</div>
              </div>
              
              {/* Destination */}
              <div className="flex-1 text-center sm:text-right p-2">
                <div className="font-body-sm text-body-sm text-secondary mb-1">Destination</div>
                <div className="font-title-md text-title-md text-on-surface mb-1">Ibadan</div>
                <div className="font-data-mono text-data-mono text-on-surface-variant">10:15 AM</div>
                <div className="font-body-sm text-body-sm text-secondary mt-1">24 Oct 2024</div>
              </div>
            </div>
          </section>

          {/* Passenger Info */}
          <section className="bg-surface border border-outline-variant rounded p-stack-md shadow-sm">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-md border-b border-outline-variant pb-2">Passenger Information</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-lowest">
                    <th className="py-2 px-3 font-label-caps text-label-caps text-secondary font-bold">Passenger</th>
                    <th className="py-2 px-3 font-label-caps text-label-caps text-secondary font-bold">Class</th>
                    <th className="py-2 px-3 font-label-caps text-label-caps text-secondary font-bold">Coach</th>
                    <th className="py-2 px-3 font-label-caps text-label-caps text-secondary font-bold text-right">Seat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-outline-variant hover:bg-surface-bright transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-body-md text-body-md text-on-surface font-medium">Oluwaseun Adebayo</div>
                      <div className="font-body-sm text-body-sm text-secondary">Adult</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-surface-container px-2 py-1 rounded text-sm text-on-surface-variant border border-outline-variant">Standard</span>
                    </td>
                    <td className="py-3 px-3 font-data-mono text-data-mono">
                      {status === 'waitlist' ? '-' : (status === 'rac' ? 'Pending' : 'C4')}
                    </td>
                    <td className="py-3 px-3 font-data-mono text-data-mono text-right font-bold text-primary">
                      {status === 'waitlist' ? '-' : (status === 'rac' ? 'RAC-12' : '12')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Timeline */}
          <section className="bg-surface border border-outline-variant rounded p-stack-md shadow-sm">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-md">Booking Timeline</h3>
            <div className="relative flex flex-col md:flex-row justify-between pt-4">
              {/* Line behind steps */}
              <div className="absolute top-[28px] left-6 right-6 h-[2px] bg-outline-variant hidden md:block z-0"></div>
              <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-outline-variant md:hidden z-0"></div>
              
              {/* Step 1 */}
              <div className="flex flex-row md:flex-col items-center md:items-center relative z-10 mb-6 md:mb-0 w-full md:w-auto">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                  <Icon name="check" className="text-[14px] text-white" style={{ fontVariationSettings: "'FILL' 1" }} />
                </div>
                <div className="ml-4 md:ml-0 md:mt-2 md:text-center flex-grow">
                  <div className="font-body-sm text-body-sm font-bold text-on-surface">Created</div>
                  <div className="font-label-caps text-label-caps text-secondary">20 Oct, 09:00</div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-row md:flex-col items-center md:items-center relative z-10 mb-6 md:mb-0 w-full md:w-auto">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                  <Icon name="check" className="text-[14px] text-white" style={{ fontVariationSettings: "'FILL' 1" }} />
                </div>
                <div className="ml-4 md:ml-0 md:mt-2 md:text-center flex-grow">
                  <div className="font-body-sm text-body-sm font-bold text-on-surface">Payment</div>
                  <div className="font-label-caps text-label-caps text-secondary">20 Oct, 09:05</div>
                </div>
              </div>
              
              {/* Step 3 (Active) */}
              <div className="flex flex-row md:flex-col items-center md:items-center relative z-10 mb-6 md:mb-0 w-full md:w-auto">
                <div className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center border-2 border-primary shadow-sm shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div className="ml-4 md:ml-0 md:mt-2 md:text-center flex-grow">
                  <div className="font-body-sm text-body-sm font-bold text-primary">Confirmed</div>
                  <div className="font-label-caps text-label-caps text-secondary">20 Oct, 09:05</div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-row md:flex-col items-center md:items-center relative z-10 mb-6 md:mb-0 w-full md:w-auto opacity-50">
                <div className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center border-2 border-outline-variant shadow-sm shrink-0"></div>
                <div className="ml-4 md:ml-0 md:mt-2 md:text-center flex-grow">
                  <div className="font-body-sm text-body-sm font-medium text-on-surface-variant">Travel</div>
                  <div className="font-label-caps text-label-caps text-secondary">24 Oct</div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="flex flex-row md:flex-col items-center md:items-center relative z-10 w-full md:w-auto opacity-50">
                <div className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center border-2 border-outline-variant shadow-sm shrink-0"></div>
                <div className="ml-4 md:ml-0 md:mt-2 md:text-center flex-grow">
                  <div className="font-body-sm text-body-sm font-medium text-on-surface-variant">Completed</div>
                  <div className="font-label-caps text-label-caps text-secondary">-</div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {/* Right Column: Payment & Actions */}
        <div className="flex flex-col gap-stack-lg">
          {/* Fare Breakdown */}
          <section className="bg-surface-bright border border-outline-variant rounded p-stack-md shadow-sm">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-md border-b border-outline-variant pb-2">Payment Details</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
                <span>Base Fare (1x Adult)</span>
                <span className="font-data-mono text-data-mono">₦ 8,500.00</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
                <span>Taxes &amp; Fees</span>
                <span className="font-data-mono text-data-mono">₦ 425.00</span>
              </div>
              <div className="border-t border-outline-variant pt-3 flex justify-between items-center font-bold text-on-surface">
                <span>Total Amount</span>
                <span className="font-data-mono text-data-mono text-lg text-primary">₦ 8,925.00</span>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-3 rounded border border-outline-variant flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Icon name="credit_card" className="text-primary text-xl" />
                <div>
                  <div className="font-body-sm text-body-sm font-medium text-on-surface">Paystack</div>
                  <div className="font-label-caps text-label-caps text-secondary">Card ending in 4242</div>
                </div>
              </div>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Paid</span>
            </div>
          </section>
          
          {/* Actions */}
          <section className="bg-surface border border-outline-variant rounded p-stack-md shadow-sm">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-md border-b border-outline-variant pb-2">Actions &amp; Support</h3>
            <div className="flex flex-col gap-3">
              <Button className="w-full py-3">
                <Icon name="download" /> Download Ticket
              </Button>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button variant="outline" className="w-full">
                  <Icon name="receipt_long" className="text-[18px]" /> Refund
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="support_agent" className="text-[18px]" /> Support
                </Button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-outline-variant">
                <button className="w-full bg-transparent border border-error text-error hover:bg-error-container hover:text-on-error-container py-2 px-4 rounded font-body-sm text-body-sm font-medium flex items-center justify-center gap-2 transition-colors">
                  <Icon name="cancel" className="text-[18px]" /> Cancel Booking
                </button>
                <p className="font-label-caps text-label-caps text-secondary text-center mt-2">
                  Cancellation fees apply up to 24h before departure.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
