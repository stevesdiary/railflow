import type { ReactNode } from 'react';
import './AuthLayout.css';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-page">
      <div className="container auth-page__inner">
        <div className="card auth-card">{children}</div>
      </div>
    </div>
  );
}
