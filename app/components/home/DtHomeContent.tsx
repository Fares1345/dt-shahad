import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { getTwilightContext } from '@salla.sa/twilight-theme-engine/tanstack';
import { useMoney } from '@salla.sa/twilight-theme-engine/hooks/useMoney';
import { useAsset } from '@salla.sa/twilight-theme-engine/hooks/useAsset';
import BrandLogo from '../brand/BrandLogo';
import { useCart } from '../cart/CartContext';
import { resolveText, toArabicDigits, type PackageView } from '../../lib/store-data';

const OLIVE = '#3D472E';
const OLIVE_ACCENT = '#5A6340';

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke={OLIVE_ACCENT}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: '2px' }}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PackageCard({ pkg }: { pkg: PackageView }) {
  const featured = pkg.recommended;
  const { addToCart } = useCart();
  const { format } = useMoney();
  const baseShadow = featured
    ? '0 24px 60px rgba(61,71,46,0.16)'
    : '0 10px 34px rgba(61,71,46,0.07)';
  const hoverShadow = featured
    ? '0 32px 72px rgba(61,71,46,0.22)'
    : '0 20px 50px rgba(61,71,46,0.13)';

  return (
    <div
      style={{
        backgroundColor: '#FBF9F3',
        borderRadius: '18px',
        padding: featured ? '40px 30px 34px' : '34px 28px 30px',
        direction: 'rtl',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
        border: featured ? `1.5px solid ${OLIVE_ACCENT}` : '1px solid #E6E0D4',
        boxShadow: baseShadow,
        transform: featured ? 'translateY(-8px)' : 'none',
        zIndex: featured ? 2 : 1,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = featured ? 'translateY(-14px)' : 'translateY(-6px)';
        el.style.boxShadow = hoverShadow;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = featured ? 'translateY(-8px)' : 'none';
        el.style.boxShadow = baseShadow;
      }}
    >
      {featured && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: OLIVE_ACCENT,
            color: '#F7F4EE',
            fontFamily: "'Tajawal', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            padding: '6px 18px',
            borderRadius: '999px',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            boxShadow: '0 6px 16px rgba(61,71,46,0.24)',
          }}
        >
          الأكثر طلبًا
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <BrandLogo width={104} />
      </div>

      <h3
        style={{
          fontFamily: "'Noto Serif Arabic', serif",
          fontSize: '23px',
          fontWeight: 600,
          color: OLIVE,
          margin: '0 0 6px',
          lineHeight: 1.3,
          textAlign: 'center',
        }}
      >
        {pkg.name}
      </h3>
      {pkg.duration && (
        <p
          style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            color: OLIVE_ACCENT,
            margin: '0 0 22px',
            textAlign: 'center',
          }}
        >
          {pkg.duration}
        </p>
      )}

      <div style={{ height: '1px', backgroundColor: '#EAE4D8', margin: '0 0 22px' }} />

      {pkg.benefits.length > 0 && (
        <ul style={{ margin: '0 0 28px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '13px' }}>
          {pkg.benefits.map((b) => (
            <li
              key={b}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontFamily: "'Tajawal', sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#3A3E30',
              }}
            >
              <CheckIcon />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 'auto', textAlign: 'center', marginBottom: '22px' }}>
        {pkg.salePrice !== null && (
          <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '11.5px', color: '#9A9484', marginBottom: '6px', textDecoration: 'line-through' }}>
            {format(pkg.price)}
          </div>
        )}
        <div
          style={{
            fontFamily: "'Noto Serif Arabic', serif",
            fontSize: '38px',
            fontWeight: 700,
            color: OLIVE,
            lineHeight: 1,
          }}
        >
          {format(pkg.salePrice ?? pkg.price)}
        </div>
      </div>

      <button
        disabled={!pkg.available}
        onClick={() => void addToCart(pkg.id)}
        style={{
          padding: '14px 0',
          backgroundColor: featured ? OLIVE : 'transparent',
          color: featured ? '#F7F4EE' : OLIVE,
          fontFamily: "'Tajawal', sans-serif",
          fontSize: '14.5px',
          fontWeight: 600,
          border: `1.5px solid ${OLIVE}`,
          borderRadius: '10px',
          cursor: pkg.available ? 'pointer' : 'not-allowed',
          width: '100%',
          opacity: pkg.available ? 1 : 0.45,
          transition: 'background-color 0.25s ease, color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          if (!pkg.available) return;
          const el = e.currentTarget as HTMLButtonElement;
          el.style.backgroundColor = OLIVE;
          el.style.color = '#F7F4EE';
          el.style.transform = 'translateY(-2px)';
          el.style.boxShadow = '0 10px 24px rgba(61,71,46,0.28)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.backgroundColor = featured ? OLIVE : 'transparent';
          el.style.color = featured ? '#F7F4EE' : OLIVE;
          el.style.transform = 'translateY(0)';
          el.style.boxShadow = 'none';
        }}
      >
        {pkg.available ? 'اختر الباقة' : 'نفذت الكمية'}
      </button>

      <Link
        to={`/packages/${pkg.id}`}
        style={{
          marginTop: '12px',
          background: 'none',
          border: 'none',
          color: '#9A9484',
          fontFamily: "'Tajawal', sans-serif",
          fontSize: '12.5px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'color 0.2s ease',
          textDecoration: 'none',
          display: 'inline-block',
          alignSelf: 'center',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = OLIVE)}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#9A9484')}
      >
        تفاصيل الباقة ←
      </Link>
    </div>
  );
}

interface DtHomeContentProps {
  heroCfg?: Record<string, unknown>;
  packagesCfg?: Record<string, unknown>;
  packages: PackageView[];
  productsCount: number;
}

export function DtHomeContent({ heroCfg, packagesCfg, packages, productsCount }: DtHomeContentProps) {
  const packagesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const ctx = getTwilightContext();
  const locale = ctx.locale;
  const { asset } = useAsset();

  const heroBadge = resolveText(heroCfg?.badge, locale) ?? 'خطط غذائية مخصصة ٠١٠٠٪';
  const heroTitle = resolveText(heroCfg?.title, locale) ?? 'تغذية مصممة\nلحياتك';
  const heroSubtitle =
    resolveText(heroCfg?.subtitle, locale) ??
    'خطط غذائية مدروسة تساعدك على بناء أسلوب حياة أكثر توازنًا، بطريقة تناسب احتياجاتك وروتينك اليومي.';
  const heroImage =
    typeof heroCfg?.image === 'string' && heroCfg.image ? heroCfg.image : (packages[0]?.image ?? null);
  const packagesTitle = resolveText(packagesCfg?.title, locale) ?? `${toArabicDigits(packages.length)} باقات، وخطة تناسبك`;
  const packagesSubtitle =
    resolveText(packagesCfg?.subtitle, locale) ??
    'اختر المدة التي تناسب أهدافك، وابدأ رحلتك مع خطة تغذية علاجية مصممة خصيصًا لك.';

  const titleLines = heroTitle.split('\n');
  const titleMain = titleLines[0];
  const titleAccent = titleLines.slice(1).join(' ').trim();

  useEffect(() => {
    if (location.hash === '#packages' && packagesRef.current) {
      setTimeout(() => packagesRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goToPackages = () => navigate({ to: '/', hash: 'packages' });

  return (
    <div style={{ direction: 'rtl' }}>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: 'calc(100vh - 68px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 40px',
          alignItems: 'center',
          gap: '48px',
        }}
        className="hero-grid"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #D4CFCA',
              borderRadius: '20px',
              padding: '6px 16px',
              width: 'fit-content',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#5A6340', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12.5px', fontWeight: 400, color: '#8A8580', letterSpacing: '0.04em' }}>
              {heroBadge}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Noto Serif Arabic', serif",
              fontSize: 'clamp(38px, 5vw, 64px)',
              fontWeight: 500,
              color: '#1A1917',
              margin: 0,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
            }}
          >
            {titleMain}
            {titleAccent && (
              <>
                <br />
                <span style={{ color: '#5A6340' }}>{titleAccent}</span>
              </>
            )}
          </h1>

          <p
            style={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: '17px',
              fontWeight: 400,
              color: '#8A8580',
              margin: 0,
              lineHeight: 1.8,
              maxWidth: '420px',
            }}
          >
            {heroSubtitle}
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={goToPackages}
              style={{
                padding: '14px 32px',
                backgroundColor: '#1A1917',
                color: '#F7F4EE',
                fontFamily: "'Tajawal', sans-serif",
                fontSize: '15px',
                fontWeight: 500,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2E2C29'}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1A1917'}
            >
              اختر باقتك
            </button>
            <Link
              to="/about"
              style={{
                padding: '14px 32px',
                backgroundColor: 'transparent',
                color: '#1A1917',
                fontFamily: "'Tajawal', sans-serif",
                fontSize: '15px',
                fontWeight: 400,
                border: '1px solid #D4CFCA',
                borderRadius: '6px',
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'border-color 0.2s ease',
                textDecoration: 'none',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1A1917'}
              onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.borderColor = '#D4CFCA'}
            >
              اكتشف DT. SHAHAD
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '40px', paddingTop: '16px', borderTop: '1px solid #E8E3DC' }}>
            {[
              { num: toArabicDigits(packages.length), label: 'باقات متخصصة' },
              { num: toArabicDigits(productsCount), label: 'منتج في المتجر' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '22px', fontWeight: 600, color: '#1A1917' }}>{stat.num}</div>
                <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12px', fontWeight: 400, color: '#8A8580', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '4/5',
              backgroundColor: '#E4DFD5',
            }}
          >
            {heroImage ? (
              <img
                src={heroImage}
                alt="خطة غذائية متوازنة"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrandLogo width={140} style={{ opacity: 0.55 }} />
              </div>
            )}
          </div>
          <div
            className="hero-float"
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '-24px',
              backgroundColor: '#F7F4EE',
              border: '1px solid #D4CFCA',
              borderRadius: '8px',
              padding: '16px 20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              direction: 'rtl',
              minWidth: '180px',
              maxWidth: 'calc(100% - 24px)',
            }}
          >
            <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '11.5px', color: '#8A8580', marginBottom: '4px' }}>خطتك الغذائية جاهزة</div>
            <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '15px', fontWeight: 600, color: '#1A1917' }}>أسبوع ١ — يبدأ اليوم</div>
            <div style={{ marginTop: '10px', display: 'flex', gap: '6px' }}>
              {['وجبة الفطور', 'الغداء', 'العشاء'].map((m) => (
                <span
                  key={m}
                  style={{
                    fontSize: '10px',
                    fontFamily: "'Tajawal', sans-serif",
                    backgroundColor: '#EDE9E0',
                    color: '#5A6340',
                    padding: '3px 8px',
                    borderRadius: '10px',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
            }}
          >
            <BrandLogo width={88} variant="white" style={{ opacity: 0.82 }} />
          </div>
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────────── */}
      <section
        ref={packagesRef}
        id="packages"
        style={{
          backgroundColor: '#F0ECE4',
          padding: 'clamp(72px, 10vw, 112px) 0',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 40px)' }}>
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 64px' }}>
            <span
              style={{
                fontFamily: "'Tajawal', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#5A6340',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              الباقات
            </span>
            <h2
              style={{
                fontFamily: "'Noto Serif Arabic', serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 500,
                color: '#1A1917',
                margin: '0 0 16px',
                lineHeight: 1.3,
              }}
            >
              {packagesTitle}
            </h2>
            <p
              style={{
                fontFamily: "'Tajawal', sans-serif",
                fontSize: 'clamp(14px, 2vw, 16px)',
                fontWeight: 400,
                color: '#8A8580',
                margin: 0,
                lineHeight: 1.8,
              }}
            >
              {packagesSubtitle}
            </p>
          </div>

          <div className="packages-grid">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section style={{ padding: '88px 0', backgroundColor: '#F7F4EE' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', color: '#5A6340', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              كيف نعمل
            </span>
            <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 500, color: '#1A1917', margin: 0 }}>
              أربع خطوات نحو تغذية أفضل
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0',
              position: 'relative',
            }}
            className="steps-grid"
          >
            <div
              style={{
                position: 'absolute',
                top: '28px',
                right: '12.5%',
                left: '12.5%',
                height: '1px',
                backgroundColor: '#D4CFCA',
                zIndex: 0,
              }}
              className="steps-connector"
            />

            {[
              { num: '٠١', title: 'اختر الباقة', desc: 'تصفح باقاتنا واختر ما يناسب احتياجاتك وأهدافك الغذائية.', icon: '🎯' },
              { num: '٠٢', title: 'أكمل بياناتك', desc: 'أجب على أسئلة قصيرة عن صحتك، وزنك، وأهدافك الغذائية.', icon: '📋' },
              { num: '٠٣', title: 'جهّز خطتك', desc: 'يقوم فريقنا بإعداد خطتك الغذائية المخصصة خلال ٢٤ ساعة.', icon: '⚡' },
              { num: '٠٤', title: 'ابدأ رحلتك', desc: 'تلقّى خطتك وابدأ رحلتك مع دعم مستمر من الفريق.', icon: '🌱' },
            ].map((step, i) => (
              <div
                key={step.num}
                className="reveal"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  padding: '0 28px',
                  position: 'relative',
                  zIndex: 1,
                  borderRight: i > 0 ? '1px solid #E8E3DC' : 'none',
                  direction: 'rtl',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: i === 2 ? '#1A1917' : '#F7F4EE',
                    border: `1px solid ${i === 2 ? '#1A1917' : '#D4CFCA'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Noto Serif Arabic', serif",
                      fontSize: '14px',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      color: i === 2 ? '#F7F4EE' : '#8A8580',
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '17px', fontWeight: 600, color: '#1A1917', margin: '0 0 10px', lineHeight: 1.4 }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13.5px', fontWeight: 400, color: '#8A8580', margin: 0, lineHeight: 1.8, textAlign: 'right' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY DT. SHAHAD ───────────────────────────────────── */}
      <section style={{ backgroundColor: '#1A1917', padding: '88px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} id="why-grid">
            <div>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', color: '#5A6340', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                لماذا DT. SHAHAD
              </span>
              <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 500, color: '#F7F4EE', margin: '0 0 28px', lineHeight: 1.3 }}>
                تغذية مبنية على معطياتك، لا على قوالب جاهزة
              </h2>
              <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '15.5px', fontWeight: 400, color: 'rgba(247,244,238,0.55)', lineHeight: 1.9, margin: 0 }}>
                نؤمن بأن التغذية الصحيحة ليست وصفة واحدة للجميع. كل خطة نقدمها تُبنى بناءً على معلوماتك الشخصية وأهدافك الفعلية.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { title: 'خطط تناسبك', desc: 'مبنية على معلوماتك وأهدافك الفردية' },
                { title: 'سهلة التطبيق', desc: 'مناسبة لروتينك وحياتك اليومية' },
                { title: 'متابعة واضحة', desc: 'تقارير دورية وتعديلات مستمرة' },
                { title: 'دعم حقيقي', desc: 'فريق متخصص معك في كل خطوة' },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    padding: '24px 20px',
                    direction: 'rtl',
                    transition: 'background-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.07)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.04)'}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '2px',
                      backgroundColor: '#5A6340',
                      marginBottom: '16px',
                      borderRadius: '1px',
                    }}
                  />
                  <h4 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '16px', fontWeight: 600, color: '#F7F4EE', margin: '0 0 8px' }}>{item.title}</h4>
                  <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', fontWeight: 400, color: 'rgba(247,244,238,0.45)', margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAN MOCKUP ──────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F0ECE4', padding: '88px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'center',
            }}
            className="plan-grid"
          >
            <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 'min(340px, 85vw)', height: '480px', maxWidth: '100%' }}>
                {[4, 2].map((offset, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: offset,
                      right: offset,
                      bottom: -offset,
                      left: -offset,
                      borderRadius: '10px',
                      backgroundColor: i === 0 ? '#D4CFCA' : '#C0BBAF',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    }}
                  />
                ))}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '10px',
                    backgroundColor: '#F7F4EE',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <img
                    src={asset('images/plan-cover.jpg')}
                    alt="غلاف خطة التغذية"
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      borderBottom: '1px solid #D6D1C4',
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ padding: '20px 24px', flex: 1, direction: 'rtl', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '11px', color: '#8A8580', marginBottom: '4px', letterSpacing: '0.04em' }}>الأسبوع الأول</div>
                    <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '17px', fontWeight: 700, color: '#1A1917', marginBottom: '16px' }}>خطة الوجبات</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {['الفطور', 'الغداء', 'العشاء', 'الوجبات الخفيفة'].map((meal, i) => (
                        <div
                          key={meal}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: i !== 3 ? '1px dashed #E8E3DC' : 'none',
                            paddingBottom: i !== 3 ? '8px' : '0',
                          }}
                        >
                          <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#2E2C29', fontWeight: 600, width: '90px' }}>
                            {meal}
                          </span>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                            <div style={{ width: `${40 + i * 15}%`, height: '4px', borderRadius: '2px', backgroundColor: i === 1 ? '#5A6340' : '#E8E3DC' }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: 'auto',
                        padding: '12px 16px',
                        backgroundColor: '#F0ECE4',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12px', color: '#8A8580', fontWeight: 600 }}>المجموع اليومي</span>
                      <span style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '16px', fontWeight: 700, color: '#5A6340' }}>حسب هدفك</span>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '12px 24px',
                      borderTop: '1px solid #E8E3DC',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      direction: 'rtl',
                      backgroundColor: '#F7F4EE',
                    }}
                  >
                    <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '10.5px', color: '#8A8580' }}>صفحة ١ من ١٢</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[0, 1, 2, 3].map((d) => (
                        <div key={d} style={{ width: d === 0 ? '16px' : '4px', height: '4px', borderRadius: '2px', backgroundColor: d === 0 ? '#5A6340' : '#D4CFCA' }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal" style={{ direction: 'rtl' }}>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', color: '#5A6340', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                ماذا ستحصل
              </span>
              <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 500, color: '#1A1917', margin: '0 0 20px', lineHeight: 1.35 }}>
                خطة تغذية مفصّلة، جاهزة للتطبيق
              </h2>
              <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '15.5px', fontWeight: 400, color: '#8A8580', lineHeight: 1.9, margin: '0 0 32px' }}>
                كل خطة تشمل جداول وجبات يومية، قوائم مشتريات أسبوعية، وتوصيات غذائية مفصّلة تناسب أهدافك.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'جداول وجبات يومية تفصيلية',
                  'قوائم تسوق أسبوعية منظمة',
                  'خيارات بديلة لكل وجبة',
                  'تقارير شهرية لمتابعة تقدمك',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', direction: 'rtl' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#EDE9E0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4.5 7.5L8 3" stroke="#5A6340" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14.5px', fontWeight: 400, color: '#2E2C29' }}>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={goToPackages}
                style={{
                  marginTop: '36px',
                  padding: '14px 32px',
                  backgroundColor: '#5A6340',
                  color: '#F7F4EE',
                  fontFamily: "'Tajawal', sans-serif",
                  fontSize: '15px',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'}
                onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
              >
                ابدأ الآن
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#5A6340',
          padding: '72px 0',
          textAlign: 'center',
          direction: 'rtl',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 500, color: '#F7F4EE', margin: '0 0 16px', lineHeight: 1.35 }}>
            جاهز تبدأ رحلتك؟
          </h2>
          <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '16px', fontWeight: 400, color: 'rgba(247,244,238,0.7)', margin: '0 0 36px', lineHeight: 1.8 }}>
            اختر باقتك واحصل على خطتك الغذائية الشخصية خلال ٢٤ ساعة.
          </p>
          <button
            onClick={goToPackages}
            style={{
              padding: '16px 48px',
              backgroundColor: '#F7F4EE',
              color: '#1A1917',
              fontFamily: "'Tajawal', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
          >
            اختر باقتك الآن
          </button>
        </div>
      </section>
    </div>
  );
}

export default DtHomeContent;