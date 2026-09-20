import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex items-center justify-center p-4">
      {/* Main Container */}
      <main className="w-full max-w-md mx-auto bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Header Image / Hero Area */}
        <div className="h-48 w-full relative bg-surface-container flex items-center justify-center border-b border-outline-variant">
          {/* decorative background */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent"></div>
          {/* Success Icon */}
          <div className="relative z-10 animate-bounce bg-[#b4efd5] rounded-full p-6 flex items-center justify-center">
            <Icon name="check_circle" className="text-6xl text-[#002116]" style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-stack-lg flex flex-col items-center text-center">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-stack-sm">
            Payment Successful!
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
            Your booking has been confirmed. We are generating your ticket now.
          </p>
          
          {/* Booking Summary Card */}
          <div className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-stack-md text-left mb-stack-lg">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-stack-sm border-b border-outline-variant pb-2">
              Booking Summary
            </h3>
            <div className="space-y-stack-sm mt-stack-sm">
              <div className="flex justify-between items-center">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Transaction ID</span>
                <span className="font-data-mono text-data-mono text-on-surface">TRX-8924-M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Amount Paid</span>
                <span className="font-data-mono text-data-mono font-bold text-primary">₦12,500</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Route</span>
                <span className="font-title-md text-title-md text-on-surface text-sm">Abuja → Kaduna</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Date</span>
                <span className="font-body-sm text-body-sm text-on-surface">Oct 24, 2023 - 08:30 AM</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="w-full space-y-stack-md">
            <Button 
              className="w-full font-title-md text-title-md py-3 rounded flex items-center justify-center gap-2"
              onClick={() => navigate('/booking-confirmation')}
            >
              <Icon name="confirmation_number" />
              View Ticket
            </Button>
            <Button 
              variant="outline"
              className="w-full font-title-md text-title-md py-3 rounded flex items-center justify-center"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
