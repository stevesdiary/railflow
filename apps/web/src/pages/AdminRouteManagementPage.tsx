import { Icon } from '../components/ui/Icon';

export function AdminRouteManagementPage() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-md mb-stack-lg pb-stack-sm border-b border-outline-variant shrink-0">
        <div>
          <div className="font-label-caps text-label-caps text-secondary mb-1">ROUTE SCHEDULE MANAGEMENT</div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Lagos - Ibadan Standard Gauge (LISG-01)</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Configure vertical timeline, arrival/departure slots, and operational constraints.</p>
        </div>
        <div className="flex gap-stack-sm w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2 border border-outline-variant text-on-surface-variant font-title-md text-title-md text-[14px] leading-[20px] rounded hover:bg-surface-container transition-colors flex items-center justify-center gap-2">
            <Icon name="history" className="text-[18px]" /> Revert
          </button>
          <button className="flex-1 md:flex-none px-4 py-2 bg-primary text-on-primary font-title-md text-title-md text-[14px] leading-[20px] font-semibold rounded hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
            <Icon name="publish" className="text-[18px]" /> Activate Schedule
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-gutter min-h-0 overflow-hidden">
        {/* Timeline/Stops List */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded p-stack-md shadow-sm overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex justify-between items-center mb-stack-md shrink-0">
            <h3 className="font-title-md text-title-md text-primary">Station Sequence</h3>
            <button className="text-primary hover:text-primary-container flex items-center gap-1 font-label-caps text-label-caps">
              <Icon name="add_location_alt" className="text-[16px]" /> ADD STOP
            </button>
          </div>
          
          <div className="relative pl-6 flex-1">
            {/* Vertical Line */}
            <div className="absolute left-3 top-4 bottom-4 w-[2px] bg-outline-variant"></div>
            
            {/* Stop 1 (Origin) */}
            <div className="relative mb-stack-lg group">
              {/* Node */}
              <div className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-primary bg-surface-container-lowest z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              </div>
              <div className="bg-surface border border-outline-variant rounded p-stack-sm hover:border-primary transition-colors cursor-pointer group-hover:shadow-[0_4px_6px_-1px_rgba(26,38,52,0.1)]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-title-md text-[16px]">Mobolaji Johnson Station, Lagos</span>
                    <span className="px-2 py-0.5 bg-[#d7e3f7] text-[#101c2a] font-label-caps text-label-caps rounded text-[10px]">ORIGIN</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-secondary hover:text-primary"><Icon name="edit" className="text-[18px]" /></button>
                    <button className="text-secondary hover:text-primary cursor-grab"><Icon name="drag_indicator" className="text-[18px]" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-stack-sm border-t border-outline-variant pt-2 mt-2">
                  <div>
                    <div className="font-label-caps text-label-caps text-secondary mb-0.5">ARRIVAL</div>
                    <div className="font-data-mono text-data-mono text-on-surface-variant">--:--</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-secondary mb-0.5">DEPARTURE</div>
                    <div className="font-data-mono text-data-mono text-primary font-bold">08:00 AM</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-secondary mb-0.5">PLATFORM</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Plat 1</div>
                  </div>
                </div>
                <div className="mt-2 text-body-sm font-body-sm text-secondary bg-surface-container-low p-2 rounded flex items-start gap-1">
                  <Icon name="info" className="text-[14px] mt-0.5" />
                  <span>Initial boarding. Ensure VIP cars are locked until 07:45.</span>
                </div>
              </div>
            </div>
            
            {/* Stop 2 */}
            <div className="relative mb-stack-lg group">
              <div className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-outline-variant bg-surface-container-lowest z-10"></div>
              <div className="bg-surface border border-outline-variant rounded p-stack-sm hover:border-primary transition-colors cursor-pointer group-hover:shadow-[0_4px_6px_-1px_rgba(26,38,52,0.1)]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-title-md text-[16px]">Prof. Wole Soyinka Station, Abeokuta</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-secondary hover:text-primary"><Icon name="edit" className="text-[18px]" /></button>
                    <button className="text-secondary hover:text-primary cursor-grab"><Icon name="drag_indicator" className="text-[18px]" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-stack-sm border-t border-outline-variant pt-2 mt-2">
                  <div>
                    <div className="font-label-caps text-label-caps text-secondary mb-0.5">ARRIVAL</div>
                    <div className="font-data-mono text-data-mono text-on-surface-variant">09:15 AM</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-secondary mb-0.5">DEPARTURE</div>
                    <div className="font-data-mono text-data-mono text-on-surface-variant">09:20 AM</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-secondary mb-0.5">PLATFORM</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Plat 2</div>
                  </div>
                </div>
                <div className="mt-2 text-body-sm font-body-sm text-on-error-container bg-error-container p-2 rounded flex items-start gap-1">
                  <Icon name="warning" className="text-[14px] mt-0.5" />
                  <span>Short dwell time (5m). Expect heavy freight traffic on adjacent track.</span>
                </div>
              </div>
            </div>
            
            {/* Stop 3 (Destination) */}
            <div className="relative group">
              {/* Node */}
              <div className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-primary bg-primary z-10 flex items-center justify-center"></div>
              <div className="bg-surface border border-outline-variant rounded p-stack-sm hover:border-primary transition-colors cursor-pointer group-hover:shadow-[0_4px_6px_-1px_rgba(26,38,52,0.1)]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-title-md text-[16px]">Chief Obafemi Awolowo Station, Ibadan</span>
                    <span className="px-2 py-0.5 bg-[#004331] text-[#ffffff] font-label-caps text-label-caps rounded text-[10px]">TERMINUS</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-secondary hover:text-primary"><Icon name="edit" className="text-[18px]" /></button>
                    <button className="text-secondary hover:text-primary cursor-grab"><Icon name="drag_indicator" className="text-[18px]" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-stack-sm border-t border-outline-variant pt-2 mt-2">
                  <div>
                    <div className="font-label-caps text-label-caps text-secondary mb-0.5">ARRIVAL</div>
                    <div className="font-data-mono text-data-mono text-primary font-bold">10:45 AM</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-secondary mb-0.5">DEPARTURE</div>
                    <div className="font-data-mono text-data-mono text-on-surface-variant">--:--</div>
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-secondary mb-0.5">PLATFORM</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Plat 1</div>
                  </div>
                </div>
                <div className="mt-2 text-body-sm font-body-sm text-secondary bg-surface-container-low p-2 rounded flex items-start gap-1">
                  <Icon name="cleaning_services" className="text-[14px] mt-0.5" />
                  <span>Mandatory interior cleaning before turnaround.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel (Edit/Details) */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md shadow-sm h-fit overflow-y-auto max-h-full custom-scrollbar">
          <h3 className="font-title-md text-title-md text-primary mb-stack-md flex items-center gap-2 border-b border-outline-variant pb-2">
            <Icon name="edit_square" />
            Edit Stop Details
          </h3>
          <form className="space-y-stack-md">
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">STATION NAME</label>
              <input className="w-full bg-surface-container border border-outline-variant rounded p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-sm font-body-sm" type="text" defaultValue="Prof. Wole Soyinka Station, Abeokuta" />
            </div>
            <div className="grid grid-cols-2 gap-stack-sm">
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">ARRIVAL TIME</label>
                <input className="w-full bg-surface-container border border-outline-variant rounded p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-data-mono font-data-mono" type="time" defaultValue="09:15" />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">DEPARTURE TIME</label>
                <input className="w-full bg-surface-container border border-outline-variant rounded p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-data-mono font-data-mono" type="time" defaultValue="09:20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-stack-sm">
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">PLATFORM</label>
                <select className="w-full bg-surface-container border border-outline-variant rounded p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-sm font-body-sm">
                  <option>Plat 1</option>
                  <option value="Plat 2" selected>Plat 2</option>
                  <option>Plat 3</option>
                </select>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">STOP TYPE</label>
                <select className="w-full bg-surface-container border border-outline-variant rounded p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-sm font-body-sm">
                  <option>Regular</option>
                  <option>Technical</option>
                  <option>Express Bypass</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1">OPERATIONAL NOTES</label>
              <textarea className="w-full bg-surface-container border border-outline-variant rounded p-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-sm font-body-sm resize-none" rows={3} defaultValue="Short dwell time (5m). Expect heavy freight traffic on adjacent track."></textarea>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
              <button className="px-4 py-2 text-secondary hover:bg-surface-container-high rounded font-title-md text-title-md text-[14px] transition-colors" type="button">Cancel</button>
              <button className="px-4 py-2 bg-primary text-on-primary rounded font-title-md text-title-md text-[14px] hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm" type="button">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
