import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, SyntheticEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { useMoney } from '@salla.sa/twilight-theme-engine/hooks/useMoney';
import type { PackageView } from '../../lib/store-data';

const FAQS = [
  { q: 'متى أحصل على خطتي الغذائية؟', a: 'بعد إكمال نموذج البيانات، يتم إعداد خطتك خلال ٢٤-٤٨ ساعة عمل وإرسالها إليك مباشرة.' },
  { q: 'هل يمكنني تعديل الخطة لاحقًا؟', a: 'نعم، حسب الباقة المختارة يمكنك تعديل خطتك شهريًا أو أسبوعيًا مع الفريق.' },
  { q: 'هل الخطة مناسبة لحالات صحية خاصة؟', a: 'نأخذ بعين الاعتبار الحالات الصحية الخاصة، ونوصي بمراجعة طبيبك للحالات الدقيقة.' },
  { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل Visa و Mada و STC Pay و Apple Pay. الدفع آمن عبر منصة سلة.' },
  { q: 'هل يمكنني الإلغاء في أي وقت؟', a: 'يمكنك إلغاء الاشتراك وفق سياسة الإلغاء المتاحة قبل إعداد الخطة.' },
];

interface SallaLike {
  product: {
    getPrice: (payload: FormData) => Promise<{ price: number; sale_price?: number }>;
  };
  form: {
    onSubmit: (action: string, event: SyntheticEvent) => void;
  };
}

function getSalla(): SallaLike | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { salla?: SallaLike }).salla;
}

export function PackageDetailContent({ product, related }: { product: PackageView; related: PackageView[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number>(product.salePrice ?? product.price);
  const formRef = useRef<HTMLFormElement>(null);
  const { format } = useMoney();

  const refreshPrice = useCallback(() => {
    const salla = getSalla();
    if (!salla || !formRef.current) return;
    void salla.product
      .getPrice(new FormData(formRef.current))
      .then((result) => setPrice(result.sale_price ?? result.price))
      .catch(() => {
        // Keep the last known price.
      });
  }, []);

  useEffect(() => {
    refreshPrice();
  }, [refreshPrice, quantity]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const salla = getSalla();
    if (!salla) return;
    // The Salla SDK validates required options, serializes the form
    // (id / quantity / options[..]) and adds the item to the real cart.
    salla.form.onSubmit('cart.addItem', event);
  };

  return (
    <div style={{ direction: 'rtl', backgroundColor: '#F7F4EE', minHeight: '80vh', overflowX: 'hidden' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '20px clamp(20px, 5vw, 40px) 0', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#8A8580', padding: 0, transition: 'color 0.2s', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#1A1917')} onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8580')}>الرئيسية</Link>
        <span style={{ color: '#D4CFCA', fontSize: '12px' }}>›</span>
        <Link to="/" hash="packages" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#8A8580', padding: 0, transition: 'color 0.2s', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#1A1917')} onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8580')}>الباقات</Link>
        <span style={{ color: '#D4CFCA', fontSize: '12px' }}>›</span>
        <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#1A1917' }}>{product.name}</span>
      </div>

      {/* Hero section */}
      <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '40px clamp(20px, 5vw, 40px) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'start' }} className="detail-grid">
          {/* Package mockup */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div
              style={{
                backgroundColor: '#F0EDE5',
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
                  <div key={i} style={{ position: 'absolute', top: `${i * 5.5}%`, left: 0, right: 0, height: '1px', backgroundColor: '#1A1917' }} />
                ))}
              </div>

              {product.duration && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      border: '1px solid rgba(26,25,23,0.15)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontFamily: "'Tajawal', sans-serif",
                      fontSize: '11px',
                      fontWeight: 500,
                      color: 'rgba(26,25,23,0.5)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {product.duration}
                  </div>
                  {product.recommended && (
                    <div
                      style={{
                        backgroundColor: '#5A6340',
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
              )}

              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '1px solid rgba(26,25,23,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <span style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '20px', fontWeight: 400, letterSpacing: '0.15em', color: '#1A1917' }}>DT</span>
                </div>
                <div
                  style={{
                    fontFamily: "'Noto Serif Arabic', serif",
                    fontSize: 'clamp(28px, 4vw, 36px)',
                    fontWeight: 600,
                    color: '#1A1917',
                    marginBottom: '8px',
                    lineHeight: 1.2,
                  }}
                >
                  {product.name}
                </div>
                {product.duration && (
                  <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '15px', fontWeight: 400, color: 'rgba(26,25,23,0.5)' }}>
                    {product.duration}
                  </div>
                )}
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  {product.salePrice !== null && (
                    <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '11px', color: 'rgba(26,25,23,0.35)', marginBottom: '4px', textDecoration: 'line-through' }}>
                      {format(product.price)}
                    </div>
                  )}
                  <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '32px', fontWeight: 600, color: '#1A1917', lineHeight: 1 }}>{format(product.salePrice ?? product.price)}</div>
                </div>
                <div style={{ width: '32px', height: '2px', backgroundColor: '#5A6340', borderRadius: '1px' }} />
              </div>

              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: '#5A6340' }} />
            </div>
          </div>

          {/* Info */}
          <div style={{ direction: 'rtl' }}>
            <h1 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 500, color: '#1A1917', margin: '0 0 12px', lineHeight: 1.3 }}>
              باقة {product.name}
            </h1>
            <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '16px', color: '#8A8580', lineHeight: 1.9, margin: '0 0 32px' }}>
              {product.description}
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
              <form ref={formRef} onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={product.id} />
                <input type="hidden" name="quantity" value={String(quantity)} />

                {product.options.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '20px' }}>
                    {product.options.map((group) => (
                      <div key={group.id}>
                        <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '10px' }}>
                          {group.name}
                          {group.required && <span style={{ color: '#C4AB6E' }}> *</span>}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {group.values.map((value) => (
                            <label
                              key={value.id}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                border: '1px solid #D4CFCA',
                                borderRadius: '20px',
                                padding: '7px 16px',
                                cursor: 'pointer',
                                fontFamily: "'Tajawal', sans-serif",
                                fontSize: '13px',
                                color: '#2E2C29',
                                backgroundColor: '#FBF9F3',
                                transition: 'border-color 0.2s ease',
                              }}
                            >
                              <input
                                type="radio"
                                name={`options[${group.id}]`}
                                value={value.id}
                                defaultChecked={value.is_selected === true}
                                onChange={refreshPrice}
                                style={{ accentColor: '#5A6340', margin: 0 }}
                              />
                              <span>{value.name}</span>
                              {typeof value.price === 'number' && value.price > 0 && (
                                <span style={{ color: '#5A6340', fontWeight: 600 }}>+{format(value.price)}</span>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#EDE9E0',
                    borderRadius: '8px',
                    padding: '6px',
                    marginBottom: '14px',
                  }}
                >
                  <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#8A8580', padding: '0 10px' }}>الكمية</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#5A6340',
                        fontSize: '17px',
                        lineHeight: 1,
                        padding: '4px 6px',
                        fontFamily: "'Tajawal', sans-serif",
                      }}
                      aria-label="زيادة الكمية"
                    >
                      +
                    </button>
                    <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1917', minWidth: '20px', textAlign: 'center' }}>
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#5A6340',
                        fontSize: '17px',
                        lineHeight: 1,
                        padding: '4px 6px',
                        fontFamily: "'Tajawal', sans-serif",
                      }}
                      aria-label="إنقاص الكمية"
                    >
                      −
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(28px, 4vw, 34px)', fontWeight: 600, color: '#1A1917', lineHeight: 1 }}>
                    {format(price)}
                  </div>
                  {product.duration && (
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
                      {product.duration}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!product.available}
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
                    cursor: product.available ? 'pointer' : 'not-allowed',
                    opacity: product.available ? 1 : 0.45,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => { if (product.available) (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = product.available ? '1' : '0.45'; }}
                >
                  {product.available ? 'أضف إلى السلة' : 'نفذت الكمية'}
                </button>
              </form>
            </div>

            {product.includes.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '18px', fontWeight: 600, color: '#1A1917', margin: '0 0 16px' }}>ماذا تشمل الباقة</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {product.includes.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#EDE9E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="#5A6340" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14.5px', color: '#2E2C29', fontWeight: 400 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.benefits.length > 0 && (
              <div>
                <h3 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '18px', fontWeight: 600, color: '#1A1917', margin: '0 0 16px' }}>المميزات</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '12px' }}>
                  {product.benefits.map((b) => (
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
            )}
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
      {related.length > 0 && (
        <div style={{ maxWidth: '1280px', width: '100%', margin: '64px auto 0', padding: '0 clamp(20px, 5vw, 40px) 88px' }}>
          <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: 'clamp(22px, 4vw, 24px)', fontWeight: 500, color: '#1A1917', margin: '0 0 28px' }}>باقات أخرى</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px' }} className="related-grid">
            {related.map((rp) => (
              <Link
                key={rp.id}
                to={`/packages/${rp.id}`}
                style={{
                  backgroundColor: '#F0EDE5',
                  borderRadius: '8px',
                  padding: '24px',
                  border: '1px solid #D4CFCA',
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
                <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '18px', fontWeight: 600, color: '#1A1917', marginBottom: '8px' }}>{rp.name}</div>
                <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#8A8580', marginBottom: '16px', lineHeight: 1.6 }}>{rp.description}</div>
                <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '20px', fontWeight: 600, color: '#5A6340' }}>{format(rp.salePrice ?? rp.price)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PackageDetailContent;