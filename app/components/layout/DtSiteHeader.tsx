import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import BrandLogo from '../brand/BrandLogo';
import { useCart } from '../cart/CartContext';

const NAV_LINKS: { label: string; to: string; hash?: string }[] = [
  { label: 'الرئيسية', to: '/' },
  { label: 'الباقات', to: '/', hash: 'packages' },
  { label: 'من نحن', to: '/about' },
  { label: 'المدونة', to: '/blog' },
];

export function DtSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const location = useLocation();

  const handleNav = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(245, 242, 236, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #D6D1C4',
        }}
      >
        <div style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 24px',
          height: '104px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          direction: 'rtl',
        }}>
          <Link
            to="/"
            onClick={handleNav}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 0,
              flexShrink: 0,
              textDecoration: 'none',
            }}
            aria-label="الرئيسية"
          >
            <BrandLogo
              height={88}
              style={{
                height: 'clamp(72px, 11vw, 92px)',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
            className="hidden md:flex">
            {NAV_LINKS.map(({ label, to, hash }) => {
              const active = hash
                ? location.pathname === to
                : location.pathname === to;
              return (
                <Link
                  key={label}
                  to={to}
                  hash={hash}
                  onClick={handleNav}
                  style={{
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: active ? '#1C1B18' : '#7A7869',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 14px',
                    borderRadius: '2px',
                    transition: 'color 0.2s ease',
                    letterSpacing: '0.01em',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#1C1B18')}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = active ? '#1C1B18' : '#7A7869';
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Search */}
            <Link
              to="/search"
              style={{
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer', borderRadius: '2px',
                color: '#7A7869', transition: 'color 0.2s ease', textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1C1B18')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#7A7869')}
              aria-label="بحث"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              style={{
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer', borderRadius: '2px',
                color: '#7A7869', transition: 'color 0.2s ease', position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1C1B18')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#7A7869')}
              aria-label="سلة التسوق"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {count > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 6,
                  left: 6,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#6E6D52',
                  color: '#FEFCF8',
                  fontSize: '9px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Cairo',
                }}>
                  {count}
                </span>
              )}
            </button>

            {/* Account */}
            <Link
              to="/account"
              style={{
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer', borderRadius: '2px',
                color: location.pathname.startsWith('/account') ? '#1C1B18' : '#7A7869', transition: 'color 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1C1B18')}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = location.pathname.startsWith('/account') ? '#1C1B18' : '#7A7869';
              }}
              aria-label="الحساب"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="flex md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer', borderRadius: '2px',
                color: '#1C1B18',
              }}
              aria-label="القائمة"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 104,
          right: 0,
          left: 0,
          zIndex: 99,
          background: '#F5F2EC',
          borderBottom: '1px solid #D6D1C4',
          padding: '16px 24px 24px',
          direction: 'rtl',
          animation: 'slideUp 0.3s ease forwards',
        }}>
          {NAV_LINKS.map(({ label, to, hash }) => (
            <Link
              key={label}
              to={to}
              hash={hash}
              onClick={handleNav}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'right',
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                color: '#1C1B18',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '14px 0',
                borderBottom: '1px solid #E6E2D8',
                letterSpacing: '0.01em',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default DtSiteHeader;