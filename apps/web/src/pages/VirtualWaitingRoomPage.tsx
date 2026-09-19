import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

type QueueStatus = 'waiting' | 'admitted' | 'timeout' | 'closed' | 'unavailable';

export function VirtualWaitingRoomPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Allow ?status=admitted to override the status for testing
  const initialStatus = (searchParams.get('status') as QueueStatus) || 'waiting';
  const [status, setStatus] = useState<QueueStatus>(initialStatus);

  // Sync state with URL parameter for easy prototyping
  useEffect(() => {
    const urlStatus = searchParams.get('status') as QueueStatus;
    if (urlStatus && ['waiting', 'admitted', 'timeout', 'closed', 'unavailable'].includes(urlStatus)) {
      setStatus(urlStatus);
    }
  }, [searchParams]);

  // Handle waiting state UI
  if (status === 'waiting') {
    return (
      <div className="flex-grow pt-8 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Primary Waiting Area */}
          <div className="lg:col-span-8 space-y-stack-lg">
            {/* Status Banner */}
            <div className="bg-surface-container border border-outline-variant rounded-lg p-stack-md flex items-center justify-between">
              <div className="flex items-center gap-stack-sm text-primary">
                <Icon name="sync" className="animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }} />
                <span className="font-title-md text-title-md">Queue Active</span>
              </div>
              <div className="font-data-mono text-data-mono text-on-surface-variant">
                Auto-refreshing in <span className="font-bold">30</span>s
              </div>
            </div>

            {/* Hero Section: Queue Position */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-margin-desktop shadow-sm text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-primary opacity-5 mix-blend-multiply pointer-events-none"></div>
              <Icon name="hourglass_empty" className="text-[64px] text-primary mb-stack-md block mx-auto" />
              <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm">You are in the queue</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-2xl mx-auto">
                Your place in the queue is being protected. Please wait while we prepare the booking engine for your request.
              </p>
              
              <div className="grid grid-cols-2 gap-gutter mb-stack-lg max-w-md mx-auto">
                <div className="bg-surface-container p-stack-md rounded border border-outline-variant">
                  <div className="font-label-caps text-label-caps text-on-surface-variant mb-base uppercase tracking-wider">Position</div>
                  <div className="font-data-mono text-[32px] leading-tight font-bold text-primary">1,452</div>
                </div>
                <div className="bg-surface-container p-stack-md rounded border border-outline-variant">
                  <div className="font-label-caps text-label-caps text-on-surface-variant mb-base uppercase tracking-wider">Est. Wait</div>
                  <div className="font-data-mono text-[32px] leading-tight font-bold text-primary">12 <span className="text-title-md">min</span></div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-xl mx-auto">
                <div className="h-2 bg-surface-variant rounded-full overflow-hidden border border-outline-variant">
                  <div className="h-full bg-primary rounded-full w-[40%] transition-all duration-1000 ease-out"></div>
                </div>
                <div className="flex justify-between mt-stack-sm font-data-mono text-data-mono text-on-surface-variant">
                  <span>Queue Joined</span>
                  <span>Booking Ready</span>
                </div>
              </div>
            </div>

            {/* Booking Context */}
            <div className="bg-surface-container border border-outline-variant rounded-lg p-stack-md">
              <h2 className="font-title-md text-title-md text-on-surface border-b border-outline-variant pb-stack-sm mb-stack-sm">Current Booking Window</h2>
              <div className="flex items-center gap-stack-md">
                <div className="bg-primary-container/10 p-stack-sm rounded">
                  <Icon name="train" className="text-primary" />
                </div>
                <div>
                  <div className="font-title-md text-title-md text-primary">Lagos - Ibadan Holiday Express</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Standard & First Class Seating Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Rules & Info */}
          <div className="lg:col-span-4 space-y-stack-lg">
            {/* Session Status */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <h3 className="font-title-md text-title-md text-on-surface mb-stack-md flex items-center gap-stack-sm">
                <Icon name="check_circle" className="text-primary" style={{ fontVariationSettings: "'FILL' 1" }} />
                Session Status
              </h3>
              <div className="space-y-stack-sm font-body-sm text-body-sm">
                <div className="flex justify-between items-center py-base border-b border-surface-variant">
                  <span className="text-on-surface-variant">Authentication</span>
                  <span className="font-data-mono text-primary font-bold">Verified</span>
                </div>
                <div className="flex justify-between items-center py-base border-b border-surface-variant">
                  <span className="text-on-surface-variant">Connection</span>
                  <span className="font-data-mono text-primary font-bold">Stable</span>
                </div>
                <div className="flex justify-between items-center py-base">
                  <span className="text-on-surface-variant">Status</span>
                  <span className="font-data-mono text-primary font-bold">Waiting</span>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-surface-container border border-outline-variant rounded-lg p-stack-md">
              <h3 className="font-title-md text-title-md text-on-surface mb-stack-md flex items-center gap-stack-sm">
                <Icon name="rule" className="text-secondary" />
                Queue Guidelines
              </h3>
              <ul className="space-y-stack-sm font-body-sm text-body-sm text-on-surface">
                <li className="flex items-start gap-stack-sm">
                  <Icon name="do_not_disturb" className="text-error text-[20px] mt-0.5" />
                  <span><strong>Do not refresh this page.</strong> Refreshing may reset your position in the queue.</span>
                </li>
                <li className="flex items-start gap-stack-sm">
                  <Icon name="person" className="text-secondary text-[20px] mt-0.5" />
                  <span><strong>One session per user.</strong> Multiple tabs will not increase speed and may cause errors.</span>
                </li>
                <li className="flex items-start gap-stack-sm">
                  <Icon name="reorder" className="text-secondary text-[20px] mt-0.5" />
                  <span><strong>FIFO processing.</strong> First-In, First-Out allocation guarantees a fair booking experience.</span>
                </li>
              </ul>
            </div>

            {/* Anti-Abuse Note */}
            <div className="bg-surface border border-outline-variant rounded-lg p-stack-md flex items-start gap-stack-sm">
              <Icon name="security" className="text-primary mt-1" />
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Our system detects and prevents automated access to ensure fairness for all travelers.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Admitted state
  if (status === 'admitted') {
    return (
      <div className="flex-1 py-16 px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter max-w-container-max w-full mx-auto">
          {/* Primary Action Area (Celebratory) */}
          <div className="col-span-1 md:col-span-8 border border-outline-variant bg-surface-container-lowest rounded-xl p-stack-lg md:p-margin-desktop flex flex-col justify-between min-h-[420px] relative overflow-hidden shadow-sm">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-fixed rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-fixed to-primary"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container text-on-primary-container mb-stack-lg">
                <Icon name="check_circle" className="text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} />
              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm tracking-tight">
                You're up!
              </h1>
              <p className="font-title-md text-title-md text-on-surface-variant max-w-lg">
                The wait is over. You can now start your booking and secure your seats.
              </p>
            </div>

            <div className="mt-stack-lg pt-stack-lg relative z-10 border-t border-outline-variant/30">
              <Button 
                className="w-full md:w-auto px-10 py-4 flex items-center justify-center gap-2"
                onClick={() => navigate('/search')}
              >
                Start Booking <Icon name="arrow_forward" />
              </Button>
              <div className="mt-stack-md flex items-start gap-2 bg-surface-container-low p-stack-sm rounded border border-outline-variant/50 max-w-fit">
                <Icon name="info" className="text-secondary text-sm mt-0.5" />
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Your session is valid for <strong className="font-semibold text-on-surface">15 minutes</strong> once you enter the booking flow.
                </p>
              </div>
            </div>
          </div>

          {/* Context & Timer Area */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-gutter">
            {/* Timer Card */}
            <div className="border border-error/30 bg-error-container rounded-xl p-stack-lg flex flex-col items-center text-center justify-center relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-error/5 animate-pulse pointer-events-none"></div>
              <Icon name="hourglass_top" className="text-on-error-container mb-base" />
              <p className="font-body-sm text-body-sm text-on-error-container mb-2 font-medium">Time remaining to start session</p>
              <div className="font-data-mono text-data-mono text-4xl text-on-error-container font-bold tracking-widest tabular-nums">
                04:59
              </div>
            </div>

            {/* Booking Window Summary Card */}
            <div className="border border-outline-variant bg-surface-container-lowest rounded-xl p-stack-md md:p-stack-lg flex-1 shadow-sm">
              <h2 className="font-title-md text-title-md text-on-surface mb-stack-md flex items-center gap-2 border-b border-outline-variant pb-stack-sm">
                <Icon name="receipt_long" className="text-primary" />
                Booking Window
              </h2>
              <div className="space-y-stack-sm mt-stack-md">
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Route</span>
                  <span className="font-data-mono text-data-mono text-on-surface font-semibold text-right">Lagos ➝ Ibadan</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Travel Date</span>
                  <span className="font-data-mono text-data-mono text-on-surface text-right">24 Oct 2023</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-outline-variant/30">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Class</span>
                  <span className="font-data-mono text-data-mono text-on-surface text-right">Standard</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Passengers</span>
                  <span className="font-data-mono text-data-mono text-on-surface text-right">2 Adults</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Error/Terminal States
  if (['timeout', 'closed', 'unavailable'].includes(status)) {
    return (
      <div className="flex-1 flex items-center justify-center py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter w-full">
          {/* Card 1: Session Expired (Timeout) */}
          <div className={`bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg flex flex-col items-start gap-stack-md relative overflow-hidden group hover:shadow-sm transition-shadow duration-300 ${status === 'timeout' ? 'ring-2 ring-secondary ring-offset-2 ring-offset-background' : 'opacity-50 grayscale'}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary-fixed"></div>
            <div className="p-3 bg-secondary-fixed/20 rounded-full text-secondary">
              <Icon name="schedule" className="text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} />
            </div>
            <h2 className="font-title-md text-title-md text-on-surface">Session Expired</h2>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
              Your session has timed out due to inactivity. Please rejoin the queue if tickets are still available.
            </p>
            <div className="font-data-mono text-data-mono text-secondary mb-4">Error Code: TIMEOUT_401</div>
            <Button className="w-full" onClick={() => setStatus('waiting')}>REJOIN QUEUE</Button>
          </div>

          {/* Card 2: Queue Closed */}
          <div className={`bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg flex flex-col items-start gap-stack-md relative overflow-hidden group hover:shadow-sm transition-shadow duration-300 ${status === 'closed' ? 'ring-2 ring-outline ring-offset-2 ring-offset-background' : 'opacity-50 grayscale'}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-outline"></div>
            <div className="p-3 bg-surface-variant rounded-full text-secondary">
              <Icon name="lock" className="text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} />
            </div>
            <h2 className="font-title-md text-title-md text-on-surface">Queue Closed</h2>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
              The booking window for this journey is now closed. All available tickets have been allocated.
            </p>
            <div className="font-data-mono text-data-mono text-secondary mb-4">Status: ALLOCATED</div>
            <Button variant="outline" className="w-full" onClick={() => navigate('/')}>RETURN TO HOME</Button>
          </div>

          {/* Card 3: Service Unavailable */}
          <div className={`bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg flex flex-col items-start gap-stack-md relative overflow-hidden group hover:shadow-sm transition-shadow duration-300 ${status === 'unavailable' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-50 grayscale'}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-surface-tint"></div>
            <div className="p-3 bg-surface-container rounded-full text-surface-tint">
              <Icon name="warning" className="text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} />
            </div>
            <h2 className="font-title-md text-title-md text-on-surface">Service Unavailable</h2>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
              We are experiencing high traffic. Please try again in a few moments.
            </p>
            <div className="font-data-mono text-data-mono text-secondary mb-4">Status: HIGH_LOAD</div>
            <Button className="w-full" onClick={() => setStatus('waiting')}>RETRY CONNECTION</Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
