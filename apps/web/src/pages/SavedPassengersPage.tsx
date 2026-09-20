import { useState } from 'react';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function SavedPassengersPage() {
  const [showDoc1, setShowDoc1] = useState(false);
  const [showDoc2, setShowDoc2] = useState(false);

  return (
    <div className="flex-grow px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto w-full mb-stack-lg">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end mb-stack-lg gap-stack-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-base">Saved Passengers</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Quickly add frequently traveled companions to your bookings.</p>
        </div>
        <Button className="flex items-center justify-center gap-stack-sm w-full md:w-auto self-start">
          <Icon name="person_add" />
          Add New Passenger
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
        {/* Passenger 1 */}
        <div className="bg-surface border border-outline-variant rounded p-stack-md hover:shadow-md transition-shadow duration-200 relative group">
          <div className="flex justify-between items-start mb-stack-md border-b border-outline-variant pb-stack-sm">
            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">Oluwaseun Adebayo</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-base">32, Male</p>
            </div>
            <Icon name="check_circle" className="text-outline" style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
          
          <div className="mb-stack-lg">
            <div className="flex items-center justify-between bg-surface-container-low p-stack-sm rounded border border-outline-variant">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">ID Document (NIN)</p>
                <p className="font-data-mono text-data-mono text-on-surface tracking-wider">
                  {showDoc1 ? "1234 5678 4242" : "•••• •••• 4242"}
                </p>
              </div>
              <button 
                className="text-secondary hover:text-primary transition-colors p-1" 
                title="View Document Number"
                onClick={() => setShowDoc1(!showDoc1)}
              >
                <Icon name={showDoc1 ? "visibility_off" : "visibility"} className="text-[20px]" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-stack-sm">
            <button className="flex-1 bg-surface-container text-on-surface font-body-sm text-body-sm py-stack-sm px-stack-sm rounded border border-outline-variant hover:bg-surface-variant transition-colors flex items-center justify-center gap-stack-sm">
              <Icon name="edit" className="text-[18px]" />
              Edit
            </button>
            <button className="flex-1 bg-surface-container text-error font-body-sm text-body-sm py-stack-sm px-stack-sm rounded border border-error hover:bg-error-container transition-colors flex items-center justify-center gap-stack-sm">
              <Icon name="delete" className="text-[18px]" />
              Delete
            </button>
          </div>
          
          <button className="mt-stack-sm w-full bg-primary text-on-primary font-body-sm text-body-sm py-stack-sm px-stack-md rounded hover:bg-primary-container transition-colors font-medium">
            Use for Booking
          </button>
        </div>

        {/* Passenger 2 */}
        <div className="bg-surface border border-outline-variant rounded p-stack-md hover:shadow-md transition-shadow duration-200 relative group">
          <div className="flex justify-between items-start mb-stack-md border-b border-outline-variant pb-stack-sm">
            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">Chioma Okafor</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-base">28, Female</p>
            </div>
            <Icon name="check_circle" className="text-outline" style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
          
          <div className="mb-stack-lg">
            <div className="flex items-center justify-between bg-surface-container-low p-stack-sm rounded border border-outline-variant">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">Passport</p>
                <p className="font-data-mono text-data-mono text-on-surface tracking-wider">
                  {showDoc2 ? "A123 4567 91" : "A•••• •••• 91"}
                </p>
              </div>
              <button 
                className="text-secondary hover:text-primary transition-colors p-1" 
                title="View Document Number"
                onClick={() => setShowDoc2(!showDoc2)}
              >
                <Icon name={showDoc2 ? "visibility_off" : "visibility"} className="text-[20px]" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-stack-sm">
            <button className="flex-1 bg-surface-container text-on-surface font-body-sm text-body-sm py-stack-sm px-stack-sm rounded border border-outline-variant hover:bg-surface-variant transition-colors flex items-center justify-center gap-stack-sm">
              <Icon name="edit" className="text-[18px]" />
              Edit
            </button>
            <button className="flex-1 bg-surface-container text-error font-body-sm text-body-sm py-stack-sm px-stack-sm rounded border border-error hover:bg-error-container transition-colors flex items-center justify-center gap-stack-sm">
              <Icon name="delete" className="text-[18px]" />
              Delete
            </button>
          </div>
          
          <button className="mt-stack-sm w-full bg-primary text-on-primary font-body-sm text-body-sm py-stack-sm px-stack-md rounded hover:bg-primary-container transition-colors font-medium">
            Use for Booking
          </button>
        </div>

        {/* Add Companion Button */}
        <div className="bg-surface border border-outline-variant border-dashed rounded p-stack-md flex flex-col items-center justify-center text-center min-h-[300px] hover:bg-surface-container-low transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-stack-md group-hover:scale-110 transition-transform">
            <Icon name="add" className="text-primary text-[32px]" />
          </div>
          <h3 className="font-title-md text-title-md text-on-surface font-semibold mb-base">Add Companion</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[200px]">Save time on your next booking by adding passenger details now.</p>
        </div>
      </div>
    </div>
  );
}
