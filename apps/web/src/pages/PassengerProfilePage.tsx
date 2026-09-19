import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function PassengerProfilePage() {
  return (
    <div className="flex-1 w-full max-w-container-max mx-auto p-margin-mobile md:p-margin-desktop bg-background mb-stack-lg">
      <div className="max-w-3xl mx-auto">
        <div className="mb-stack-lg">
          <h1 className="font-headline-lg text-headline-lg font-bold text-primary mb-base">Personal Information</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Update your core identity details. This information is used for ticketing and security verification.</p>
        </div>
        
        <div className="bg-surface border border-outline-variant rounded-xl p-stack-lg shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container-highest rounded-bl-full opacity-20 pointer-events-none"></div>
          
          <form className="flex flex-col gap-gutter">
            {/* Form Section: Identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              <div className="flex flex-col gap-base">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="firstName">First Name</label>
                <input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" id="firstName" type="text" defaultValue="Chidi" />
              </div>
              <div className="flex flex-col gap-base">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="lastName">Last Name</label>
                <input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" id="lastName" type="text" defaultValue="Eze" />
              </div>
            </div>
            
            {/* Form Section: Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
              <div className="flex flex-col gap-base md:col-span-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="dob">Date of Birth</label>
                <div className="relative">
                  <input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors pr-10" id="dob" type="date" defaultValue="1985-05-14" />
                </div>
              </div>
              
              <div className="flex flex-col gap-base md:col-span-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="gender">Gender</label>
                <div className="relative">
                  <select className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none pr-10" id="gender" defaultValue="male">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                  <Icon name="arrow_drop_down" className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none" />
                </div>
              </div>
              
              <div className="flex flex-col gap-base md:col-span-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="nationality">Nationality</label>
                <div className="relative">
                  <select className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none pr-10" id="nationality" defaultValue="NG">
                    <option value="NG">Nigerian</option>
                    <option value="GH">Ghanaian</option>
                    <option value="UK">British</option>
                    <option value="US">American</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <Icon name="arrow_drop_down" className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Verification Status Banner */}
            <div className="mt-stack-sm bg-surface-container-low border border-outline-variant rounded-lg p-4 flex items-start gap-3">
              <Icon name="verified_user" className="text-primary mt-0.5" />
              <div>
                <h4 className="font-title-md text-title-md text-primary mb-1">Identity Verified</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Your identity has been verified against national records. Some fields cannot be changed to maintain ticketing integrity. Contact support for corrections.</p>
              </div>
            </div>
            
            <hr className="border-t border-outline-variant my-stack-sm" />
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-stack-sm pt-stack-sm">
              <Button variant="outline" type="button" className="px-6 py-3">
                Cancel
              </Button>
              <Button type="submit" className="px-6 py-3 shadow-sm">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
