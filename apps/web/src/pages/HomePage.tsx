import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <>
      {/* Hero Section with Search Widget */}
      <section className="relative bg-surface-container-low py-stack-lg md:py-24 px-margin-mobile md:px-margin-desktop border-b border-outline-variant">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="bg-cover bg-center w-full h-full"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDX3PbkhTQywOk55mNXX_Nti-CRFdYxMG6107RE8-BC2ZlIh6V1eH8Tu6erpYOdTRSfJ4qUOgqL6jlW5jQyKPhqKQHwdroQZ-l1_5IqIHnRQIw4A_jG9VB6Ulq7MKxgRBTABSCCY9A74zKohFaPvXHK_qOrFo5B14iZGp910dbcOlxEIkclGLq9rBiHsycgyQoeSqSxy6maySUU--jZ2Qu9tujU6A0NMLE-M1XBEvCnYEcc43cBsd7Y')",
            }}
          ></div>
        </div>
        <div className="max-w-container-max mx-auto relative z-10 flex flex-col md:flex-row gap-gutter items-center">
          <div className="w-full md:w-5/12 mb-stack-lg md:mb-0">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm md:text-left text-center">
              Experience Nigeria by Rail
            </h1>
            <p className="font-title-md text-title-md text-on-surface-variant md:text-left text-center font-normal">
              Fast, reliable, and comfortable travel across the nation.
            </p>
          </div>
          <div className="w-full md:w-7/12">
            {/* Dominant Search Widget */}
            <div className="bg-surface p-stack-lg rounded-xl border border-outline-variant deep-shadow">
              <form onSubmit={handleSearch} className="flex flex-col gap-stack-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  {/* Origin */}
                  <div className="flex flex-col">
                    <label
                      className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
                      htmlFor="origin"
                    >
                      Origin Station
                    </label>
                    <div className="relative">
                      <Icon name="train" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input
                        className="w-full pl-10 pr-3 py-3 border border-outline rounded-DEFAULT bg-surface text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        id="origin"
                        name="origin"
                        placeholder="e.g., Lagos (Mobolaji Johnson)"
                        type="text"
                      />
                    </div>
                  </div>
                  {/* Destination */}
                  <div className="flex flex-col">
                    <label
                      className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
                      htmlFor="destination"
                    >
                      Destination Station
                    </label>
                    <div className="relative">
                      <Icon name="location_on" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input
                        className="w-full pl-10 pr-3 py-3 border border-outline rounded-DEFAULT bg-surface text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        id="destination"
                        name="destination"
                        placeholder="e.g., Ibadan (Obafemi Awolowo)"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
                  {/* Departure Date */}
                  <div className="flex flex-col">
                    <label
                      className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
                      htmlFor="departure_date"
                    >
                      Departure Date
                    </label>
                    <div className="relative">
                      <Icon name="calendar_today" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input
                        className="w-full pl-10 pr-3 py-3 border border-outline rounded-DEFAULT bg-surface text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        id="departure_date"
                        name="departure_date"
                        type="date"
                      />
                    </div>
                  </div>
                  {/* Return Date (Optional) */}
                  <div className="flex flex-col">
                    <label
                      className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
                      htmlFor="return_date"
                    >
                      Return Date <span className="text-xs font-normal normal-case">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Icon name="calendar_month" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input
                        className="w-full pl-10 pr-3 py-3 border border-outline rounded-DEFAULT bg-surface text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        id="return_date"
                        name="return_date"
                        type="date"
                      />
                    </div>
                  </div>
                  {/* Passengers */}
                  <div className="flex flex-col">
                    <label
                      className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
                      htmlFor="passengers"
                    >
                      Passengers
                    </label>
                    <div className="relative">
                      <Icon name="group" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <select
                        className="w-full pl-10 pr-3 py-3 border border-outline rounded-DEFAULT bg-surface text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                        id="passengers"
                        name="passengers"
                      >
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4">4+ Passengers</option>
                      </select>
                      <Icon
                        name="expand_more"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full py-4 mt-2 gap-2 text-title-md font-title-md">
                  <Icon name="search" /> Search Trains
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            <Link
              to="/search"
              className="flex flex-col items-center justify-center p-stack-md bg-surface border border-outline-variant rounded-lg hover:border-primary hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <Icon name="manage_search" className="text-secondary group-hover:text-primary mb-2 text-3xl" />
              <span className="font-body-md text-body-md text-on-surface font-medium text-center">Search Trains</span>
            </Link>
            <Link
              to="/bookings"
              className="flex flex-col items-center justify-center p-stack-md bg-surface border border-outline-variant rounded-lg hover:border-primary hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <Icon name="confirmation_number" className="text-secondary group-hover:text-primary mb-2 text-3xl" />
              <span className="font-body-md text-body-md text-on-surface font-medium text-center">Manage Booking</span>
            </Link>
            <Link
              to="/pnr"
              className="flex flex-col items-center justify-center p-stack-md bg-surface border border-outline-variant rounded-lg hover:border-primary hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <Icon name="fact_check" className="text-secondary group-hover:text-primary mb-2 text-3xl" />
              <span className="font-body-md text-body-md text-on-surface font-medium text-center">Check PNR</span>
            </Link>
            <Link
              to="/ticket"
              className="flex flex-col items-center justify-center p-stack-md bg-surface border border-outline-variant rounded-lg hover:border-primary hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <Icon name="download" className="text-secondary group-hover:text-primary mb-2 text-3xl" />
              <span className="font-body-md text-body-md text-on-surface font-medium text-center">Download Ticket</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Routes Grid */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-bright">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Route 1 */}
            <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden flex flex-col soft-shadow hover:shadow-md transition-shadow">
              <div className="h-32 bg-surface-container-high relative">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyyTgSlGvDG_aQp9I0X69cOX_seuFAZ0crzSH4EGgCzLDmuI-OizZKuaIXpPHn-RDLdlELCD6ft1dmihBtQAg2Sd1KiM5HytxRXc4iUa61Z7BaR66VDpGfnVoNeQObsBmjY3K_Twf5kGBLH6POeVtFWnbOvEvSDKmGKISRin_Q6CUaQvRtiQqD_qRcF2lD3RCrpF7mzOrN5E8yHt4RKyMuiI1sViuUnEJX5YAYJF05c3prdOwaHX4b')",
                  }}
                ></div>
                <div className="absolute top-2 right-2 bg-primary-container text-on-primary-container px-2 py-1 rounded font-label-caps text-label-caps uppercase">
                  Standard
                </div>
              </div>
              <div className="p-stack-md flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md text-on-surface">Lagos</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Mobolaji Johnson</span>
                  </div>
                  <div className="flex-grow mx-4 flex items-center justify-center relative">
                    <div className="h-0.5 w-full bg-outline-variant"></div>
                    <Icon name="arrow_forward" className="absolute bg-surface px-1 text-secondary" />
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-title-md text-title-md text-on-surface">Ibadan</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Obafemi Awolowo</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-outline-variant">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Starting From</span>
                    <span className="font-data-mono text-data-mono text-primary font-bold text-lg">₦ 3,600</span>
                  </div>
                  <Link
                    to="/search?origin=Lagos&destination=Ibadan"
                    className="text-primary font-body-sm text-body-sm font-semibold hover:underline flex items-center gap-1"
                  >
                    Book Now <Icon name="chevron_right" className="text-sm" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Route 2 */}
            <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden flex flex-col soft-shadow hover:shadow-md transition-shadow">
              <div className="h-32 bg-surface-container-high relative">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7Mxj1cxdsLhKAegFr3Fv8yWBVgZlXhM1NzqMrvNPe8FRxr1EAG2kpy57iXIvH_NBRpTkNSZ5ja4YC4S8X_0anngr1xHenfIGkKQPqkBD-TXTm3Q1r--axrV6jp7sK61ZDE8dr84XgrV4fXW7KnOw36jkf_cipaK2D8n0lWJROomj-4L7LRhWL2woi8TD46MAGyis30bn64QQWRNkNqrEPtsAh9ahT2LDAkjHJDxNo8C5VPtM_Bfle')",
                  }}
                ></div>
                <div className="absolute top-2 right-2 bg-primary-container text-on-primary-container px-2 py-1 rounded font-label-caps text-label-caps uppercase">
                  Express
                </div>
              </div>
              <div className="p-stack-md flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md text-on-surface">Abuja</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Idu Station</span>
                  </div>
                  <div className="flex-grow mx-4 flex items-center justify-center relative">
                    <div className="h-0.5 w-full bg-outline-variant"></div>
                    <Icon name="arrow_forward" className="absolute bg-surface px-1 text-secondary" />
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-title-md text-title-md text-on-surface">Kaduna</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Rigasa Station</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-outline-variant">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Starting From</span>
                    <span className="font-data-mono text-data-mono text-primary font-bold text-lg">₦ 4,500</span>
                  </div>
                  <Link
                    to="/search?origin=Abuja&destination=Kaduna"
                    className="text-primary font-body-sm text-body-sm font-semibold hover:underline flex items-center gap-1"
                  >
                    Book Now <Icon name="chevron_right" className="text-sm" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Route 3 */}
            <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden flex flex-col soft-shadow hover:shadow-md transition-shadow">
              <div className="h-32 bg-surface-container-high relative">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0iQb9kZfD4zQIpZVmW0mO2j16GezPRGIjl-fptQ72HLYlc8ju4psTfbJd0b-MEViOs6ldKKrTDoKNnHgt6bBfsQ54xSKTckNPfyvG0cZCp_xkYz60p249aWl1IAkbQi3SgsKkp48eQcPTdlU-V62Ll-enxJHNK99XnKKno1vf6iK_2vfF7AUr7loAQrilZc3wppSk5ZqWsIDsS6b6JlrD5qd4vUc-hxqlvDW4bg0uAFPjvFe464EI')",
                  }}
                ></div>
                <div className="absolute top-2 right-2 bg-primary-container text-on-primary-container px-2 py-1 rounded font-label-caps text-label-caps uppercase">
                  Standard
                </div>
              </div>
              <div className="p-stack-md flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="font-title-md text-title-md text-on-surface">Warri</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Ujevwu</span>
                  </div>
                  <div className="flex-grow mx-4 flex items-center justify-center relative">
                    <div className="h-0.5 w-full bg-outline-variant"></div>
                    <Icon name="arrow_forward" className="absolute bg-surface px-1 text-secondary" />
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-title-md text-title-md text-on-surface">Itakpe</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Ajaokuta</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-outline-variant">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Starting From</span>
                    <span className="font-data-mono text-data-mono text-primary font-bold text-lg">₦ 3,000</span>
                  </div>
                  <Link
                    to="/search?origin=Warri&destination=Itakpe"
                    className="text-primary font-body-sm text-body-sm font-semibold hover:underline flex items-center gap-1"
                  >
                    Book Now <Icon name="chevron_right" className="text-sm" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
