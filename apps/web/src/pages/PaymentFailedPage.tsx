import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function PaymentFailedPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      {/* Transactional Header */}
      <header className="w-full bg-surface border-b border-outline-variant h-16 flex items-center px-4 md:px-margin-desktop shrink-0">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 group hover:opacity-80">
          <Icon name="arrow_back" className="text-primary group-hover:-translate-x-1 transition-transform" />
          <span className="font-title-md text-title-md font-bold text-primary">Iron &amp; Rail</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-margin-desktop">
        <div className="max-w-md w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-6 md:p-8 shadow-sm flex flex-col items-center text-center">
          
          {/* Error Icon & Headline */}
          <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mb-6">
            <Icon name="error" className="text-error text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
          
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-2">
            Payment Failed
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            We couldn't process your payment. This could be due to insufficient funds or a network issue.
          </p>

          {/* Order Summary Snippet */}
          <div className="w-full bg-surface-container-low border border-outline-variant rounded p-4 mb-8 text-left">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm uppercase">Order Summary</h3>
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-body-md text-body-md text-on-surface">Lagos to Abuja - Standard</span>
              <span className="font-data-mono text-data-mono text-on-surface">₦ 12,500</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm">
              <span>1 Passenger</span>
              <span>Seat 42A</span>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-stack-md">
            <Button 
              className="w-full font-title-md text-title-md py-3 rounded flex items-center justify-center gap-2"
              onClick={() => navigate('/payment-processing')}
            >
              <Icon name="refresh" className="text-[20px]" />
              Retry Payment
            </Button>
            <Button 
              variant="outline"
              className="w-full font-title-md text-title-md py-3 rounded flex items-center justify-center"
              onClick={() => navigate('/payment-initiation')}
            >
              Change Payment Method
            </Button>
          </div>
          
        </div>
      </main>
    </div>
  );
}
