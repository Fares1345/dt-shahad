import { Link } from '@tanstack/react-router';
import BrandLogo from '../brand/BrandLogo';

const NAV_LINKS: { label: string; to: string; hash?: string }[] = [
  { label: 'الرئيسية', to: '/' },
  { label: 'الباقات', to: '/', hash: 'packages' },
  { label: 'من نحن', to: '/about' },
  { label: 'المدونة', to: '/blog' },
  { label: 'تواصل معنا', to: '/about' },
];

const LEGAL_LINKS = ['سياسة الخصوصية', 'الشروط والأحكام', 'سياسة الاسترداد', 'سياسة الشحن'];

const SOCIAL_LINKS = [
  { label: 'إنستغرام', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
  { label: 'تويتر', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg> },
  { label: 'تيك توك', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg> },
];

const CONTACT_LINKS = [
  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, text: 'hello@dt-shahad.com' },
  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>, text: '+966 50 000 0000' },
];

export function DtSiteFooter() {
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
            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {SOCIAL_LINKS.map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  style={{
                    width: 36, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    color: '#7A7869',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
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
                  {icon}
                </button>
              ))}
            </div>
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

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: '13px', color: '#F5F2EC', letterSpacing: '0.08em', marginBottom: '20px' }}>
              قانوني
            </h4>
            {LEGAL_LINKS.map((label) => (
              <button
                key={label}
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
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F2EC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7A7869')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Cairo', fontWeight: 700, fontSize: '13px', color: '#F5F2EC', letterSpacing: '0.08em', marginBottom: '20px' }}>
              تواصل معنا
            </h4>
            {CONTACT_LINKS.map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
                <span style={{ color: '#6E6D52' }}>{icon}</span>
                <span style={{ fontFamily: 'Cairo', fontSize: '14px', color: '#7A7869' }}>{text}</span>
              </div>
            ))}

            {/* Payment methods placeholder */}
            <div style={{ marginTop: '24px' }}>
              <p style={{ fontFamily: 'Cairo', fontSize: '12px', color: '#5A584E', marginBottom: '12px' }}>
                طرق الدفع المدعومة
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['مدى', 'Visa', 'STC Pay', 'Apple Pay'].map((method) => (
                  <div
                    key={method}
                    style={{
                      padding: '4px 10px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '2px',
                      fontFamily: 'Cairo',
                      fontSize: '11px',
                      color: '#7A7869',
                    }}
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
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