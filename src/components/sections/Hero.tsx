'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroProps {
  translations: any;
  images: any;
  metadata: any;
}

const SLIDE_INTERVAL = 5000;
const SLIDE_DURATION = 1.4;
const KB_DURATION = 6;

/* ──────────────────────────────────────────────────────────
   Falling Petal — a single pink petal that drifts downward
   ────────────────────────────────────────────────────────── */
function FallingPetal({ delay, left, size, duration }: { delay: number; left: string; size: number; duration: number }) {
  return (
    <motion.div
      initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
      animate={{ y: '105vh', x: [0, 15, -10, 20, 0], opacity: [0, 1, 1, 0.6, 0], rotate: [0, 45, 90, 180, 270] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      className="absolute pointer-events-none z-[5]"
      style={{ left, top: '-20px' }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <ellipse cx="10" cy="10" rx="6" ry="10" fill="#F8A4C8" opacity="0.7" />
        <ellipse cx="10" cy="10" rx="4" ry="8" fill="#F48FB1" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   Hanging Flower Vine — decorative pink flowers hanging from
   the top corners, with a small bell at the bottom
   ────────────────────────────────────────────────────────── */
function HangingVine({ side }: { side: 'left' | 'right' }) {
  const isRight = side === 'right';
  return (
    <motion.div
      animate={{ rotate: isRight ? [2, -2, 2] : [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute top-0 ${isRight ? 'right-0' : 'left-0'} z-20 origin-top pointer-events-none`}
      style={{ transform: isRight ? 'scaleX(-1)' : undefined }}
    >
      <svg width="90" height="200" viewBox="0 0 90 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main vine curve */}
        <path d="M45 0 C45 30, 30 50, 25 80 C20 110, 35 130, 40 160 L40 175" stroke="#8BC34A" strokeWidth="2" fill="none" opacity="0.6" />
        
        {/* Hanging flowers along the vine */}
        {/* Flower 1 */}
        <circle cx="30" cy="45" r="8" fill="#F8BBD0" />
        <circle cx="30" cy="45" r="5" fill="#F48FB1" />
        <circle cx="30" cy="45" r="2.5" fill="#EC407A" />
        
        {/* Flower 2 */}
        <circle cx="22" cy="80" r="7" fill="#F8BBD0" />
        <circle cx="22" cy="80" r="4.5" fill="#F48FB1" />
        <circle cx="22" cy="80" r="2" fill="#EC407A" />
        
        {/* Flower 3 */}
        <circle cx="28" cy="115" r="6" fill="#F8BBD0" />
        <circle cx="28" cy="115" r="3.5" fill="#F48FB1" />
        <circle cx="28" cy="115" r="1.5" fill="#EC407A" />
        
        {/* Flower 4 */}
        <circle cx="35" cy="145" r="5" fill="#F8BBD0" />
        <circle cx="35" cy="145" r="3" fill="#F48FB1" />
        <circle cx="35" cy="145" r="1.5" fill="#EC407A" />
        
        {/* Leaves */}
        <path d="M30 40 Q15 35 20 25" stroke="#66BB6A" strokeWidth="1.5" fill="none" />
        <path d="M22 75 Q8 72 12 60" stroke="#66BB6A" strokeWidth="1.5" fill="none" />
        <path d="M28 110 Q15 108 18 98" stroke="#66BB6A" strokeWidth="1.5" fill="none" />
        <path d="M35 140 Q22 138 25 128" stroke="#66BB6A" strokeWidth="1.5" fill="none" />
        
        {/* Small Bell at bottom */}
        <path d="M38 170 L42 170 L44 180 Q41 185 38 185 Q35 185 34 180 Z" fill="url(#bellMiniGrad)" />
        <circle cx="39" cy="188" r="2" fill="#D4AF37" />
        <line x1="40" y1="160" x2="40" y2="170" stroke="#D4AF37" strokeWidth="1.5" />
        
        <defs>
          <linearGradient id="bellMiniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#DAA520" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────
   Indian Arch Frame — Mughal-style pointed arch with pink &
   gold accents, matching the mockup
   ────────────────────────────────────────────────────────── */
function IndianArchFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full aspect-[3/4] max-w-[300px] md:max-w-[360px] mx-auto group">
      {/* Outer Glow */}
      <div className="absolute -inset-3 rounded-[8px] blur-2xl opacity-60 -z-10"
        style={{ background: 'radial-gradient(ellipse at center, rgba(244,143,177,0.3), rgba(212,175,55,0.15), transparent 70%)' }} />
      
      {/* Main frame with Mughal arch shape using clip-path */}
      <div className="relative w-full h-full" style={{ filter: 'drop-shadow(0 12px 40px rgba(180,130,50,0.35))' }}>
        {/* Gold outer border */}
        <div className="absolute inset-0 overflow-hidden" style={{
          clipPath: 'polygon(0% 25%, 5% 12%, 15% 4%, 30% 0.5%, 50% 0%, 70% 0.5%, 85% 4%, 95% 12%, 100% 25%, 100% 100%, 0% 100%)',
          background: 'linear-gradient(145deg, #F0C674 0%, #D4AF37 30%, #C6983C 50%, #D4AF37 70%, #E8D48B 100%)',
        }} />
        
        {/* Pink accent line */}
        <div className="absolute inset-[3px] overflow-hidden" style={{
          clipPath: 'polygon(0% 25%, 5% 12%, 15% 4%, 30% 0.5%, 50% 0%, 70% 0.5%, 85% 4%, 95% 12%, 100% 25%, 100% 100%, 0% 100%)',
          background: '#F8BBD0',
        }} />
        
        {/* Ivory separator */}
        <div className="absolute inset-[5px] overflow-hidden" style={{
          clipPath: 'polygon(0% 25%, 5% 12%, 15% 4%, 30% 0.5%, 50% 0%, 70% 0.5%, 85% 4%, 95% 12%, 100% 25%, 100% 100%, 0% 100%)',
          background: '#FDFBF7',
        }} />
        
        {/* Inner gold border */}
        <div className="absolute inset-[7px] overflow-hidden" style={{
          clipPath: 'polygon(0% 25%, 5% 12%, 15% 4%, 30% 0.5%, 50% 0%, 70% 0.5%, 85% 4%, 95% 12%, 100% 25%, 100% 100%, 0% 100%)',
          background: 'linear-gradient(145deg, #D4AF37 0%, #E8D48B 50%, #D4AF37 100%)',
        }} />
        
        {/* Photo area */}
        <div className="absolute inset-[9px] overflow-hidden" style={{
          clipPath: 'polygon(0% 25%, 5% 12%, 15% 4%, 30% 0.5%, 50% 0%, 70% 0.5%, 85% 4%, 95% 12%, 100% 25%, 100% 100%, 0% 100%)',
        }}>
          {children}
          
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
        
        {/* Top crown decoration — small gold ornament at apex */}
        <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 z-30">
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
            <path d="M12 0 L18 6 Q12 10 6 6 Z" fill="#D4AF37" />
            <circle cx="12" cy="5" r="2" fill="#FFD700" />
          </svg>
        </div>
      </div>

      {/* ── Lotus flowers at bottom of arch ── */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-10 -left-14 w-[130px] h-[130px] z-20 pointer-events-none"
      >
        <Image src="/site_images/flower.png" alt="Lotus" fill className="object-contain" sizes="130px" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: [2, -2, 2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute -bottom-10 -right-14 w-[130px] h-[130px] z-20 pointer-events-none"
      >
        <Image src="/site_images/flower.png" alt="Lotus" fill className="object-contain" style={{ transform: 'scaleX(-1)' }} sizes="130px" />
      </motion.div>
      
      {/* Additional smaller lotus at mid-left */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-1/2 -left-10 w-[80px] h-[80px] z-10 pointer-events-none"
      >
        <Image src="/site_images/flower2.png" alt="Lotus" fill className="object-contain" sizes="80px" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        className="absolute top-1/2 -right-10 w-[80px] h-[80px] z-10 pointer-events-none"
      >
        <Image src="/site_images/flower2.png" alt="Lotus" fill className="object-contain" style={{ transform: 'scaleX(-1)' }} sizes="80px" />
      </motion.div>

      {/* ── Peacock feathers behind the frame ── */}
      <motion.div 
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-8 -left-16 w-[120px] h-[280px] -z-[1] pointer-events-none origin-bottom opacity-80"
      >
        <Image src="/site_images/peacock_feather.png" alt="Peacock Feather" fill className="object-contain" sizes="120px" />
      </motion.div>
      <motion.div 
        animate={{ rotate: [3, -3, 3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -top-8 -right-16 w-[120px] h-[280px] -z-[1] pointer-events-none origin-bottom opacity-80"
        style={{ transform: 'scaleX(-1)' }}
      >
        <Image src="/site_images/peacock_feather.png" alt="Peacock Feather" fill className="object-contain" sizes="120px" />
      </motion.div>

    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Main Hero Component
   ────────────────────────────────────────────────────────── */
export default function Hero({ translations, images, metadata }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const slides = images.heroSlideshow || [];

  useEffect(() => {
    if (!slides.length) return;
    const t = setInterval(() => {
      setDirection(1);
      setCurrentSlide(p => (p + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [slides.length]);

  // Generate random petal positions
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 7) % 90}%`,
    delay: (i * 0.7) % 8,
    size: 10 + (i % 4) * 2.5,
    duration: 6 + (i % 3) * 2,
  }));

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center py-8">
      
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/site_images/lotus_bg.png"
          alt="Lotus Background"
          fill
          className="object-cover object-center opacity-40"
          priority
          sizes="100vw"
        />
        {/* Soft warm overlay */}
        <div className="absolute inset-0" 
          style={{ background: 'linear-gradient(180deg, #FFF5F5 0%, #FEFAF0 25%, #FFF8F0 50%, rgba(255,248,240,0.6) 75%, #E8F0FE 100%)' }} />
        {/* Bottom water-like fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[20%]"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(173,216,230,0.15), rgba(173,216,230,0.25))' }} />
      </div>

      {/* ── Falling Petals ── */}
      {petals.map(p => (
        <FallingPetal key={p.id} left={p.left} delay={p.delay} size={p.size} duration={p.duration} />
      ))}

      {/* ── Hanging flower vines from top corners ── */}
      <HangingVine side="left" />
      <HangingVine side="right" />



      {/* ── Content Container ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-12 mt-12 lg:mt-0 gap-10 lg:gap-8">
        
        {/* ── LEFT COLUMN (Text & Radha) ── */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          {/* ── Flute with Peacock Feather ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative mt-0 mb-1"
          >
            <div className="relative w-[220px] h-[50px] md:w-[280px] md:h-[60px] mx-auto">
              <Image src="/site_images/flute_feather.png" alt="Flute with Peacock Feather" fill className="object-contain" sizes="320px" />
            </div>
          </motion.div>

          {/* ── Gold decorative line ── */}
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 0 L8 4 L4 8 L0 4Z" fill="#D4AF37" /></svg>
            <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
          </div>

          {/* ── Text Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full flex flex-col items-center text-center px-4"
          >
            <p className="text-[#C63C7B] text-[11px] md:text-sm uppercase tracking-[0.25em] mb-2 font-semibold">
              {translations.hero?.subtitle || 'Two Hearts, One Journey'}
            </p>

            <div className="relative w-full mb-2 flex justify-center">
              <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/70 via-white/30 to-transparent blur-lg -z-10" />
              <h1 className="font-splash text-[#C63C7B] text-[2.8rem] sm:text-5xl md:text-7xl lg:text-7xl drop-shadow-md leading-[1.1] flex flex-row items-center justify-center whitespace-nowrap">
                <span>{translations.brideGroom?.groom || 'Naveen'}</span>
                <span className="text-[2rem] sm:text-4xl md:text-5xl text-[#C63C7B] italic font-serif mx-1.5 md:mx-3">&amp;</span>
                <span>{translations.brideGroom?.bride || 'Chandrika'}</span>
              </h1>
            </div>

            <div className="flex items-center justify-center gap-3 text-[#C63C7B]">
              <div className="h-px w-6 md:w-10" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
              <div className="text-center font-serif italic text-base md:text-xl font-medium">
                April 30th, 2026
              </div>
              <div className="h-px w-6 md:w-10" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
            </div>
          </motion.div>

          {/* ── Radha Krishna Image (Desktop only) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden lg:block relative w-[180px] h-[180px] mt-6 drop-shadow-lg"
          >
            <Image src="/site_images/krishna_radha.png" alt="Krishna Radha" fill className="object-contain" sizes="180px" />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN (Frame) ── */}
        <div className="flex-1 flex flex-col items-center justify-center w-full mt-6 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative w-full flex justify-center px-8 lg:px-0"
          >
            <IndianArchFrame>
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={currentSlide}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: direction > 0 ? '8%' : '-8%' }}
                  animate={{ opacity: 1, x: '0%' }}
                  exit={{ opacity: 0, x: direction > 0 ? '-8%' : '8%' }}
                  transition={{ duration: SLIDE_DURATION, ease: [0.4, 0, 0.2, 1] }}
                >
                  {slides[currentSlide] && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1.0 }}
                      transition={{ duration: KB_DURATION, ease: 'easeOut' }}
                    >
                      <Image
                        src={slides[currentSlide]}
                        alt="Couple"
                        fill
                        className="object-cover object-top"
                        priority={currentSlide === 0}
                        sizes="(max-width: 768px) 80vw, 400px"
                      />
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </IndianArchFrame>
            
            {/* ── Radha Krishna Image (Mobile only, attached to frame) ── */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="lg:hidden absolute -top-8 -right-4 w-[100px] h-[100px] z-30 pointer-events-none drop-shadow-lg"
            >
              <Image src="/site_images/krishna_radha.png" alt="Krishna Radha" fill className="object-contain" sizes="100px" />
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* ── Bottom Flute (diagonal, lying at bottom) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-20 mt-8 lg:mt-4 mb-2"
      >
        <div className="relative w-[300px] h-[60px] md:w-[360px] md:h-[70px] mx-auto" style={{ transform: 'rotate(-15deg)' }}>
          <Image src="/site_images/flute_feather.png" alt="Flute" fill className="object-contain" sizes="360px" />
        </div>
      </motion.div>



    </section>
  );
}
