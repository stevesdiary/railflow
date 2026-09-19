import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function CancellationStatusPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');

  useEffect(() => {
    // Determine target status from location state, default to success
    const targetStatus = location.state?.status || 'success';
    
    // Simulate processing delay
    const timer = setTimeout(() => {
      setStatus(targetStatus);
    }, 2500);

    return () => clearTimeout(timer);
  }, [location.state]);

  const pnr = id || 'NR-8X9Y2Z';

  if (status === 'processing') {
    return (
      <div className="bg-background text-on-background min-h-screen relative overflow-hidden flex flex-col">
        {/* Blurred Background (Booking Details Mockup) */}
        <div className="absolute inset-0 filter blur-sm opacity-50 z-0 select-none pointer-events-none flex flex-col items-center pt-24 px-margin-mobile md:px-margin-desktop">
          <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg rounded shadow-sm">
            <div className="flex justify-between items-start mb-stack-lg">
              <div>
                <h2 className="font-title-md text-title-md mb-base">Lagos to Abuja</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Booking Ref: {pnr}</p>
              </div>
              <div className="text-right">
                <p className="font-data-mono text-data-mono">₦ 45,000</p>
                <span className="inline-block mt-base bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded-full font-label-caps text-label-caps">Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Overlay */}
        <div className="absolute inset-0 bg-surface/80 z-10 flex items-center justify-center p-margin-mobile">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg w-full max-w-md shadow-lg flex flex-col items-center text-center">
            {/* Spinner */}
            <div className="mb-stack-lg relative w-16 h-16 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full text-surface-container-highest" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="8"></circle>
              </svg>
              <svg className="absolute inset-0 w-full h-full text-primary animate-spin" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="210" strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <Icon name="sync" className="text-primary text-2xl absolute" />
            </div>
            
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-stack-sm text-primary">
              Processing Cancellation...
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We are communicating with the payment provider to initiate your refund. Please do not close or refresh this page.
            </p>
            <div className="w-full mt-stack-lg bg-surface-container h-1 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/3 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop antialiased">
        <main className="w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm flex flex-col items-center text-center">
          <div className="bg-error-container text-on-error-container w-16 h-16 rounded-full flex items-center justify-center mb-stack-md">
            <Icon name="error" className="text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
          
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-stack-sm">
            Cancellation Could Not Be Processed
          </h1>
          
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
            We encountered an error while processing your request with Paystack. Your booking remains active.
          </p>
          
          <div className="w-full flex flex-col gap-stack-sm mb-stack-lg">
            <Button className="w-full py-stack-sm" onClick={() => setStatus('processing')}>
              Try Again
            </Button>
            <Button variant="outline" className="w-full py-stack-sm">
              Contact Support
            </Button>
          </div>
          
          <div className="bg-surface-variant border border-outline-variant rounded py-stack-sm px-stack-md w-full flex justify-between items-center">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Error Code:</span>
            <span className="font-data-mono text-data-mono text-on-surface">ERR_PYMNT_REFUND_FAIL</span>
          </div>
        </main>
      </div>
    );
  }

  // Success state
  return (
    <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop antialiased">
      <main className="w-full max-w-[500px] animate-fade-in-scale">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg flex flex-col items-center text-center">
          
          <div className="flex flex-col items-center gap-stack-sm mb-stack-md">
            <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mb-base text-primary">
              <Icon name="check_circle" className="text-[48px] animate-check" style={{ fontVariationSettings: "'FILL' 1" }} />
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">
              Booking Cancelled Successfully
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">PNR Reference</span>
              <span className="font-data-mono text-data-mono bg-surface-container px-3 py-1 rounded-full text-on-surface border border-outline-variant">
                {pnr}
              </span>
            </div>
          </div>
          
          <div className="w-full h-px bg-outline-variant opacity-50 my-stack-sm"></div>
          
          <div className="w-full flex flex-col gap-stack-md mt-stack-md">
            <div className="bg-surface-container-low border border-primary-fixed-dim/30 rounded-lg p-stack-md text-left flex items-start gap-stack-sm">
              <Icon name="payments" className="text-primary mt-1" style={{ fontVariationSettings: "'FILL' 1" }} />
              <div className="flex-1">
                <h2 className="font-title-md text-title-md text-on-surface mb-1">Refund Initiated</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  An amount of <strong className="font-data-mono text-data-mono text-on-surface">₦ 7,425.00</strong> has been successfully initiated to your Paystack account.
                </p>
              </div>
            </div>
            
            <div className="bg-surface border border-outline-variant rounded-lg p-stack-md text-left flex items-start gap-stack-sm">
              <Icon name="schedule" className="text-secondary mt-1" />
              <div className="flex-1">
                <h3 className="font-body-md text-body-md font-semibold text-on-surface mb-1">What happens next?</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Please allow 3-5 business days for standard bank processing times before the funds reflect in your designated financial institution.
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full mt-stack-lg">
            <Button className="w-full py-4 flex items-center justify-center gap-2" onClick={() => navigate('/my-bookings')}>
              Return to My Bookings
              <Icon name="arrow_forward" className="text-[20px]" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
