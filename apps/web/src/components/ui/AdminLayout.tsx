import { Outlet, Link, useLocation } from 'react-router-dom';
import { Icon } from './Icon';

export function AdminLayout() {
  const location = useLocation();

  const navLinks = [
    { name: 'Overview', path: '/admin', icon: 'dashboard' },
    { name: 'Bookings', path: '/admin/bookings', icon: 'confirmation_number' },
    { name: 'Revenue', path: '/admin/revenue', icon: 'payments' },
    { name: 'Refunds', path: '/admin/refunds', icon: 'assignment_return' },
    { name: 'Anti-Abuse', path: '/admin/anti-abuse', icon: 'security' },
    { name: 'System Health', path: '/admin/system-health', icon: 'analytics' },
    { name: 'Train Fleet', path: '/admin/fleet', icon: 'train' },
    { name: 'Train Config', path: '/admin/train-config', icon: 'settings_input_component' },
    { name: 'Route Management', path: '/admin/route-management', icon: 'alt_route' },
    { name: 'Terminal Control', path: '/admin/terminal-control', icon: 'terminal' },
    { name: 'Seat Inventory', path: '/admin/seat-inventory', icon: 'event_seat' },
    { name: 'Schedule Journey', path: '/admin/schedule-journey', icon: 'event_available' },
    { name: 'User Management', path: '/admin/user-management', icon: 'manage_accounts' },
    { name: 'Journeys', path: '/admin/journeys', icon: 'directions_railway' },
  ];

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased flex h-screen overflow-hidden w-full">
      {/* SideNavBar */}
      <aside className="docked left-0 h-screen w-64 border-r border-outline-variant bg-surface-container-low flex-col p-stack-md gap-stack-sm hidden md:flex shrink-0 z-40">
        {/* Header */}
        <div className="flex items-center gap-stack-sm mb-stack-lg">
          <img 
            alt="Nigeria Railway Corporation Logo" 
            className="w-10 h-10 rounded-full border border-outline-variant object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcyszqdL0wMM8KLh33cLzAfu190P0uVRyr5bhptGBXKCySCGz_X4xBhA6TRNBOdiCYoe1JLco72yBAKGR92ekMCB7XFedLpdzQsY7xMa-BZypx2oivVYEHKDM6By0sSj2fBzTx-Iz8QPLnH_VbApqfEzlg1pACCFgUE_thtm50y07XxSSR3nb_MiY2s2k7iMoV4dsOJVS7LH5Lq4Yypite9t9qV-mqiQ7s4a42khdo7KipqOVF3FSv"
          />
          <div>
            <h1 className="text-title-md font-title-md font-bold text-on-surface">NRC Operations</h1>
            <p className="text-body-sm font-body-sm text-on-surface-variant">Institutional Hub</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-stack-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name}
                to={link.path}
                className={`flex items-center gap-stack-sm p-stack-sm rounded-lg transition-all ${
                  isActive 
                    ? 'bg-secondary-container text-on-secondary-container font-semibold' 
                    : 'text-on-surface-variant hover:bg-surface-container-highest scale-95 hover:scale-100 transition-transform duration-100'
                }`}
              >
                <Icon name={link.icon} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA & Footer */}
        <div className="mt-auto flex flex-col gap-stack-sm pt-stack-md border-t border-outline-variant">
          <button className="bg-error text-on-error py-2 px-4 rounded font-bold w-full text-center hover:bg-error-container hover:text-on-error-container transition-colors">
            Emergency Stop
          </button>
          <Link to="/" className="flex items-center gap-stack-sm p-stack-sm text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-all scale-95 hover:scale-100 mt-stack-sm">
            <Icon name="logout" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* TopNavBar */}
        <header className="flex justify-between items-center px-gutter h-16 w-full sticky top-0 z-50 bg-surface-container-lowest border-b border-outline-variant flat no shadows">
          <div className="flex items-center gap-gutter">
            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-primary p-2">
              <Icon name="menu" />
            </button>
            <div className="text-headline-lg font-headline-lg text-primary font-bold">Railway Ops Central</div>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-gutter">
            <div className="relative w-full">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input 
                className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-body-sm font-body-sm" 
                placeholder="Search PNR, Train ID..." 
                type="text"
              />
            </div>
          </div>

          {/* Trailing Actions */}
          <div className="flex items-center gap-stack-sm">
            <button className="p-2 text-secondary hover:bg-surface-container-low transition-colors rounded-full active:opacity-80">
              <Icon name="notifications" />
            </button>
            <button className="p-2 text-secondary hover:bg-surface-container-low transition-colors rounded-full active:opacity-80">
              <Icon name="settings" />
            </button>
            <button className="p-2 text-secondary hover:bg-surface-container-low transition-colors rounded-full active:opacity-80">
              <Icon name="help" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-stack-sm">
              <img 
                alt="Staff Profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKFa8FR3mN3LDKg_ygNy49-hKsZUOxdEWJRTTT8Se_POZdLYSf_Mqx-CWHtXnQ55X5wFYJ6GtesEPgcQB5BfO2wUepcrRAgrIIZoOH9eTid0rcC3X_YFj2GKyWu0I8DRnnMhsCfk41L-EXUP-pi2d6MPS8znL429rxg-dgxwa-rBH3pUcIMx-AXsS8y6XUPCsWP8cWzUV-55PiL86aKkfceqpX6KanBomYXzvOqqILoi-o6SyPJs9M"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Canvas for Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-gutter bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
