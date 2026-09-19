import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function MyBookingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const handleViewDetails = (id: string) => {
    navigate(`/booking-details/${id}`);
  };

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg mb-stack-lg">
      {/* Breadcrumbs & Header */}
      <div className="mb-stack-lg">
        <nav aria-label="Breadcrumb" className="flex text-body-sm font-body-sm text-secondary mb-base">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <a className="hover:text-primary transition-colors" href="/">Home</a>
            </li>
            <li>
              <div className="flex items-center">
                <Icon name="chevron_right" className="text-sm mx-1" />
                <span aria-current="page" className="text-on-surface">My Bookings</span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">My Bookings</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-outline-variant mb-stack-lg overflow-x-auto">
        <ul className="flex flex-nowrap -mb-px text-body-md font-body-md font-medium text-center">
          <li className="mr-stack-md whitespace-nowrap">
            <button 
              className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors ${activeTab === 'upcoming' ? 'border-primary text-primary active' : 'border-transparent hover:text-secondary hover:border-outline-variant text-secondary'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Trips
            </button>
          </li>
          <li className="mr-stack-md whitespace-nowrap">
            <button 
              className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors ${activeTab === 'past' ? 'border-primary text-primary active' : 'border-transparent hover:text-secondary hover:border-outline-variant text-secondary'}`}
              onClick={() => setActiveTab('past')}
            >
              Past Trips
            </button>
          </li>
          <li className="mr-stack-md whitespace-nowrap">
            <button 
              className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors ${activeTab === 'waitlist' ? 'border-primary text-primary active' : 'border-transparent hover:text-secondary hover:border-outline-variant text-secondary'}`}
              onClick={() => setActiveTab('waitlist')}
            >
              Waitlisted/RAC
            </button>
          </li>
          <li className="whitespace-nowrap">
            <button 
              className={`inline-block p-4 border-b-2 rounded-t-lg transition-colors ${activeTab === 'cancelled' ? 'border-primary text-primary active' : 'border-transparent hover:text-secondary hover:border-outline-variant text-secondary'}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
            </button>
          </li>
        </ul>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-stack-md">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon name="search" className="text-outline text-sm" />
          </div>
          <input className="bg-surface-container-lowest border border-outline-variant text-on-surface text-body-sm font-body-sm rounded focus:ring-primary focus:border-primary block w-full pl-10 p-2" placeholder="Search by PNR or Train..." type="text" />
        </div>
        <div className="w-full md:w-auto">
          <select className="bg-surface-container-lowest border border-outline-variant text-on-surface text-body-sm font-body-sm rounded focus:ring-primary focus:border-primary block w-full p-2">
            <option>Filter by Month</option>
            <option value="1">Next 30 Days</option>
            <option value="2">January</option>
            <option value="3">February</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col gap-stack-lg">
        {activeTab === 'upcoming' ? (
          <>
            {/* Booking Card 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md hover:shadow-sm transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between gap-gutter">
                {/* Left Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-stack-md">
                    <div>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1 mb-2">
                        <Icon name="check_circle" className="text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }} /> Confirmed
                      </span>
                      <h3 className="font-title-md text-title-md text-on-surface">Lagos Express 101</h3>
                      <p className="font-data-mono text-data-mono text-secondary mt-1">PNR: <span className="font-bold text-on-surface">8293740129</span></p>
                    </div>
                    <div className="text-right">
                      <p className="font-data-mono text-data-mono font-bold text-on-surface">₦ 4,500</p>
                    </div>
                  </div>
                  
                  {/* Route Visual Thread */}
                  <div className="flex items-center gap-stack-md my-stack-md">
                    <div className="flex-1">
                      <p className="font-body-sm text-body-sm text-secondary">Departure</p>
                      <p className="font-title-md text-title-md font-bold">08:00 AM</p>
                      <p className="font-body-md text-body-md">Lagos (LOS)</p>
                      <p className="font-body-sm text-body-sm text-secondary">12 Oct 2024</p>
                    </div>
                    <div className="flex-1 flex-col items-center justify-center px-stack-sm hidden md:flex">
                      <div className="w-full flex items-center">
                        <div className="h-2 w-2 rounded-full bg-outline"></div>
                        <div className="h-[2px] bg-outline flex-1 mx-1"></div>
                        <Icon name="train" className="text-outline text-sm" />
                        <div className="h-[2px] bg-outline flex-1 mx-1"></div>
                        <div className="h-2 w-2 rounded-full border-2 border-outline bg-surface-container-lowest"></div>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary mt-1">2h 30m</p>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="font-body-sm text-body-sm text-secondary">Arrival</p>
                      <p className="font-title-md text-title-md font-bold">10:30 AM</p>
                      <p className="font-body-md text-body-md">Ibadan (IBA)</p>
                      <p className="font-body-sm text-body-sm text-secondary">12 Oct 2024</p>
                    </div>
                  </div>
                </div>
                
                {/* Right Actions & Seat */}
                <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-outline-variant pt-stack-md lg:pt-0 lg:pl-stack-md flex flex-col justify-between">
                  <div className="bg-surface-container rounded p-stack-sm mb-stack-md flex justify-between items-center">
                    <div>
                      <p className="font-body-sm text-body-sm text-secondary">Coach/Seat</p>
                      <p className="font-title-md text-title-md font-bold text-on-surface">C-4, 12A</p>
                    </div>
                    <Icon name="chair" className="text-secondary" />
                  </div>
                  <div className="flex flex-col gap-stack-sm">
                    <button className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-2 px-4 rounded hover:bg-primary-container transition-colors text-center">
                      Download Ticket
                    </button>
                    <div className="flex gap-stack-sm">
                      <button 
                        className="flex-1 border border-outline hover:border-primary text-on-surface font-label-caps text-label-caps py-2 px-4 rounded transition-colors text-center"
                        onClick={() => navigate(`/booking-details/8293740129`, { state: { status: 'confirmed' } })}
                      >
                        View Details
                      </button>
                      <button 
                        className="border border-outline hover:bg-surface-container text-on-surface p-2 rounded transition-colors flex items-center justify-center"
                        onClick={() => navigate(`/cancellation-confirmation/8293740129`)}
                      >
                        <Icon name="more_vert" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === 'waitlist' ? (
          <>
            {/* RAC Booking */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md hover:shadow-sm transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between gap-gutter">
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-stack-md">
                    <div>
                      <span className="bg-[#d69a00]/10 text-[#d69a00] text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1 mb-2">
                        <Icon name="info" className="text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }} /> RAC - 12
                      </span>
                      <h3 className="font-title-md text-title-md text-on-surface">Abuja Intercity</h3>
                      <p className="font-data-mono text-data-mono text-secondary mt-1">PNR: <span className="font-bold text-on-surface">NR-RAC456</span></p>
                    </div>
                  </div>
                  {/* Route */}
                  <div className="flex items-center gap-stack-md my-stack-md">
                    <div className="flex-1">
                      <p className="font-body-sm text-body-sm text-secondary">Departure</p>
                      <p className="font-title-md text-title-md font-bold">14:00 PM</p>
                      <p className="font-body-md text-body-md">Abuja (ABV)</p>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="font-body-sm text-body-sm text-secondary">Arrival</p>
                      <p className="font-title-md text-title-md font-bold">18:30 PM</p>
                      <p className="font-body-md text-body-md">Kaduna (KAD)</p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-outline-variant pt-stack-md lg:pt-0 lg:pl-stack-md flex flex-col justify-end">
                  <div className="flex flex-col gap-stack-sm">
                    <button 
                      className="flex-1 border border-outline hover:border-primary text-on-surface font-label-caps text-label-caps py-2 px-4 rounded transition-colors text-center"
                      onClick={() => navigate(`/booking-details/NR-RAC456`, { state: { status: 'rac' } })}
                    >
                      Check RAC Status
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Waitlist Booking */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md hover:shadow-sm transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between gap-gutter">
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-stack-md">
                    <div>
                      <span className="bg-[#d69a00]/10 text-[#d69a00] text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1 mb-2">
                        <Icon name="pending_actions" className="text-[14px]" /> WL - 45
                      </span>
                      <h3 className="font-title-md text-title-md text-on-surface">Kano Express</h3>
                      <p className="font-data-mono text-data-mono text-secondary mt-1">PNR: <span className="font-bold text-on-surface">NR-WL789</span></p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-outline-variant pt-stack-md lg:pt-0 lg:pl-stack-md flex flex-col justify-end">
                  <div className="flex flex-col gap-stack-sm">
                    <button 
                      className="flex-1 border border-outline hover:border-primary text-on-surface font-label-caps text-label-caps py-2 px-4 rounded transition-colors text-center"
                      onClick={() => navigate(`/booking-details/NR-WL789`, { state: { status: 'waitlist' } })}
                    >
                      Check Waitlist Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === 'cancelled' ? (
          <div className="flex flex-col items-center justify-center bg-surface-container-lowest border border-outline-variant rounded-lg p-16 min-h-[400px]">
            <div className="mb-stack-lg bg-surface-container w-24 h-24 rounded-full flex items-center justify-center">
              <Icon name="folder_off" className="text-5xl text-secondary" style={{ fontVariationSettings: "'FILL' 0" }} />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-sm text-center">No cancelled bookings</h3>
            <p className="text-body-md text-on-surface-variant text-center max-w-md mb-stack-lg">
                Any bookings you cancel will appear here for your records and refund tracking.
            </p>
            <Button onClick={() => navigate('/')}>
                Back to Home
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-stack-lg text-center opacity-70">
             <Icon name="event_busy" className="text-5xl text-outline mb-4" />
             <p className="font-title-md text-title-md text-on-surface-variant">No bookings found</p>
             <p className="font-body-sm text-body-sm text-secondary mt-1">You don't have any bookings in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
