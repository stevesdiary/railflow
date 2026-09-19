import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function AccountLockedPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      <main className="flex-1 flex flex-col justify-center px-margin-mobile py-stack-lg max-w-[480px] mx-auto w-full">
        {/* Graphic / Icon */}
        <div className="flex justify-center mb-stack-lg">
          <div className="w-24 h-24 rounded-full bg-tertiary-fixed flex items-center justify-center relative shadow-sm border border-tertiary-fixed-dim/30">
            <Icon name="lock_clock" className="text-on-tertiary-container" style={{ fontSize: '48px' }} />
            {/* Abstract ring indicator */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="stroke-tertiary-fixed-dim/20" cx="50" cy="50" fill="none" r="48" strokeWidth="4"></circle>
              <circle className="stroke-on-tertiary-container" cx="50" cy="50" fill="none" r="48" strokeDasharray="301.59" strokeDashoffset="75.39" strokeLinecap="round" strokeWidth="4"></circle>
            </svg>
          </div>
        </div>
        
        {/* Text Content */}
        <div className="text-center mb-stack-lg space-y-stack-sm">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Account Temporarily Locked</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] mx-auto">
            Your account has been locked for 30 minutes due to multiple failed login attempts. This is a security measure to protect your data.
          </p>
        </div>
        
        {/* Timer Display */}
        <div className="bg-surface-container-low border border-outline-variant rounded-lg p-stack-md flex flex-col items-center justify-center mb-stack-lg">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-base">Time Remaining</span>
          <span className="font-data-mono text-data-mono text-3xl text-on-tertiary-container font-bold tracking-tight">
            29:59
          </span>
        </div>
        
        {/* Next Steps / Explanation Box */}
        <div className="bg-surface-container-highest border-l-4 border-l-tertiary-fixed-dim p-stack-md rounded-r-lg mb-stack-lg">
          <div className="flex items-start gap-stack-sm">
            <Icon name="info" className="text-on-tertiary-container flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-title-md text-title-md text-on-surface mb-base text-sm">What to do next</h3>
              <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-2 list-disc list-inside">
                <li>Please wait for the timer to expire before attempting to log in again.</li>
                <li>Ensure you have the correct credentials or reset your password once the lock is lifted.</li>
                <li>If you did not attempt to log in, please contact support immediately to secure your account.</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-auto space-y-stack-sm pt-stack-lg border-t border-outline-variant/30">
          <Button 
            className="w-full py-4 uppercase tracking-wider flex justify-center items-center gap-2"
            onClick={() => navigate('/')}
          >
            <Icon name="home" className="text-lg" /> Return to Home
          </Button>
          <Button 
            variant="outline"
            className="w-full py-4 uppercase tracking-wider flex justify-center items-center gap-2"
            onClick={() => navigate('/help')}
          >
            <Icon name="support_agent" className="text-lg" /> Contact Support
          </Button>
        </div>
      </main>
    </div>
  );
}
