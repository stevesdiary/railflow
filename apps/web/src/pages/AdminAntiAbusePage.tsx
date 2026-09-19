import { useState } from 'react';
import { Icon } from '../components/ui/Icon';

export function AdminAntiAbusePage() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>('198.51.100.42');

  const handleRowClick = (id: string) => {
    setSelectedIncident(id);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="flex justify-between items-end mb-stack-lg">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Anti-Abuse Monitoring</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Real-time threat detection and mitigation center.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-outline text-on-surface rounded font-label-caps text-label-caps hover:bg-surface-container transition-colors">
              <Icon name="download" className="text-sm" /> Export Log
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded font-label-caps text-label-caps hover:bg-primary-container transition-colors shadow-sm">
              <Icon name="add" className="text-sm" /> Custom Rule
            </button>
          </div>
        </div>

        {/* Top Summary Cards (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg">
          {/* Card 1 */}
          <div className="bg-surface border border-outline-variant rounded p-stack-md flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant">Global Risk Level</span>
              <Icon name="warning" className="text-error" />
            </div>
            <div className="flex items-end gap-3">
              <span className="font-display-lg text-display-lg text-error">High</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mb-2">Elevated due to automated sweeps</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded mt-4 overflow-hidden flex">
              <div className="bg-primary h-full w-1/3"></div>
              <div className="bg-[#ffba20] h-full w-1/3"></div>
              <div className="bg-error h-full w-1/3 animate-pulse"></div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-surface border border-outline-variant rounded p-stack-md flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant">Suspicious Requests (Last Hour)</span>
              <Icon name="query_stats" className="text-on-surface-variant" />
            </div>
            <div className="flex items-end gap-3">
              <span className="font-display-lg text-display-lg text-on-surface font-data-mono">4,892</span>
              <span className="font-body-sm text-body-sm text-error mb-2 flex items-center">
                <Icon name="trending_up" className="text-sm mr-1" /> +12%
              </span>
            </div>
            <div className="w-full h-8 mt-2 flex items-end gap-1">
              <div className="w-1/12 bg-primary-fixed-dim h-1/4 rounded-t"></div>
              <div className="w-1/12 bg-primary-fixed-dim h-2/4 rounded-t"></div>
              <div className="w-1/12 bg-primary-fixed-dim h-1/4 rounded-t"></div>
              <div className="w-1/12 bg-primary-fixed-dim h-3/4 rounded-t"></div>
              <div className="w-1/12 bg-primary-fixed-dim h-2/4 rounded-t"></div>
              <div className="w-1/12 bg-primary-fixed-dim h-4/4 rounded-t"></div>
              <div className="w-1/12 bg-primary-fixed-dim h-3/4 rounded-t"></div>
              <div className="w-1/12 bg-error h-full rounded-t opacity-80"></div>
              <div className="w-1/12 bg-error h-5/6 rounded-t opacity-90"></div>
              <div className="w-1/12 bg-error h-full rounded-t"></div>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-surface border border-outline-variant rounded p-stack-md flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant">Active IP Blocks</span>
              <Icon name="block" className="text-on-surface-variant" />
            </div>
            <div className="flex items-end gap-3">
              <span className="font-display-lg text-display-lg text-on-surface font-data-mono">1,204</span>
              <span className="font-body-sm text-body-sm text-primary mb-2">Enforced</span>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-surface-container rounded text-xs font-mono text-on-surface-variant border border-outline-variant">192.168.* (45)</span>
              <span className="px-2 py-1 bg-surface-container rounded text-xs font-mono text-on-surface-variant border border-outline-variant">10.0.* (12)</span>
            </div>
          </div>
          
          {/* Card 4 */}
          <div className="bg-surface border border-outline-variant rounded p-stack-md flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant">Rate-Limit Triggers</span>
              <Icon name="speed" className="text-on-surface-variant" />
            </div>
            <div className="flex items-end gap-3">
              <span className="font-display-lg text-display-lg text-on-surface font-data-mono">85/m</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mb-2">Avg</span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded mt-4 overflow-hidden">
              <div className="bg-[#ffba20] h-full w-[85%]"></div>
            </div>
          </div>
        </div>

        {/* Complex Layout: Main Table + Side Panel */}
        <div className="flex flex-col lg:flex-row gap-gutter h-[600px] min-h-[600px]">
          {/* Main Table Section */}
          <div className="flex-1 bg-surface border border-outline-variant rounded flex flex-col overflow-hidden">
            <div className="p-stack-md border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
              <h3 className="font-title-md text-title-md text-on-surface">Recent Security Incidents</h3>
              <div className="flex gap-2">
                <select className="text-sm border-outline-variant rounded bg-surface py-1 px-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                  <option>All Types</option>
                  <option>Bot Pattern</option>
                  <option>Queue Abuse</option>
                </select>
              </div>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container sticky top-0 z-10">
                  <tr>
                    <th className="p-3 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">Timestamp</th>
                    <th className="p-3 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">Entity (IP/User ID)</th>
                    <th className="p-3 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">Type</th>
                    <th className="p-3 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant text-center">Risk Score</th>
                    <th className="p-3 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm">
                  {/* Row 1 */}
                  <tr 
                    className={`border-b border-outline-variant transition-colors cursor-pointer group ${selectedIncident === '198.51.100.42' ? 'bg-primary-fixed/10 hover:bg-primary-fixed/20' : 'hover:bg-surface-container-high'}`}
                    onClick={() => handleRowClick('198.51.100.42')}
                  >
                    <td className="p-3 font-data-mono whitespace-nowrap">14:32:05.112 UTC</td>
                    <td className="p-3 font-data-mono font-medium">198.51.100.42</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-error text-error bg-error/10 text-xs font-semibold">
                        <Icon name="smart_toy" className="text-[14px]" /> Bot Pattern
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="inline-block w-8 h-8 rounded-full bg-error text-on-error leading-8 font-bold text-xs shadow-sm">98</span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="px-3 py-1 bg-surface border border-outline rounded text-primary hover:bg-secondary-container transition-colors text-xs font-semibold shadow-sm">Investigate</button>
                    </td>
                  </tr>
                  
                  {/* Row 2 */}
                  <tr 
                    className={`border-b border-outline-variant transition-colors cursor-pointer group ${selectedIncident === 'USR-8829-A1' ? 'bg-primary-fixed/10 hover:bg-primary-fixed/20' : 'hover:bg-surface-container-high'}`}
                    onClick={() => handleRowClick('USR-8829-A1')}
                  >
                    <td className="p-3 font-data-mono whitespace-nowrap">14:31:45.091 UTC</td>
                    <td className="p-3 font-data-mono">USR-8829-A1</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#ffba20] text-[#d69a00] bg-[#ffba20]/10 text-xs font-semibold">
                        <Icon name="confirmation_number" className="text-[14px]" /> Booking Abuse
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="inline-block w-8 h-8 rounded-full bg-[#ffba20] text-[#5e4200] leading-8 font-bold text-xs">74</span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="px-3 py-1 bg-surface border border-outline rounded text-on-surface-variant hover:bg-surface-container transition-colors text-xs font-semibold">Investigate</button>
                    </td>
                  </tr>
                  
                  {/* Row 3 */}
                  <tr 
                    className={`border-b border-outline-variant transition-colors cursor-pointer group ${selectedIncident === '203.0.113.15' ? 'bg-primary-fixed/10 hover:bg-primary-fixed/20' : 'hover:bg-surface-container-high'}`}
                    onClick={() => handleRowClick('203.0.113.15')}
                  >
                    <td className="p-3 font-data-mono whitespace-nowrap">14:30:12.884 UTC</td>
                    <td className="p-3 font-data-mono">203.0.113.15</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#ffba20] text-[#d69a00] bg-[#ffba20]/10 text-xs font-semibold">
                        <Icon name="group" className="text-[14px]" /> Queue Abuse
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="inline-block w-8 h-8 rounded-full bg-[#ffba20] text-[#5e4200] leading-8 font-bold text-xs">65</span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="px-3 py-1 bg-surface border border-outline rounded text-on-surface-variant hover:bg-surface-container transition-colors text-xs font-semibold">Investigate</button>
                    </td>
                  </tr>
                  
                  {/* Row 4 */}
                  <tr 
                    className={`border-b border-outline-variant transition-colors cursor-pointer group ${selectedIncident === 'USR-1022-X9' ? 'bg-primary-fixed/10 hover:bg-primary-fixed/20' : 'hover:bg-surface-container-high'}`}
                    onClick={() => handleRowClick('USR-1022-X9')}
                  >
                    <td className="p-3 font-data-mono whitespace-nowrap">14:28:55.330 UTC</td>
                    <td className="p-3 font-data-mono">USR-1022-X9</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-primary text-primary bg-primary/10 text-xs font-semibold">
                        <Icon name="speed" className="text-[14px]" /> Rate Limit
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="inline-block w-8 h-8 rounded-full bg-primary text-on-primary leading-8 font-bold text-xs">42</span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="px-3 py-1 bg-surface border border-outline rounded text-on-surface-variant hover:bg-surface-container transition-colors text-xs font-semibold">Investigate</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Side Panel (Active Investigation) */}
          {selectedIncident && (
            <div className="w-full lg:w-[400px] bg-surface border border-outline-variant rounded flex flex-col shrink-0 shadow-sm overflow-hidden">
              <div className="p-stack-md border-b border-outline-variant bg-surface-container-highest">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-title-md text-title-md text-on-surface">Investigation Details</h4>
                    <p className="font-data-mono text-data-mono text-on-surface-variant mt-1">Entity: {selectedIncident}</p>
                  </div>
                  <span className={`inline-block w-10 h-10 rounded-full leading-10 text-center font-bold text-sm shadow-sm ${selectedIncident === '198.51.100.42' ? 'bg-error text-on-error' : selectedIncident === 'USR-1022-X9' ? 'bg-primary text-on-primary' : 'bg-[#ffba20] text-[#5e4200]'}`}>
                    {selectedIncident === '198.51.100.42' ? '98' : selectedIncident === 'USR-1022-X9' ? '42' : '74'}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-stack-md custom-scrollbar space-y-6">
                {/* Evidence Section */}
                <div>
                  <h5 className="font-label-caps text-label-caps text-on-surface-variant mb-3 border-b border-outline-variant pb-1">Detected Signals (Evidence)</h5>
                  <ul className="space-y-3">
                    <li className="flex gap-3 items-start bg-error/5 p-2 rounded border border-error/20">
                      <Icon name="router" className="text-error mt-0.5" />
                      <div>
                        <p className="font-body-sm text-body-sm font-semibold text-on-surface">Rapid IP Hopping</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Detected 5 subnet changes within 2 minutes. Originating ASN matching known proxy networks.</p>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start bg-[#ffba20]/10 p-2 rounded border border-[#ffba20]/30">
                      <Icon name="event_seat" className="text-[#d69a00] mt-0.5" />
                      <div>
                        <p className="font-body-sm text-body-sm font-semibold text-on-surface">High-frequency Seat Queries</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Attempted to hold 12 seats simultaneously across 3 different departure times on Route Lagos-Abuja.</p>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start bg-error/5 p-2 rounded border border-error/20">
                      <Icon name="gpp_bad" className="text-error mt-0.5" />
                      <div>
                        <p className="font-body-sm text-body-sm font-semibold text-on-surface">Failed Captcha Challenges</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">Failed v3 invisible reCAPTCHA (Score: 0.1). Fallback visual challenge ignored.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Session Data */}
                <div>
                  <h5 className="font-label-caps text-label-caps text-on-surface-variant mb-3 border-b border-outline-variant pb-1">Session Data</h5>
                  <div className="bg-surface-container rounded p-3 text-xs font-mono text-on-surface-variant space-y-1 border border-outline-variant">
                    <p><span className="font-semibold">User-Agent:</span> Mozilla/5.0 (Windows NT 10.0; Win64; x64) headless...</p>
                    <p><span className="font-semibold">Geo-IP:</span> NGA, Lagos State</p>
                    <p><span className="font-semibold">ASN:</span> AS37000 (Proxy Suspected)</p>
                    <p><span className="font-semibold">Duration:</span> 14m 22s</p>
                  </div>
                </div>
              </div>
              
              {/* Action Bar */}
              <div className="p-stack-md border-t border-outline-variant bg-surface-container shrink-0">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button className="px-4 py-2 bg-error text-on-error rounded font-label-caps text-label-caps hover:opacity-90 transition-opacity flex items-center justify-center gap-1 shadow-sm">
                    <Icon name="block" className="text-sm" /> Restrict
                  </button>
                  <button className="px-4 py-2 bg-surface border border-outline text-on-surface rounded font-label-caps text-label-caps hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1">
                    <Icon name="lock_open" className="text-sm" /> Release
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-primary text-on-primary rounded font-label-caps text-label-caps hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1">
                    <Icon name="search" className="text-sm" /> Deep Investigate
                  </button>
                  <button className="px-3 py-2 bg-surface border border-outline text-on-surface rounded hover:bg-surface-container-high transition-colors" title="Add Note">
                    <Icon name="note_add" className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer: Audit Trail Preview */}
        <div className="mt-stack-lg border-t border-outline-variant pt-stack-md pb-margin-desktop">
          <h5 className="font-label-caps text-label-caps text-on-surface-variant mb-3">Recent Analyst Actions</h5>
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
            <div className="bg-surface-container-low border border-outline-variant rounded px-3 py-2 text-xs flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              <span className="font-mono text-on-surface-variant">14:20 UTC</span>
              <span className="font-semibold text-on-surface">A. Ojo</span> restricted IP <span className="font-mono bg-surface px-1 border border-outline-variant rounded">10.0.4.55</span>
            </div>
            <div className="bg-surface-container-low border border-outline-variant rounded px-3 py-2 text-xs flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-mono text-on-surface-variant">14:15 UTC</span>
              <span className="font-semibold text-on-surface">System</span> released hold on <span className="font-mono bg-surface px-1 border border-outline-variant rounded">USR-442-B</span>
            </div>
            <div className="bg-surface-container-low border border-outline-variant rounded px-3 py-2 text-xs flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              <span className="font-mono text-on-surface-variant">14:02 UTC</span>
              <span className="font-semibold text-on-surface">M. Silva</span> restricted subnet <span className="font-mono bg-surface px-1 border border-outline-variant rounded">192.168.1.*</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
