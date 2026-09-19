import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success or error
    // For now, let's just navigate to home on success
    navigate('/');
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop font-body-md antialiased selection:bg-primary selection:text-on-primary">
      <div className="w-full max-w-container-max flex flex-col lg:flex-row gap-gutter rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant shadow-sm h-full min-h-[600px] lg:h-[800px]">
        {/* Imagery Side (Desktop Only) */}
        <div className="hidden lg:block w-1/2 relative bg-surface-variant overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEjbOtU7Efw5YFUxF919wUrEVXJxQejsVCxEWMEmKIT3z-omDB2eUKilQ52iZ2YvxcribKG6RtGNwdOS76KfIdf6AxMwSRADBha3WWye9dF_DZJORFQvSqXg9hU3Tv1QfYDwLxoVX0s4-zPDkBcNZcvunzQh5Fs2zdFxNwXad_yZm9CGpSdkrqrnCS7NEReDXM_R31gYVUk1_CShWvoqtZ-63bqbW3-Pd6b0J60kvfYNMk4sYHLyxDk-LN53zf_xcMENkX6vCmH50')" }}
          ></div>
          {/* Overlay gradient for branding */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
          <div className="absolute bottom-stack-lg left-stack-lg right-stack-lg text-on-primary">
            <div className="font-headline-lg text-headline-lg mb-stack-sm flex items-center gap-stack-sm">
              <Icon name="train" className="text-display-lg" style={{ fontVariationSettings: "'FILL' 1" }} />
              Nigerian Rail
            </div>
            <p className="font-body-md text-body-md opacity-90 max-w-md">Connecting the nation with precision, safety, and unwavering reliability.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-gutter md:px-[80px] lg:px-[100px] relative">
          {/* Mobile Brand Logo */}
          <div className="lg:hidden mb-stack-lg text-primary font-headline-lg-mobile text-headline-lg-mobile flex items-center gap-stack-sm border-b border-outline-variant pb-stack-sm">
            <Icon name="train" style={{ fontVariationSettings: "'FILL' 1" }} />
            Nigerian Rail
          </div>
          
          <div className="mb-stack-lg">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-base">Secure Portal Access</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Enter your credentials to manage bookings and schedules.</p>
          </div>

          {/* Error State */}
          {hasError && (
            <div className="bg-error-container border-l-4 border-error p-stack-sm mb-stack-lg flex items-start gap-stack-sm rounded-r-DEFAULT" role="alert">
              <Icon name="error" className="text-error mt-0.5" />
              <div>
                <h3 className="font-label-caps text-label-caps text-on-error-container">Authentication Failed</h3>
                <p className="font-body-sm text-body-sm text-on-error-container mt-1">The Traveler ID or password entered is incorrect. Please verify your credentials and try again.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
            {/* Traveler ID Input */}
            <div className="relative">
              <label className="font-label-caps text-label-caps text-on-surface block mb-base" htmlFor="traveler_id">Traveler ID or Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-stack-sm flex items-center pointer-events-none text-outline">
                  <Icon name="badge" />
                </span>
                <input 
                  className="block w-full pl-10 pr-stack-sm py-stack-sm border border-outline-variant rounded-DEFAULT bg-surface text-on-surface font-data-mono text-data-mono placeholder:text-outline focus:ring-0 focus:border-primary focus:border-2 transition-colors outline-none" 
                  id="traveler_id" 
                  name="traveler_id" 
                  placeholder="NR-XXXXXX" 
                  required 
                  type="text" 
                  defaultValue="NR-2024" 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex justify-between items-center mb-base">
                <label className="font-label-caps text-label-caps text-on-surface block" htmlFor="password">Passcode</label>
                <Link to="/forgot-password" className="font-label-caps text-label-caps text-primary hover:underline focus:outline-none focus:underline">Forgot Access?</Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-stack-sm flex items-center pointer-events-none text-outline">
                  <Icon name="key" />
                </span>
                <input 
                  className={`block w-full pl-10 pr-10 py-stack-sm border ${hasError ? 'border-2 border-error text-error' : 'border border-outline-variant'} rounded-DEFAULT bg-surface text-on-surface font-data-mono text-data-mono placeholder:text-outline focus:ring-0 ${hasError ? 'focus:border-error' : 'focus:border-primary focus:border-2'} outline-none`} 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type="password" 
                  defaultValue="wrongpassword" 
                />
                <button className="absolute inset-y-0 right-0 pr-stack-sm flex items-center text-outline hover:text-on-surface focus:outline-none" type="button">
                  <Icon name="visibility_off" />
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mt-stack-sm">
              <input className="h-4 w-4 rounded-DEFAULT border-outline-variant text-primary focus:ring-primary focus:ring-offset-background bg-surface cursor-pointer" id="remember_me" name="remember_me" type="checkbox" />
              <label className="ml-2 block font-body-sm text-body-sm text-on-surface-variant cursor-pointer" htmlFor="remember_me">
                Remember this device for 30 days
              </label>
            </div>

            {/* Primary Action */}
            <Button className="mt-stack-md w-full py-stack-sm shadow-sm" type="submit">
              Sign In
            </Button>
          </form>

          {/* Secondary Action */}
          <div className="mt-stack-lg border-t border-outline-variant pt-stack-lg text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              New to Nigerian Rail? 
              <Link to="/signup" className="font-title-md text-title-md text-primary hover:underline ml-1 focus:outline-none focus:underline">Register Traveler ID</Link>
            </p>
          </div>

          <div className="mt-auto pt-stack-lg text-center opacity-70">
            <Icon name="lock" className="text-outline text-[16px]" />
            <span className="font-label-caps text-label-caps text-outline ml-1 align-top">Secured via National Rail Network Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
}
