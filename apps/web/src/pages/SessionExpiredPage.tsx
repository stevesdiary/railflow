import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function SessionExpiredPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop">
      <main className="w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant shadow-sm rounded flex flex-col overflow-hidden relative">
        {/* Decorative Header Bar */}
        <div className="h-2 bg-primary w-full"></div>
        
        {/* Content Area */}
        <div className="p-stack-lg flex flex-col items-center text-center">
          {/* Security Icon */}
          <div className="w-16 h-16 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center mb-stack-md text-primary">
            <Icon name="shield_lock" className="text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
          
          {/* Title */}
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-sm">
            Session Expired
          </h1>
          
          {/* Message */}
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-[320px]">
            Your session has expired for your security. Please log in again to continue managing your bookings.
          </p>
          
          {/* Action Button */}
          <Button 
            className="w-full py-stack-sm flex justify-center items-center gap-stack-sm"
            onClick={() => navigate('/login')}
          >
            <Icon name="login" /> Login Again
          </Button>
          
          {/* Additional Help Link */}
          <button 
            className="mt-stack-md font-body-sm text-body-sm text-secondary hover:text-primary transition-colors flex items-center gap-base"
            onClick={() => navigate('/help')}
          >
            <Icon name="help" className="text-[16px]" /> Need assistance?
          </button>
        </div>
      </main>
    </div>
  );
}
