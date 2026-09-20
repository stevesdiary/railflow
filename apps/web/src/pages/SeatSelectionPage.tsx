import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function SeatSelectionPage() {
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState<string | null>('2C');

  const handleContinue = () => {
    navigate('/passenger-info');
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-stack-md">
      {/* Journey Summary & Alerts */}
      <div className="col-span-1 lg:col-span-12 flex flex-col gap-stack-sm">
        {/* Conditional Alert */}
        <div className="bg-error-container text-on-error-container p-4 rounded-lg border border-error/20 flex gap-4 items-start">
          <Icon name="info" className="text-error" />
          <div>
            <p className="font-title-md text-title-md font-semibold mb-1">Seat Availability Changed</p>
            <p className="font-body-sm text-body-sm">Your previously selected seat is no longer available. Please choose another seat or allow the system to select the best available seat for you.</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="font-title-md text-title-md font-semibold text-on-surface mb-1">Lagos (LOS) → Ibadan (IBA)</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Train NR-101 • Standard Class AC • 24 Oct 2026</p>
          </div>
          <div className="bg-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant border border-tertiary-fixed-dim rounded-full px-4 py-2 flex items-center gap-2 font-data-mono text-data-mono">
            <Icon name="timer" className="text-[18px]" />
            <span>Seats held for 09:45</span>
          </div>
        </div>
      </div>

      {/* Left Column: Seat Map */}
      <div className="col-span-1 lg:col-span-8 flex flex-col gap-stack-lg">
        {/* Coach Selector */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-title-md text-title-md font-semibold text-on-surface">Select Coach</h3>
            <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-variant px-2 py-1 rounded">Standard Class • AC</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            <button className="px-6 py-2 rounded-lg border border-primary bg-primary-container text-on-primary-container font-semibold whitespace-nowrap">Coach C1</button>
            <button className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">Coach C2</button>
            <button className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">Coach C3</button>
            <button className="px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors whitespace-nowrap">Coach C4</button>
          </div>
        </div>

        {/* Seat Map Legend */}
        <div className="flex flex-wrap gap-4 items-center justify-center p-4 bg-surface-container-low rounded-lg border border-outline-variant/50">
          <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <div className="w-4 h-4 border border-outline-variant bg-surface-container-lowest rounded-sm"></div> Available
          </div>
          <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <div className="w-4 h-4 bg-primary rounded-sm"></div> Selected
          </div>
          <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <div className="w-4 h-4 bg-surface-variant border border-outline-variant opacity-75 rounded-sm" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #d1dbec 2px, #d1dbec 4px)' }}></div> Occupied
          </div>
          <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <div className="w-4 h-4 border-2 border-on-secondary-fixed-variant bg-secondary-container rounded-sm"></div> Held
          </div>
        </div>

        {/* Actual Seat Map */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 lg:p-8 flex justify-center">
          <div className="w-full max-w-md flex flex-col gap-4">
            {/* Row Labels */}
            <div className="seat-map-grid mb-2">
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center w-full">A</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center w-full">B</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center w-full">Aisle</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center w-full">C</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant text-center w-full">D</div>
            </div>

            {/* Row 1 */}
            <div className="seat-map-grid">
              <div className="seat seat-occupied font-data-mono text-data-mono">1A</div>
              <div className="seat seat-occupied font-data-mono text-data-mono">1B</div>
              <div className="aisle font-label-caps text-label-caps">1</div>
              <div className={`seat ${selectedSeat === '1C' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('1C')}>1C</div>
              <div className={`seat ${selectedSeat === '1D' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('1D')}>1D</div>
            </div>

            {/* Row 2 */}
            <div className="seat-map-grid">
              <div className="seat seat-held font-data-mono text-data-mono">2A</div>
              <div className="seat seat-held font-data-mono text-data-mono">2B</div>
              <div className="aisle font-label-caps text-label-caps">2</div>
              <div className={`seat ${selectedSeat === '2C' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('2C')}>2C</div>
              <div className={`seat ${selectedSeat === '2D' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('2D')}>2D</div>
            </div>

            {/* Row 3 */}
            <div className="seat-map-grid">
              <div className={`seat ${selectedSeat === '3A' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('3A')}>3A</div>
              <div className={`seat ${selectedSeat === '3B' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('3B')}>3B</div>
              <div className="aisle font-label-caps text-label-caps">3</div>
              <div className="seat seat-occupied font-data-mono text-data-mono">3C</div>
              <div className="seat seat-occupied font-data-mono text-data-mono">3D</div>
            </div>

            {/* Row 4 */}
            <div className="seat-map-grid">
              <div className={`seat ${selectedSeat === '4A' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('4A')}>4A</div>
              <div className={`seat ${selectedSeat === '4B' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('4B')}>4B</div>
              <div className="aisle font-label-caps text-label-caps">4</div>
              <div className={`seat ${selectedSeat === '4C' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('4C')}>4C</div>
              <div className={`seat ${selectedSeat === '4D' ? 'seat-selected' : 'seat-available'} font-data-mono text-data-mono`} onClick={() => setSelectedSeat('4D')}>4D</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Booking Summary */}
      <div className="col-span-1 lg:col-span-4 flex flex-col gap-stack-md pb-stack-lg">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 sticky top-24">
          <h3 className="font-title-md text-title-md font-semibold text-on-surface mb-6 border-b border-outline-variant pb-4">Booking Summary</h3>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Selected Seat</span>
              <span className="font-data-mono text-data-mono text-on-surface bg-surface-container-high px-2 py-1 rounded">{selectedSeat || 'None'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Base Fare</span>
              <span className="font-data-mono text-data-mono text-on-surface">₦ 4,500.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Taxes & Fees</span>
              <span className="font-data-mono text-data-mono text-on-surface">₦ 250.00</span>
            </div>
          </div>
          <div className="border-t border-outline-variant pt-4 mb-8 flex justify-between items-center">
            <span className="font-title-md text-title-md font-bold text-on-surface">Total</span>
            <span className="font-data-mono text-[20px] font-bold text-primary">₦ 4,750.00</span>
          </div>
          <div className="flex flex-col gap-3">
            <Button className="w-full py-3 px-4 rounded-lg font-title-md text-[16px] shadow-sm" onClick={handleContinue} disabled={!selectedSeat}>
              Continue
            </Button>
            <Button variant="outline" className="w-full py-3 px-4 rounded-lg font-title-md text-[16px]">
              Use best available seat
            </Button>
            <Button variant="ghost" className="w-full py-3 px-4 rounded-lg font-title-md text-[16px]" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
