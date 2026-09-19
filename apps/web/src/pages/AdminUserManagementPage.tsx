import { Icon } from '../components/ui/Icon';

export function AdminUserManagementPage() {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background relative z-10 h-full">
      {/* Page Header & Filters */}
      <div className="px-margin-desktop py-gutter bg-surface-bright border-b border-outline-variant flex-shrink-0">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">User Management</h2>
            <p className="font-body-sm text-body-sm text-secondary mt-base">Manage passenger accounts, verify identities, and monitor risk profiles.</p>
          </div>
          <div className="flex flex-wrap items-center gap-stack-sm">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]" />
              <input className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded font-body-sm text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Search ID, Name, Email..." type="text" />
            </div>
            {/* Global Filter */}
            <div className="relative min-w-[160px]">
              <select className="w-full appearance-none pl-4 pr-10 py-2 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer">
                <option value="all">Status: All</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="blocked">Blocked</option>
                <option value="pending">Pending Verification</option>
              </select>
              <Icon name="arrow_drop_down" className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary text-[20px] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace (Table + Detail View) */}
      <main className="flex-1 overflow-hidden flex max-w-[1280px] mx-auto w-full px-margin-desktop py-gutter gap-gutter relative">
        {/* Data Table Section */}
        <div className="flex-1 flex flex-col bg-surface border border-outline-variant rounded overflow-hidden h-full shadow-sm">
          {/* Table Header Row */}
          <div className="grid grid-cols-12 gap-4 px-stack-md py-3 bg-surface-container-low border-b border-outline-variant font-label-caps text-label-caps text-secondary select-none">
            <div className="col-span-2">User ID</div>
            <div className="col-span-3">Passenger Info</div>
            <div className="col-span-2">Contact (Masked)</div>
            <div className="col-span-2">Reg. Date</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2 text-right">Risk Level</div>
          </div>
          {/* Table Body */}
          <div className="flex-1 overflow-y-auto">
            {/* Row 1 (Active, Low Risk - Selected State) */}
            <div className="grid grid-cols-12 gap-4 px-stack-md py-4 border-b border-outline-variant items-center bg-primary-container/5 cursor-pointer hover:bg-surface-variant transition-colors relative group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <div className="col-span-2 font-data-mono text-data-mono text-on-surface">USR-8492A</div>
              <div className="col-span-3">
                <p className="font-body-md text-body-md font-semibold truncate text-on-surface">Adebayo, Olumide</p>
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <div className="flex items-center gap-1 font-data-mono text-data-mono text-secondary text-[12px]"><Icon name="mail" className="text-[14px]" /> o**@gmail.com</div>
                <div className="flex items-center gap-1 font-data-mono text-data-mono text-secondary text-[12px]"><Icon name="phone" className="text-[14px]" /> +234 803 *** 1234</div>
              </div>
              <div className="col-span-2 font-data-mono text-data-mono text-secondary text-[13px]">12 Oct 2023</div>
              <div className="col-span-1 flex justify-center">
                <span className="inline-flex px-2 py-1 bg-[#b4efd5]/20 text-[#004331] font-label-caps text-label-caps rounded-sm border border-[#004331]/10">ACTIVE</span>
              </div>
              <div className="col-span-2 flex justify-end items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-body-sm text-body-sm text-secondary">Low</span>
              </div>
            </div>

            {/* Row 2 (Pending, Medium Risk) */}
            <div className="grid grid-cols-12 gap-4 px-stack-md py-4 border-b border-outline-variant items-center cursor-pointer hover:bg-surface-variant transition-colors group">
              <div className="col-span-2 font-data-mono text-data-mono text-on-surface">USR-9122C</div>
              <div className="col-span-3 flex items-center gap-2">
                <p className="font-body-md text-body-md font-semibold truncate text-on-surface">Okafor, Chioma</p>
                <Icon name="gpp_maybe" className="text-[16px] text-tertiary-container" title="Unverified ID" />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <div className="flex items-center gap-1 font-data-mono text-data-mono text-secondary text-[12px]"><Icon name="mail" className="text-[14px]" /> c**@yahoo.com</div>
                <div className="flex items-center gap-1 font-data-mono text-data-mono text-secondary text-[12px]"><Icon name="phone" className="text-[14px]" /> +234 812 *** 8841</div>
              </div>
              <div className="col-span-2 font-data-mono text-data-mono text-secondary text-[13px]">04 Nov 2023</div>
              <div className="col-span-1 flex justify-center">
                <span className="inline-flex px-2 py-1 bg-tertiary-container/10 text-tertiary-container font-label-caps text-label-caps rounded-sm border border-tertiary-container/10">PENDING</span>
              </div>
              <div className="col-span-2 flex justify-end items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffba20]"></span>
                <span className="font-body-sm text-body-sm text-secondary">Medium</span>
              </div>
            </div>

            {/* Row 3 (Suspended, High Risk) */}
            <div className="grid grid-cols-12 gap-4 px-stack-md py-4 border-b border-outline-variant items-center cursor-pointer hover:bg-surface-variant transition-colors group">
              <div className="col-span-2 font-data-mono text-data-mono text-on-surface">USR-7731F</div>
              <div className="col-span-3">
                <p className="font-body-md text-body-md font-semibold truncate text-on-surface">Musa, Ibrahim</p>
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <div className="flex items-center gap-1 font-data-mono text-data-mono text-secondary text-[12px]"><Icon name="mail" className="text-[14px]" /> i**@company.ng</div>
                <div className="flex items-center gap-1 font-data-mono text-data-mono text-secondary text-[12px]"><Icon name="phone" className="text-[14px]" /> +234 905 *** 3321</div>
              </div>
              <div className="col-span-2 font-data-mono text-data-mono text-secondary text-[13px]">28 Aug 2023</div>
              <div className="col-span-1 flex justify-center">
                <span className="inline-flex px-2 py-1 bg-error-container/40 text-error font-label-caps text-label-caps rounded-sm border border-error/20">SUSPENDED</span>
              </div>
              <div className="col-span-2 flex justify-end items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-body-sm text-body-sm text-secondary">High</span>
              </div>
            </div>
          </div>
          {/* Table Footer/Pagination */}
          <div className="p-stack-sm bg-surface-container-lowest border-t border-outline-variant flex justify-between items-center text-body-sm text-secondary">
            <span>Showing 1-3 of 1,248</span>
            <div className="flex gap-2">
              <button className="p-1 rounded hover:bg-surface-variant disabled:opacity-50"><Icon name="chevron_left" className="text-[20px]" /></button>
              <button className="p-1 rounded hover:bg-surface-variant"><Icon name="chevron_right" className="text-[20px]" /></button>
            </div>
          </div>
        </div>

        {/* Detail Panel (Sidebar) */}
        <aside className="w-[400px] h-full flex flex-col bg-surface border border-outline-variant rounded overflow-hidden shadow-[0_4px_6px_-1px_rgba(26,38,52,0.1)] flex-shrink-0">
          {/* Detail Header */}
          <div className="p-stack-md bg-surface-container-low border-b border-outline-variant relative">
            <div className="flex justify-between items-start mb-stack-sm">
              <div className="flex items-center gap-2">
                <Icon name="account_circle" className="text-[28px] text-primary" />
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface leading-tight">Adebayo, Olumide</h3>
                  <p className="font-data-mono text-data-mono text-secondary text-[12px]">ID: USR-8492A</p>
                </div>
              </div>
              <button className="text-secondary hover:text-on-surface"><Icon name="more_vert" className="text-[20px]" /></button>
            </div>
            <div className="flex items-center justify-between mt-stack-md bg-surface rounded border border-outline-variant p-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex px-2 py-1 bg-[#b4efd5]/20 text-[#004331] font-label-caps text-label-caps rounded-sm">ACTIVE</span>
                <span className="font-body-sm text-body-sm text-secondary">Verified ID: NIN-***45</span>
              </div>
              <button className="font-label-caps text-label-caps text-primary border border-outline-variant px-3 py-1 rounded hover:bg-surface-variant transition-colors">ACTIONS <Icon name="arrow_drop_down" className="text-[14px] align-middle" /></button>
            </div>
          </div>

          {/* Scrollable Detail Content */}
          <div className="flex-1 overflow-y-auto p-stack-md flex flex-col gap-stack-lg bg-surface">
            {/* Risk & Metrics */}
            <section>
              <h4 className="font-label-caps text-label-caps text-secondary mb-stack-sm flex items-center gap-1"><Icon name="monitoring" className="text-[16px]" /> Risk Indicators</h4>
              <div className="grid grid-cols-2 gap-stack-sm">
                <div className="bg-background border border-outline-variant p-stack-sm rounded">
                  <p className="font-label-caps text-label-caps text-secondary mb-1">CANCELLATION RATE</p>
                  <p className="font-data-mono text-data-mono text-on-surface text-lg">4.2%</p>
                  <p className="font-body-sm text-[11px] text-[#004331] mt-1 flex items-center gap-1"><Icon name="trending_down" className="text-[12px]" /> Normal</p>
                </div>
                <div className="bg-background border border-outline-variant p-stack-sm rounded">
                  <p className="font-label-caps text-label-caps text-secondary mb-1">NO-SHOWS (30D)</p>
                  <p className="font-data-mono text-data-mono text-on-surface text-lg">0</p>
                  <p className="font-body-sm text-[11px] text-secondary mt-1">Excellent standing</p>
                </div>
              </div>
            </section>

            {/* Booking History */}
            <section>
              <div className="flex justify-between items-center mb-stack-sm">
                <h4 className="font-label-caps text-label-caps text-secondary flex items-center gap-1"><Icon name="history" className="text-[16px]" /> Recent Bookings</h4>
                <a className="font-label-caps text-label-caps text-primary hover:underline" href="#">VIEW ALL</a>
              </div>
              <div className="border border-outline-variant rounded overflow-hidden">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center p-stack-sm border-b border-outline-variant bg-surface-bright hover:bg-surface-variant transition-colors">
                    <div>
                      <p className="font-data-mono text-data-mono text-on-surface text-[13px]">PNR: X89M2Q</p>
                      <p className="font-body-sm text-[12px] text-secondary">Lagos (LOS) → Ibadan (IBA)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-body-sm text-body-sm font-semibold text-[#004331]">Completed</p>
                      <p className="font-data-mono text-data-mono text-secondary text-[11px]">10 Nov 23</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-stack-sm border-b border-outline-variant bg-surface-bright hover:bg-surface-variant transition-colors">
                    <div>
                      <p className="font-data-mono text-data-mono text-on-surface text-[13px]">PNR: B44K9T</p>
                      <p className="font-body-sm text-[12px] text-secondary">Abuja (ABV) → Kaduna (KAD)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-body-sm text-body-sm font-semibold text-tertiary-container">Upcoming</p>
                      <p className="font-data-mono text-data-mono text-secondary text-[11px]">22 Nov 23</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Summary */}
            <section>
              <h4 className="font-label-caps text-label-caps text-secondary mb-stack-sm flex items-center gap-1"><Icon name="credit_card" className="text-[16px]" /> Payment History</h4>
              <div className="bg-surface-container-low border border-outline-variant rounded p-stack-sm font-body-sm text-body-sm">
                <div className="flex justify-between py-1 border-b border-outline-variant border-dashed">
                  <span className="text-secondary font-data-mono text-[12px]">TXN-99281 (Card ending **42)</span>
                  <span className="font-data-mono text-on-surface font-semibold">₦ 12,500</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant border-dashed">
                  <span className="text-secondary font-data-mono text-[12px]">TXN-88412 (Card ending **42)</span>
                  <span className="font-data-mono text-on-surface font-semibold">₦ 8,200</span>
                </div>
                <div className="mt-2 text-right">
                  <a className="font-label-caps text-label-caps text-primary hover:underline" href="#">SECURE LEDGER →</a>
                </div>
              </div>
            </section>

            {/* Audit Log */}
            <section>
              <h4 className="font-label-caps text-label-caps text-secondary mb-stack-sm flex items-center gap-1"><Icon name="policy" className="text-[16px]" /> Recent System Logs</h4>
              <ul className="relative border-l border-outline-variant ml-2 pl-4 flex flex-col gap-3 font-body-sm text-[12px]">
                <li className="relative">
                  <div className="absolute w-2 h-2 bg-outline-variant rounded-full -left-[21px] top-1"></div>
                  <p className="text-on-surface font-medium">Identity Verified (NIN Match)</p>
                  <p className="text-secondary font-data-mono text-[10px]">By: SYS-AUTO @ 12 Oct 23, 14:02</p>
                </li>
                <li className="relative">
                  <div className="absolute w-2 h-2 bg-outline-variant rounded-full -left-[21px] top-1"></div>
                  <p className="text-on-surface font-medium">Account Created</p>
                  <p className="text-secondary font-data-mono text-[10px]">Via: Web Portal @ 12 Oct 23, 13:45</p>
                </li>
              </ul>
            </section>
          </div>
        </aside>
      </main>
    </div>
  );
}
