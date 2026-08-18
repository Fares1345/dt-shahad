import { Link } from '@tanstack/react-router';
import { useMoney } from '@salla.sa/twilight-theme-engine/hooks/useMoney';
import { useCart } from './CartContext';

export function CartDrawer() {
  const { items, totals, isLoading, isOpen, closeCart, updateQuantity, removeItem, submitCart } =
    useCart();
  const { format } = useMoney();

  if (!isOpen) return null;

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
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  margin: '8px 20px',
                  backgroundColor: '#FBF9F3',
                  borderRadius: '10px',
                  padding: '16px 18px',
                  border: '1px solid #E6E0D4',
                  direction: 'rtl',
                }}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#EDE9E0',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <span style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '14px', fontWeight: 600, color: '#9A9484' }}>DT</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '16px', fontWeight: 600, color: '#1A1917', marginBottom: '4px' }}>
                        {item.name}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#C0BBAF',
                          fontSize: '18px',
                          lineHeight: 1,
                          padding: '0 4px',
                          transition: 'color 0.2s ease',
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = '#1A1917'}
                        onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = '#C0BBAF'}
                        aria-label="إزالة"
                      >
                        ×
                      </button>
                    </div>
                    <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '12.5px', color: '#8A8580', marginBottom: '10px' }}>
                      {format(item.price)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          backgroundColor: '#EDE9E0',
                          borderRadius: '20px',
                          padding: '4px 10px',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#5A6340',
                            fontSize: '16px',
                            lineHeight: 1,
                            padding: '2px 4px',
                            fontFamily: "'Tajawal', sans-serif",
                          }}
                          aria-label="زيادة الكمية"
                        >
                          +
                        </button>
                        <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '13px', fontWeight: 600, color: '#1A1917', minWidth: '14px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading || item.quantity <= 1}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#5A6340',
                            fontSize: '16px',
                            lineHeight: 1,
                            padding: '2px 4px',
                            fontFamily: "'Tajawal', sans-serif",
                          }}
                          aria-label="إنقاص الكمية"
                        >
                          −
                        </button>
                      </div>
                      <div style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '17px', fontWeight: 600, color: '#1A1917' }}>
                        {format(item.total)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary + Checkout */}
        {items.length > 0 && totals && (
          <div style={{ padding: '20px 28px', borderTop: '1px solid #E8E3DC', backgroundColor: '#F7F4EE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#8A8580' }}>المجموع الجزئي</span>
              <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#1A1917' }}>{format(totals.subTotal)}</span>
            </div>
            {totals.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#8A8580' }}>الخصم</span>
                <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#5A6340' }}>− {format(totals.discount)}</span>
              </div>
            )}
            {totals.taxAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #E8E3DC', marginBottom: '16px' }}>
                <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#8A8580' }}>ضريبة القيمة المضافة</span>
                <span style={{ fontFamily: "'Tajawal', sans-serif", fontSize: '14px', color: '#1A1917' }}>{format(totals.taxAmount)}</span>
              </div>
            )}
            {totals.discount <= 0 && totals.taxAmount <= 0 && (
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #E8E3DC', marginBottom: '16px' }} />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '17px', fontWeight: 600, color: '#1A1917' }}>الإجمالي</span>
              <span style={{ fontFamily: "'Noto Serif Arabic', serif", fontSize: '20px', fontWeight: 600, color: '#1A1917' }}>{format(totals.total)}</span>
            </div>

            <button
              onClick={() => void submitCart()}
              disabled={isLoading}
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
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
            >
              إتمام الشراء
            </button>
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