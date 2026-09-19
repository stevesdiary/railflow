import { Icon } from '../components/ui/Icon';

export function AdminOverviewPage() {
  return (
    <div className="max-w-container-max mx-auto space-y-stack-lg">
      {/* Metric Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
        {/* Bookings */}
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-stack-sm">
            <span className="text-body-sm font-body-sm text-on-surface-variant">Today's Bookings</span>
            <Icon name="confirmation_number" className="text-primary text-xl" />
          </div>
          <div className="flex items-baseline gap-stack-sm">
            <span className="text-headline-lg font-headline-lg text-on-surface">14,289</span>
            <span className="text-body-sm font-body-sm text-primary flex items-center">
              <Icon name="trending_up" className="text-sm mr-1" />
              12%
            </span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-stack-sm">
            <span className="text-body-sm font-body-sm text-on-surface-variant">Today's Revenue</span>
            <Icon name="payments" className="text-primary text-xl" />
          </div>
          <div className="flex items-baseline gap-stack-sm">
            <span className="text-title-md font-data-mono text-on-surface">₦42.5M</span>
            <span className="text-body-sm font-body-sm text-primary flex items-center">
              <Icon name="trending_up" className="text-sm mr-1" />
              8%
            </span>
          </div>
        </div>

        {/* Active Journeys / Avg Occupancy */}
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-outline-variant pb-stack-sm mb-stack-sm">
            <span className="text-body-sm font-body-sm text-on-surface-variant">Active Journeys</span>
            <span className="text-title-md font-title-md text-on-surface">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-body-sm font-body-sm text-on-surface-variant">Avg Occupancy</span>
            <span className="text-title-md font-title-md text-on-surface">86%</span>
          </div>
        </div>

        {/* Waitlist / Alert States */}
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded grid grid-cols-2 gap-stack-sm">
          <div className="border-r border-outline-variant pr-stack-sm">
            <div className="text-label-caps font-label-caps text-on-surface-variant mb-1">RAC / WL</div>
            <div className="text-title-md font-data-mono text-tertiary">450 / 890</div>
          </div>
          <div className="pl-stack-sm flex flex-col justify-center">
            <div className="flex items-center gap-1 text-error mb-1">
              <Icon name="warning" className="text-sm" />
              <span className="text-label-caps font-label-caps">Failed Pay</span>
            </div>
            <div className="text-body-md font-data-mono text-error font-bold">12 Active</div>
          </div>
        </div>
      </section>

      {/* Bento Grid Area: Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-md">
        {/* Live Journey Monitoring (Spans 2 columns) */}
        <section className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded flex flex-col overflow-hidden">
          <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
            <h2 className="text-title-md font-title-md text-on-surface">Live Journey Monitoring</h2>
            <button className="text-primary text-body-sm font-body-sm hover:underline flex items-center gap-1">
              View Map <Icon name="map" className="text-sm" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-label-caps font-label-caps text-on-surface-variant">
                  <th className="py-3 px-stack-md font-normal whitespace-nowrap">Train ID</th>
                  <th className="py-3 px-stack-md font-normal whitespace-nowrap">Route</th>
                  <th className="py-3 px-stack-md font-normal whitespace-nowrap">Status</th>
                  <th className="py-3 px-stack-md font-normal whitespace-nowrap">Occupancy</th>
                </tr>
              </thead>
              <tbody className="text-body-sm font-body-sm">
                <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-stack-md font-data-mono">EXP-LGA-01</td>
                  <td className="py-3 px-stack-md">Lagos → Ibadan</td>
                  <td className="py-3 px-stack-md">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-primary-fixed-dim text-primary text-xs font-bold gap-1 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> On Time
                    </span>
                  </td>
                  <td className="py-3 px-stack-md font-data-mono">92%</td>
                </tr>
                <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-stack-md font-data-mono">FRT-KAD-44</td>
                  <td className="py-3 px-stack-md">Abuja → Kaduna</td>
                  <td className="py-3 px-stack-md">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-tertiary-fixed-dim text-tertiary text-xs font-bold gap-1 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span> Delayed (+15m)
                    </span>
                  </td>
                  <td className="py-3 px-stack-md font-data-mono">--</td>
                </tr>
                <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-stack-md font-data-mono">PAS-IBD-08</td>
                  <td className="py-3 px-stack-md">Ibadan → Abeokuta</td>
                  <td className="py-3 px-stack-md">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-surface-dim text-on-surface text-xs font-bold gap-1 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-outline"></span> Arrived
                    </span>
                  </td>
                  <td className="py-3 px-stack-md font-data-mono">85%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Financial Ops Summary */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex flex-col">
          <h2 className="text-title-md font-title-md text-on-surface mb-stack-md">Financial Ops</h2>
          {/* Pseudo Chart Area */}
          <div className="h-40 bg-surface-container-low border border-outline-variant rounded mb-stack-md flex items-end p-2 gap-2 relative">
            <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant opacity-50">
              <Icon name="show_chart" className="text-4xl" />
            </div>
            {/* Mock Bars */}
            <div className="w-1/6 bg-primary opacity-40 rounded-t h-1/3"></div>
            <div className="w-1/6 bg-primary opacity-60 rounded-t h-1/2"></div>
            <div className="w-1/6 bg-primary opacity-50 rounded-t h-2/5"></div>
            <div className="w-1/6 bg-primary opacity-80 rounded-t h-3/4"></div>
            <div className="w-1/6 bg-primary opacity-90 rounded-t h-4/5"></div>
            <div className="w-1/6 bg-primary opacity-100 rounded-t h-full"></div>
          </div>
          <div className="grid grid-cols-2 gap-stack-sm mt-auto">
            <div className="p-stack-sm bg-surface-container-low rounded border border-outline-variant">
              <div className="text-label-caps font-label-caps text-on-surface-variant mb-1">Vol / Hr</div>
              <div className="text-title-md font-data-mono text-on-surface">₦1.2M</div>
            </div>
            <div className="p-stack-sm bg-error-container text-on-error-container rounded border border-error opacity-80">
              <div className="text-label-caps font-label-caps mb-1">Pend Refund</div>
              <div className="text-title-md font-data-mono">₦45K</div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Row: System Health & Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-md">
        {/* System Health Widget */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md">
          <h2 className="text-title-md font-title-md text-on-surface mb-stack-md flex items-center gap-2">
            <Icon name="dns" className="text-primary" /> System Health
          </h2>
          <ul className="space-y-stack-sm">
            <li className="flex justify-between items-center p-stack-sm border border-outline-variant rounded bg-surface-container-low">
              <span className="text-body-sm font-body-sm text-on-surface">Core API</span>
              <Icon name="check_circle" className="text-primary" />
            </li>
            <li className="flex justify-between items-center p-stack-sm border border-outline-variant rounded bg-surface-container-low">
              <span className="text-body-sm font-body-sm text-on-surface">Database (Primary)</span>
              <Icon name="check_circle" className="text-primary" />
            </li>
            <li className="flex justify-between items-center p-stack-sm border border-outline-variant rounded bg-surface-container-low">
              <span className="text-body-sm font-body-sm text-on-surface">Payment Gateway</span>
              <Icon name="check_circle" className="text-primary" />
            </li>
            <li className="flex justify-between items-center p-stack-sm border border-outline-variant rounded bg-surface-container-low">
              <span className="text-body-sm font-body-sm text-on-surface">Ticket Inventory</span>
              <Icon name="check_circle" className="text-primary" />
            </li>
          </ul>
        </section>

        {/* Audit Log */}
        <section className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded p-stack-md">
          <div className="flex justify-between items-center mb-stack-md">
            <h2 className="text-title-md font-title-md text-on-surface">Audit Log</h2>
            <button className="text-secondary text-body-sm font-body-sm hover:underline">View All</button>
          </div>
          <div className="space-y-0">
            {/* Log Entry */}
            <div className="flex gap-stack-sm py-stack-sm border-b border-outline-variant last:border-0 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-outline shrink-0"></div>
              <div className="flex-1">
                <p className="text-body-sm font-body-sm text-on-surface">Schedule Override: Train FRT-KAD-44 delayed by 15m.</p>
                <p className="text-label-caps font-label-caps text-on-surface-variant mt-1">Admin: JDoe • 10:42 AM</p>
              </div>
            </div>
            {/* Log Entry */}
            <div className="flex gap-stack-sm py-stack-sm border-b border-outline-variant last:border-0 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-outline shrink-0"></div>
              <div className="flex-1">
                <p className="text-body-sm font-body-sm text-on-surface">Refund Batch Processed: 45 tickets reversed.</p>
                <p className="text-label-caps font-label-caps text-on-surface-variant mt-1">System • 10:30 AM</p>
              </div>
            </div>
            {/* Log Entry */}
            <div className="flex gap-stack-sm py-stack-sm border-b border-outline-variant last:border-0 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-outline shrink-0"></div>
              <div className="flex-1">
                <p className="text-body-sm font-body-sm text-on-surface">Inventory Alert: EXP-LGA-01 First Class fully booked.</p>
                <p className="text-label-caps font-label-caps text-on-surface-variant mt-1">System • 09:15 AM</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
