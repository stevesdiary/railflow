import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function CancellationConfirmationPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [hasConsented, setHasConsented] = useState(false);

  const handleConfirm = () => {
    // In a real app, make API call to cancel, then route to processing/success
    navigate(`/cancellation-status/${id || 'NR-8X9Y2Z'}`, { state: { status: 'success' } });
  };

  return (
    <div className="flex-grow px-margin-mobile md:px-margin-desktop py-stack-lg max-w-3xl mx-auto w-full mb-stack-lg">
      <div className="mb-stack-lg">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-base">Are you sure you want to cancel?</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Review the cancellation details below before proceeding.</p>
      </div>
      
      <div className="bg-surface-container-lowest border border-error-container shadow-sm rounded-xl overflow-hidden">
        {/* Context Header */}
        <div className="bg-error-container bg-opacity-30 px-gutter py-stack-md border-b border-error-container flex justify-between items-center">
          <div>
            <p className="font-label-caps text-label-caps text-on-error-container uppercase">Booking Reference (PNR)</p>
            <p className="font-data-mono text-data-mono text-on-surface font-bold">{id || 'NR-8X9Y2Z'}</p>
          </div>
          <span className="bg-surface-container-lowest text-on-surface-variant border border-outline-variant px-2 py-1 rounded-sm font-label-caps text-label-caps uppercase">Confirmed</span>
        </div>
        
        <div className="p-gutter space-y-stack-lg">
          {/* Journey Details */}
          <section>
            <h2 className="font-title-md text-title-md text-on-surface mb-stack-md flex items-center gap-2">
              <Icon name="route" className="text-secondary" />
              Journey Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md bg-surface p-stack-md border border-outline-variant rounded-lg">
              <div>
                <p className="font-label-caps text-label-caps text-secondary uppercase mb-1">Route</p>
                <p className="font-body-md text-body-md text-on-surface font-medium">Lagos <span className="text-outline-variant mx-1">→</span> Ibadan</p>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-secondary uppercase mb-1">Date</p>
                <p className="font-body-md text-body-md text-on-surface font-medium">Oct 24, 2024</p>
              </div>
              <div className="md:col-span-2 pt-stack-sm border-t border-outline-variant mt-stack-sm">
                <p className="font-label-caps text-label-caps text-secondary uppercase mb-1">Passenger(s)</p>
                <p className="font-body-md text-body-md text-on-surface">Oluwaseun Adebayo</p>
              </div>
            </div>
          </section>

          {/* Financial Breakdown */}
          <section>
            <h2 className="font-title-md text-title-md text-on-surface mb-stack-md flex items-center gap-2">
              <Icon name="payments" className="text-secondary" />
              Refund Breakdown
            </h2>
            <div className="bg-surface-container-low p-stack-md rounded-lg border border-outline-variant">
              <div className="flex justify-between items-center mb-stack-sm">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Original Amount</span>
                <span className="font-data-mono text-data-mono text-on-surface">₦ 8,925.00</span>
              </div>
              <div className="flex justify-between items-center mb-stack-sm text-error">
                <span className="font-body-sm text-body-sm">Cancellation Fee</span>
                <span className="font-data-mono text-data-mono">- ₦ 1,500.00</span>
              </div>
              <div className="border-t border-outline-variant my-stack-sm pt-stack-sm flex justify-between items-center">
                <span className="font-title-md text-title-md text-on-surface font-bold">Total Refund</span>
                <span className="font-data-mono text-data-mono text-primary font-bold text-[18px]">₦ 7,425.00</span>
              </div>
            </div>
          </section>

          {/* Refund Destination */}
          <section>
            <div className="flex items-start gap-stack-md bg-surface p-stack-md border border-outline-variant rounded-lg">
              <Icon name="credit_card" className="text-primary mt-1" />
              <div>
                <p className="font-body-sm text-body-sm text-on-surface font-medium">Refund to Original Payment Method</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Paystack - Card ending in 4242</p>
                <p className="font-label-caps text-label-caps text-secondary uppercase mt-2">Processing Time: 3-5 Business Days</p>
              </div>
            </div>
          </section>

          {/* Consent */}
          <section className="bg-error-container bg-opacity-20 p-stack-md border border-error-container rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input 
                className="mt-1 w-5 h-5 text-error border-error rounded-sm focus:ring-error focus:ring-2 bg-surface" 
                id="consent-checkbox" 
                type="checkbox"
                checked={hasConsented}
                onChange={(e) => setHasConsented(e.target.checked)}
              />
              <span className="font-body-sm text-body-sm text-on-surface">
                I understand that this action is permanent and I agree to the cancellation terms. The total refund amount of ₦ 7,425.00 will be credited to my original payment method.
              </span>
            </label>
          </section>
        </div>

        {/* Actions */}
        <div className="p-gutter border-t border-outline-variant bg-surface flex flex-col-reverse md:flex-row justify-end gap-stack-md">
          <button 
            className="font-body-md text-body-md px-6 py-3 border border-outline rounded-lg text-on-surface hover:bg-surface-container-low transition-colors w-full md:w-auto"
            onClick={() => navigate(-1)}
          >
            Keep Booking
          </button>
          <button 
            className={`font-body-md text-body-md px-6 py-3 bg-error text-on-error rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto font-bold flex justify-center items-center gap-2 ${!hasConsented ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!hasConsented}
            onClick={handleConfirm}
          >
            <Icon name="cancel" className="text-[20px]" />
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  );
}
