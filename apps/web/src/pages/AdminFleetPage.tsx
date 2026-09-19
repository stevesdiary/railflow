import { Icon } from '../components/ui/Icon';

export function AdminFleetPage() {
  return (
    <div className="flex flex-col w-full max-w-container-max mx-auto h-full">
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md mb-stack-lg border-b border-outline-variant pb-stack-md shrink-0">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary">Train Registry</h1>
          <p className="font-body-md text-body-md text-secondary mt-base">Manage fleet inventory, configurations, and operational status.</p>
        </div>
        <div className="flex gap-stack-sm w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-primary text-on-primary font-title-md text-title-md py-stack-sm px-stack-md rounded flex items-center justify-center gap-stack-sm hover:opacity-90 transition-opacity">
            <Icon name="add" /> Create Train
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-surface rounded-lg border border-outline-variant p-stack-md mb-stack-lg flex flex-col md:flex-row gap-stack-md items-end shrink-0">
        <div className="w-full md:w-1/3 flex flex-col gap-base">
          <label className="font-label-caps text-label-caps text-on-surface-variant">Search Fleet</label>
          <div className="relative w-full">
            <Icon name="search" className="absolute left-stack-sm top-1/2 -translate-y-1/2 text-outline" />
            <input 
              className="w-full pl-10 pr-stack-sm py-stack-sm border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-sm text-body-sm bg-surface" 
              placeholder="Train ID, Name, or Route..." 
              type="text"
            />
          </div>
        </div>
        <div className="w-full md:w-1/4 flex flex-col gap-base">
          <label className="font-label-caps text-label-caps text-on-surface-variant">Status</label>
          <select className="w-full px-stack-sm py-stack-sm border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-sm text-body-sm bg-surface">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="w-full md:w-1/4 flex flex-col gap-base">
          <label className="font-label-caps text-label-caps text-on-surface-variant">Type</label>
          <select className="w-full px-stack-sm py-stack-sm border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-sm text-body-sm bg-surface">
            <option value="all">All Types</option>
            <option value="express">Express</option>
            <option value="intercity">Intercity</option>
            <option value="freight">Freight</option>
          </select>
        </div>
        <button className="w-full md:w-auto border border-outline-variant text-secondary font-title-md text-title-md py-stack-sm px-stack-md rounded flex items-center justify-center gap-stack-sm hover:bg-surface-container-low transition-colors">
          <Icon name="filter_list" /> More Filters
        </button>
      </div>

      {/* High-Density Data Table */}
      <div className="bg-surface rounded-lg border border-outline-variant flex flex-col overflow-hidden min-h-0">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 bg-surface z-10">
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="py-stack-sm px-stack-md font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap">Train ID</th>
                <th className="py-stack-sm px-stack-md font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap">Name / Class</th>
                <th className="py-stack-sm px-stack-md font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap">Type</th>
                <th className="py-stack-sm px-stack-md font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap text-right">Coaches</th>
                <th className="py-stack-sm px-stack-md font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap text-right">Total Seats</th>
                <th className="py-stack-sm px-stack-md font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap">Status</th>
                <th className="py-stack-sm px-stack-md font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {/* Row 1: Active */}
              <tr className="hover:bg-surface-container-lowest transition-colors group">
                <td className="py-stack-sm px-stack-md">
                  <span className="font-data-mono text-data-mono text-primary font-semibold">TR-NG-001</span>
                </td>
                <td className="py-stack-sm px-stack-md">
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">Lagos-Ibadan Express</span>
                    <span className="font-label-caps text-label-caps text-secondary">Class 800</span>
                  </div>
                </td>
                <td className="py-stack-sm px-stack-md">
                  <span className="font-body-sm text-body-sm text-on-surface">Express</span>
                </td>
                <td className="py-stack-sm px-stack-md text-right">
                  <span className="font-data-mono text-data-mono text-on-surface">12</span>
                </td>
                <td className="py-stack-sm px-stack-md text-right">
                  <span className="font-data-mono text-data-mono text-on-surface">840</span>
                </td>
                <td className="py-stack-sm px-stack-md">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-primary/10 text-primary font-label-caps text-label-caps gap-1 border border-primary/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Active
                  </span>
                </td>
                <td className="py-stack-sm px-stack-md text-right">
                  <div className="flex justify-end gap-stack-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-secondary hover:text-primary transition-colors p-1" title="View Details">
                      <Icon name="visibility" />
                    </button>
                    <button className="text-secondary hover:text-primary transition-colors p-1" title="Edit">
                      <Icon name="edit" />
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 2: Maintenance */}
              <tr className="hover:bg-surface-container-lowest transition-colors group">
                <td className="py-stack-sm px-stack-md">
                  <span className="font-data-mono text-data-mono text-primary font-semibold">TR-NG-042</span>
                </td>
                <td className="py-stack-sm px-stack-md">
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">Abuja-Kaduna Shuttle</span>
                    <span className="font-label-caps text-label-caps text-secondary">Class 750</span>
                  </div>
                </td>
                <td className="py-stack-sm px-stack-md">
                  <span className="font-body-sm text-body-sm text-on-surface">Intercity</span>
                </td>
                <td className="py-stack-sm px-stack-md text-right">
                  <span className="font-data-mono text-data-mono text-on-surface">8</span>
                </td>
                <td className="py-stack-sm px-stack-md text-right">
                  <span className="font-data-mono text-data-mono text-on-surface">560</span>
                </td>
                <td className="py-stack-sm px-stack-md">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-[#4e3600]/10 text-[#4e3600] font-label-caps text-label-caps gap-1 border border-[#4e3600]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4e3600]"></span>
                    Maintenance
                  </span>
                </td>
                <td className="py-stack-sm px-stack-md text-right">
                  <div className="flex justify-end gap-stack-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-secondary hover:text-primary transition-colors p-1" title="View Details">
                      <Icon name="visibility" />
                    </button>
                    <button className="text-secondary hover:text-primary transition-colors p-1" title="Edit">
                      <Icon name="edit" />
                    </button>
                  </div>
                </td>
              </tr>
              {/* Row 3: Inactive */}
              <tr className="hover:bg-surface-container-lowest transition-colors group">
                <td className="py-stack-sm px-stack-md">
                  <span className="font-data-mono text-data-mono text-primary font-semibold">TR-NG-018</span>
                </td>
                <td className="py-stack-sm px-stack-md">
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">Kano-Port Harcourt</span>
                    <span className="font-label-caps text-label-caps text-secondary">Class 900 Heavy</span>
                  </div>
                </td>
                <td className="py-stack-sm px-stack-md">
                  <span className="font-body-sm text-body-sm text-on-surface">Freight/Mixed</span>
                </td>
                <td className="py-stack-sm px-stack-md text-right">
                  <span className="font-data-mono text-data-mono text-on-surface">24</span>
                </td>
                <td className="py-stack-sm px-stack-md text-right">
                  <span className="font-data-mono text-data-mono text-on-surface">200</span>
                </td>
                <td className="py-stack-sm px-stack-md">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-secondary/10 text-secondary font-label-caps text-label-caps gap-1 border border-secondary/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Inactive
                  </span>
                </td>
                <td className="py-stack-sm px-stack-md text-right">
                  <div className="flex justify-end gap-stack-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-secondary hover:text-primary transition-colors p-1" title="View Details">
                      <Icon name="visibility" />
                    </button>
                    <button className="text-secondary hover:text-primary transition-colors p-1" title="Edit">
                      <Icon name="edit" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-surface-container-low border-t border-outline-variant p-stack-sm flex justify-between items-center shrink-0">
          <span className="font-body-sm text-body-sm text-secondary pl-stack-sm">Showing 1-3 of 142 trains</span>
          <div className="flex gap-base pr-stack-sm">
            <button className="p-1 text-secondary hover:text-primary disabled:opacity-50" disabled>
              <Icon name="chevron_left" />
            </button>
            <button className="p-1 text-secondary hover:text-primary">
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
