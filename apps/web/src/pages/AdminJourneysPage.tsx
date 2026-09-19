import { Icon } from '../components/ui/Icon';

export function AdminJourneysPage() {
  return (
    <div className="max-w-container-max mx-auto h-full flex flex-col">
      {/* Header & Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-stack-md mb-stack-lg shrink-0">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Internal Journey Registry</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Manage and monitor live railway operations across all sectors.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-stack-sm w-full lg:w-auto">
          <div className="flex border border-outline-variant rounded overflow-hidden">
            <button className="px-stack-md py-stack-sm bg-surface-container-low text-on-surface font-body-sm text-body-sm border-r border-outline-variant hover:bg-surface-container-high transition-colors flex items-center gap-stack-sm">
              <Icon name="filter_list" />
              Filter
            </button>
            <button className="px-stack-md py-stack-sm bg-surface-container-lowest text-on-surface font-body-sm text-body-sm hover:bg-surface-container-low transition-colors flex items-center gap-stack-sm">
              <Icon name="calendar_today" />
              Oct 24 - Oct 31
            </button>
          </div>
          <button className="px-stack-md py-stack-sm border border-outline-variant text-on-surface font-body-sm text-body-sm rounded hover:bg-surface-container-low transition-colors flex items-center gap-stack-sm">
            <Icon name="download" />
            Export
          </button>
        </div>
      </div>

      {/* High Density Data Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded overflow-hidden flex flex-col flex-1 min-h-[400px]">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant font-label-caps text-label-caps text-on-surface-variant">
                <th className="p-stack-sm pl-stack-md font-medium whitespace-nowrap">Journey ID / Train</th>
                <th className="p-stack-sm font-medium whitespace-nowrap">Route (Origin → Dest)</th>
                <th className="p-stack-sm font-medium whitespace-nowrap">Date & Time</th>
                <th className="p-stack-sm font-medium text-right whitespace-nowrap">Capacity / Occupancy</th>
                <th className="p-stack-sm font-medium text-center whitespace-nowrap">Status</th>
                <th className="p-stack-sm pr-stack-md font-medium text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="p-stack-sm pl-stack-md">
                  <div className="flex items-center gap-stack-sm">
                    <div className="w-8 h-8 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                      <Icon name="directions_railway" className="text-base" />
                    </div>
                    <div>
                      <div className="font-data-mono text-data-mono font-bold text-on-surface">JRN-8832A</div>
                      <div className="text-on-surface-variant text-xs">Abuja Metro Express</div>
                    </div>
                  </div>
                </td>
                <td className="p-stack-sm">
                  <div className="flex items-center gap-base">
                    <span className="font-medium">ABJ</span>
                    <Icon name="arrow_right_alt" className="text-outline text-base" />
                    <span className="font-medium">KAD</span>
                  </div>
                  <div className="text-on-surface-variant text-xs mt-0.5">Non-stop</div>
                </td>
                <td className="p-stack-sm">
                  <div>24 Oct, 2023</div>
                  <div className="font-data-mono text-data-mono text-xs text-on-surface-variant mt-0.5">08:00 - 10:30</div>
                </td>
                <td className="p-stack-sm text-right">
                  <div className="font-data-mono text-data-mono">450 / <span className="font-bold text-primary">420</span></div>
                  <div className="text-xs text-on-surface-variant mt-0.5">Waitlist: <span className="text-on-tertiary-container font-medium">12</span></div>
                </td>
                <td className="p-stack-sm text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-label-caps text-[10px] tracking-wider border border-[#C8E6C9]">
                    SCHEDULED
                  </span>
                </td>
                <td className="p-stack-sm pr-stack-md text-right">
                  <button className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors opacity-0 group-hover:opacity-100">
                    <Icon name="more_vert" className="text-xl" />
                  </button>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="p-stack-sm pl-stack-md">
                  <div className="flex items-center gap-stack-sm">
                    <div className="w-8 h-8 rounded bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0">
                      <Icon name="directions_transit" className="text-base" />
                    </div>
                    <div>
                      <div className="font-data-mono text-data-mono font-bold text-on-surface">JRN-7719B</div>
                      <div className="text-on-surface-variant text-xs">Lagos-Ibadan Standard</div>
                    </div>
                  </div>
                </td>
                <td className="p-stack-sm">
                  <div className="flex items-center gap-base">
                    <span className="font-medium">LOS</span>
                    <Icon name="arrow_right_alt" className="text-outline text-base" />
                    <span className="font-medium">IBA</span>
                  </div>
                  <div className="text-on-surface-variant text-xs mt-0.5">3 Stops</div>
                </td>
                <td className="p-stack-sm">
                  <div>24 Oct, 2023</div>
                  <div className="font-data-mono text-data-mono text-xs text-on-surface-variant mt-0.5">09:15 - 11:45</div>
                </td>
                <td className="p-stack-sm text-right">
                  <div className="font-data-mono text-data-mono">600 / <span className="font-bold text-primary">600</span></div>
                  <div className="text-xs text-on-surface-variant mt-0.5">Waitlist: <span className="text-on-error-container font-medium">45</span></div>
                </td>
                <td className="p-stack-sm text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary text-on-primary font-label-caps text-[10px] tracking-wider">
                    BOARDING
                  </span>
                </td>
                <td className="p-stack-sm pr-stack-md text-right">
                  <button className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors opacity-0 group-hover:opacity-100">
                    <Icon name="more_vert" className="text-xl" />
                  </button>
                </td>
              </tr>
              
              {/* Row 3 - Error state */}
              <tr className="hover:bg-surface-container-low transition-colors group bg-error-container bg-opacity-20">
                <td className="p-stack-sm pl-stack-md">
                  <div className="flex items-center gap-stack-sm">
                    <div className="w-8 h-8 rounded bg-error text-on-error flex items-center justify-center shrink-0">
                      <Icon name="warning" className="text-base" />
                    </div>
                    <div>
                      <div className="font-data-mono text-data-mono font-bold text-on-surface">JRN-9021C</div>
                      <div className="text-on-surface-variant text-xs">Port Harcourt Cargo</div>
                    </div>
                  </div>
                </td>
                <td className="p-stack-sm">
                  <div className="flex items-center gap-base">
                    <span className="font-medium">PHC</span>
                    <Icon name="arrow_right_alt" className="text-outline text-base" />
                    <span className="font-medium">ENU</span>
                  </div>
                  <div className="text-on-surface-variant text-xs mt-0.5">Direct Freight</div>
                </td>
                <td className="p-stack-sm">
                  <div>24 Oct, 2023</div>
                  <div className="font-data-mono text-data-mono text-xs text-on-surface-variant mt-0.5">10:00 - 16:00</div>
                </td>
                <td className="p-stack-sm text-right">
                  <div className="font-data-mono text-data-mono">- / -</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">Freight Only</div>
                </td>
                <td className="p-stack-sm text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-error-container text-on-error-container font-label-caps text-[10px] tracking-wider border border-[#ffb4ab]">
                    DELAYED
                  </span>
                </td>
                <td className="p-stack-sm pr-stack-md text-right">
                  <button className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors opacity-0 group-hover:opacity-100">
                    <Icon name="more_vert" className="text-xl" />
                  </button>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="p-stack-sm pl-stack-md">
                  <div className="flex items-center gap-stack-sm">
                    <div className="w-8 h-8 rounded bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0">
                      <Icon name="directions_railway" className="text-base" />
                    </div>
                    <div>
                      <div className="font-data-mono text-data-mono font-bold text-on-surface">JRN-1102D</div>
                      <div className="text-on-surface-variant text-xs">Kano Commuter</div>
                    </div>
                  </div>
                </td>
                <td className="p-stack-sm">
                  <div className="flex items-center gap-base">
                    <span className="font-medium">KAN</span>
                    <Icon name="arrow_right_alt" className="text-outline text-base" />
                    <span className="font-medium">ZAR</span>
                  </div>
                  <div className="text-on-surface-variant text-xs mt-0.5">Local</div>
                </td>
                <td className="p-stack-sm">
                  <div>24 Oct, 2023</div>
                  <div className="font-data-mono text-data-mono text-xs text-on-surface-variant mt-0.5">06:30 - 08:15</div>
                </td>
                <td className="p-stack-sm text-right">
                  <div className="font-data-mono text-data-mono">300 / <span className="font-bold text-primary">285</span></div>
                  <div className="text-xs text-on-surface-variant mt-0.5">Waitlist: <span className="font-medium text-on-surface-variant">0</span></div>
                </td>
                <td className="p-stack-sm text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-caps text-[10px] tracking-wider border border-outline-variant">
                    COMPLETED
                  </span>
                </td>
                <td className="p-stack-sm pr-stack-md text-right">
                  <button className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors opacity-0 group-hover:opacity-100">
                    <Icon name="more_vert" className="text-xl" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-surface-container-low border-t border-outline-variant p-stack-sm flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant shrink-0 mt-auto">
          <div className="pl-stack-sm">Showing 1-15 of 124 journeys</div>
          <div className="flex items-center gap-stack-sm pr-stack-sm">
            <button className="p-1 rounded hover:bg-surface-container-high disabled:opacity-50" disabled>
              <Icon name="chevron_left" />
            </button>
            <span className="px-2">Page 1 of 9</span>
            <button className="p-1 rounded hover:bg-surface-container-high">
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
