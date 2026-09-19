import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function PassengerInformationPage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/payment');
  };

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg">
      {/* Canvas Left: Passenger Forms */}
      <section className="md:col-span-8 flex flex-col gap-stack-lg">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Passenger Details</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-stack-sm">Please provide accurate information for all traveling passengers. Names must match ID documents.</p>
        </div>

        {/* Passenger Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md flex flex-col gap-stack-md relative">
          <div className="flex justify-between items-center border-b border-outline-variant pb-stack-sm">
            <h2 className="font-title-md text-title-md text-on-surface">Passenger 1 of 2</h2>
            <span className="font-label-caps text-label-caps text-primary bg-primary-fixed px-2 py-1 rounded">Primary Contact</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mt-stack-sm">
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Full Name</label>
              <input className="w-full border border-outline-variant rounded p-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="e.g. Adebayo Ogunlesi" type="text" defaultValue="Adebayo Ogunlesi" />
            </div>
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Age</label>
              <input className="w-full border border-outline-variant rounded p-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Years" type="number" defaultValue="34" />
            </div>
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Gender</label>
              <select className="w-full border border-outline-variant rounded p-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md border-t border-outline-variant pt-stack-md mt-stack-sm">
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">ID Document Type</label>
              <select className="w-full border border-outline-variant rounded p-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors">
                <option>National ID (NIN)</option>
                <option>Passport</option>
                <option>Voter Card</option>
              </select>
            </div>
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Document Number</label>
              <input className="w-full border border-outline-variant rounded p-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Enter ID number" type="text" defaultValue="NIN-89374928374" />
            </div>
          </div>
        </div>

        {/* Passenger Card 2 */}
        <div className="bg-surface-container-lowest border border-error rounded-lg p-stack-md flex flex-col gap-stack-md relative">
          <div className="flex justify-between items-center border-b border-outline-variant pb-stack-sm">
            <h2 className="font-title-md text-title-md text-on-surface">Passenger 2 of 2</h2>
            <button className="font-label-caps text-label-caps text-error flex items-center gap-1 hover:bg-error-container p-1 rounded transition-colors">
              <Icon name="delete" className="text-sm" /> Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mt-stack-sm">
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-error uppercase flex items-center justify-between">
                Full Name <Icon name="error" className="text-sm" />
              </label>
              <input className="w-full border border-error rounded p-2 font-body-md text-on-surface bg-error-container/20 focus:border-error focus:ring-1 focus:ring-error outline-none transition-colors" placeholder="Required" type="text" />
            </div>
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Age</label>
              <input className="w-full border border-outline-variant rounded p-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Years" type="number" />
            </div>
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Gender</label>
              <select className="w-full border border-outline-variant rounded p-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md border-t border-outline-variant pt-stack-md mt-stack-sm">
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">ID Document Type</label>
              <select className="w-full border border-outline-variant rounded p-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors">
                <option>Select Document</option>
                <option>National ID (NIN)</option>
                <option>Passport</option>
                <option>Voter Card</option>
              </select>
            </div>
            <div className="flex flex-col gap-base">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">Document Number</label>
              <input className="w-full border border-outline-variant rounded p-2 font-body-md text-on-surface bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Enter ID number" type="text" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-start border-t border-outline-variant pt-stack-md">
          <button className="border border-secondary text-secondary font-label-caps text-label-caps px-4 py-2 rounded flex items-center gap-2 hover:bg-surface-variant transition-colors uppercase tracking-wider">
            <Icon name="add" className="text-sm" /> Add Passenger
          </button>
        </div>
        
        <div className="flex items-center gap-2 mt-stack-sm">
          <input className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary focus:ring-2 bg-surface-container-lowest" id="saveInfo" type="checkbox" />
          <label className="font-body-md text-body-md text-on-surface" htmlFor="saveInfo">Save passenger information for faster booking next time.</label>
        </div>
      </section>

      {/* Canvas Right: Sidebar/Summary */}
      <aside className="md:col-span-4 mt-stack-lg md:mt-0">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md sticky top-24 shadow-sm">
          <h3 className="font-title-md text-title-md text-on-surface border-b border-outline-variant pb-stack-sm mb-stack-sm flex items-center gap-2">
            <Icon name="receipt_long" className="text-primary" /> Journey Summary
          </h3>
          <div className="flex flex-col gap-stack-sm mb-stack-md">
            {/* Route Thread */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center pt-1 h-full">
                <div className="w-3 h-3 rounded-full border-2 border-primary bg-surface-container-lowest z-10"></div>
                <div className="w-[2px] h-10 bg-outline-variant"></div>
                <div className="w-3 h-3 rounded-full border-2 border-primary bg-primary z-10"></div>
              </div>
              <div className="flex flex-col justify-between h-full w-full">
                <div className="pb-6">
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Departure</p>
                  <p className="font-body-md text-body-md font-bold text-on-surface">Lagos (LOS)</p>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Arrival</p>
                  <p className="font-body-md text-body-md font-bold text-on-surface">Ibadan (IBA)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container rounded p-stack-sm flex flex-col gap-base mb-stack-md border border-outline-variant border-opacity-50">
            <div className="flex justify-between items-center">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Train</span>
              <span className="font-data-mono text-data-mono text-on-surface">NR-101</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Time</span>
              <span className="font-data-mono text-data-mono text-on-surface">08:00 AM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Seats (2)</span>
              <span className="font-data-mono text-data-mono text-on-surface">C1-2C, C1-2D</span>
            </div>
          </div>
          
          <div className="border-t border-outline-variant pt-stack-sm mb-stack-lg flex justify-between items-end">
            <span className="font-title-md text-title-md text-on-surface">Total Fare</span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile font-data-mono text-primary">₦4,750.00</span>
          </div>
          
          <Button onClick={handleContinue} className="w-full py-4 rounded uppercase tracking-widest gap-2">
            Continue to Payment <Icon name="arrow_forward" className="text-sm" />
          </Button>
        </div>
      </aside>
    </div>
  );
}
