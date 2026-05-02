'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Petal {
  id: number;
  left: number;       // % across screen
  size: number;       // px
  duration: number;   // s to fall full screen
  delay: number;      // s initial delay
  opacity: number;
  xDrift: number;     // px horizontal drift
  rotation: number;   // initial rotation deg
  rotationEnd: number;// end rotation deg
  color: string;      // petal color
  shape: number;      // 0-2 shape variant
}

// ─── Petal palette matching the pink/lotus Krishna wedding theme ──────────────
const PETAL_COLORS = [
  'rgba(248,164,200,@)',   // soft pink
  'rgba(244,143,177,@)',   // medium pink
  'rgba(236,64,122,@)',    // deep pink
  'rgba(248,187,208,@)',   // light blush
  'rgba(198,60,123,@)',    // theme pink (#C63C7B)
  'rgba(255,200,220,@)',   // pale rose
  'rgba(212,175,55,@)',    // gold accent
  'rgba(240,230,210,@)',   // cream gold
];

function randomPetalColor(opacity: number) {
  const c = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  return c.replace('@', String(opacity.toFixed(2)));
}

// ─── Petal generators ────────────────────────────────────────────────────────
function makePetals(): Petal[] {
  return Array.from({ length: 25 }, (_, i) => {
    const size    = Math.random() * 12 + 8;      // 8–20px
    const opacity = Math.random() * 0.35 + 0.15;  // 0.15–0.50
    return {
      id:          i,
      left:        Math.random() * 105 - 2.5,
      size,
      duration:    Math.random() * 18 + 16,       // 16–34s slow drift
      delay:       Math.random() * 18,
      opacity,
      xDrift:      (Math.random() - 0.5) * 140,   // ±70px sway
      rotation:    Math.random() * 360,
      rotationEnd: Math.random() * 540 - 270,
      color:       randomPetalColor(opacity),
      shape:       Math.floor(Math.random() * 3),
    };
  });
}

// ─── SVG petal shapes — lotus/flower petals ──────────────────────────────────
// shape 0 = lotus petal, 1 = round rose petal, 2 = small flower
function PetalSVG({ size, color, shape }: { size: number; color: string; shape: number }) {
  const s = size;
  if (shape === 1) {
    // Round rose petal
    return (
      <svg width={s} height={s * 1.2} viewBox="0 0 20 24" fill="none">
        <path
          d="M10 2 Q18 8 16 18 Q12 24 10 24 Q8 24 4 18 Q2 8 10 2Z"
          fill={color}
          stroke={color.replace(/[\d.]+\)$/, '0.3)')}
          strokeWidth="0.4"
        />
        <path d="M10 4 Q10 14 10 22" stroke={color.replace(/[\d.]+\)$/, '0.2)')} strokeWidth="0.5" fill="none" />
      </svg>
    );
  }
  if (shape === 2) {
    // Small flower — 5 tiny petals
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="7" rx="4" ry="6" fill={color} />
        <ellipse cx="7" cy="14" rx="4" ry="6" fill={color} transform="rotate(-30 7 14)" />
        <ellipse cx="17" cy="14" rx="4" ry="6" fill={color} transform="rotate(30 17 14)" />
        <circle cx="12" cy="12" r="2.5" fill={color.replace(/[\d.]+\)$/, '0.6)')} />
      </svg>
    );
  }
  // Default: lotus petal — elongated with soft tip
  return (
    <svg width={s * 0.7} height={s} viewBox="0 0 14 20" fill="none">
      <path
        d="M7 1 C13 6, 13 14, 7 19 C1 14, 1 6, 7 1Z"
        fill={color}
        stroke={color.replace(/[\d.]+\)$/, '0.25)')}
        strokeWidth="0.4"
      />
      <path d="M7 3 Q7 10 7 17" stroke={color.replace(/[\d.]+\)$/, '0.15)')} strokeWidth="0.5" fill="none" />
    </svg>
  );
}

// ─── Single petal particle ───────────────────────────────────────────────────
function FallingPetal({ petal }: { petal: Petal }) {
  return (
    <motion.div
      key={petal.id}
      className="absolute pointer-events-none"
      style={{ left: `${petal.left}%`, top: 0 }}
      initial={{ y: '-8vh', x: 0, opacity: 0, rotate: petal.rotation }}
      animate={{
        y:       '108vh',
        x:       [0, petal.xDrift * 0.3, petal.xDrift * 0.7, petal.xDrift * 0.4, petal.xDrift],
        opacity: [0, petal.opacity, petal.opacity, petal.opacity * 0.8, 0],
        rotate:  [petal.rotation, petal.rotation + petal.rotationEnd * 0.5, petal.rotation + petal.rotationEnd],
      }}
      transition={{
        y:       { duration: petal.duration, repeat: Infinity, ease: 'linear',     delay: petal.delay },
        x:       { duration: petal.duration, repeat: Infinity, ease: 'easeInOut',  delay: petal.delay },
        opacity: { duration: petal.duration, repeat: Infinity, ease: 'easeInOut',  delay: petal.delay },
        rotate:  { duration: petal.duration, repeat: Infinity, ease: 'easeInOut',  delay: petal.delay },
      }}
    >
      <PetalSVG size={petal.size} color={petal.color} shape={petal.shape} />
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FallingLights() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(makePetals());
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      {petals.map(petal => <FallingPetal key={petal.id} petal={petal} />)}
    </div>
  );
}
