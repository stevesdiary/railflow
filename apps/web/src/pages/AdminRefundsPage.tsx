import { Icon } from '../components/ui/Icon';

export function AdminRefundsPage() {
  return (
    <div className="flex flex-col gap-stack-lg w-full">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-surface-variant pb-stack-md">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-6 text-primary-container">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-primary font-headline-lg-mobile lg:font-headline-lg">Iron & Rail Refund Management</h2>
        </div>
      </header>
      
      <div className="flex flex-wrap gap-stack-md">
        <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl p-stack-md border border-outline-variant bg-surface-container-lowest shadow-sm">
          <p className="text-on-surface-variant font-body-sm uppercase tracking-wide">Total Refund Volume (Today)</p>
          <p className="text-primary font-display-lg font-data-mono">NGN 1,250,000</p>
          <div className="flex items-center gap-1 text-primary-container">
            <Icon name="trending_up" className="text-base" />
            <p className="font-body-sm font-medium">+5% vs yesterday</p>
          </div>
        </div>
        
        <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl p-stack-md border border-outline-variant bg-surface-container-lowest shadow-sm">
          <p className="text-on-surface-variant font-body-sm uppercase tracking-wide">Pending Approvals</p>
          <p className="text-primary font-display-lg font-data-mono">45</p>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <Icon name="schedule" className="text-base" />
            <p className="font-body-sm font-medium">Awaiting action</p>
          </div>
        </div>
        
        <div className="flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl p-stack-md border border-error bg-error-container shadow-sm">
          <p className="text-[#93000a] font-body-sm uppercase tracking-wide font-bold">Failed Refunds (Urgent)</p>
          <p className="text-[#93000a] font-display-lg font-data-mono">12</p>
          <div className="flex items-center gap-1 text-error">
            <Icon name="error" className="text-base" />
            <p className="font-body-sm font-medium">Require immediate attention</p>
          </div>
        </div>
      </div>
      
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-stack-md py-stack-md border-b border-surface-variant">
          <h2 className="text-primary font-title-md">Refund Registry</h2>
          <div className="flex gap-stack-sm">
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary-container text-on-primary-container px-4 cursor-pointer hover:bg-primary transition-colors">
              <p className="font-label-caps">All</p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface text-on-surface border border-outline-variant px-4 cursor-pointer hover:bg-surface-variant transition-colors">
              <p className="font-label-caps">Pending</p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface text-on-surface border border-outline-variant px-4 cursor-pointer hover:bg-surface-variant transition-colors">
              <p className="font-label-caps">Failed</p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface text-on-surface border border-outline-variant px-4 cursor-pointer hover:bg-surface-variant transition-colors">
              <p className="font-label-caps">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="px-stack-md py-stack-sm border-b border-surface-variant bg-surface-container-low">
          <label className="flex flex-col w-full max-w-md h-10">
            <div className="flex w-full flex-1 items-stretch rounded h-full border border-outline-variant bg-surface-container-lowest focus-within:border-primary-container overflow-hidden">
              <div className="text-on-surface-variant flex border-none items-center justify-center pl-3">
                <Icon name="search" className="text-[18px]" />
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-on-surface focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-on-surface-variant px-3 font-body-sm" placeholder="Search by PNR, Refund ID, Payment Ref" />
            </div>
          </label>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-variant bg-surface-container-lowest text-on-surface-variant font-label-caps">
                <th className="p-stack-sm font-medium">Refund ID</th>
                <th className="p-stack-sm font-medium">Booking (Route)</th>
                <th className="p-stack-sm font-medium">PNR</th>
                <th className="p-stack-sm font-medium">Payment Ref</th>
                <th className="p-stack-sm font-medium text-right">Amount (NGN)</th>
                <th className="p-stack-sm font-medium">Status</th>
                <th className="p-stack-sm font-medium">Requested Date</th>
                <th className="p-stack-sm font-medium"></th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-on-surface">
              <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="p-stack-sm font-data-mono text-primary-container">RFD-9938</td>
                <td className="p-stack-sm">Lagos - Ibadan<br/><span className="text-on-surface-variant text-xs">Standard Class</span></td>
                <td className="p-stack-sm font-data-mono">X7Y8Z9</td>
                <td className="p-stack-sm font-data-mono text-xs text-on-surface-variant">PAY-1002938</td>
                <td className="p-stack-sm font-data-mono text-right">4,500.00</td>
                <td className="p-stack-sm">
                  <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-[#ffdea8] text-[#271900]">
                    Pending
                  </span>
                </td>
                <td className="p-stack-sm font-data-mono text-xs">2023-10-27 14:30</td>
                <td className="p-stack-sm text-right"><Icon name="chevron_right" className="text-on-surface-variant group-hover:text-primary transition-colors" /></td>
              </tr>
              
              <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors group cursor-pointer bg-error-container/20">
                <td className="p-stack-sm font-data-mono text-primary-container">RFD-9937</td>
                <td className="p-stack-sm">Abuja - Kaduna<br/><span className="text-on-surface-variant text-xs">First Class</span></td>
                <td className="p-stack-sm font-data-mono">A1B2C3</td>
                <td className="p-stack-sm font-data-mono text-xs text-on-surface-variant">PAY-1002930</td>
                <td className="p-stack-sm font-data-mono text-right">9,000.00</td>
                <td className="p-stack-sm">
                  <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-error text-on-error">
                    Failed
                  </span>
                </td>
                <td className="p-stack-sm font-data-mono text-xs">2023-10-27 10:15</td>
                <td className="p-stack-sm text-right"><Icon name="chevron_right" className="text-on-surface-variant group-hover:text-primary transition-colors" /></td>
              </tr>
              
              <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="p-stack-sm font-data-mono text-primary-container">RFD-9936</td>
                <td className="p-stack-sm">Lagos - Ibadan<br/><span className="text-on-surface-variant text-xs">Standard Class</span></td>
                <td className="p-stack-sm font-data-mono">M9N8B7</td>
                <td className="p-stack-sm font-data-mono text-xs text-on-surface-variant">PAY-1002910</td>
                <td className="p-stack-sm font-data-mono text-right">4,500.00</td>
                <td className="p-stack-sm">
                  <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium bg-primary-fixed-dim text-on-primary-fixed">
                    Completed
                  </span>
                </td>
                <td className="p-stack-sm font-data-mono text-xs">2023-10-26 16:45</td>
                <td className="p-stack-sm text-right"><Icon name="chevron_right" className="text-on-surface-variant group-hover:text-primary transition-colors" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
