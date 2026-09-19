import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-surface-dim dark:bg-inverse-surface border-t border-outline-variant w-full py-stack-lg mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-stack-md md:gap-0">
        <div className="font-title-md text-title-md font-bold text-on-surface text-center md:text-left">
          Nigerian Rail
        </div>
        <div className="flex flex-wrap justify-center gap-x-gutter gap-y-2">
          <Link
            to="/terms"
            className="font-body-sm text-body-sm text-on-secondary-fixed-variant hover:text-primary transition-colors cursor-pointer"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="font-body-sm text-body-sm text-on-secondary-fixed-variant hover:text-primary transition-colors cursor-pointer"
          >
            Privacy Policy
          </Link>
          <Link
            to="/refund-rules"
            className="font-body-sm text-body-sm text-on-secondary-fixed-variant hover:text-primary transition-colors cursor-pointer"
          >
            Refund Rules
          </Link>
          <Link
            to="/contact"
            className="font-body-sm text-body-sm text-on-secondary-fixed-variant hover:text-primary transition-colors cursor-pointer"
          >
            Contact Us
          </Link>
        </div>
        <div className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim text-center md:text-right">
          © 2026 Nigerian Railway Corporation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
