import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../ui/Icon';

export function BottomNavBar() {
  return (
    <nav className="md:hidden flex justify-around items-center w-full h-20 px-2 pb-[env(safe-area-inset-bottom,20px)] bg-surface border-t border-outline-variant fixed bottom-0 z-50 transition-colors">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center px-4 py-1 rounded-full scale-95 active:scale-90 transition-transform duration-150 ${
            isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-secondary-container/50'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon name="home" filled={isActive} />
            <span className="font-label-caps text-label-caps mt-1">Home</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/my-bookings"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center px-4 py-1 rounded-full scale-95 active:scale-90 transition-transform duration-150 ${
            isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-secondary-container/50'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon name="confirmation_number" filled={isActive} />
            <span className="font-label-caps text-label-caps mt-1">Bookings</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center px-4 py-1 rounded-full scale-95 active:scale-90 transition-transform duration-150 ${
            isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-secondary-container/50'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon name="notifications" filled={isActive} />
            <span className="font-label-caps text-label-caps mt-1">Alerts</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center px-4 py-1 rounded-full scale-95 active:scale-90 transition-transform duration-150 ${
            isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-secondary-container/50'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon name="person" filled={isActive} />
            <span className="font-label-caps text-label-caps mt-1">Profile</span>
          </>
        )}
      </NavLink>
    </nav>
  );
}
