import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function TrainSearchResultsPage() {
  const navigate = useNavigate();
  const [activeDate, setActiveDate] = useState('Oct 28');

  return (
    <div className="flex flex-col flex-1 w-full max-w-container-max mx-auto">
      {/* Search Summary Bar */}
      <div className="bg-surface border-b border-outline-variant px-margin-mobile md:px-margin-desktop py-stack-md sticky top-[84px] md:top-[64px] z-30 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md">
          <div className="flex items-center gap-stack-md">
            <button onClick={() => navigate(-1)} className="md:hidden text-on-surface-variant p-stack-sm -ml-stack-sm">
              <Icon name="arrow_back" />
            </button>
            <div>
              <div className="flex items-center gap-stack-sm font-title-md text-title-md md:text-[24px] font-bold text-on-surface">
                <span>Lagos (LOS)</span>
                <Icon name="arrow_forward" className="text-outline" />
                <span>Ibadan (IBA)</span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-stack-sm mt-base">
                <span>Mon, Oct 28, 2024</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant block"></span>
                <span>1 Passenger</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/search')}
            className="text-primary border border-outline px-stack-md py-stack-sm rounded font-title-md text-title-md text-[14px] hover:bg-surface-container transition-colors flex items-center gap-stack-sm self-end md:self-auto"
          >
            <Icon name="edit" className="text-[18px]" />
            Modify Search
          </button>
        </div>
      </div>

      {/* Date Strip Navigation */}
      <div className="bg-surface-bright border-b border-outline-variant overflow-x-auto hide-scrollbar">
        <div className="flex px-margin-mobile md:px-margin-desktop min-w-max">
          {[
            { day: 'Sun', date: 'Oct 27', price: 'From ₦4k' },
            { day: 'Mon', date: 'Oct 28', price: 'From ₦4k' },
            { day: 'Tue', date: 'Oct 29', price: 'From ₦4k' },
            { day: 'Wed', date: 'Oct 30', price: 'From ₦4k' },
            { day: 'Thu', date: 'Oct 31', price: 'From ₦4k' }
          ].map((d) => (
            <button 
              key={d.date}
              onClick={() => setActiveDate(d.date)}
              className={`flex flex-col items-center justify-center px-stack-lg py-stack-md border-b-2 transition-colors min-w-[120px] ${
                activeDate === d.date 
                  ? 'border-primary bg-primary-container/5 text-primary' 
                  : 'border-transparent hover:bg-surface-container text-on-surface-variant'
              }`}
            >
              <span className={`font-label-caps text-label-caps uppercase ${activeDate === d.date ? '' : 'text-outline'}`}>{d.day}</span>
              <span className="font-title-md text-title-md font-bold mb-base">{d.date}</span>
              <span className={`font-data-mono text-data-mono text-[12px] ${activeDate === d.date ? '' : 'text-outline'}`}>{d.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Layout Grid for Content */}
      <div className="flex flex-col lg:flex-row gap-gutter p-margin-mobile md:p-margin-desktop flex-1">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[280px] shrink-0 hidden md:block">
          <div className="bg-surface rounded-lg border border-outline-variant p-stack-md sticky top-[160px]">
            <div className="flex justify-between items-center mb-stack-md pb-stack-sm border-b border-outline-variant">
              <span className="font-title-md text-title-md font-bold text-on-surface">Filters</span>
              <button className="font-label-caps text-label-caps text-primary hover:underline uppercase">Reset All</button>
            </div>
            
            {/* Filter Section: Departure Time */}
            <div className="mb-stack-lg">
              <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-stack-sm">Departure Time</h4>
              <div className="flex flex-col gap-stack-sm">
                <label className="flex items-center gap-stack-sm cursor-pointer group">
                  <input defaultChecked className="rounded border-outline text-primary focus:ring-primary w-4 h-4 bg-transparent" type="checkbox" />
                  <span className="font-body-sm text-body-sm group-hover:text-primary transition-colors">Morning (06:00 - 11:59)</span>
                </label>
                <label className="flex items-center gap-stack-sm cursor-pointer group">
                  <input className="rounded border-outline text-primary focus:ring-primary w-4 h-4 bg-transparent" type="checkbox" />
                  <span className="font-body-sm text-body-sm group-hover:text-primary transition-colors">Afternoon (12:00 - 17:59)</span>
                </label>
                <label className="flex items-center gap-stack-sm cursor-pointer group">
                  <input className="rounded border-outline text-primary focus:ring-primary w-4 h-4 bg-transparent" type="checkbox" />
                  <span className="font-body-sm text-body-sm group-hover:text-primary transition-colors">Evening (18:00 - 23:59)</span>
                </label>
              </div>
            </div>
            
            {/* Filter Section: Class */}
            <div className="mb-stack-lg">
              <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-stack-sm">Class Type</h4>
              <div className="flex flex-col gap-stack-sm">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-stack-sm">
                    <input defaultChecked className="rounded border-outline text-primary focus:ring-primary w-4 h-4 bg-transparent" type="checkbox" />
                    <span className="font-body-sm text-body-sm group-hover:text-primary transition-colors">Economy</span>
                  </div>
                  <span className="font-data-mono text-data-mono text-[12px] text-outline">₦4k</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-stack-sm">
                    <input defaultChecked className="rounded border-outline text-primary focus:ring-primary w-4 h-4 bg-transparent" type="checkbox" />
                    <span className="font-body-sm text-body-sm group-hover:text-primary transition-colors">Business</span>
                  </div>
                  <span className="font-data-mono text-data-mono text-[12px] text-outline">₦8.5k</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-stack-sm">
                    <input defaultChecked className="rounded border-outline text-primary focus:ring-primary w-4 h-4 bg-transparent" type="checkbox" />
                    <span className="font-body-sm text-body-sm group-hover:text-primary transition-colors">First Class</span>
                  </div>
                  <span className="font-data-mono text-data-mono text-[12px] text-outline">₦15k</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Results List */}
        <div className="flex-1 flex flex-col gap-stack-lg w-full">
          {/* Sort Bar */}
          <div className="flex justify-between items-center bg-surface-bright p-stack-sm rounded-lg border border-outline-variant md:hidden">
            <button className="flex items-center gap-stack-sm text-on-surface font-title-md text-title-md text-[14px]">
              <Icon name="filter_list" className="text-[18px]" />
              Filter
            </button>
            <div className="w-px h-6 bg-outline-variant"></div>
            <button className="flex items-center gap-stack-sm text-on-surface font-title-md text-title-md text-[14px]">
              <Icon name="sort" className="text-[18px]" />
              Sort by: Earliest
            </button>
          </div>
          <div className="hidden md:flex justify-end items-center mb-[-16px]">
            <div className="flex items-center gap-stack-sm font-body-sm text-body-sm text-on-surface-variant">
              <span>Sort by:</span>
              <select className="bg-transparent border-none py-0 pl-1 pr-8 text-on-surface font-title-md text-title-md text-[14px] font-bold focus:ring-0 cursor-pointer">
                <option>Departure (Earliest)</option>
                <option>Duration (Shortest)</option>
                <option>Price (Lowest)</option>
              </select>
            </div>
          </div>

          {/* Journey Card 1 (Available / RAC / Waitlist) */}
          <article className="bg-surface rounded-lg border border-outline-variant hover:shadow-sm transition-shadow overflow-hidden flex flex-col">
            {/* Train Info Header */}
            <div className="p-stack-md border-b border-outline-variant bg-surface-bright flex flex-col md:flex-row justify-between md:items-center gap-stack-md">
              <div className="flex items-center gap-stack-md">
                <div className="bg-surface-variant p-stack-sm rounded-full text-on-surface-variant">
                  <Icon name="train" />
                </div>
                <div>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface">NR-101 (Morning Express)</h3>
                  <span className="font-label-caps text-label-caps text-outline uppercase">Standard Express Train</span>
                </div>
              </div>
              <button className="text-primary font-body-sm text-body-sm font-bold flex items-center gap-base hover:underline self-start md:self-auto">
                <Icon name="info" className="text-[16px]" />
                Route Details
              </button>
            </div>
            <div className="p-stack-md flex flex-col xl:flex-row gap-gutter">
              {/* Timing & Route */}
              <div className="flex-1 flex flex-col justify-center relative min-h-[80px] xl:pr-gutter xl:border-r border-outline-variant">
                <div className="absolute top-1/2 left-[20px] right-[20px] h-[2px] bg-outline-variant -translate-y-1/2 z-0 hidden md:block"></div>
                <div className="flex justify-between items-center relative z-10 w-full gap-stack-md">
                  {/* Departure */}
                  <div className="bg-surface px-2 text-center md:text-left">
                    <div className="font-display-lg text-display-lg md:text-[32px] md:leading-[40px] font-bold text-on-surface">08:00</div>
                    <div className="font-title-md text-title-md text-on-surface-variant">Lagos (LOS)</div>
                    <div className="font-body-sm text-body-sm text-outline mt-base">Murtala Station</div>
                  </div>
                  {/* Duration */}
                  <div className="bg-surface px-stack-md text-center flex flex-col items-center">
                    <span className="font-data-mono text-data-mono text-[12px] text-outline mb-1">2h 15m</span>
                    <div className="md:hidden w-16 h-px bg-outline-variant my-2 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-outline-variant"></div>
                    </div>
                    <span className="font-label-caps text-label-caps text-outline uppercase hidden md:block">Non-stop</span>
                  </div>
                  {/* Arrival */}
                  <div className="bg-surface px-2 text-center md:text-right">
                    <div className="font-display-lg text-display-lg md:text-[32px] md:leading-[40px] font-bold text-on-surface">10:15</div>
                    <div className="font-title-md text-title-md text-on-surface-variant">Ibadan (IBA)</div>
                    <div className="font-body-sm text-body-sm text-outline mt-base">Moniya Station</div>
                  </div>
                </div>
              </div>
              {/* Class Options Bento Grid */}
              <div className="w-full xl:w-[480px] shrink-0 grid grid-cols-1 md:grid-cols-3 gap-stack-sm">
                {/* Economy Card (Available) */}
                <button 
                  onClick={() => navigate('/journey-details/1')}
                  className="group flex flex-col justify-between border border-outline-variant rounded p-stack-sm text-left hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-surface relative overflow-hidden h-full min-h-[100px]"
                >
                  <div className="flex justify-between items-start w-full mb-stack-sm">
                    <span className="font-body-sm text-body-sm font-bold text-on-surface">Economy</span>
                    <span className="font-data-mono text-data-mono font-bold text-primary">₦4,000</span>
                  </div>
                  <div className="mt-auto w-full">
                    <div className="inline-flex items-center gap-1 bg-[#b4efd5]/20 text-[#004331] px-2 py-1 rounded-sm w-full">
                      <span className="font-label-caps text-label-caps uppercase w-full">AVL - 42</span>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </button>
                {/* Business Card (RAC) */}
                <button 
                  onClick={() => navigate('/journey-details/1')}
                  className="group flex flex-col justify-between border border-outline-variant rounded p-stack-sm text-left hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-surface relative overflow-hidden h-full min-h-[100px]"
                >
                  <div className="flex justify-between items-start w-full mb-stack-sm">
                    <span className="font-body-sm text-body-sm font-bold text-on-surface">Business</span>
                    <span className="font-data-mono text-data-mono font-bold text-primary">₦8,500</span>
                  </div>
                  <div className="mt-auto w-full">
                    <div className="inline-flex items-center gap-1 bg-[#ffdea8]/30 text-[#4e3600] px-2 py-1 rounded-sm w-full">
                      <span className="font-label-caps text-label-caps uppercase w-full">RAC - 12</span>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </button>
                {/* First Class Card (Waitlist) */}
                <button 
                  onClick={() => navigate('/journey-details/1')}
                  className="group flex flex-col justify-between border border-outline-variant rounded p-stack-sm text-left hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-surface relative overflow-hidden h-full min-h-[100px]"
                >
                  <div className="flex justify-between items-start w-full mb-stack-sm">
                    <span className="font-body-sm text-body-sm font-bold text-on-surface">First Class</span>
                    <span className="font-data-mono text-data-mono font-bold text-primary">₦15,000</span>
                  </div>
                  <div className="mt-auto w-full">
                    <div className="inline-flex items-center gap-1 bg-[#ffdea8]/30 text-[#4e3600] px-2 py-1 rounded-sm w-full">
                      <span className="font-label-caps text-label-caps uppercase w-full">WL - 4</span>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </button>
              </div>
            </div>
          </article>

          {/* Journey Card 2 (Sold Out State) */}
          <article className="bg-surface rounded-lg border border-outline-variant opacity-75 grayscale-[20%] overflow-hidden flex flex-col">
            <div className="p-stack-md border-b border-outline-variant bg-surface-bright flex flex-col md:flex-row justify-between md:items-center gap-stack-md">
              <div className="flex items-center gap-stack-md">
                <div className="bg-surface-variant p-stack-sm rounded-full text-on-surface-variant">
                  <Icon name="train" />
                </div>
                <div>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface">NR-105 (Afternoon Commuter)</h3>
                  <span className="font-label-caps text-label-caps text-outline uppercase">Standard Train</span>
                </div>
              </div>
            </div>
            <div className="p-stack-md flex flex-col xl:flex-row gap-gutter">
              {/* Timing & Route */}
              <div className="flex-1 flex flex-col justify-center relative min-h-[80px] xl:pr-gutter xl:border-r border-outline-variant">
                <div className="absolute top-1/2 left-[20px] right-[20px] h-[2px] bg-outline-variant -translate-y-1/2 z-0 hidden md:block"></div>
                <div className="flex justify-between items-center relative z-10 w-full gap-stack-md">
                  <div className="bg-surface px-2 text-center md:text-left">
                    <div className="font-display-lg text-display-lg md:text-[32px] md:leading-[40px] font-bold text-on-surface">14:30</div>
                    <div className="font-title-md text-title-md text-on-surface-variant">Lagos (LOS)</div>
                  </div>
                  <div className="bg-surface px-stack-md text-center flex flex-col items-center">
                    <span className="font-data-mono text-data-mono text-[12px] text-outline mb-1">2h 45m</span>
                  </div>
                  <div className="bg-surface px-2 text-center md:text-right">
                    <div className="font-display-lg text-display-lg md:text-[32px] md:leading-[40px] font-bold text-on-surface">17:15</div>
                    <div className="font-title-md text-title-md text-on-surface-variant">Ibadan (IBA)</div>
                  </div>
                </div>
              </div>
              {/* Class Options - All Sold Out */}
              <div className="w-full xl:w-[480px] shrink-0 flex items-center justify-center p-stack-md bg-surface-container-low border border-outline-variant rounded border-dashed">
                <div className="flex items-center gap-stack-sm text-on-surface-variant">
                  <Icon name="event_busy" />
                  <span className="font-title-md text-title-md font-bold">All classes sold out for this journey</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
