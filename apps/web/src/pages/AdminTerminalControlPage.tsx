import { Icon } from '../components/ui/Icon';

export function AdminTerminalControlPage() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-sm mb-stack-lg shrink-0">
        <div>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Queue Monitor - Terminal A-1 (Lagos)</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Real-time operational metrics and controls.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-[#e6f4ea] text-[#1e8e3e] px-3 py-1 border border-[#1e8e3e]/20 rounded font-label-caps text-label-caps self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#1e8e3e] animate-pulse"></span>
          ACTIVE
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 space-y-stack-lg pb-12 pr-2">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-md">
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex flex-col justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Current Queue Size</span>
            <div className="flex items-end justify-between mt-2">
              <span className="font-data-mono text-headline-lg text-on-surface">1,248</span>
              <div className="flex items-center text-[#d93025] font-body-sm text-body-sm gap-1">
                <Icon name="trending_up" className="text-sm" /> 12%
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex flex-col justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Active Users</span>
            <div className="flex items-end justify-between mt-2">
              <span className="font-data-mono text-headline-lg text-on-surface">856</span>
              <div className="flex items-center text-on-surface-variant font-body-sm text-body-sm gap-1">
                <Icon name="group" className="text-sm" />
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex flex-col justify-between">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Avg. Wait Time</span>
            <div className="flex items-end justify-between mt-2">
              <span className="font-data-mono text-headline-lg text-on-surface">14<span className="text-title-md font-title-md ml-1 text-on-surface-variant">mins</span></span>
              <div className="flex items-center text-[#1e8e3e] font-body-sm text-body-sm gap-1">
                <Icon name="trending_down" className="text-sm" /> 2m
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex flex-col justify-between border-b-2 border-b-primary">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Admission Rate</span>
            <div className="flex items-end justify-between mt-2">
              <span className="font-data-mono text-headline-lg text-primary">50<span className="text-title-md font-title-md ml-1 text-on-surface-variant">/min</span></span>
              <div className="flex items-center text-primary font-body-sm text-body-sm gap-1">
                <Icon name="speed" className="text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
          {/* Left Col: Metrics */}
          <div className="lg:col-span-2 flex flex-col gap-stack-md">
            <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex-1 min-h-[300px] flex flex-col">
              <div className="flex justify-between items-center mb-stack-md">
                <h3 className="font-title-md text-title-md text-on-surface">Queue Throughput</h3>
                <button className="text-on-surface-variant hover:text-primary">
                  <Icon name="more_vert" />
                </button>
              </div>
              {/* Chart Placeholder */}
              <div className="flex-1 bg-surface border border-outline-variant rounded flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <span className="font-body-md text-body-md text-on-surface-variant">Throughput Chart Visualization Placeholder</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack-md">
              <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                  <Icon name="timer_off" />
                </div>
                <div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">Expired Tokens</div>
                  <div className="font-data-mono text-title-md text-on-surface">42</div>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <Icon name="cancel" />
                </div>
                <div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">Failed Admissions</div>
                  <div className="font-data-mono text-title-md text-on-surface">12</div>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-[#d93025]/30 rounded p-stack-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#fce8e6] text-[#d93025] flex items-center justify-center shrink-0">
                  <Icon name="security" />
                </div>
                <div>
                  <div className="font-label-caps text-label-caps text-[#d93025] uppercase">Abuse Blocks</div>
                  <div className="font-data-mono text-title-md text-on-surface">3 <span className="text-body-sm font-body-sm text-[#d93025] ml-1">(Flags)</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Controls & Logs */}
          <div className="flex flex-col gap-stack-md">
            {/* Operational Controls */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex flex-col gap-stack-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                <Icon name="tune" className="text-primary" /> Operational Controls
              </h3>
              
              <div className="space-y-4">
                {/* Status Toggle */}
                <div>
                  <label className="font-label-caps text-label-caps text-on-surface-variant block mb-2">Queue Status</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 rounded border border-outline-variant text-on-surface font-body-sm text-body-sm hover:bg-surface-container-low transition-colors">Opening</button>
                    <button className="px-3 py-1.5 rounded border border-primary bg-primary-container text-on-primary-container font-body-sm text-body-sm font-semibold">Active</button>
                    <button className="px-3 py-1.5 rounded border border-outline-variant text-on-surface font-body-sm text-body-sm hover:bg-surface-container-low transition-colors">Paused</button>
                    <button className="px-3 py-1.5 rounded border border-outline-variant text-on-surface font-body-sm text-body-sm hover:bg-surface-container-low transition-colors">Closing</button>
                  </div>
                </div>
                
                {/* Admission Rate Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant block">Admission Rate (Users/Min)</label>
                    <span className="font-data-mono text-body-md text-primary font-bold">50</span>
                  </div>
                  <input className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary" max="200" min="0" type="range" defaultValue="50" />
                  <div className="flex justify-between text-on-surface-variant font-label-caps text-[10px] mt-1">
                    <span>0</span>
                    <span>200</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#fef7e0] text-[#b06000] border border-[#fbbc04] font-title-md text-body-sm px-4 py-2 rounded hover:bg-[#fde293] transition-colors flex justify-center items-center gap-1">
                      <Icon name="pause" className="text-sm" /> Pause
                    </button>
                    <button className="flex-1 bg-surface-container text-on-surface border border-outline-variant font-title-md text-body-sm px-4 py-2 rounded hover:bg-surface-container-high transition-colors flex justify-center items-center gap-1">
                      <Icon name="play_arrow" className="text-sm" /> Resume
                    </button>
                  </div>
                  <button className="w-full bg-error text-on-error font-title-md text-body-sm px-4 py-3 rounded hover:bg-[#a50e0e] transition-colors flex justify-center items-center gap-2 mt-2">
                    <Icon name="warning" /> Emergency Close Queue
                  </button>
                </div>
              </div>
            </div>

            {/* Audit Log */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex-1 flex flex-col">
              <h3 className="font-title-md text-title-md text-on-surface mb-stack-md flex items-center gap-2">
                <Icon name="history" className="text-on-surface-variant" /> Recent Activity
              </h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                <div className="relative pl-4 border-l-2 border-primary pb-4">
                  <div className="absolute w-2.5 h-2.5 bg-primary rounded-full -left-[6px] top-1"></div>
                  <p className="font-body-sm text-body-sm text-on-surface">Admission rate increased to <strong>50/min</strong> by Admin J. Doe</p>
                  <span className="font-data-mono text-[11px] text-on-surface-variant mt-1 block">2 mins ago</span>
                </div>
                <div className="relative pl-4 border-l-2 border-outline-variant pb-4">
                  <div className="absolute w-2.5 h-2.5 bg-outline-variant rounded-full -left-[6px] top-1"></div>
                  <p className="font-body-sm text-body-sm text-on-surface">Queue status changed to <strong className="text-[#1e8e3e]">ACTIVE</strong> by System</p>
                  <span className="font-data-mono text-[11px] text-on-surface-variant mt-1 block">10 mins ago</span>
                </div>
                <div className="relative pl-4 border-l-2 border-outline-variant pb-4">
                  <div className="absolute w-2.5 h-2.5 bg-outline-variant rounded-full -left-[6px] top-1"></div>
                  <p className="font-body-sm text-body-sm text-on-surface">Terminal A-1 gate systems synced.</p>
                  <span className="font-data-mono text-[11px] text-on-surface-variant mt-1 block">45 mins ago</span>
                </div>
              </div>
              <button className="w-full mt-2 text-primary font-title-md text-body-sm hover:underline text-center">View Full Audit Log</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
