import { useState } from 'react';
import { Icon } from '../components/ui/Icon';

export function AdminRevenuePage() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>('PAY-NG-88102');

  const handleRowClick = (id: string) => {
    setSelectedTransaction(id);
  };

  const closeSidebar = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="flex gap-gutter h-full w-full">
      {/* Left Side: Dashboard & Table */}
      <div className="flex-1 flex flex-col gap-stack-lg min-w-0 transition-all duration-300 h-full overflow-y-auto">
        {/* Page Header & Summary */}
        <section>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">Payment Operations</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
            {/* Stat Card 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex flex-col gap-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wide">Total Success (Today)</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-display-lg text-primary font-data-mono">₦ 4.2M</span>
              </div>
              <span className="font-body-sm text-body-sm text-[#002b1e] flex items-center gap-1">
                <Icon name="trending_up" className="text-base" />
                +12% vs yesterday
              </span>
            </div>
            
            {/* Stat Card 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex flex-col gap-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wide">Pending Settlements</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-display-lg text-on-surface font-data-mono">₦ 850K</span>
              </div>
              <span className="font-body-sm text-body-sm text-[#4e3600] flex items-center gap-1">
                <Icon name="schedule" className="text-base" />
                42 transactions
              </span>
            </div>
            
            {/* Stat Card 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex flex-col gap-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wide">Failed Transactions</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-display-lg text-on-surface font-data-mono">₦ 125K</span>
              </div>
              <span className="font-body-sm text-body-sm text-error flex items-center gap-1">
                <Icon name="error" className="text-base" />
                Requires attention (8)
              </span>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant mr-2">Status:</span>
            <button className="px-3 py-1.5 rounded-full bg-[rgba(0,43,30,0.1)] text-[#002b1e] border border-[rgba(0,43,30,0.2)] font-body-sm text-body-sm flex items-center gap-1 hover:bg-[rgba(0,43,30,0.2)] transition-colors">
              Success <Icon name="check_circle" className="text-sm" />
            </button>
            <button className="px-3 py-1.5 rounded-full bg-surface text-on-surface-variant border border-outline-variant font-body-sm text-body-sm hover:bg-surface-variant transition-colors">
              Pending
            </button>
            <button className="px-3 py-1.5 rounded-full bg-surface text-on-surface-variant border border-outline-variant font-body-sm text-body-sm hover:bg-surface-variant transition-colors">
              Failed
            </button>
            <button className="px-3 py-1.5 rounded-full bg-surface text-on-surface-variant border border-outline-variant font-body-sm text-body-sm hover:bg-surface-variant transition-colors">
              Refunded
            </button>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg" />
              <input 
                className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-sm text-body-sm" 
                placeholder="Search ID, PNR, User..." 
                type="text"
              />
            </div>
            <button aria-label="Filter Date" className="p-2 border border-outline-variant rounded bg-surface text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center">
              <Icon name="calendar_today" />
            </button>
          </div>
        </section>

        {/* Data Table */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex-1 flex flex-col min-h-[300px]">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-surface-container-low border-b border-outline-variant sticky top-0">
                <tr>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant">Payment ID</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant">Booking</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant">User</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant text-right">Amount (NGN)</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant text-center">Status</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant">Created Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
                {/* Success Row */}
                <tr 
                  className={`transition-colors cursor-pointer ${selectedTransaction === 'PAY-NG-88102' ? 'bg-primary-container/5 hover:bg-primary-container/10' : 'hover:bg-surface-variant/50'}`}
                  onClick={() => handleRowClick('PAY-NG-88102')}
                >
                  <td className="py-3 px-4">
                    <span className="font-data-mono text-primary font-medium">PAY-NG-88102</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-on-surface">Lagos → Ibadan</span>
                      <span className="font-data-mono text-xs text-on-surface-variant">PNR: NRC-782-991A</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-on-surface">Adeola Ogunleye</span>
                      <span className="text-xs text-on-surface-variant">a.ogunleye@email.com</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-data-mono font-medium text-on-surface">₦ 12,500.00</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-[rgba(0,43,30,0.1)] text-[#002b1e] text-xs font-semibold">
                      Success
                    </span>
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">Oct 24, 08:00 AM</td>
                </tr>

                {/* Pending Row */}
                <tr 
                  className={`transition-colors cursor-pointer ${selectedTransaction === 'PAY-NG-88101' ? 'bg-primary-container/5 hover:bg-primary-container/10' : 'hover:bg-surface-variant/50'}`}
                  onClick={() => handleRowClick('PAY-NG-88101')}
                >
                  <td className="py-3 px-4">
                    <span className="font-data-mono text-on-surface">PAY-NG-88101</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-on-surface">Abuja → Kaduna</span>
                      <span className="font-data-mono text-xs text-on-surface-variant">PNR: NRC-442-101B</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-on-surface">Michael Eze</span>
                      <span className="text-xs text-on-surface-variant">m.eze@email.com</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-data-mono font-medium text-on-surface">₦ 8,200.00</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-[rgba(255,186,32,0.1)] text-[#4e3600] text-xs font-semibold">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">Oct 24, 07:45 AM</td>
                </tr>

                {/* Failed Row */}
                <tr 
                  className={`transition-colors cursor-pointer ${selectedTransaction === 'PAY-NG-88100' ? 'bg-primary-container/5 hover:bg-primary-container/10' : 'hover:bg-surface-variant/50'}`}
                  onClick={() => handleRowClick('PAY-NG-88100')}
                >
                  <td className="py-3 px-4">
                    <span className="font-data-mono text-on-surface">PAY-NG-88100</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-on-surface">Kano → Lagos</span>
                      <span className="font-data-mono text-xs text-on-surface-variant">PNR: --</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-on-surface">Sarah John</span>
                      <span className="text-xs text-on-surface-variant">s.john@email.com</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-data-mono font-medium text-on-surface">₦ 15,000.00</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-[rgba(186,26,26,0.1)] text-error text-xs font-semibold">
                      Failed
                    </span>
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">Oct 24, 07:30 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-surface border-t border-outline-variant p-3 flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant shrink-0 mt-auto">
            <span>Showing 1 to 25 of 142 entries</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant disabled:opacity-50" disabled>Prev</button>
              <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant bg-surface-container-high">1</button>
              <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant">2</button>
              <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant">Next</button>
            </div>
          </div>
        </section>
      </div>

      {/* Right Sidebar: Detail Panel (Active State) */}
      {selectedTransaction && (
        <aside className="w-80 shrink-0 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm flex flex-col h-full sticky top-0 overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="p-4 border-b border-outline-variant flex justify-between items-start bg-surface-container-low">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Payment Detail</span>
              <h3 className="font-title-md text-title-md text-on-surface font-data-mono">{selectedTransaction}</h3>
            </div>
            <button className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-variant transition-colors" onClick={closeSidebar}>
              <Icon name="close" />
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            {/* Top Summary */}
            <div className="flex flex-col items-center justify-center p-4 bg-surface-bright rounded-lg border border-outline-variant">
              <span className="font-data-mono text-[28px] font-bold text-primary mb-2">
                {selectedTransaction === 'PAY-NG-88102' ? '₦ 12,500.00' : selectedTransaction === 'PAY-NG-88100' ? '₦ 15,000.00' : '₦ 8,200.00'}
              </span>
              {selectedTransaction === 'PAY-NG-88102' ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[rgba(0,43,30,0.1)] text-[#002b1e] text-sm font-semibold">
                  <Icon name="check_circle" className="text-base mr-1" /> Success
                </span>
              ) : selectedTransaction === 'PAY-NG-88100' ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[rgba(186,26,26,0.1)] text-error text-sm font-semibold">
                  <Icon name="error" className="text-base mr-1" /> Failed
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[rgba(255,186,32,0.1)] text-[#4e3600] text-sm font-semibold">
                  <Icon name="schedule" className="text-base mr-1" /> Pending
                </span>
              )}
            </div>
            
            {/* Timeline */}
            <div>
              <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-4 border-b border-outline-variant pb-2">Transaction Timeline</h4>
              <div className="relative pl-4 space-y-4 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-surface-variant border-2 border-outline-variant mt-1.5"></div>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Payment Initiated (Paystack)</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-0.5">Oct 24, 08:00 AM</p>
                </div>
                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-surface-variant border-2 border-outline-variant mt-1.5"></div>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Authorization Received</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-0.5">Oct 24, 08:01 AM</p>
                </div>
                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-surface-variant border-2 border-outline-variant mt-1.5"></div>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Funds Captured</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-0.5">Oct 24, 08:01 AM</p>
                </div>
                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-primary border-2 border-primary-fixed mt-1.5"></div>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Booking Confirmed</p>
                  <p className="font-data-mono text-xs text-primary mt-0.5">PNR: NRC-782-991A</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-0.5">Oct 24, 08:01 AM</p>
                </div>
              </div>
            </div>
            
            {/* Metadata */}
            <div>
              <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-3 border-b border-outline-variant pb-2">Metadata</h4>
              <div className="space-y-3 font-body-sm text-body-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Provider Ref</span>
                  <span className="font-data-mono text-on-surface">ps_live_x9k2m...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Channel</span>
                  <span className="text-on-surface flex items-center gap-1"><Icon name="credit_card" className="text-sm" /> Card (Visa **4242)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">IP Address</span>
                  <span className="font-data-mono text-on-surface">102.89.44.12</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="p-4 border-t border-outline-variant bg-surface flex flex-col gap-2 mt-auto">
            <button className="w-full py-2 px-4 rounded border border-on-surface-variant text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors font-body-sm text-body-sm font-medium flex justify-center items-center gap-2">
              <Icon name="undo" className="text-lg" /> Issue Manual Refund
            </button>
            <button className="w-full py-2 px-4 rounded bg-surface text-primary border border-outline-variant hover:bg-surface-variant transition-colors font-body-sm text-body-sm flex justify-center items-center gap-2">
              View Full Receipt
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
