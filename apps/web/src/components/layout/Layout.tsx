import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNavBar } from './BottomNavBar';

export function Layout() {
  return (
    <>
      <Header />
      <main className="flex-grow pb-28 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNavBar />
    </>
  );
}
