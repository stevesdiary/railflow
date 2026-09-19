import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function VerifyEmailPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased">
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, #121c28 1px, transparent 0)", 
            backgroundSize: "24px 24px" 
          }}
        ></div>
        
        <div className="relative z-10 w-full max-w-md bg-surface-container-lowest border border-outline-variant p-stack-lg rounded-xl shadow-sm flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center mb-stack-lg animate-[scaleIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
            <Icon name="check_circle" className="text-on-primary-container text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
          
          {/* Content */}
          <div className="mb-stack-lg space-y-stack-sm w-full">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Account Verified
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mx-auto">
              Your identity has been successfully confirmed. You can now access all features of the Nigerian Rail network.
            </p>
          </div>
          
          {/* Details Card */}
          <div className="w-full bg-surface border border-outline-variant p-stack-md rounded-lg mb-stack-lg text-left">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Traveler ID</span>
              <span className="font-data-mono text-data-mono text-on-surface">NR-2024-89X</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Status</span>
              <span className="font-body-sm text-body-sm font-medium text-primary flex items-center gap-1">
                <Icon name="verified_user" className="text-[16px]" />
                Active
              </span>
            </div>
          </div>
          
          {/* Action */}
          <Button className="w-full py-stack-sm" onClick={() => navigate('/my-bookings')}>
            Continue to Dashboard
          </Button>
        </div>
      </main>

      {/* Note: In a real app we might want to suppress the Layout Footer for this specific page, but we'll leave it as is or rely on the Layout */}
    </div>
  );
}
