import { Link } from '@tanstack/react-router';
import { useCart } from './CartContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart } = useCart();

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    const num = parseFloat(item.pkg.price.replace(/[^\d.]/g, ''));
    return sum + (isNaN(num) ? 0 : num * item.quantity);
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(26,25,23,0.4)',
          zIndex: 200,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'min(420px, 100vw)',
          maxWidth: '100vw',
          backgroundColor: '#F7F4EE',
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 0 32px rgba(0,0,0,0.08)',
          direction: 'rtl',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid #E8E3DC',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '20px', fontWeight: 500, color: '#1A1917', margin: 0 }}>السلة</h2>
            <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', color: '#8A8580' }}>
              {items.length === 0 ? 'لا توجد عناصر' : `${items.length} ${items.length === 1 ? 'عنصر' : 'عناصر'}`}
            </span>
          </div>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: '1px solid #D4CFCA',
              borderRadius: '6px',
              cursor: 'pointer',
              padding: '8px 12px',
              color: '#8A8580',
              fontFamily: "'Tajawal', sans-serif",
              fontSize: '13px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#1A1917'; (e.currentTarget as HTMLButtonElement).style.color = '#1A1917'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4CFCA'; (e.currentTarget as HTMLButtonElement).style.color = '#8A8580'; }}
          >
            إغلاق
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 28px', direction: 'rtl' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.3 }}>🛍</div>
              <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '15px', color: '#8A8580', margin: '0 0 24px', lineHeight: 1.7 }}>
                سلتك فارغة. تصفح باقاتنا واختر ما يناسبك.
              </p>
              <Link
                to="/"
                hash="packages"
                onClick={closeCart}
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  backgroundColor: '#1A1917',
                  color: '#F7F4EE',
                  fontFamily: "'Tajawal', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                تصفح الباقات
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const isDark = item.pkg.id === 'tahawwul' || item.pkg.id === 'nakhba';
              return (
                <div
                  key={item.pkg.id}
                  style={{
                    margin: '8px 20px',
                    backgroundColor: item.pkg.color,
                    borderRadius: '10px',
                    padding: '18px 20px',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#D4CFCA'}`,
                    direction: 'rtl',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '17px', fontWeight: 600, color: isDark ? '#F7F4EE' : '#1A1917', marginBottom: '4px' }}>
                        {item.pkg.nameAr}
                      </div>
                      <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12.5px', color: isDark ? 'rgba(247,244,238,0.5)' : '#8A8580' }}>
                        {item.pkg.duration}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.pkg.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isDark ? 'rgba(247,244,238,0.3)' : '#C0BBAF',
                        fontSize: '18px',
                        lineHeight: 1,
                        padding: '0 4px',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = isDark ? '#F7F4EE' : '#1A1917'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = isDark ? 'rgba(247,244,238,0.3)' : '#C0BBAF'}
                      aria-label="إزالة"
                    >
                      ×
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '20px', fontWeight: 600, color: isDark ? '#F7F4EE' : '#1A1917' }}>
                      {item.pkg.price}
                    </div>
                    <div
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontFamily: "'Tajawal', sans-serif",
                        fontSize: '12px',
                        color: isDark ? 'rgba(247,244,238,0.5)' : '#8A8580',
                      }}
                    >
                      الكمية: {item.quantity}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Summary + Checkout */}
        {items.length > 0 && (
          <div style={{ padding: '20px 28px', borderTop: '1px solid #E8E3DC', backgroundColor: '#F7F4EE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#8A8580' }}>المجموع الجزئي</span>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#1A1917' }}>{total.toLocaleString()} ر.س</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #E8E3DC', marginBottom: '16px' }}>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#8A8580' }}>ضريبة القيمة المضافة (١٥٪)</span>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#1A1917' }}>{(total * 0.15).toLocaleString()} ر.س</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '17px', fontWeight: 600, color: '#1A1917' }}>الإجمالي</span>
              <span style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '20px', fontWeight: 600, color: '#1A1917' }}>{(total * 1.15).toLocaleString()} ر.س</span>
            </div>

            <Link
              to="/cart"
              onClick={closeCart}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                padding: '15px',
                backgroundColor: '#1A1917',
                color: '#F7F4EE',
                fontFamily: "'Tajawal', sans-serif",
                fontSize: '15px',
                fontWeight: 500,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '10px',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              إتمام الشراء
            </Link>
            <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12px', color: '#8A8580', textAlign: 'center', margin: 0, lineHeight: 1.6 }}>
              دفع آمن عبر Visa · Mada · STC Pay · Apple Pay
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;