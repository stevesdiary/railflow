import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function BookingConfirmationPage() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="flex-grow pt-8 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col items-center">
      {/* Success Header */}
      <div className="text-center mb-stack-lg animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-fixed mb-stack-sm shadow-sm">
          <Icon name="check_circle" className="text-primary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} />
        </div>
        <h1 className="font-display-lg text-display-lg text-primary mb-base">Booking Confirmed!</h1>
        <p className="font-body-md text-body-md text-secondary">Your journey is secured. An email confirmation has been sent.</p>
      </div>

      {/* PNR Card */}
      <div className="bg-surface border border-outline-variant rounded-xl p-stack-md w-full max-w-2xl mb-stack-lg flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <p className="font-label-caps text-label-caps text-secondary mb-base uppercase">Booking Reference (PNR)</p>
          <p className="font-headline-lg text-headline-lg text-primary tracking-tight">NR-8X9Y2Z</p>
        </div>
        <div className="mt-stack-sm md:mt-0 flex gap-stack-sm">
          <button className="px-4 py-2 border border-outline rounded text-primary hover:bg-surface-container-low transition-colors font-body-md text-body-md flex items-center gap-2">
            <Icon name="content_copy" className="text-sm" /> Copy PNR
          </button>
        </div>
      </div>

      {/* Digital Ticket */}
      <div className="relative bg-surface border border-outline-variant rounded-xl w-full max-w-2xl shadow-sm mb-stack-lg overflow-hidden">
        {/* Ticket Header */}
        <div className="bg-primary p-stack-md flex justify-between items-center text-on-primary">
          <div>
            <p className="font-label-caps text-label-caps opacity-80 uppercase mb-1">Train</p>
            <p className="font-title-md text-title-md">NRC-Express 104</p>
          </div>
          <div className="text-right">
            <p className="font-label-caps text-label-caps opacity-80 uppercase mb-1">Status</p>
            <div className="inline-flex items-center gap-1 bg-primary-fixed text-on-primary-fixed-variant px-2 py-1 rounded font-body-sm text-body-sm font-semibold">
              <Icon name="check_circle" className="text-sm" /> Confirmed
            </div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-stack-md">
          {/* Journey */}
          <div className="flex items-center justify-between mb-stack-lg relative">
            <div className="text-center md:text-left z-10 bg-surface pr-4">
              <p className="font-display-lg text-display-lg text-primary leading-none">LOS</p>
              <p className="font-body-sm text-body-sm text-secondary">Mobolaji Johnson</p>
            </div>
            <div className="flex-grow flex items-center justify-center relative mx-4">
              <div className="absolute w-full h-px bg-outline-variant top-1/2 -translate-y-1/2"></div>
              <div className="bg-surface px-2 z-10 flex flex-col items-center">
                <Icon name="train" className="text-primary mb-1" />
                <span className="font-label-caps text-label-caps text-secondary uppercase">2h 15m</span>
              </div>
            </div>
            <div className="text-center md:text-right z-10 bg-surface pl-4">
              <p className="font-display-lg text-display-lg text-primary leading-none">IBA</p>
              <p className="font-body-sm text-body-sm text-secondary">Obafemi Awolowo</p>
            </div>
          </div>

          {/* Grid Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-md">
            <div>
              <p className="font-label-caps text-label-caps text-secondary uppercase mb-1">Date</p>
              <p className="font-body-md text-body-md text-on-surface">Mon, 12 Oct</p>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-secondary uppercase mb-1">Departure</p>
              <p className="font-body-md text-body-md text-on-surface">08:00 AM</p>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-secondary uppercase mb-1">Coach</p>
              <p className="font-body-md text-body-md text-on-surface">C-4</p>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-secondary uppercase mb-1">Seats</p>
              <p className="font-body-md text-body-md text-on-surface font-semibold text-primary">12A, 12B</p>
            </div>
          </div>
        </div>

        {/* Tear Line */}
        <div className="relative py-4">
          <div className="ticket-cutout"></div>
          <div className="ticket-cutout right"></div>
          <div className="ticket-dash mx-6"></div>
        </div>

        {/* Ticket Footer */}
        <div className="p-stack-md flex flex-col md:flex-row justify-between items-start md:items-end bg-surface-container-low">
          <div className="mb-stack-sm md:mb-0">
            <p className="font-label-caps text-label-caps text-secondary uppercase mb-1">Passengers</p>
            <p className="font-body-md text-body-md text-on-surface">Oluwaseun Adebayo</p>
            <p className="font-body-md text-body-md text-on-surface">Chiamaka Adebayo</p>
          </div>
          <div className="text-left md:text-right">
            <p className="font-label-caps text-label-caps text-secondary uppercase mb-1">Total Fare</p>
            <p className="font-data-mono text-data-mono text-title-md text-primary font-bold">₦4,750.00</p>
          </div>
        </div>
      </div>
      
      <Button onClick={handleReturnHome} className="px-8 py-3 rounded">
        Return to Home
      </Button>
    </div>
  );
}
