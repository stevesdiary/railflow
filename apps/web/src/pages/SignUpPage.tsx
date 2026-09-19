import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function SignUpPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Simplified password strength calculation
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/) && password.match(/[a-z]/)) strength += 1;
    if (password.match(/[0-9]/) || password.match(/[^a-zA-Z0-9]/)) strength += 1;
    if (password.length > 0 && strength === 0) strength = 1;
    return strength;
  };

  const strength = getStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/verify-email');
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col items-center justify-center p-gutter">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center px-margin-desktop h-16 bg-surface border-b border-outline-variant justify-center">
        <span className="font-headline-lg text-headline-lg font-bold text-primary flex items-center gap-stack-sm tracking-tight">
          <Icon name="train" className="text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} />
          Nigerian Rail
        </span>
      </header>

      <main className="w-full max-w-md mt-16">
        <div className="bg-surface-container-lowest border border-outline-variant p-gutter shadow-sm">
          <div className="text-center mb-stack-lg">
            <h1 className="font-headline-lg text-headline-lg text-on-background mb-stack-sm">Create Account</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Join Nigerian Rail for a seamless travel experience.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
            {/* Full Name */}
            <div className="flex flex-col gap-base">
              <label className="font-title-md text-title-md text-on-surface text-sm" htmlFor="fullName">Full Name</label>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface p-stack-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-colors" 
                id="fullName" 
                name="fullName" 
                placeholder="e.g. Chinedu Okafor" 
                required 
                type="text" 
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-base">
              <label className="font-title-md text-title-md text-on-surface text-sm" htmlFor="email">Email Address</label>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface p-stack-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-colors" 
                id="email" 
                name="email" 
                placeholder="name@example.com" 
                required 
                type="email" 
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-base">
              <label className="font-title-md text-title-md text-on-surface text-sm" htmlFor="phone">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-stack-sm bg-surface-variant border border-r-0 border-outline-variant text-on-surface-variant font-data-mono text-data-mono">
                  +234
                </span>
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface p-stack-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-colors flex-1" 
                  id="phone" 
                  name="phone" 
                  placeholder="801 234 5678" 
                  required 
                  type="tel" 
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-base">
              <label className="font-title-md text-title-md text-on-surface text-sm" htmlFor="password">Password</label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface p-stack-sm pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-colors" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-on-surface-variant hover:text-primary" 
                  onClick={() => setShowPassword(!showPassword)} 
                  type="button"
                >
                  <Icon name={showPassword ? "visibility" : "visibility_off"} className="text-xl" />
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1.5 w-full">
                    <div className={`flex-1 transition-colors duration-300 ${strength >= 1 ? (strength === 1 ? 'bg-error' : (strength === 2 ? 'bg-tertiary-fixed-dim' : 'bg-surface-tint')) : 'bg-surface-variant'}`}></div>
                    <div className={`flex-1 transition-colors duration-300 ${strength >= 2 ? (strength === 2 ? 'bg-tertiary-fixed-dim' : 'bg-surface-tint') : 'bg-surface-variant'}`}></div>
                    <div className={`flex-1 transition-colors duration-300 ${strength >= 3 ? 'bg-surface-tint' : 'bg-surface-variant'}`}></div>
                  </div>
                  <p className={`font-label-caps text-label-caps mt-1 text-right ${strength === 1 ? 'text-error' : (strength === 2 ? 'text-tertiary-fixed-dim' : 'text-surface-tint')}`}>
                    {strength === 1 ? 'WEAK' : (strength === 2 ? 'MEDIUM' : 'STRONG')}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-base">
              <label className="font-title-md text-title-md text-on-surface text-sm" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface p-stack-sm pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-colors" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  placeholder="••••••••" 
                  required 
                  type={showConfirmPassword ? "text" : "password"}
                />
                <button 
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-on-surface-variant hover:text-primary" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  type="button"
                >
                  <Icon name={showConfirmPassword ? "visibility" : "visibility_off"} className="text-xl" />
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-stack-sm mt-stack-sm">
              <div className="flex items-center h-5">
                <input 
                  className="w-4 h-4 border border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary focus:ring-offset-surface-container-lowest rounded-sm cursor-pointer" 
                  id="terms" 
                  name="terms" 
                  required 
                  type="checkbox" 
                />
              </div>
              <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="terms">
                I agree to the <Link to="/terms" className="text-primary hover:underline font-title-md text-sm">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline font-title-md text-sm">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit Button */}
            <Button className="w-full py-stack-sm mt-stack-md flex items-center justify-center gap-2" type="submit">
              Create Account
              <Icon name="arrow_forward" className="text-lg" />
            </Button>
          </form>

          {/* Divider */}
          <div className="my-stack-lg flex items-center">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink-0 mx-4 font-body-sm text-body-sm text-on-surface-variant">OR</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="font-body-md text-body-md text-on-surface">
              Already have an account? 
              <Link to="/login" className="text-primary font-title-md text-title-md hover:underline ml-1">Login here</Link>
            </p>
          </div>

          {/* Trust Signal */}
          <div className="mt-stack-lg pt-stack-md border-t border-outline-variant flex items-center justify-center gap-2 text-on-surface-variant opacity-80">
            <Icon name="lock" className="text-[18px]" />
            <span className="font-body-sm text-body-sm">Secure, 256-bit encrypted connection</span>
          </div>
        </div>
      </main>
    </div>
  );
}
