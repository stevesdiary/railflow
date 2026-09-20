import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const isMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMatch && hasMinLength && hasUppercase && hasNumber) {
      navigate('/login');
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md">
      <main className="flex-grow flex items-center justify-center p-margin-desktop">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant shadow-sm rounded-xl overflow-hidden relative">
          {/* Decorative Header Bar */}
          <div className="h-2 w-full bg-primary absolute top-0 left-0"></div>
          
          <div className="p-stack-lg">
            {/* Branding */}
            <div className="flex items-center gap-stack-sm mb-stack-lg">
              <Icon name="train" className="text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }} />
              <h1 className="font-headline-lg text-headline-lg font-bold text-primary">Nigerian Rail</h1>
            </div>
            
            <div className="mb-stack-lg">
              <h2 className="font-title-md text-title-md text-on-surface mb-stack-sm">Reset Password</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Please create a new password for your account. Ensure it meets the security requirements below.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-stack-lg">
              {/* New Password Input */}
              <div className="flex flex-col gap-base">
                <label className="font-label-caps text-label-caps text-on-surface uppercase" htmlFor="new-password">New Password</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface border border-outline text-on-surface font-body-md px-stack-md py-[12px] rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
                    id="new-password" 
                    name="new-password" 
                    placeholder="Enter new password" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    aria-label="Toggle password visibility" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? "visibility" : "visibility_off"} />
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-surface-container-low border border-outline-variant rounded p-stack-md flex flex-col gap-stack-sm">
                <p className="font-label-caps text-label-caps text-on-surface uppercase mb-base">Password Requirements</p>
                
                <div className={`flex items-center gap-stack-sm ${hasMinLength ? 'text-[#006b54]' : 'text-on-surface-variant'}`}>
                  <Icon name={hasMinLength ? "check_circle" : "radio_button_unchecked"} className="text-sm" style={{ fontVariationSettings: hasMinLength ? "'FILL' 1" : "" }} />
                  <span className="font-body-sm text-body-sm">Minimum 8 characters</span>
                </div>
                
                <div className={`flex items-center gap-stack-sm ${hasUppercase ? 'text-[#006b54]' : 'text-on-surface-variant'}`}>
                  <Icon name={hasUppercase ? "check_circle" : "radio_button_unchecked"} className="text-sm" style={{ fontVariationSettings: hasUppercase ? "'FILL' 1" : "" }} />
                  <span className="font-body-sm text-body-sm">At least 1 uppercase letter</span>
                </div>
                
                <div className={`flex items-center gap-stack-sm ${hasNumber ? 'text-[#006b54]' : 'text-on-surface-variant'}`}>
                  <Icon name={hasNumber ? "check_circle" : "radio_button_unchecked"} className="text-sm" style={{ fontVariationSettings: hasNumber ? "'FILL' 1" : "" }} />
                  <span className="font-body-sm text-body-sm">At least 1 number</span>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="flex flex-col gap-base">
                <label className="font-label-caps text-label-caps text-on-surface uppercase" htmlFor="confirm-password">Confirm New Password</label>
                <div className="relative">
                  <input 
                    className={`w-full bg-surface border ${isMatch ? 'border-primary' : 'border-outline'} text-on-surface font-body-md px-stack-md py-[12px] rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors`}
                    id="confirm-password" 
                    name="confirm-password" 
                    placeholder="Re-enter new password" 
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button 
                    aria-label="Toggle password visibility" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Icon name={showConfirmPassword ? "visibility" : "visibility_off"} />
                  </button>
                </div>
                {/* Validation Message */}
                {isMatch && (
                  <p className="font-body-sm text-body-sm text-primary mt-base flex items-center gap-1">
                    <Icon name="check_circle" className="text-sm" style={{ fontVariationSettings: "'FILL' 1" }} />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="pt-stack-md flex flex-col gap-stack-sm">
                <Button className="w-full py-[12px]" type="submit" disabled={!isMatch || !hasMinLength || !hasUppercase || !hasNumber}>
                  Reset Password
                </Button>
                <Button variant="outline" className="w-full py-[12px]" type="button" onClick={() => navigate('/login')}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
