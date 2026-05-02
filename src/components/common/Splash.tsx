'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SplashProps {
  translations: any;
  onFinish?: () => void;
}

/* ── Falling Petal (same style as Hero) ─────────────────────────────── */
function SplashPetal({ delay, left, size, dur }: { delay: number; left: string; size: number; dur: number }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ y: '110vh', opacity: [0, 0.8, 0.6, 0], rotate: [0, 90, 180, 360] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
      className="absolute pointer-events-none"
      style={{ left, top: '-10px' }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <ellipse cx="10" cy="10" rx="6" ry="10" fill="#F8A4C8" opacity="0.6" />
        <ellipse cx="10" cy="10" rx="4" ry="8" fill="#F48FB1" opacity="0.4" />
      </svg>
    </motion.div>
  );
}

/* ── Golden sparkle dot ─────────────────────────────────────────────── */
function GoldSparkle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x, top: y, width: size, height: size,
        background: 'radial-gradient(circle, rgba(212,175,55,0.9), transparent 70%)',
        boxShadow: '0 0 8px 2px rgba(212,175,55,0.4)',
      }}
      animate={{ opacity: [0, 1, 0.5, 1, 0], scale: [0, 1.2, 0.8, 1.1, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

const PETALS = Array.from({ length: 10 }, (_, i) => ({
  id: i, left: `${8 + (i * 9.2) % 84}%`, delay: i * 0.7, size: 10 + (i % 3) * 4, dur: 6 + (i % 4) * 1.5,
}));

const SPARKLES = [
  { x: '10%', y: '15%', size: 4, delay: 0 },
  { x: '88%', y: '22%', size: 3, delay: 0.6 },
  { x: '20%', y: '72%', size: 5, delay: 1.2 },
  { x: '75%', y: '60%', size: 3, delay: 0.3 },
  { x: '50%', y: '10%', size: 4, delay: 1.8 },
  { x: '60%', y: '82%', size: 3, delay: 0.9 },
  { x: '30%', y: '45%', size: 3, delay: 2.1 },
  { x: '82%', y: '42%', size: 4, delay: 1.5 },
];

export default function Splash({ translations, onFinish }: SplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('splashDone'));
      if (onFinish) {
        setTimeout(onFinish, 1000);
      }
    }, 3500);

    return () => { clearTimeout(timer); document.body.style.overflow = ''; };
  }, [onFinish]);

  const groomName = translations.brideGroom?.groom;
  const brideName = translations.brideGroom?.bride;

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* ── Background — soft pink/cream/gold theme ── */}
          <div className="absolute inset-0 z-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 20%, rgba(248,187,208,0.35) 0%, transparent 55%),
                radial-gradient(ellipse at 20% 75%, rgba(244,143,177,0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 75%, rgba(244,143,177,0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 60%),
                linear-gradient(180deg, #FFF5F5 0%, #FEFAF0 30%, #FFF0F3 55%, #FEFAF0 80%, #FFF5F5 100%)
              `
            }}
          />

          {/* ── Lotus bg overlay ── */}
          <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
            <Image src="/site_images/lotus_bg.png" alt="" fill className="object-cover" priority />
          </div>

          {/* ── Soft vignette ── */}
          <div className="absolute inset-0 z-[2] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(255,240,243,0.6) 100%)' }}
          />

          {/* ── Falling petals ── */}
          <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
            {PETALS.map(p => <SplashPetal key={p.id} left={p.left} delay={p.delay} size={p.size} dur={p.dur} />)}
          </div>

          {/* ── Gold sparkles ── */}
          <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
            {SPARKLES.map((s, i) => <GoldSparkle key={i} x={s.x} y={s.y} size={s.size} delay={s.delay} />)}
          </div>

          {/* ── Corner lotus decorations ── */}
          <motion.div
            animate={{ rotate: [-3, 3, -3], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-4 left-2 w-[100px] h-[100px] z-[6] pointer-events-none opacity-60"
          >
            <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
          </motion.div>
          <motion.div
            animate={{ rotate: [3, -3, 3], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-4 right-2 w-[100px] h-[100px] z-[6] pointer-events-none opacity-60"
            style={{ transform: 'scaleX(-1)' }}
          >
            <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-4 left-2 w-[90px] h-[90px] z-[6] pointer-events-none opacity-50"
            style={{ transform: 'rotate(180deg)' }}
          >
            <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-4 right-2 w-[90px] h-[90px] z-[6] pointer-events-none opacity-50"
            style={{ transform: 'rotate(180deg) scaleX(-1)' }}
          >
            <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
          </motion.div>

          {/* ── Content ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative z-20 text-center px-6 flex flex-col items-center"
          >
            {/* Flute with feather at top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              className="relative w-[200px] h-[60px] md:w-[260px] md:h-[70px] mb-4"
            >
              <Image src="/site_images/flute_feather.png" alt="Flute" fill className="object-contain drop-shadow-lg" />
            </motion.div>

            {/* Gold decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
              className="flex items-center justify-center gap-2 mb-3 origin-center"
            >
              <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 0 L8 4 L4 8 L0 4Z" fill="#D4AF37" /></svg>
              <div className="h-px w-10 md:w-16" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
            </motion.div>

            {/* Welcome text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-[#C63C7B]/80 font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase leading-relaxed font-semibold mb-4"
            >
              {translations.common?.welcome || 'You are cordially invited'}
            </motion.p>

            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
              className="flex flex-col items-center gap-0"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="font-splash text-[3rem] sm:text-5xl md:text-6xl lg:text-7xl leading-none"
                style={{
                  color: '#C63C7B',
                  textShadow: '0 2px 12px rgba(198,60,123,0.25), 0 0 30px rgba(212,175,55,0.15)',
                }}
              >
                {groomName}
              </motion.span>

              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="font-serif italic text-2xl md:text-3xl text-[#D4AF37] my-1"
                style={{ textShadow: '0 0 15px rgba(212,175,55,0.4)' }}
              >
                &amp;
              </motion.span>

              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="font-splash text-[3rem] sm:text-5xl md:text-6xl lg:text-7xl leading-none"
                style={{
                  color: '#C63C7B',
                  textShadow: '0 2px 12px rgba(198,60,123,0.25), 0 0 30px rgba(212,175,55,0.15)',
                }}
              >
                {brideName}
              </motion.span>
            </motion.div>

            {/* Bottom gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.0, duration: 0.8, ease: 'easeOut' }}
              className="w-28 md:w-40 h-px mt-5 origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent, #D4AF37, #F0E6D2, #D4AF37, transparent)',
                boxShadow: '0 0 6px rgba(212,175,55,0.4)',
              }}
            />

            {/* Krishna Radha image below names */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] mt-4"
            >
              <Image src="/site_images/krishna_radha.png" alt="Krishna Radha" fill className="object-contain drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
