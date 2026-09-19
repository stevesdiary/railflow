import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop">
        <div className="w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-sm">
          <div className="mb-stack-lg text-center">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-stack-sm flex items-center justify-center gap-2">
              <Icon name="train" className="text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} />
              Nigerian Rail
            </h1>
            <h2 className="font-title-md text-title-md text-on-surface">
              {isSent ? "Email Sent" : "Forgot Password"}
            </h2>
            {!isSent && (
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-stack-sm">
                Enter your registered email address or phone number. We'll send you instructions to reset your password.
              </p>
            )}
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
              <div className="flex flex-col gap-base">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="identifier">Email or Phone Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                    <Icon name="mail" style={{ fontVariationSettings: "'FILL' 0" }} />
                  </span>
                  <input 
                    className="w-full pl-10 pr-3 py-2 border border-outline rounded bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-body-md text-body-md" 
                    id="identifier" 
                    name="identifier" 
                    placeholder="user@example.com" 
                    required 
                    type="text" 
                  />
                </div>
              </div>
              <Button className="w-full py-3 mt-stack-sm flex items-center justify-center gap-2" type="submit">
                Send Reset Link
                <Icon name="arrow_forward" className="text-[18px]" />
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center p-stack-md bg-primary-container/10 border border-primary-container rounded">
              <Icon name="check_circle" className="text-primary text-[32px] mb-stack-sm" style={{ fontVariationSettings: "'FILL' 1" }} />
              <h3 className="font-title-md text-title-md text-primary mb-base">Check Your Inbox</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                We've sent a password reset link to your email. Please follow the instructions to set a new password.
              </p>
            </div>
          )}

          <div className="mt-stack-lg text-center">
            <Link to="/login" className="inline-flex items-center gap-base font-body-sm text-body-sm text-secondary hover:text-primary transition-colors">
              <Icon name="arrow_back" className="text-[16px]" />
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
