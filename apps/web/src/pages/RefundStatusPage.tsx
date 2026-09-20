import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

export function RefundStatusPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // For demonstration, we'll default to 'completed' but this could be dynamic
  // based on the ID or state in a real app.
  const [status] = useState<'processing' | 'completed' | 'failed'>('completed');

  return (
    <div className="flex-1 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg animate-fade-in">
      <div className="mb-stack-lg">
        <button 
          className="flex items-center gap-2 text-primary hover:text-on-primary-container transition-colors mb-4"
          onClick={() => navigate('/my-bookings')}
        >
          <Icon name="arrow_back" />
          <span className="font-label-caps text-label-caps">BACK TO BOOKINGS</span>
        </button>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Refund Status</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">PNR: <span className="font-data-mono text-data-mono">{id || 'NR-8X9Y2Z'}</span></p>
      </div>

      {/* Bento Grid Layout for Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Status & Amount Card (Spans 2 columns on lg) */}
        <div className="lg:col-span-2 bg-surface border border-outline-variant rounded-xl p-stack-md md:p-stack-lg flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">REFUND AMOUNT</p>
              <h2 className="font-display-lg text-display-lg text-on-surface">₦ 8,250</h2>
            </div>
            
            {status === 'completed' && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2 border border-primary/20">
                <Icon name="check_circle" className="text-sm" />
                <span className="font-label-caps text-label-caps">COMPLETED</span>
              </div>
            )}
            
            {status === 'processing' && (
              <div className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full flex items-center gap-2 border border-outline-variant">
                <Icon name="sync" className="text-sm animate-spin" />
                <span className="font-label-caps text-label-caps">PROCESSING</span>
              </div>
            )}
            
            {status === 'failed' && (
              <div className="bg-error-container text-on-error-container px-3 py-1 rounded-full flex items-center gap-2 border border-error">
                <Icon name="error" className="text-sm" />
                <span className="font-label-caps text-label-caps">FAILED</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-6 mt-auto">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">ORIGINAL PAYMENT</p>
              <p className="font-data-mono text-data-mono text-on-surface">₦ 8,925</p>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">REFUND REFERENCE</p>
              <p className="font-data-mono text-data-mono text-on-surface">REF-2024-0042</p>
            </div>
            <div className="col-span-2">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">REFUND METHOD</p>
              <p className="font-body-md text-body-md text-on-surface flex items-center gap-2">
                <Icon name="credit_card" className="text-outline" />
                Original payment: Paystack
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Card */}
        <div className="bg-surface border border-outline-variant rounded-xl p-stack-md md:p-stack-lg">
          <h3 className="font-title-md text-title-md text-on-surface mb-6">Refund Timeline</h3>
          <div className="relative pl-6 border-l-2 border-primary/30 space-y-8">
            {/* Requested */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-surface"></div>
              <p className="font-title-md text-title-md text-on-surface text-base">Requested</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Oct 25, 2024</p>
            </div>
            
            {/* Processing */}
            <div className="relative">
              <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-surface ${status === 'completed' || status === 'failed' ? 'bg-primary' : 'bg-primary animate-pulse'}`}></div>
              <p className="font-title-md text-title-md text-on-surface text-base">Processing</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Oct 26, 2024</p>
            </div>
            
            {/* Completed / Failed */}
            <div className="relative">
              {status === 'completed' && (
                <>
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-surface"></div>
                  <p className="font-title-md text-title-md text-on-surface text-base">Completed</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Oct 27, 2024</p>
                  <p className="font-body-sm text-body-sm text-primary mt-1">Funds should reflect in your account within 3-5 business days.</p>
                </>
              )}
              {status === 'processing' && (
                <>
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-surface-variant border-2 border-surface"></div>
                  <p className="font-title-md text-title-md text-on-surface-variant text-base">Completed</p>
                </>
              )}
              {status === 'failed' && (
                <>
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-error border-2 border-surface"></div>
                  <p className="font-title-md text-title-md text-error text-base">Failed</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Oct 27, 2024</p>
                  <p className="font-body-sm text-body-sm text-error mt-1">We couldn't process this refund. Please contact support.</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Support Card */}
        <div className="lg:col-span-3 bg-surface-container-low border border-outline-variant rounded-xl p-stack-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-surface border border-outline-variant p-3 rounded-full text-primary">
              <Icon name="support_agent" />
            </div>
            <div>
              <h4 className="font-title-md text-title-md text-on-surface text-base">Having issues with this refund?</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">If your refund hasn't arrived after 5 business days, please contact support.</p>
            </div>
          </div>
          <Button variant="outline" className="whitespace-nowrap">
            CONTACT SUPPORT
          </Button>
        </div>
      </div>
    </div>
  );
}
