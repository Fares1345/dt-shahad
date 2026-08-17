import type { ReactNode } from 'react';
import { DtSiteHeader } from './DtSiteHeader';
import { DtSiteFooter } from './DtSiteFooter';

/**
 * Global layout — replaces the engine's default MasterLayout.
 * Renders the DT. SHAHAD header and footer around every route
 * (custom and engine pages alike), so the default Salla chrome
 * is never rendered.
 */
export function DtMasterLayout({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="ar" style={{ minHeight: '100vh', background: '#F7F4EE' }}>
      <DtSiteHeader />
      <main id="main-content" role="main">
        {children}
      </main>
      <DtSiteFooter />
    </div>
  );
}

export default DtMasterLayout;