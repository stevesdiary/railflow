import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function PaymentInitiationPage() {
  const navigate = useNavigate();

  const handlePay = () => {
    navigate('/payment-processing');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex-1 w-full flex flex-col antialiased">
      {/* TopAppBar Semantic Shell Suppressed for Transactional Intent */}
      <header className="w-full z-50 flex justify-between items-center px-4 md:px-margin-desktop h-16 bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} aria-label="Go back" className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
            <Icon name="arrow_back" className="text-primary" />
          </button>
          <span className="font-title-md text-title-md font-bold text-primary">Iron &amp; Rail</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-label-caps text-label-caps uppercase">
          <Icon name="lock" className="text-[18px]" />
          Secure Checkout
        </div>
      </header>

      <main className="flex-1 w-full max-w-container-max mx-auto px-4 md:px-margin-desktop pt-8 pb-32 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Content Area */}
        <div className="lg:col-span-8 flex flex-col gap-stack-lg">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">Review &amp; Pay</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Please confirm your journey details before proceeding to payment.</p>
          </div>
          
          {/* Journey Summary Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-stack-md md:p-gutter flex flex-col gap-stack-md">
            <div className="flex items-center justify-between border-b border-outline-variant pb-stack-sm">
              <h2 className="font-title-md text-title-md text-primary">Journey Summary</h2>
              <span className="px-2 py-1 bg-[#1a2634]/10 text-[#1a2634] font-label-caps text-label-caps rounded-sm uppercase flex items-center gap-1">
                <Icon name="confirmation_number" className="text-[14px]" /> Pending
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md items-center relative py-stack-md">
              {/* Visual Thread for Desktop */}
              <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-outline-variant -translate-y-1/2 z-0"></div>
              
              <div className="flex flex-col gap-1 relative z-10 bg-surface-container-lowest pr-4">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Departure</span>
                <span className="font-title-md text-title-md text-primary">Lagos (Mobolaji Johnson)</span>
                <span className="font-data-mono text-data-mono text-secondary">08:00 AM • Mon, 12 Oct</span>
              </div>
              
              <div className="flex justify-center relative z-10 bg-surface-container-lowest px-4 py-2 md:py-0">
                <Icon name="train" className="text-outline-variant text-3xl" />
              </div>
              
              <div className="flex flex-col gap-1 relative z-10 bg-surface-container-lowest pl-4 text-left md:text-right">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Arrival</span>
                <span className="font-title-md text-title-md text-primary">Ibadan (Obafemi Awolowo)</span>
                <span className="font-data-mono text-data-mono text-secondary">10:30 AM • Mon, 12 Oct</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-sm pt-stack-md border-t border-outline-variant">
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Train</span>
                <span className="font-body-sm text-body-sm text-on-surface">NRC-Express 104</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Class</span>
                <span className="font-body-sm text-body-sm text-on-surface">Standard</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Coach</span>
                <span className="font-body-sm text-body-sm text-on-surface">C-4</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Seats</span>
                <span className="font-data-mono text-data-mono text-on-surface">12A, 12B</span>
              </div>
            </div>
          </div>
          
          {/* Passenger Info Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-stack-md md:p-gutter flex flex-col gap-stack-md">
            <h2 className="font-title-md text-title-md text-primary border-b border-outline-variant pb-stack-sm">Passenger Details</h2>
            <ul className="flex flex-col gap-stack-sm divide-y divide-outline-variant">
              <li className="flex justify-between items-center py-2">
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-on-surface">Oluwaseun Adebayo</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Adult • NIN: *******4589</span>
                </div>
                <span className="font-data-mono text-data-mono text-on-surface">Seat 12A</span>
              </li>
              <li className="flex justify-between items-center pt-3 py-2">
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-on-surface">Chiamaka Adebayo</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Adult • NIN: *******2103</span>
                </div>
                <span className="font-data-mono text-data-mono text-on-surface">Seat 12B</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Sticky Sidebar for Payment */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-8 bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-stack-md md:p-gutter shadow-sm flex flex-col gap-stack-md">
            <h3 className="font-title-md text-title-md text-primary border-b border-outline-variant pb-stack-sm">Payment Breakdown</h3>
            <ul className="flex flex-col gap-stack-sm text-body-sm font-body-sm border-b border-outline-variant pb-stack-md">
              <li className="flex justify-between items-center">
                <span className="text-on-surface-variant">Standard Ticket (x2)</span>
                <span className="font-data-mono text-data-mono text-on-surface">₦4,500.00</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-on-surface-variant">Taxes &amp; Fees</span>
                <span className="font-data-mono text-data-mono text-on-surface">₦250.00</span>
              </li>
            </ul>
            <div className="flex justify-between items-end pb-stack-sm">
              <span className="font-title-md text-title-md text-primary">Total Amount</span>
              <span className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-data-mono text-data-mono text-primary">₦4,750.00</span>
            </div>
            
            <div className="bg-surface-container-low p-stack-sm rounded border border-outline-variant flex items-start gap-3 mt-2">
              <Icon name="lock" className="text-primary text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }} />
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                You will be redirected to <strong className="text-on-surface">Paystack</strong> to complete your payment safely.
              </p>
            </div>
            
            <button 
              onClick={handlePay}
              className="w-full bg-[#002b1e] hover:bg-[#004331] text-white font-title-md text-title-md py-4 rounded transition-colors flex justify-center items-center gap-2 mt-4 active:scale-[0.98]"
            >
              Pay with Paystack
              <Icon name="arrow_forward" className="text-[20px]" />
            </button>
            
            <div className="text-center mt-2">
              <span className="font-label-caps text-label-caps text-outline uppercase">By proceeding, you agree to our Terms of Service</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
