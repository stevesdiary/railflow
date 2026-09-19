import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon';

export function Header() {
  return (
    <>
      {/* Desktop Header */}
      <nav className="hidden md:block bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto h-16">
          <div className="flex items-center gap-gutter">
            <Link
              to="/"
              className="font-headline-lg text-headline-lg font-bold text-primary dark:text-inverse-primary tracking-tight"
            >
              Nigerian Rail
            </Link>
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-stack-lg ml-8">
              <Link
                to="/search"
                className="font-body-md text-body-md text-primary dark:text-inverse-primary border-b-2 border-primary font-bold pb-1 pt-1 mt-1 transition-colors"
              >
                Find Trains
              </Link>
              <Link
                to="/my-bookings"
                className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-inverse-surface px-2 py-1 rounded transition-colors"
              >
                Booking History
              </Link>
              <Link
                to="/schedule"
                className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-inverse-surface px-2 py-1 rounded transition-colors"
              >
                Schedule
              </Link>
              <Link
                to="/help"
                className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-inverse-surface px-2 py-1 rounded transition-colors"
              >
                Help
              </Link>
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-stack-sm">
            <Link
              to="/login"
              className="hidden md:flex items-center justify-center text-primary font-body-md text-body-md border border-outline px-4 py-2 rounded-DEFAULT hover:bg-surface-container transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hidden md:flex items-center justify-center bg-primary text-on-primary font-body-md text-body-md px-4 py-2 rounded-DEFAULT hover:bg-surface-tint transition-colors"
            >
              Sign Up
            </Link>
            <Link to="/profile" className="hidden md:flex text-primary p-2 scale-95 active:scale-90 transition-transform rounded-full hover:bg-surface-container">
              <Icon name="account_circle" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden pt-[env(safe-area-inset-top,20px)] px-margin-mobile py-stack-md flex justify-between items-center bg-surface sticky top-0 z-40 shadow-sm border-b border-outline-variant">
        <Link to="/" className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">
          Nigerian Rail
        </Link>
        <Link to="/profile" className="text-on-surface-variant p-2 -mr-2">
          <Icon name="account_circle" />
        </Link>
      </div>
    </>
  );
}
