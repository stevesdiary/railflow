import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function PassengerPaymentPage() {
  const navigate = useNavigate();

  const handlePay = () => {
    navigate('/booking-confirmation');
  };

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-stack-lg mb-stack-lg">
      <div className="mb-stack-lg">
        <h1 className="font-headline-lg text-headline-lg text-on-background">Passenger Details & Payment</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">Complete your booking securely.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Content Area */}
        <div className="lg:col-span-8 flex flex-col gap-stack-lg">
          {/* Passenger Details Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex items-center gap-3 mb-stack-md border-b border-outline-variant pb-4">
              <Icon name="person" className="text-primary bg-primary-container p-2 rounded-full" style={{ fontVariationSettings: "'FILL' 1" }} />
              <h2 className="font-title-md text-title-md text-on-surface">Passenger Details</h2>
            </div>
            <div className="space-y-stack-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                <div className="flex flex-col">
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase" htmlFor="first_name">First Name</label>
                  <input className="border border-outline-variant rounded bg-surface p-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" id="first_name" placeholder="e.g. Chinedu" type="text" />
                </div>
                <div className="flex flex-col">
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase" htmlFor="last_name">Last Name</label>
                  <input className="border border-outline-variant rounded bg-surface p-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" id="last_name" placeholder="e.g. Okafor" type="text" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
                <div className="flex flex-col md:col-span-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase" htmlFor="id_type">ID Type & Number</label>
                  <div className="flex">
                    <select className="border border-outline-variant rounded-l bg-surface p-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors border-r-0" id="id_type">
                      <option value="nin">NIN</option>
                      <option value="passport">Passport</option>
                    </select>
                    <input className="border border-outline-variant rounded-r bg-surface p-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors flex-grow" id="id_number" placeholder="Enter ID Number" type="text" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase" htmlFor="age">Age</label>
                  <input className="border border-outline-variant rounded bg-surface p-3 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" id="age" placeholder="e.g. 35" type="number" />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex items-center gap-3 mb-stack-md border-b border-outline-variant pb-4">
              <Icon name="payments" className="text-primary bg-primary-container p-2 rounded-full" style={{ fontVariationSettings: "'FILL' 1" }} />
              <h2 className="font-title-md text-title-md text-on-surface">Secure Payment</h2>
            </div>
            <div className="space-y-stack-md">
              {/* Payment Methods Tabs */}
              <div className="flex gap-2 border-b border-outline-variant mb-4 overflow-x-auto">
                <button className="whitespace-nowrap pb-2 px-4 border-b-2 border-primary text-primary font-bold font-body-md text-body-md transition-colors flex items-center gap-2">
                  <Icon name="credit_card" className="text-sm" /> Card
                </button>
                <button className="whitespace-nowrap pb-2 px-4 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-body-md text-body-md transition-colors flex items-center gap-2">
                  <Icon name="dialpad" className="text-sm" /> USSD
                </button>
                <button className="whitespace-nowrap pb-2 px-4 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-body-md text-body-md transition-colors flex items-center gap-2">
                  <Icon name="account_balance" className="text-sm" /> Bank Transfer
                </button>
              </div>

              {/* Card Input Form */}
              <div className="space-y-stack-md">
                <div className="flex flex-col">
                  <label className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase" htmlFor="card_number">Card Number</label>
                  <div className="relative">
                    <input className="w-full border border-outline-variant rounded bg-surface p-3 pl-10 font-data-mono text-data-mono text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" id="card_number" placeholder="0000 0000 0000 0000" type="text" />
                    <Icon name="credit_card" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-stack-md">
                  <div className="flex flex-col">
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase" htmlFor="expiry">Expiry Date</label>
                    <input className="border border-outline-variant rounded bg-surface p-3 font-data-mono text-data-mono text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" id="expiry" placeholder="MM/YY" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase" htmlFor="cvv">CVV</label>
                    <input className="border border-outline-variant rounded bg-surface p-3 font-data-mono text-data-mono text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" id="cvv" placeholder="123" type="password" />
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 flex items-center gap-4 bg-surface-container-low p-4 rounded border border-outline-variant">
                <Icon name="gpp_good" className="text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }} />
                <div>
                  <p className="font-body-md text-body-md font-bold text-on-surface">256-Bit Encryption</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Your payment details are strictly secured.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Fare Breakout */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg sticky top-24 shadow-sm">
            <h3 className="font-title-md text-title-md text-on-surface mb-stack-md border-b border-outline-variant pb-2 flex justify-between items-center">
              Fare Breakout
              <Icon name="receipt_long" className="text-on-surface-variant" />
            </h3>
            <div className="space-y-4 font-body-md text-body-md">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Base Fare (Lagos to Ibadan)</span>
                <span className="font-data-mono text-data-mono text-on-surface">₦ 3,500.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Taxes & Fees</span>
                <span className="font-data-mono text-data-mono text-on-surface">₦ 250.00</span>
              </div>
              <div className="flex justify-between items-center text-primary">
                <span>Convenience Fee</span>
                <span className="font-data-mono text-data-mono">₦ 150.00</span>
              </div>
              <div className="border-t border-outline-variant pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-title-md text-title-md font-bold text-on-surface">Total Amount</span>
                  <span className="font-display-lg text-headline-lg font-bold text-primary font-data-mono">₦ 3,900.00</span>
                </div>
              </div>
            </div>
            
            <Button onClick={handlePay} className="w-full mt-stack-lg py-4 rounded font-bold flex justify-center items-center gap-2">
              <Icon name="lock" style={{ fontVariationSettings: "'FILL' 1" }} />
              Pay ₦ 3,900.00 Securely
            </Button>
            
            <p className="text-center mt-4 font-body-sm text-body-sm text-on-surface-variant">
              By clicking pay, you agree to our <a className="text-primary underline" href="#">Terms of Service</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
