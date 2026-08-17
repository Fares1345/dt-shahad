import type { CSSProperties } from 'react';

interface Props {
  width?: number;
  height?: number;
  size?: number;
  variant?: 'default' | 'white';
  style?: CSSProperties;
  className?: string;
}

const INK = '#3D472E';
const SAGE = '#9CA982';
const SAGE_DEEP = '#7C8A63';

type Pt = { x: number; y: number };
const P0: Pt = { x: 330, y: 402 };
const P1: Pt = { x: 372, y: 356 };
const P2: Pt = { x: 430, y: 306 };
const P3: Pt = { x: 462, y: 236 };

const bez = (t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * u * P0.x + 3 * u * u * t * P1.x + 3 * u * t * t * P2.x + t * t * t * P3.x,
    y: u * u * u * P0.y + 3 * u * u * t * P1.y + 3 * u * t * t * P2.y + t * t * t * P3.y,
  };
};
const tangentDeg = (t: number): number => {
  const u = 1 - t;
  const dx = 3 * u * u * (P1.x - P0.x) + 6 * u * t * (P2.x - P1.x) + 3 * t * t * (P3.x - P2.x);
  const dy = 3 * u * u * (P1.y - P0.y) + 6 * u * t * (P2.y - P1.y) + 3 * t * t * (P3.y - P2.y);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

const leafPath = (len: number, w: number) =>
  `M0 0 C ${len * 0.34} ${-w} ${len * 0.74} ${-w} ${len} 0 C ${len * 0.74} ${w} ${len * 0.34} ${w} 0 0 Z`;

const LEAVES = [0.14, 0.3, 0.46, 0.62, 0.78].flatMap((t, i) => {
  const p = bez(t);
  const ang = tangentDeg(t);
  const len = 52 - i * 5;
  const w = len * 0.33;
  const deep = i < 2;
  return [
    { key: `${i}-a`, x: p.x, y: p.y, rot: ang - 52, len, w, deep },
    { key: `${i}-b`, x: p.x, y: p.y, rot: ang + 52, len, w, deep: false },
  ];
});
const TIP = bez(0.995);
const TIP_ANG = tangentDeg(1);

export function BrandLogo({ width, height, size, variant = 'default', style, className }: Props) {
  const sizeStyle: CSSProperties = height
    ? { height, width: 'auto' }
    : { width: width ?? size ?? 140, height: 'auto' };

  const variantStyle: CSSProperties =
    variant === 'white' ? { filter: 'brightness(0) invert(1)', opacity: 0.94 } : {};

  return (
    <svg
      viewBox="0 0 600 620"
      role="img"
      aria-label="DT. SHAHAD — Clinical Nutrition"
      className={className}
      style={{
        display: 'block',
        direction: 'ltr',
        flexShrink: 0,
        overflow: 'visible',
        ...sizeStyle,
        ...variantStyle,
        ...style,
      }}
    >
      <g>
        <path
          d={`M${P0.x} ${P0.y} C ${P1.x} ${P1.y} ${P2.x} ${P2.y} ${P3.x} ${P3.y}`}
          fill="none"
          stroke={SAGE_DEEP}
          strokeWidth={3.4}
          strokeLinecap="round"
        />
        {LEAVES.map((l) => (
          <path
            key={l.key}
            d={leafPath(l.len, l.w)}
            transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}
            fill={l.deep ? SAGE_DEEP : SAGE}
          />
        ))}
        <path
          d={leafPath(40, 13)}
          transform={`translate(${TIP.x} ${TIP.y}) rotate(${TIP_ANG})`}
          fill={SAGE}
        />
      </g>

      <text
        x="298"
        y="298"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={INK}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: '360px',
          fontStyle: 'italic',
        }}
      >
        S
      </text>

      <text
        x="300"
        y="470"
        textAnchor="middle"
        fill={INK}
        style={{
          fontFamily: "'Cinzel', serif",
          fontWeight: 600,
          fontSize: '82px',
          letterSpacing: '6px',
        }}
      >
        DT. SHAHAD
      </text>

      <line x1="58" y1="510" x2="108" y2="510" stroke={INK} strokeWidth={1.6} />
      <line x1="492" y1="510" x2="542" y2="510" stroke={INK} strokeWidth={1.6} />
      <text
        x="300"
        y="519"
        textAnchor="middle"
        fill={INK}
        style={{
          fontFamily: "'Cinzel', serif",
          fontWeight: 500,
          fontSize: '24px',
          letterSpacing: '4px',
        }}
      >
        CLINICAL NUTRITION
      </text>

      <text
        x="300"
        y="575"
        textAnchor="middle"
        direction="rtl"
        fill={INK}
        style={{
          fontFamily: "'Noto Serif Arabic', serif",
          fontWeight: 500,
          fontSize: '38px',
        }}
      >
        أخصائية تغذية علاجية
      </text>
    </svg>
  );
}

export default BrandLogo;