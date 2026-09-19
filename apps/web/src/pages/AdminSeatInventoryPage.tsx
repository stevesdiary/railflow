import { Icon } from '../components/ui/Icon';

export function AdminSeatInventoryPage() {
  return (
    <div className="flex-1 flex overflow-hidden p-margin-mobile md:p-margin-desktop gap-gutter max-w-container-max mx-auto w-full h-full">
      {/* Sidebar/Filters */}
      <aside className="w-72 flex-shrink-0 flex flex-col gap-stack-lg overflow-y-auto pr-4 border-r border-outline-variant">
        {/* Search & Lookup */}
        <div className="flex flex-col gap-stack-md">
          <h3 className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Lookup</h3>
          <div className="relative">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input 
              className="w-full pl-10 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-sm text-body-sm text-on-surface placeholder-outline transition-colors" 
              placeholder="Search Seat (e.g., C1-14)" 
              type="text" 
            />
          </div>
          <div className="relative">
            <Icon name="person_search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input 
              className="w-full pl-10 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-sm text-body-sm text-on-surface placeholder-outline transition-colors" 
              placeholder="Passenger Name or PNR" 
              type="text" 
            />
          </div>
        </div>

        {/* Coach Filter */}
        <div className="flex flex-col gap-stack-md">
          <h3 className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Coach</h3>
          <select className="w-full p-2 bg-surface-container-lowest border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-sm text-body-sm text-on-surface appearance-none cursor-pointer">
            <option value="all">All Coaches</option>
            <option value="C1">C1 - Economy</option>
            <option value="C2">C2 - Economy</option>
            <option value="F1">F1 - First Class</option>
            <option value="F2">F2 - First Class</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-stack-md">
          <h3 className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Status Filter</h3>
          {[
            { label: 'Available (142)', color: 'text-primary' },
            { label: 'Held (18)', color: 'text-[#f59e0b]' },
            { label: 'Confirmed (310)', color: 'text-primary' },
            { label: 'RAC (12)', color: 'text-primary' },
            { label: 'Waitlist (5)', color: 'text-error' },
          ].map((status, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 border border-outline-variant rounded bg-surface-container-lowest flex items-center justify-center group-hover:border-primary transition-colors">
                <Icon name="check" className={`text-[12px] text-primary ${idx === 0 ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity`} />
              </div>
              <span className="font-body-sm text-body-sm text-on-surface">{status.label}</span>
            </label>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-stack-md mt-auto pt-4 border-t border-outline-variant">
          <h3 className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Legend</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-outline-variant rounded-sm bg-surface-container-lowest"></div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#f59e0b] rounded-sm bg-[#fef3c7] opacity-80"></div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Held</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-secondary-container border border-secondary rounded-sm flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}></div>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">RAC</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-error rounded-sm flex items-center justify-center">
                <Icon name="priority_high" className="text-[10px] text-on-error" />
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Waitlist</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Map Area */}
      <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-y-auto flex flex-col relative shadow-sm">
        {/* Coach Header */}
        <div className="bg-surface sticky top-0 z-10 border-b border-outline-variant p-4 flex items-center justify-between">
          <div>
            <h3 className="font-title-md text-title-md text-on-surface">Coach C1</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Economy Class • 72 Seats Capacity</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-surface-container border border-outline-variant rounded text-on-surface font-body-sm text-body-sm hover:bg-surface-container-high transition-colors">Prev Coach</button>
            <button className="px-3 py-1 bg-surface-container border border-outline-variant rounded text-on-surface font-body-sm text-body-sm hover:bg-surface-container-high transition-colors">Next Coach</button>
          </div>
        </div>

        {/* Seat Grid visualization */}
        <div className="p-8 flex justify-center min-w-max">
          <div className="flex flex-col gap-8">
            <div className="flex gap-16 relative">
              {/* Aisle marker */}
              <div className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 bg-surface flex items-center justify-center z-0 opacity-50 border-x border-outline-variant/30">
                <div className="text-outline-variant font-label-caps text-[10px] uppercase rotate-90 whitespace-nowrap tracking-widest">Aisle</div>
              </div>
              
              {/* Left Side */}
              <div className="flex flex-col gap-2 z-10">
                <div className="flex gap-2">
                  <div className="w-10 h-12 bg-primary rounded-sm flex flex-col items-center justify-center cursor-pointer hover:ring-2 ring-primary ring-offset-1 transition-all">
                    <span className="font-data-mono text-[10px] text-on-primary">1A</span>
                  </div>
                  <div className="w-10 h-12 border-2 border-[#f59e0b] bg-[#fef3c7] bg-opacity-30 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:ring-2 ring-[#f59e0b] ring-offset-1 transition-all">
                    <span className="font-data-mono text-[10px] text-on-surface">1B</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-12 border border-outline-variant rounded-sm bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all">
                    <span className="font-data-mono text-[10px] text-on-surface-variant">2A</span>
                  </div>
                  <div className="w-10 h-12 bg-primary rounded-sm flex flex-col items-center justify-center cursor-pointer hover:ring-2 ring-primary ring-offset-1 transition-all">
                    <span className="font-data-mono text-[10px] text-on-primary">2B</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-12 bg-secondary-container border border-secondary rounded-sm flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)' }}></div>
                    <span className="font-data-mono text-[10px] text-on-surface relative z-10">3A</span>
                  </div>
                  <div className="w-10 h-12 bg-primary rounded-sm flex flex-col items-center justify-center cursor-pointer hover:ring-2 ring-primary ring-offset-1 transition-all">
                    <span className="font-data-mono text-[10px] text-on-primary">3B</span>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col gap-2 z-10">
                <div className="flex gap-2">
                  <div className="w-10 h-12 bg-primary rounded-sm flex flex-col items-center justify-center cursor-pointer hover:ring-2 ring-primary ring-offset-1 transition-all">
                    <span className="font-data-mono text-[10px] text-on-primary">1C</span>
                  </div>
                  <div className="w-10 h-12 bg-error rounded-sm flex flex-col items-center justify-center cursor-pointer relative">
                    <Icon name="priority_high" className="text-[12px] text-on-error absolute top-1 right-1" />
                    <span className="font-data-mono text-[10px] text-on-error mt-2">1D</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-12 border border-outline-variant rounded-sm bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all">
                    <span className="font-data-mono text-[10px] text-on-surface-variant">2C</span>
                  </div>
                  <div className="w-10 h-12 border border-outline-variant rounded-sm bg-surface-container-lowest flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all">
                    <span className="font-data-mono text-[10px] text-on-surface-variant">2D</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-12 bg-primary rounded-sm flex flex-col items-center justify-center cursor-pointer hover:ring-2 ring-primary ring-offset-1 transition-all">
                    <span className="font-data-mono text-[10px] text-on-primary">3C</span>
                  </div>
                  <div className="w-10 h-12 bg-primary rounded-sm flex flex-col items-center justify-center cursor-pointer shadow-[0_4px_6px_-1px_rgba(26,38,52,0.1)] ring-2 ring-primary ring-offset-2 transition-all">
                    <span className="font-data-mono text-[10px] text-on-primary">3D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <aside className="w-80 flex-shrink-0 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="p-4 border-b border-outline-variant bg-surface flex justify-between items-start">
          <div>
            <h4 className="font-title-md text-title-md text-on-surface">Seat 3D</h4>
            <span className="inline-block mt-1 px-2 py-0.5 bg-primary text-on-primary font-label-caps text-[10px] rounded uppercase tracking-wide">Confirmed</span>
          </div>
          <button className="text-outline hover:text-on-surface transition-colors">
            <Icon name="close" />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Passenger</span>
            <div className="font-body-md text-body-md text-on-surface font-medium flex items-center gap-2">
              <Icon name="person" className="text-outline text-[18px]" />
              Oluwaseun Adeyemi
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Booking Ref (PNR)</span>
            <div className="font-data-mono text-data-mono text-on-surface flex items-center gap-2">
              <Icon name="confirmation_number" className="text-outline text-[18px]" />
              NRC-782-991A
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Fare Details</span>
            <div className="flex flex-col gap-1 bg-surface p-3 rounded border border-outline-variant">
              <div className="flex justify-between font-body-sm text-body-sm">
                <span className="text-on-surface-variant">Category:</span>
                <span className="text-on-surface font-medium">Adult Regular</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm">
                <span className="text-on-surface-variant">Base Fare:</span>
                <span className="font-data-mono">₦ 4,500</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">Timeline</span>
            <div className="flex flex-col gap-2 pl-2 border-l-2 border-outline-variant/30 ml-2 mt-1">
              <div className="relative">
                <div className="absolute -left-[13px] top-1.5 w-2 h-2 rounded-full bg-primary"></div>
                <p className="font-body-sm text-[12px] text-on-surface">Booking Confirmed</p>
                <p className="font-data-mono text-[10px] text-outline">Oct 20, 14:32</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[13px] top-1.5 w-2 h-2 rounded-full bg-outline-variant"></div>
                <p className="font-body-sm text-[12px] text-on-surface">Seat Held</p>
                <p className="font-data-mono text-[10px] text-outline">Oct 20, 14:20</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-outline-variant bg-surface mt-auto">
          <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-outline text-on-surface font-body-md text-body-md rounded hover:bg-surface-variant transition-colors group">
            <Icon name="admin_panel_settings" className="text-[18px] group-hover:text-error transition-colors" />
            Request Manual Override
          </button>
          <p className="text-center font-body-sm text-[11px] text-outline mt-2 leading-tight">Requires Level 3 Auth. Changes will be logged.</p>
        </div>
      </aside>
    </div>
  );
}
