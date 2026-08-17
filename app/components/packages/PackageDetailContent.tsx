import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import type { Package } from '../../lib/packages';
import { PACKAGES } from '../../lib/packages';
import { useCart } from '../cart/CartContext';

const FAQS = [
  { q: 'متى أحصل على خطتي الغذائية؟', a: 'بعد إكمال نموذج البيانات، يتم إعداد خطتك خلال ٢٤-٤٨ ساعة عمل وإرسالها إليك مباشرة.' },
  { q: 'هل يمكنني تعديل الخطة لاحقًا؟', a: 'نعم، حسب الباقة المختارة يمكنك تعديل خطتك شهريًا أو أسبوعيًا مع الفريق.' },
  { q: 'هل الخطة مناسبة لحالات صحية خاصة؟', a: 'نأخذ بعين الاعتبار الحالات الصحية الخاصة، ونوصي بمراجعة طبيبك للحالات الدقيقة.' },
  { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل Visa و Mada و STC Pay و Apple Pay. الدفع آمن عبر منصة سلة.' },
  { q: 'هل يمكنني الإلغاء في أي وقت؟', a: 'يمكنك إلغاء الاشتراك وفق سياسة الإلغاء المتاحة قبل إعداد الخطة.' },
];

export function PackageDetailContent({ pkg }: { pkg: Package }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { addToCart } = useCart();
  const isDark = pkg.id === 'tahawwul' || pkg.id === 'nakhba';

  const relatedPkgs = PACKAGES.filter((p) => p.id !== pkg.id).slice(0, 3);

  return (
    <div style={{ direction: 'rtl', backgroundColor: '#F7F4EE', minHeight: '80vh', overflowX: 'hidden' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '20px clamp(20px, 5vw, 40px) 0', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#8A8580', padding: 0, transition: 'color 0.2s', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#1A1917')} onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8580')}>الرئيسية</Link>
        <span style={{ color: '#D4CFCA', fontSize: '12px' }}>›</span>
        <Link to="/" hash="packages" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#8A8580', padding: 0, transition: 'color 0.2s', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#1A1917')} onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8580')}>الباقات</Link>
        <span style={{ color: '#D4CFCA', fontSize: '12px' }}>›</span>
        <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#1A1917' }}>{pkg.nameAr}</span>
      </div>

      {/* Hero section */}
      <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'start' }} className="detail-grid">
          {/* Package mockup — larger */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div
              style={{
                backgroundColor: pkg.color,
                borderRadius: '16px',
                padding: 'clamp(28px, 5vw, 48px)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
                minHeight: '480px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                direction: 'rtl',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, opacity: 0.03 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} style={{ position: 'absolute', top: `${i * 5.5}%`, left: 0, right: 0, height: '1px', backgroundColor: isDark ? '#F7F4EE' : '#1A1917' }} />
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    border: `1px solid ${isDark ? 'rgba(247,244,238,0.15)' : 'rgba(26,25,23,0.15)'}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontFamily: "'Tajawal', sans-serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    color: isDark ? 'rgba(247,244,238,0.5)' : 'rgba(26,25,23,0.5)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {pkg.duration}
                </div>
                {pkg.recommended && (
                  <div
                    style={{
                      backgroundColor: pkg.accentColor,
                      color: '#1A1917',
                      fontFamily: "'Tajawal', sans-serif",
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '5px 14px',
                      borderRadius: '20px',
                    }}
                  >
                    الأكثر طلبًا
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: `1px solid ${isDark ? 'rgba(247,244,238,0.15)' : 'rgba(26,25,23,0.12)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <span style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '20px', fontWeight: 400, letterSpacing: '0.15em', color: isDark ? '#F7F4EE' : '#1A1917' }}>DT</span>
                </div>
                <div
                  style={{
                    fontFamily: "'Noto Serif Arabic', serif",
                    fontSize: 'clamp(28px, 4vw, 36px)',
                    fontWeight: 600,
                    color: isDark ? '#F7F4EE' : '#1A1917',
                    marginBottom: '8px',
                    lineHeight: 1.2,
                  }}
                >
                  {pkg.nameAr}
                </div>
                <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '15px', fontWeight: 400, color: isDark ? 'rgba(247,244,238,0.5)' : 'rgba(26,25,23,0.5)' }}>
                  {pkg.tagline}
                </div>
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '11px', color: isDark ? 'rgba(247,244,238,0.35)' : 'rgba(26,25,23,0.35)', marginBottom: '4px' }}>{pkg.priceNote}</div>
                  <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '32px', fontWeight: 600, color: isDark ? '#F7F4EE' : '#1A1917', lineHeight: 1 }}>{pkg.price}</div>
                </div>
                <div style={{ width: '32px', height: '2px', backgroundColor: pkg.accentColor, borderRadius: '1px' }} />
              </div>

              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: pkg.accentColor }} />
            </div>
          </div>

          {/* Right info */}
          <div style={{ direction: 'rtl' }}>
            <h1 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 500, color: '#1A1917', margin: '0 0 12px', lineHeight: 1.3 }}>
              باقة {pkg.nameAr}
            </h1>
            <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '16px', color: '#8A8580', lineHeight: 1.9, margin: '0 0 32px' }}>
              {pkg.description}
            </p>

            <div
              style={{
                backgroundColor: '#F0ECE4',
                borderRadius: '10px',
                padding: '24px',
                marginBottom: '32px',
                border: '1px solid #E8E3DC',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12px', color: '#8A8580', marginBottom: '4px' }}>{pkg.priceNote}</div>
                  <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(28px, 4vw, 34px)', fontWeight: 600, color: '#1A1917', lineHeight: 1 }}>{pkg.price}</div>
                </div>
                <span
                  style={{
                    backgroundColor: '#EDE9E0',
                    color: '#5A6340',
                    fontFamily: "'Tajawal', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '6px 16px',
                    borderRadius: '20px',
                  }}
                >
                  {pkg.duration}
                </span>
              </div>
              <button
                onClick={() => addToCart(pkg)}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#1A1917',
                  color: '#F7F4EE',
                  fontFamily: "'Tajawal', sans-serif",
                  fontSize: '15px',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'}
                onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
              >
                أضف إلى السلة
              </button>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '18px', fontWeight: 600, color: '#1A1917', margin: '0 0 16px' }}>ماذا تشمل الباقة</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pkg.includes.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#EDE9E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="#5A6340" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14.5px', color: '#2E2C29', fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '18px', fontWeight: 600, color: '#1A1917', margin: '0 0 16px' }}>المميزات</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '12px' }}>
                {pkg.benefits.map((b) => (
                  <div
                    key={b}
                    style={{
                      backgroundColor: '#F0ECE4',
                      borderRadius: '6px',
                      padding: '14px 16px',
                      fontFamily: "'Tajawal', sans-serif",
                      fontSize: '13.5px',
                      color: '#2E2C29',
                      fontWeight: 400,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#5A6340', flexShrink: 0 }} />
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: '860px', width: '100%', margin: '64px auto 0', padding: '0 clamp(20px, 5vw, 40px)' }}>
        <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(24px, 4vw, 28px)', fontWeight: 500, color: '#1A1917', margin: '0 0 32px', textAlign: 'center' }}>
          أسئلة شائعة
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid #E8E3DC',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '20px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  direction: 'rtl',
                  textAlign: 'right',
                }}
              >
                <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '15px', fontWeight: 500, color: '#1A1917', flex: 1, textAlign: 'right' }}>{faq.q}</span>
                <span
                  style={{
                    color: '#8A8580',
                    fontSize: '18px',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.25s ease',
                    marginRight: '16px',
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14.5px', color: '#8A8580', lineHeight: 1.8, margin: '0 0 20px', paddingRight: '0', textAlign: 'right' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related packages */}
      <div style={{ maxWidth: '1280px', width: '100%', margin: '64px auto 0', padding: '0 clamp(20px, 5vw, 40px) 88px' }}>
        <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(22px, 4vw, 24px)', fontWeight: 500, color: '#1A1917', margin: '0 0 28px' }}>باقات أخرى</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px' }} className="related-grid">
          {relatedPkgs.map((rp) => {
            const rIsDark = rp.id === 'tahawwul' || rp.id === 'nakhba';
            return (
              <Link
                key={rp.id}
                to={`/packages/${rp.id}`}
                style={{
                  backgroundColor: rp.color,
                  borderRadius: '8px',
                  padding: '24px',
                  border: `1px solid ${rIsDark ? 'rgba(255,255,255,0.06)' : '#D4CFCA'}`,
                  cursor: 'pointer',
                  direction: 'rtl',
                  textAlign: 'right',
                  transition: 'transform 0.2s ease',
                  textDecoration: 'none',
                  display: 'block',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'}
              >
                <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '18px', fontWeight: 600, color: rIsDark ? '#F7F4EE' : '#1A1917', marginBottom: '8px' }}>{rp.nameAr}</div>
                <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: rIsDark ? 'rgba(247,244,238,0.5)' : '#8A8580', marginBottom: '16px', lineHeight: 1.6 }}>{rp.tagline}</div>
                <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '20px', fontWeight: 600, color: rp.accentColor }}>{rp.price}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PackageDetailContent;