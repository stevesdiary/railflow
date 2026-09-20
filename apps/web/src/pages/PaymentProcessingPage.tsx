import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';

export function PaymentProcessingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a payment processing delay
    const timer = setTimeout(() => {
      // For demonstration, randomly route to success or failed
      // Or just always go to success for a better flow
      navigate('/payment-success');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-surface text-on-surface font-body-md h-screen w-screen overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background blurred context to simulate an overlay */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row filter blur-sm opacity-40 pointer-events-none">
        {/* Mock Summary Left Panel */}
        <div className="hidden md:flex md:w-1/3 bg-surface-container-lowest border-r border-outline-variant p-margin-desktop flex-col gap-stack-lg">
          <div className="font-title-md text-title-md text-primary font-bold">Iron &amp; Rail</div>
          <div className="flex flex-col gap-stack-md mt-stack-lg">
            <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">Trip Details</div>
            <div className="flex justify-between items-center border-b border-outline-variant pb-stack-sm">
              <span className="font-body-md text-body-md text-on-surface">Lagos (LOS)</span>
              <Icon name="arrow_forward" className="text-outline" />
              <span className="font-body-md text-body-md text-on-surface">Abuja (ABV)</span>
            </div>
            <div className="flex justify-between items-center py-stack-sm">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Date</span>
              <span className="font-data-mono text-data-mono text-on-surface">24 Oct, 2023</span>
            </div>
          </div>
          <div className="flex flex-col gap-stack-md mt-auto">
            <div className="font-label-caps text-label-caps text-on-surface-variant uppercase border-b border-outline-variant pb-stack-sm">Fare Summary</div>
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface font-bold">Total Amount</span>
              <span className="font-data-mono text-data-mono text-primary text-title-md font-bold">₦ 45,000</span>
            </div>
          </div>
        </div>
        {/* Mock Map/Image Right Panel */}
        <div className="w-full md:w-2/3 h-full bg-surface-container-high relative">
          <div className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80')" }}></div>
        </div>
      </div>

      {/* Active Overlay Canvas */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/60 backdrop-blur-md p-margin-mobile">
        {/* Processing Modal / Card */}
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-lg md:p-margin-desktop rounded-lg flex flex-col items-center text-center max-w-md w-full shadow-lg relative overflow-hidden">
          {/* Indeterminate Progress Top Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-surface-variant overflow-hidden">
            <div className="h-full bg-primary w-1/3 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] origin-left rounded-r-full"></div>
          </div>
          
          {/* Icon / Spinner */}
          <div className="relative w-24 h-24 mb-stack-lg flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-surface-variant rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <Icon name="lock" className="text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
          
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-sm tracking-tight">
            Processing Payment
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-sm">
            Please wait while we secure your booking. Do not close this window or refresh the page to avoid duplicate charges.
          </p>
          
          {/* Secure Connection Indicator */}
          <div className="flex items-center gap-stack-sm px-stack-md py-stack-sm bg-surface-container rounded border border-outline-variant">
            <Icon name="shield" className="text-on-surface-variant text-[16px]" />
            <span className="font-label-caps text-label-caps text-on-surface-variant">256-bit Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
