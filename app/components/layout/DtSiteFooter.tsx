import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { useStore } from '@salla.sa/twilight-theme-engine/hooks';
import BrandLogo from '../brand/BrandLogo';

const NAV_LINKS: { label: string; to: string; hash?: string }[] = [
  { label: 'الرئيسية', to: '/' },
  { label: 'الباقات', to: '/', hash: 'packages' },
  { label: 'من نحن', to: '/about' },
  { label: 'المدونة', to: '/blog' },
];

const SOCIAL_ICONS: Record<string, ReactNode> = {
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
  ),
  twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
  ),
  tiktok: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
  ),
  snapchat: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18.8 8.2a7 7 0 0 0-13.6 0c-1.6.4-2.7 1.5-2.7 2.8 0 1 .7 1.7 1.7 1.9.1 0 .2 0 .3.1-.1.4-.3 1-.6 1.4-.4.7-.5 1.3.2 1.4 1.4.2 2.4 1 3 2.3.5 1.1 1.4 1.4 2.6 1.4.2 0 .4.4.5.7.3.8 1 1.3 2.2 1.3s1.9-.5 2.2-1.3c.1-.3.3-.7.5-.7 1.2 0 2.1-.3 2.6-1.4.6-1.3 1.6-2.1 3-2.3.7-.1.6-.7.2-1.4-.3-.4-.5-1-.6-1.4.1 0 .2-.1.3-.1 1-.2 1.7-.9 1.7-1.9 0-1.3-1.1-2.4-2.7-2.8z" /></svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
  ),
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  ),
  whatsapp: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
  ),
};

const CONTACT_ICONS: Record<string, ReactNode> = {
  email: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
  ),
  phone: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  ),
  mobile: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
  ),
  whatsapp: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
  ),
  telegram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" /></svg>
  ),
};

function toSocialUrl(key: string, value: string): string {
  if (key === 'whatsapp') return `https://wa.me/${value.replace(/\D/g, '')}`;
  if (key === 'telegram') return `https://t.me/${value.replace(/^@/, '')}`;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function toContactUrl(key: string, value: string): string {
  if (key === 'email') return `mailto:${value}`;
  if (key === 'phone' || key === 'mobile') return `tel:${value}`;
  if (key === 'whatsapp') return `https://wa.me/${value.replace(/\D/g, '')}`;
  if (key === 'telegram') return `https://t.me/${value.replace(/^@/, '')}`;
  return value;
}

const SOCIAL_ORDER = ['instagram', 'twitter', 'tiktok', 'snapchat', 'youtube', 'facebook', 'whatsapp'];
const CONTACT_ORDER = ['email', 'mobile', 'phone', 'whatsapp', 'telegram'];

export function DtSiteFooter() {
  const { social, contacts } = useStore();

  const socialLinks = Object.entries(social ?? {})
    .filter(([key, value]) => Boolean(value) && SOCIAL_ICONS[key])
    .sort(([a], [b]) => SOCIAL_ORDER.indexOf(a) - SOCIAL_ORDER.indexOf(b));

  const contactRows = Object.entries(contacts ?? {})
    .filter(([key, value]) => Boolean(value) && CONTACT_ICONS[key])
    .sort(([a], [b]) => CONTACT_ORDER.indexOf(a) - CONTACT_ORDER.indexOf(b));

  return (
    <footer style={{
      background: '#1C1B18',
      color: '#F5F2EC',
      direction: 'rtl',
      paddingTop: '64px',
      paddingBottom: '32px',
    }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '56px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <BrandLogo width={160} variant="white" />
            </div>
            <p style={{
              fontFamily: 'Cairo, sans-serif',
              fontSize: '14px',
              color: '#7A7869',
              lineHeight: 1.8,
              maxWidth: '240px',
            }}>
              تغذية مصممة لحياتك. خطط غذائية مدروسة تساعدك على بناء أسلوب حياة أكثر توازنًا.
            </p>
            {socialLinks.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                {socialLinks.map(([key, value]) => (
                  <a
                    key={key}
                    href={toSocialUrl(key, value)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    style={{
                      width: 36, height: 36,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '2px',
                      color: '#7A7869',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(110, 109, 82, 0.2)';
                      e.currentTarget.style.color = '#6E6D52';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.color = '#7A7869';
                    }}
                  >
                    {SOCIAL_ICONS[key]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: '13px', color: '#F5F2EC', letterSpacing: '0.08em', marginBottom: '20px' }}>
              التنقل
            </h4>
            {NAV_LINKS.map(({ label, to, hash }) => (
              <Link
                key={label}
                to={to}
                hash={hash}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  display: 'block',
                  fontFamily: 'Cairo, sans-serif',
                  fontSize: '14px',
                  color: '#7A7869',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 0',
                  transition: 'color 0.2s ease',
                  textAlign: 'right',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F2EC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7A7869')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: '13px', color: '#F5F2EC', letterSpacing: '0.08em', marginBottom: '20px' }}>
              تواصل معنا
            </h4>
            {contactRows.length > 0 ? (
              contactRows.map(([key, value]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
                  <span style={{ color: '#6E6D52' }}>{CONTACT_ICONS[key]}</span>
                  <a
                    href={toContactUrl(key, value)}
                    style={{
                      fontFamily: 'Cairo',
                      fontSize: '14px',
                      color: '#7A7869',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F2EC')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#7A7869')}
                  >
                    {value}
                  </a>
                </div>
              ))
            ) : (
              <p style={{ fontFamily: 'Cairo', fontSize: '14px', color: '#5A584E', margin: 0 }}>
                لا توجد بيانات تواصل بعد
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '28px' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontFamily: 'Cairo', fontSize: '13px', color: '#5A584E' }}>
            © 2026 DT. SHAHAD. جميع الحقوق محفوظة.
          </p>
          <p style={{ fontFamily: 'Cairo', fontSize: '12px', color: '#3E3D38' }}>
            مدعوم بـ Salla
          </p>
        </div>
      </div>
    </footer>
  );
}

export default DtSiteFooter;