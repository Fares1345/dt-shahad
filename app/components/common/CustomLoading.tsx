import { useEffect, useState } from 'react';
import { BrandLogo } from '../brand/BrandLogo';

interface CustomLoadingProps {
  onComplete?: () => void;
}

// ─── Phase system (ported verbatim from the Figma design) ────────────────────
// 0 → blank warm ground
// 1 → logo reveals (blur → sharp, rise + fade in)
// 2 → loading bar appears and fills
// 3 → exit curtain slides up
type Phase = 0 | 1 | 2 | 3;

const TIMING: Record<Phase, number> = {
  0: 0,
  1: 240,
  2: 1100,
  3: 2600,
};
const DONE_AT = 3300;

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`;

/**
 * DT. SHAHAD boot splash — the loading screen from the Figma design.
 * Full-screen warm cream overlay: logo blur-to-sharp reveal, minimalist
 * glowing olive loading bar, then a curtain-up exit.
 */
export function CustomLoading({ onComplete }: CustomLoadingProps) {
  const [phase, setPhase] = useState<Phase>(0);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) {
      setPhase(1);
      const t1 = setTimeout(() => setPhase(2), 400);
      const t2 = setTimeout(() => setPhase(3), 1100);
      const t3 = setTimeout(() => onComplete?.(), 1700);
      return () => [t1, t2, t3].forEach(clearTimeout);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    (Object.keys(TIMING) as unknown as Phase[]).forEach((p) => {
      if ((p as number) === 0) return;
      timers.push(setTimeout(() => setPhase(p), TIMING[p]));
    });
    timers.push(setTimeout(() => onComplete?.(), DONE_AT));
    return () => timers.forEach(clearTimeout);
  }, [onComplete, reduced]);

  const exiting = phase === 3;

  return (
    <div
      data-splash
      role="status"
      aria-label="Loading"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background:
          'radial-gradient(130% 100% at 50% 34%, #FBF9F4 0%, #F5F2EC 52%, #ECE7DB 100%)',
        overflow: 'hidden',
        direction: 'ltr',
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: exiting ? 'transform 0.74s cubic-bezier(0.76,0,0.24,1)' : 'none',
        willChange: 'transform',
      }}
    >
      {/* Fine grain texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: GRAIN,
          pointerEvents: 'none',
        }}
      />

      {/* Center composition */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(34px, 6vw, 52px)',
          pointerEvents: 'none',
        }}
      >
        {/* Logo — blur-to-sharp reveal in the natural olive palette */}
        <BrandLogo
          style={{
            width: 'clamp(230px, 42vw, 340px)',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(16px)',
            filter: phase >= 1 ? 'blur(0px)' : 'blur(10px)',
            transition: [
              'opacity 0.9s ease',
              'transform 0.95s cubic-bezier(0.16,1,0.3,1)',
              'filter 0.8s ease',
            ].join(', '),
            willChange: 'transform, opacity, filter',
          }}
        />

        {/* Minimalist loading bar with a glowing olive gradient */}
        <div
          style={{
            width: 'clamp(180px, 32vw, 260px)',
            opacity: phase >= 2 ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '3px',
              borderRadius: '999px',
              background: 'rgba(110,109,82,0.14)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: phase >= 2 ? '100%' : '0%',
                borderRadius: '999px',
                background:
                  'linear-gradient(90deg, rgba(124,138,99,0) 0%, #7C8A63 30%, #4F5C37 60%, #3D472E 100%)',
                boxShadow: '0 0 12px rgba(110,109,82,0.55)',
                transition: 'width 1.4s cubic-bezier(0.65,0,0.35,1)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Static warm-cream overlay for the engine's pre-ready slot (`skeleton` prop).
 * Shown only while the Salla SDK initializes (usually <1s); identical
 * background to the splash so the handoff is invisible and the default
 * white spinner is never seen.
 */
export function LoadingBridge() {
  return <div style={{ position: 'fixed', inset: 0, background: '#F5F2EC' }} />;
}