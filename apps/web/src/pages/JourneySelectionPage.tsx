import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function JourneySelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-container-max mx-auto p-margin-mobile md:p-margin-desktop">
      {/* Search Header */}
      <div className="mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-stack-sm">
        <div>
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider">Search Results</p>
          <h2 className="font-display-lg text-display-lg text-on-background">
            Lagos <Icon name="arrow_right_alt" className="align-middle px-2" /> Ibadan
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Mon, Oct 28, 2026 • 3 Trains Found</p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0 flex items-center gap-2 border border-outline-variant px-4 py-2 bg-surface text-primary hover:bg-surface-container transition-colors rounded-DEFAULT font-body-sm text-body-sm font-medium">
          <Icon name="edit" className="text-sm" /> Modify Search
        </Button>
      </div>

      {/* Filters & Controls Layout */}
      <div className="flex flex-col xl:flex-row gap-gutter">
        {/* Filters Sidebar */}
        <aside className="w-full xl:w-64 flex-shrink-0 flex flex-col gap-stack-md">
          {/* Time Filter Card */}
          <div className="bg-surface border border-outline-variant p-4 rounded-lg">
            <h3 className="font-title-md text-title-md text-on-surface mb-3">Departure Time</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="w-5 h-5 rounded-DEFAULT border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Morning (06:00 - 11:59)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="w-5 h-5 rounded-DEFAULT border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Afternoon (12:00 - 17:59)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="w-5 h-5 rounded-DEFAULT border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Evening (18:00 - 23:59)</span>
              </label>
            </div>
          </div>
          {/* Class Filter Card */}
          <div className="bg-surface border border-outline-variant p-4 rounded-lg">
            <h3 className="font-title-md text-title-md text-on-surface mb-3">Class Type</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="w-5 h-5 rounded-DEFAULT border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">First Class</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="w-5 h-5 rounded-DEFAULT border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Business</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="w-5 h-5 rounded-DEFAULT border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Economy</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Train Results List */}
        <div className="flex-1 flex flex-col gap-stack-lg">
          {/* Card 1: Train 101 */}
          <div className="bg-surface border border-outline-variant rounded-lg p-6 hover:shadow-md transition-shadow duration-300 relative group overflow-hidden">
            {/* High-density header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">08:00</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Lagos (LOS)</span>
              </div>
              <div className="flex-1 px-8 flex flex-col items-center justify-center">
                <span className="font-body-sm text-body-sm text-on-surface-variant bg-surface px-2 relative z-10">2h 15m</span>
                <div className="w-full h-px border-t-2 border-dashed border-outline-variant relative -top-3">
                  <Icon name="train" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-outline-variant bg-surface px-1" />
                </div>
                <span className="font-data-mono text-data-mono text-primary font-bold mt-1">NR-101 (Morning Express)</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">10:15</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Ibadan (IBA)</span>
              </div>
            </div>
            
            {/* Class Availabilities Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-outline-variant pt-4">
              {/* Economy */}
              <div 
                className="border border-outline-variant rounded-DEFAULT p-3 flex flex-col justify-between hover:border-primary transition-colors cursor-pointer bg-surface-container-low"
                onClick={() => navigate('/seat-selection')}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body-sm text-body-sm font-bold text-on-surface">Economy</span>
                  <span className="bg-primary text-on-primary font-label-caps text-[10px] px-2 py-1 rounded-sm uppercase">Available</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="font-data-mono text-data-mono font-bold text-primary text-lg">₦4,000</span>
                  <button className="text-primary font-body-sm text-body-sm hover:underline">Select</button>
                </div>
              </div>
              {/* Business */}
              <div 
                className="border border-outline-variant rounded-DEFAULT p-3 flex flex-col justify-between hover:border-primary transition-colors cursor-pointer bg-surface-container-low"
                onClick={() => navigate('/seat-selection')}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body-sm text-body-sm font-bold text-on-surface">Business</span>
                  <span className="bg-[#d7e3f7] text-[#101c2a] font-label-caps text-[10px] px-2 py-1 rounded-sm uppercase">RAC - 12</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="font-data-mono text-data-mono font-bold text-primary text-lg">₦8,500</span>
                  <button className="text-primary font-body-sm text-body-sm hover:underline">Select</button>
                </div>
              </div>
              {/* First Class */}
              <div 
                className="border border-outline-variant rounded-DEFAULT p-3 flex flex-col justify-between hover:border-primary transition-colors cursor-pointer bg-surface-container-low opacity-60"
                onClick={() => navigate('/seat-selection')}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body-sm text-body-sm font-bold text-on-surface">First Class</span>
                  <span className="bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px] px-2 py-1 rounded-sm uppercase">Waitlist - 4</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="font-data-mono text-data-mono font-bold text-primary text-lg">₦15,000</span>
                  <button className="text-primary font-body-sm text-body-sm hover:underline">Select</button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
              <button className="text-primary font-body-sm text-body-sm flex items-center gap-1 hover:underline">
                <Icon name="info" className="text-sm" /> Route Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
