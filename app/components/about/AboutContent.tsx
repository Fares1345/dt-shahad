import { Link } from '@tanstack/react-router';
import { useAsset } from '@salla.sa/twilight-theme-engine/hooks/useAsset';

const VALUES = [
  {
    num: '٠١',
    title: 'التخصيص أولًا',
    desc: 'كل خطة نقدمها تُبنى من الصفر بناءً على بياناتك — لا نستخدم قوالب جاهزة أو نصائح عامة.',
  },
  {
    num: '٠٢',
    title: 'المتابعة المستمرة',
    desc: 'التغذية رحلة لا وجهة. فريقنا معك في كل خطوة، ويعدّل خطتك بحسب تقدمك واحتياجاتك المتغيرة.',
  },
  {
    num: '٠٣',
    title: 'الواقعية والتطبيق',
    desc: 'لا نصمم خططًا للعرض فقط. كل خطة مصممة لتناسب روتينك الحقيقي وميزانيتك وتفضيلاتك الغذائية.',
  },
];

const STORY = [
  'أسسنا DT. SHAHAD لأننا عشنا تحديات التغذية الصحية بأنفسنا — التضارب المعلوماتي، والخطط العامة التي لا تناسب أحدًا، وصعوبة الاستمرار.',
  'أردنا تقديم خدمة تجمع بين الدقة العلمية والتطبيق العملي — خطة تغذية حقيقية، مصممة لك أنت، وليس لنموذج افتراضي.',
  'اليوم نخدم آلاف العملاء في المملكة العربية السعودية ونمتد تدريجيًا لخدمة المنطقة العربية — بنفس الالتزام والجودة.',
];

const TEAM = [
  { name: 'د. منى السالم', role: 'أخصائية تغذية علاجية', initial: 'م' },
  { name: 'أ. خالد العتيبي', role: 'مستشار التغذية الرياضية', initial: 'خ' },
  { name: 'د. نورة الرشيد', role: 'باحثة في علم الغذاء', initial: 'ن' },
  { name: 'أ. فيصل الدوسري', role: 'مدير تجربة العملاء', initial: 'ف' },
];

export function AboutContent() {
  const { asset } = useAsset();
  return (
    <div style={{ direction: 'rtl', backgroundColor: '#F7F4EE' }}>
      {/* Hero */}
      <section style={{ borderBottom: '1px solid #E8E3DC', padding: '72px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'center' }} className="about-hero-grid">
            <div>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', color: '#5A6340', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                من نحن
              </span>
              <h1 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 500, color: '#1A1917', margin: '0 0 24px', lineHeight: 1.25 }}>
                نؤمن بأن التغذية الجيدة تبدأ بالفهم
              </h1>
              <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '16px', color: '#8A8580', lineHeight: 1.9, margin: '0 0 32px' }}>
                DT. SHAHAD خدمة تغذية متخصصة تقدم خططًا غذائية شخصية مبنية على بيانات حقيقية وأهداف واقعية — لا وصفات جاهزة، ولا نصائح عامة.
              </p>
              <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '16px', color: '#8A8580', lineHeight: 1.9, margin: 0 }}>
                نعمل مع كل عميل بشكل فردي لفهم احتياجاته، وتقديم خطة يمكن تطبيقها فعليًا في حياته اليومية بدون تعقيد أو صعوبة.
              </p>
            </div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: '#E4DFD5' }}>
              <img
                src={asset('images/plan-cover.jpg')}
                alt="فريق DT. SHAHAD"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: '#F0ECE4', padding: '72px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
          <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500, color: '#1A1917', margin: '0 0 48px', textAlign: 'center' }}>
            ما يميّزنا
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }} className="values-grid">
            {VALUES.map((v) => (
              <div key={v.num} style={{ backgroundColor: '#F7F4EE', borderRadius: '10px', padding: '32px', border: '1px solid #E8E3DC' }}>
                <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '13px', fontWeight: 500, color: '#5A6340', letterSpacing: '0.1em', marginBottom: '16px' }}>{v.num}</div>
                <h3 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '19px', fontWeight: 600, color: '#1A1917', margin: '0 0 12px' }}>{v.title}</h3>
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14.5px', color: '#8A8580', lineHeight: 1.8, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '72px 0', backgroundColor: '#F7F4EE' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)', textAlign: 'right' }}>
          <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', color: '#5A6340', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            قصتنا
          </span>
          <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500, color: '#1A1917', margin: '0 0 28px', lineHeight: 1.35 }}>
            بدأت من تجربة شخصية
          </h2>
          {STORY.map((para, i) => (
            <p key={i} style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '16px', fontWeight: 400, color: '#2E2C29', lineHeight: 2, margin: '0 0 20px' }}>{para}</p>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ backgroundColor: '#1A1917', padding: '72px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
          <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500, color: '#F7F4EE', margin: '0 0 48px', textAlign: 'center' }}>
            فريقنا
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '24px' }} className="team-grid">
            {TEAM.map((member) => (
              <div key={member.name} style={{ textAlign: 'center', direction: 'rtl' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <span style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '22px', fontWeight: 500, color: 'rgba(247,244,238,0.6)' }}>{member.initial}</span>
                </div>
                <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '15px', fontWeight: 600, color: '#F7F4EE', marginBottom: '4px' }}>{member.name}</div>
                <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12.5px', color: 'rgba(247,244,238,0.4)' }}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '72px 0', textAlign: 'center', direction: 'rtl' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
          <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500, color: '#1A1917', margin: '0 0 16px' }}>
            ابدأ رحلتك معنا
          </h2>
          <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '15.5px', color: '#8A8580', margin: '0 0 32px', lineHeight: 1.8 }}>
            اختر باقتك واحصل على خطتك الغذائية الشخصية خلال ٢٤ ساعة.
          </p>
          <Link
            to="/"
            hash="packages"
            style={{
              display: 'inline-block',
              padding: '14px 40px',
              backgroundColor: '#1A1917',
              color: '#F7F4EE',
              fontFamily: "'Tajawal', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
            onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
          >
            تصفح الباقات
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutContent;