import { Icon } from '../components/ui/Icon';

export function AdminScheduleJourneyPage() {
  return (
    <div className="flex-1 p-margin-mobile md:p-margin-desktop bg-surface-bright overflow-y-auto w-full max-w-container-max mx-auto h-full">
      <div className="mb-stack-lg">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-base">Schedule New Journey</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Configure operational parameters for a new scheduled service.</p>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Primary Configuration */}
        <div className="lg:col-span-8 flex flex-col gap-stack-md">
          
          {/* Section: Route & Asset Selection */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-sm border-b border-surface-variant pb-base">Route & Asset Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mt-stack-md">
              <div>
                <label htmlFor="route-select" className="block text-on-surface-variant font-label-caps text-label-caps mb-base">Select Route</label>
                <div className="relative">
                  <select id="route-select" className="block w-full rounded border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200 pl-3 pr-10 py-2 appearance-none">
                    <option disabled selected value="">Choose origin & destination...</option>
                    <option value="LOS-ABV">Lagos (LOS) → Abuja (ABV) - Express</option>
                    <option value="ABV-KAD">Abuja (ABV) → Kaduna (KAD) - Standard</option>
                    <option value="PHC-ENU">Port Harcourt (PHC) → Enugu (ENU) - Intercity</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
                    <Icon name="expand_more" className="text-[20px]" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="train-select" className="block text-on-surface-variant font-label-caps text-label-caps mb-base">Assign Train Unit</label>
                <div className="relative">
                  <select id="train-select" className="block w-full rounded border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200 pl-3 pr-10 py-2 appearance-none">
                    <option disabled selected value="">Select available unit...</option>
                    <option value="T-042">Unit T-042 (Status: Available, Location: LOS)</option>
                    <option value="T-089">Unit T-089 (Status: Available, Location: LOS)</option>
                    <option disabled value="T-105">Unit T-105 (Status: Maintenance)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
                    <Icon name="expand_more" className="text-[20px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Schedule Details */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-sm border-b border-surface-variant pb-base">Schedule Definition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md mt-stack-md">
              <div>
                <label htmlFor="journey-date" className="block text-on-surface-variant font-label-caps text-label-caps mb-base">Departure Date</label>
                <input type="date" id="journey-date" className="block w-full rounded border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200 px-3 py-2" />
              </div>
              <div>
                <label htmlFor="departure-time" className="block text-on-surface-variant font-label-caps text-label-caps mb-base">Departure Time</label>
                <input type="time" id="departure-time" className="block w-full rounded border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200 px-3 py-2" />
              </div>
              <div>
                <label htmlFor="arrival-time" className="block text-on-surface-variant font-label-caps text-label-caps mb-base">Estimated Arrival</label>
                <input type="time" id="arrival-time" className="block w-full rounded border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200 px-3 py-2" />
              </div>
            </div>

            {/* Visual Thread */}
            <div className="mt-stack-md bg-surface p-stack-sm rounded border border-surface-variant flex items-center justify-between text-on-surface-variant font-data-mono text-data-mono">
              <div className="flex items-center gap-stack-sm">
                <Icon name="trip_origin" className="text-primary" />
                <span>--:-- LOS</span>
              </div>
              <div className="flex-1 mx-stack-sm h-px bg-outline-variant relative">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface px-2 text-[10px]">DURATION: --h --m</span>
              </div>
              <div className="flex items-center gap-stack-sm">
                <span>--:-- ABV</span>
                <Icon name="location_on" className="text-primary" />
              </div>
            </div>
          </div>

          {/* Section: Commercial Configuration */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-sm border-b border-surface-variant pb-base">Commercial Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mt-stack-md">
              <div>
                <label htmlFor="base-fare" className="block text-on-surface-variant font-label-caps text-label-caps mb-base">Base Fare (Standard Class)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-on-surface-variant font-data-mono text-data-mono">₦</span>
                  </div>
                  <input type="number" id="base-fare" min="0" placeholder="0.00" step="100" className="block w-full rounded border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200 pl-8 pr-3 py-2 font-data-mono text-data-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-stack-sm">
                <div>
                  <label htmlFor="rac-limit" className="block text-on-surface-variant font-label-caps text-label-caps mb-base">RAC Limit</label>
                  <input type="number" id="rac-limit" min="0" defaultValue="20" className="block w-full rounded border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200 px-3 py-2 font-data-mono text-data-mono" />
                </div>
                <div>
                  <label htmlFor="wl-limit" className="block text-on-surface-variant font-label-caps text-label-caps mb-base">Waitlist Limit</label>
                  <input type="number" id="wl-limit" min="0" defaultValue="50" className="block w-full rounded border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-200 px-3 py-2 font-data-mono text-data-mono" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Context & Actions */}
        <div className="lg:col-span-4 flex flex-col gap-stack-md">
          {/* Journey Capacity Preview Panel */}
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-stack-md shadow-sm">
            <h4 className="font-title-md text-title-md text-on-surface mb-stack-sm flex items-center gap-base">
              <Icon name="analytics" className="text-primary" />
              Capacity Preview
            </h4>
            <div className="space-y-stack-sm mt-stack-md">
              <div className="flex justify-between items-center py-base border-b border-surface-variant">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Selected Unit</span>
                <span className="font-data-mono text-data-mono text-on-surface">--</span>
              </div>
              <div className="flex justify-between items-center py-base border-b border-surface-variant">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Total Capacity</span>
                <span className="font-data-mono text-data-mono text-on-surface">-- seats</span>
              </div>
              <div className="pt-stack-sm">
                <span className="font-label-caps text-label-caps text-on-surface-variant mb-base block">Class Distribution</span>
                <div className="w-full bg-surface-variant h-4 rounded overflow-hidden flex">
                  <div className="bg-primary h-full w-[60%]" title="Standard (60%)"></div>
                  <div className="bg-primary-container h-full w-[30%]" title="Business (30%)"></div>
                  <div className="bg-tertiary h-full w-[10%]" title="First Class (10%)"></div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-on-surface-variant font-data-mono">
                  <span>STD</span>
                  <span>BUS</span>
                  <span>FST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md sticky top-[80px]">
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md">Review all parameters before scheduling. This action will make the journey available for passenger booking immediately.</p>
            <div className="flex flex-col gap-stack-sm">
              <button type="button" className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-3 rounded shadow-[0_4px_6px_-1px_rgba(26,38,52,0.1)] hover:bg-on-primary-fixed-variant transition-colors flex justify-center items-center gap-base">
                <Icon name="event_available" className="text-[18px]" />
                Confirm & Schedule
              </button>
              <button type="button" className="w-full bg-transparent border border-outline text-on-surface font-label-caps text-label-caps py-3 rounded hover:bg-surface-container-low transition-colors">
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
