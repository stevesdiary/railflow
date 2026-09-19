import { useState } from 'react';
import { Icon } from '../components/ui/Icon';

export function AdminSystemHealthPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>('EVT-99283');

  const handleRowClick = (id: string) => {
    setSelectedEvent(id);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">System Audit Log</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Viewing 42,918 events for selected period.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant text-on-surface rounded hover:bg-surface-container-high transition-colors font-body-md text-body-md bg-white">
          <Icon name="filter_list" /> Advanced Filters
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white border border-outline-variant p-4 rounded mb-6 flex flex-wrap gap-4 items-end shadow-sm shrink-0">
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Date Range</label>
          <div className="relative">
            <input 
              className="w-full border border-outline-variant rounded px-3 py-2 font-body-md text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
              type="text" 
              value="Oct 1 - Oct 24, 2024"
              readOnly 
            />
            <Icon name="calendar_today" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" />
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Actor</label>
          <select className="w-full border border-outline-variant rounded px-3 py-2 font-body-md text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white">
            <option>All Actors</option>
            <option>System</option>
            <option>Admins</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Action Type</label>
          <select className="w-full border border-outline-variant rounded px-3 py-2 font-body-md text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white">
            <option>All Actions</option>
            <option>Created</option>
            <option>Modified</option>
            <option>Deleted</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Resource</label>
          <select className="w-full border border-outline-variant rounded px-3 py-2 font-body-md text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white">
            <option>All Resources</option>
            <option>Booking</option>
            <option>Inventory</option>
          </select>
        </div>
      </div>
      
      {/* Data Grid Layout */}
      <div className="flex flex-1 flex-col lg:flex-row gap-6 min-h-0">
        {/* Main Table */}
        <div className="flex-[2] bg-white border border-outline-variant rounded flex flex-col overflow-hidden shadow-sm">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 bg-surface">
                <tr className="border-b border-outline-variant">
                  <th className="px-4 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase whitespace-nowrap">Timestamp (UTC)</th>
                  <th className="px-4 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase">Actor</th>
                  <th className="px-4 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase">Action</th>
                  <th className="px-4 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase">Resource</th>
                  <th className="px-4 py-3 font-label-caps text-label-caps text-on-surface-variant uppercase">Ref ID</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant">
                {/* Row 1 */}
                <tr 
                  className={`transition-colors cursor-pointer ${selectedEvent === 'EVT-99283' ? 'bg-[#eaf1ff] hover:bg-[#d9e3f4]' : 'hover:bg-surface-container-high'}`}
                  onClick={() => handleRowClick('EVT-99283')}
                >
                  <td className="px-4 py-3 font-data-mono text-on-surface-variant whitespace-nowrap">Oct 24, 14:32:05</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-primary">ADM-8829</div>
                    <div className="text-[12px] text-on-surface-variant">Olumide A.</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7] font-medium text-[12px]">
                      Authorized Refund
                    </span>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">Refund</td>
                  <td className="px-4 py-3 font-data-mono text-primary">RF-2023-8891</td>
                </tr>
                
                {/* Row 2 */}
                <tr 
                  className={`transition-colors cursor-pointer ${selectedEvent === 'EVT-99284' ? 'bg-[#eaf1ff] hover:bg-[#d9e3f4]' : 'hover:bg-surface-container-high'}`}
                  onClick={() => handleRowClick('EVT-99284')}
                >
                  <td className="px-4 py-3 font-data-mono text-on-surface-variant whitespace-nowrap">Oct 24, 14:28:12</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-secondary">SYS-AUTO</div>
                    <div className="text-[12px] text-on-surface-variant">System</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-surface-container text-on-surface-variant border border-outline-variant font-medium text-[12px]">
                      Modified Status
                    </span>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">Queue</td>
                  <td className="px-4 py-3 font-data-mono text-primary">Q-LOS-A1</td>
                </tr>
                
                {/* Row 3 */}
                <tr 
                  className={`transition-colors cursor-pointer ${selectedEvent === 'EVT-99285' ? 'bg-[#eaf1ff] hover:bg-[#d9e3f4]' : 'hover:bg-surface-container-high'}`}
                  onClick={() => handleRowClick('EVT-99285')}
                >
                  <td className="px-4 py-3 font-data-mono text-on-surface-variant whitespace-nowrap">Oct 24, 14:25:55</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-primary">OP-1022</div>
                    <div className="text-[12px] text-on-surface-variant">Ibrahim M.</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-[#fff3e0] text-[#e65100] border border-[#ffcc80] font-medium text-[12px]">
                      Modified Inventory
                    </span>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">Seat</td>
                  <td className="px-4 py-3 font-data-mono text-primary">TRN-01-C2-14</td>
                </tr>
                
                {/* Row 4 */}
                <tr 
                  className={`transition-colors cursor-pointer ${selectedEvent === 'EVT-99286' ? 'bg-[#eaf1ff] hover:bg-[#d9e3f4]' : 'hover:bg-surface-container-high'}`}
                  onClick={() => handleRowClick('EVT-99286')}
                >
                  <td className="px-4 py-3 font-data-mono text-on-surface-variant whitespace-nowrap">Oct 24, 14:20:10</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-error">ADM-8829</div>
                    <div className="text-[12px] text-on-surface-variant">Olumide A.</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-[#ffebee] text-[#c62828] border border-[#ef9a9a] font-medium text-[12px]">
                      Suspended Account
                    </span>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">User</td>
                  <td className="px-4 py-3 font-data-mono text-primary">USR-7731F</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-outline-variant bg-surface flex justify-between items-center text-on-surface-variant font-body-sm text-body-sm mt-auto shrink-0">
            <span>Showing 1-4 of 42,918</span>
            <div className="flex gap-2">
              <button className="p-1 rounded hover:bg-outline-variant transition-colors"><Icon name="chevron_left" className="text-[20px]" /></button>
              <button className="p-1 rounded hover:bg-outline-variant transition-colors"><Icon name="chevron_right" className="text-[20px]" /></button>
            </div>
          </div>
        </div>
        
        {/* Detail Panel */}
        {selectedEvent && (
          <div className="flex-1 bg-white border border-outline-variant rounded flex flex-col shadow-sm max-w-full lg:max-w-[400px]">
            <div className="p-4 border-b border-outline-variant bg-surface flex justify-between items-center">
              <h3 className="font-title-md text-[18px] text-on-surface font-semibold">Event Details</h3>
              <span className="font-data-mono text-[12px] text-on-surface-variant">{selectedEvent}</span>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto space-y-6">
              <div>
                <p className="font-body-md text-body-md text-on-surface mb-2">
                  {selectedEvent === 'EVT-99283' ? 'Approved 12,500.00 NGN refund for PNR: XL9B2M.' : 
                   selectedEvent === 'EVT-99284' ? 'Modified queue status for Q-LOS-A1.' :
                   selectedEvent === 'EVT-99285' ? 'Modified seat inventory for TRN-01-C2-14.' :
                   'Suspended user account USR-7731F due to suspicious activity.'}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 font-data-mono text-[12px] text-on-surface-variant bg-surface p-3 rounded border border-outline-variant">
                  <div><span className="text-[#707974]">IP:</span> 198.51.100.42</div>
                  <div><span className="text-[#707974]">Session:</span> SESS-7721</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase">State Change</h4>
                  <button className="text-primary hover:underline text-[12px] font-medium">View JSON</button>
                </div>
                
                {selectedEvent === 'EVT-99283' && (
                  <div className="space-y-2">
                    <div className="p-3 bg-[#ffebee] border border-[#ffcdd2] rounded text-error relative font-data-mono text-[13px] leading-relaxed">
                      <div className="absolute -left-1 top-3 w-2 h-0.5 bg-error"></div>
                      - {"{"}"status": "pending_approval", <br/>&nbsp;&nbsp;"authorized_by": null{"}"}
                    </div>
                    <div className="p-3 bg-[#e8f5e9] border border-[#c8e6c9] rounded text-[#2e7d32] relative font-data-mono text-[13px] leading-relaxed">
                      <div className="absolute -left-1 top-3 w-2 h-0.5 bg-[#2e7d32]"></div>
                      + {"{"}"status": "completed", <br/>&nbsp;&nbsp;"authorized_by": "ADM-8829"{"}"}
                    </div>
                  </div>
                )}
                
                {selectedEvent === 'EVT-99284' && (
                  <div className="space-y-2">
                    <div className="p-3 bg-[#ffebee] border border-[#ffcdd2] rounded text-error relative font-data-mono text-[13px] leading-relaxed">
                      <div className="absolute -left-1 top-3 w-2 h-0.5 bg-error"></div>
                      - {"{"}"status": "paused"{"}"}
                    </div>
                    <div className="p-3 bg-[#e8f5e9] border border-[#c8e6c9] rounded text-[#2e7d32] relative font-data-mono text-[13px] leading-relaxed">
                      <div className="absolute -left-1 top-3 w-2 h-0.5 bg-[#2e7d32]"></div>
                      + {"{"}"status": "active"{"}"}
                    </div>
                  </div>
                )}
                
                {selectedEvent === 'EVT-99285' && (
                  <div className="space-y-2">
                    <div className="p-3 bg-[#ffebee] border border-[#ffcdd2] rounded text-error relative font-data-mono text-[13px] leading-relaxed">
                      <div className="absolute -left-1 top-3 w-2 h-0.5 bg-error"></div>
                      - {"{"}"status": "available"{"}"}
                    </div>
                    <div className="p-3 bg-[#e8f5e9] border border-[#c8e6c9] rounded text-[#2e7d32] relative font-data-mono text-[13px] leading-relaxed">
                      <div className="absolute -left-1 top-3 w-2 h-0.5 bg-[#2e7d32]"></div>
                      + {"{"}"status": "blocked_maintenance"{"}"}
                    </div>
                  </div>
                )}
                
                {selectedEvent === 'EVT-99286' && (
                  <div className="space-y-2">
                    <div className="p-3 bg-[#ffebee] border border-[#ffcdd2] rounded text-error relative font-data-mono text-[13px] leading-relaxed">
                      <div className="absolute -left-1 top-3 w-2 h-0.5 bg-error"></div>
                      - {"{"}"account_status": "active"{"}"}
                    </div>
                    <div className="p-3 bg-[#e8f5e9] border border-[#c8e6c9] rounded text-[#2e7d32] relative font-data-mono text-[13px] leading-relaxed">
                      <div className="absolute -left-1 top-3 w-2 h-0.5 bg-[#2e7d32]"></div>
                      + {"{"}"account_status": "suspended", <br/>&nbsp;&nbsp;"reason": "fraud_pattern"{"}"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
