import { Icon } from '../components/ui/Icon';

export function AdminTrainConfigPage() {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Header */}
      <div className="mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end shrink-0 gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm">Coach & Seat Configuration</h1>
          <p className="font-body-md text-body-md text-secondary">Configure layout and properties for Train TRN-8042</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-2 rounded font-label-caps text-label-caps shadow-sm hover:opacity-90 transition-opacity">
          Save Configuration
        </button>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-gutter min-h-0">
        {/* Left Panel: Coach List */}
        <div className="lg:col-span-3 bg-surface border border-outline-variant rounded flex flex-col overflow-hidden shadow-sm">
          <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest shrink-0">
            <h3 className="font-title-md text-title-md text-on-surface">Coaches</h3>
            <button className="text-primary hover:bg-surface-container p-1 rounded transition-colors" title="Add Coach">
              <Icon name="add" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-stack-sm space-y-2">
            {/* Active Coach */}
            <div className="border-2 border-primary bg-surface-container-low rounded p-stack-sm cursor-pointer flex justify-between items-center group">
              <div className="flex items-center gap-stack-sm">
                <Icon name="train" className="text-primary" />
                <div>
                  <p className="font-body-md text-body-md font-semibold text-primary">C1 - Standard</p>
                  <p className="font-data-mono text-data-mono text-secondary text-xs">64 Seats</p>
                </div>
              </div>
              <button className="text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error-container rounded">
                <Icon name="delete" className="text-sm" />
              </button>
            </div>
            {/* Inactive Coach */}
            <div className="border border-outline-variant bg-surface rounded p-stack-sm cursor-pointer flex justify-between items-center group hover:border-primary transition-colors">
              <div className="flex items-center gap-stack-sm">
                <Icon name="train" className="text-secondary" />
                <div>
                  <p className="font-body-md text-body-md text-on-surface">C2 - Standard</p>
                  <p className="font-data-mono text-data-mono text-secondary text-xs">64 Seats</p>
                </div>
              </div>
              <button className="text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error-container rounded">
                <Icon name="delete" className="text-sm" />
              </button>
            </div>
            {/* Inactive Coach */}
            <div className="border border-outline-variant bg-surface rounded p-stack-sm cursor-pointer flex justify-between items-center group hover:border-primary transition-colors">
              <div className="flex items-center gap-stack-sm">
                <Icon name="star" className="text-[#4e3600]" />
                <div>
                  <p className="font-body-md text-body-md text-on-surface">F1 - First Class</p>
                  <p className="font-data-mono text-data-mono text-secondary text-xs">32 Seats</p>
                </div>
              </div>
              <button className="text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error-container rounded">
                <Icon name="delete" className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Panel: Visual Seating Grid */}
        <div className="lg:col-span-6 bg-surface border border-outline-variant rounded flex flex-col shadow-sm relative overflow-hidden">
          <div className="p-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest shrink-0">
            <h3 className="font-title-md text-title-md text-on-surface">C1 Seating Layout</h3>
            <div className="flex gap-stack-sm">
              <button className="border border-outline p-1 rounded text-secondary hover:text-primary hover:border-primary transition-colors">
                <Icon name="zoom_in" />
              </button>
              <button className="border border-outline p-1 rounded text-secondary hover:text-primary hover:border-primary transition-colors">
                <Icon name="zoom_out" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-gutter bg-surface-container flex justify-center items-start custom-scrollbar">
            <div className="border-2 border-outline-variant rounded-xl p-stack-md bg-surface w-full max-w-md relative mt-4">
              {/* Driver Direction Indicator */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-surface-container-low px-4 py-1 border border-outline-variant rounded-full text-xs font-label-caps text-secondary flex items-center gap-1">
                <Icon name="arrow_upward" className="text-sm" /> Front
              </div>
              
              <div className="grid grid-cols-[1fr_1fr_48px_1fr_1fr] gap-4 mt-stack-md">
                {/* Row 1 */}
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">1A</div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">1B</div>
                <div className="col-start-3 w-12"></div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">1C</div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">1D</div>
                
                {/* Row 2 */}
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">2A</div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">2B</div>
                <div className="col-start-3 w-12 flex justify-center items-center text-outline-variant text-xs font-data-mono">AISLE</div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">2C</div>
                <div className="w-12 h-12 border border-primary rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer bg-primary-container text-on-primary-container">2D</div>
                
                {/* Rest area/Table placeholder */}
                <div className="col-span-5 h-8 my-2 bg-surface-variant rounded border border-outline-variant flex items-center justify-center text-xs text-secondary font-label-caps">Luggage Rack</div>
                
                {/* Row 3 */}
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">3A</div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">3B</div>
                <div className="col-start-3 w-12"></div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">3C</div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">3D</div>

                {/* Row 4 */}
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">4A</div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">4B</div>
                <div className="col-start-3 w-12"></div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">4C</div>
                <div className="w-12 h-12 border border-outline-variant rounded flex items-center justify-center font-data-mono text-data-mono cursor-pointer hover:border-primary bg-surface-container-lowest">4D</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Properties */}
        <div className="lg:col-span-3 bg-surface border border-outline-variant rounded flex flex-col shadow-sm overflow-hidden">
          <div className="p-stack-md border-b border-outline-variant bg-surface-container-lowest shrink-0">
            <h3 className="font-title-md text-title-md text-on-surface">Properties</h3>
          </div>
          <div className="p-stack-md space-y-stack-lg overflow-y-auto flex-1">
            {/* Coach Details */}
            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-stack-sm">Coach ID</label>
              <input className="w-full border border-outline-variant p-2 rounded font-data-mono text-data-mono bg-surface focus:border-primary outline-none" type="text" value="C1" readOnly />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-secondary mb-stack-sm">Class</label>
              <select className="w-full border border-outline-variant p-2 rounded font-body-sm text-body-sm bg-surface focus:border-primary outline-none">
                <option value="Standard">Standard</option>
                <option value="First Class">First Class</option>
                <option value="Business">Business</option>
              </select>
            </div>
            
            <hr className="border-outline-variant" />
            
            {/* Seat Numbering */}
            <div>
              <h4 className="font-body-md text-body-md font-semibold mb-stack-sm">Numbering Scheme</h4>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="text-primary focus:ring-primary h-4 w-4 border-outline" name="numbering" type="radio" />
                  <span className="font-body-sm text-body-sm">Sequential (1, 2, 3...)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input defaultChecked className="text-primary focus:ring-primary h-4 w-4 border-outline" name="numbering" type="radio" />
                  <span className="font-body-sm text-body-sm">Matrix (1A, 1B, 2A...)</span>
                </label>
              </div>
            </div>
            
            <hr className="border-outline-variant" />
            
            {/* Amenities */}
            <div>
              <h4 className="font-body-md text-body-md font-semibold mb-stack-sm">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-2 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low">
                  <input defaultChecked className="text-primary rounded-sm focus:ring-primary" type="checkbox" />
                  <Icon name="wifi" className="text-sm" />
                  <span className="font-body-sm text-body-sm text-xs">WiFi</span>
                </label>
                <label className="flex items-center gap-2 p-2 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low">
                  <input defaultChecked className="text-primary rounded-sm focus:ring-primary" type="checkbox" />
                  <Icon name="power" className="text-sm" />
                  <span className="font-body-sm text-body-sm text-xs">Power</span>
                </label>
                <label className="flex items-center gap-2 p-2 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low">
                  <input className="text-primary rounded-sm focus:ring-primary" type="checkbox" />
                  <Icon name="wc" className="text-sm" />
                  <span className="font-body-sm text-body-sm text-xs">Toilet</span>
                </label>
                <label className="flex items-center gap-2 p-2 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-low">
                  <input className="text-primary rounded-sm focus:ring-primary" type="checkbox" />
                  <Icon name="restaurant" className="text-sm" />
                  <span className="font-body-sm text-body-sm text-xs">Pantry</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
