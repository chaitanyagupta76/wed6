export const BellSVG = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hanging chain */}
    <path d="M50 0 V30" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4" />
    
    {/* Bell top/cap */}
    <path d="M40 30 Q50 20 60 30" fill="#B8860B" />
    
    {/* Main Bell Body */}
    <path d="M40 30 C 20 50, 10 90, 15 110 L 85 110 C 90 90, 80 50, 60 30 Z" fill="url(#bellGrad)" stroke="#D4AF37" strokeWidth="1"/>
    
    {/* Bell bottom rim */}
    <path d="M10 110 Q 50 125 90 110 L 85 115 Q 50 130 15 115 Z" fill="#DAA520" />
    
    {/* Clapper (inner dangling part) */}
    <circle cx="50" cy="125" r="8" fill="#B8860B" />
    <circle cx="50" cy="125" r="4" fill="#FFD700" />
    
    {/* Decorative lines on bell */}
    <path d="M25 80 Q 50 90 75 80" stroke="#B8860B" strokeWidth="1.5" fill="none" />
    <path d="M30 60 Q 50 70 70 60" stroke="#B8860B" strokeWidth="1.5" fill="none" />

    <defs>
      <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#DAA520" />
        <stop offset="30%" stopColor="#FFF8DC" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="80%" stopColor="#B8860B" />
        <stop offset="100%" stopColor="#8B6508" />
      </linearGradient>
    </defs>
  </svg>
);

export const FluteSVG = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 300 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main Flute Body */}
    <rect x="20" y="25" width="260" height="10" rx="5" fill="url(#fluteGrad)" />
    
    {/* Flute ends */}
    <rect x="15" y="23" width="10" height="14" rx="2" fill="#8B6508" />
    <rect x="275" y="23" width="10" height="14" rx="2" fill="#8B6508" />
    
    {/* Flute holes */}
    <circle cx="80" cy="30" r="3" fill="#3E2723" />
    <circle cx="110" cy="30" r="3" fill="#3E2723" />
    <circle cx="140" cy="30" r="3" fill="#3E2723" />
    <circle cx="170" cy="30" r="3" fill="#3E2723" />
    <circle cx="200" cy="30" r="3" fill="#3E2723" />
    <circle cx="230" cy="30" r="3" fill="#3E2723" />
    
    {/* Decorative threads */}
    <path d="M40 25 L50 35 M45 25 L55 35 M50 25 L60 35" stroke="#FFD700" strokeWidth="1.5" />
    
    {/* Hanging tassels */}
    <path d="M45 35 V45 M50 35 V48 M55 35 V45" stroke="#D4AF37" strokeWidth="1" />
    <circle cx="50" cy="50" r="2" fill="#DAA520" />
    
    {/* Peacock Feather attached to flute */}
    <path d="M 230 25 Q 260 0 290 15 Q 270 20 250 25 Z" fill="url(#featherGrad)" opacity="0.9" />
    <circle cx="270" cy="12" r="4" fill="#000080" />
    <circle cx="270" cy="12" r="2" fill="#00CED1" />

    <defs>
      <linearGradient id="fluteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#DAA520" />
        <stop offset="50%" stopColor="#FFF8DC" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <linearGradient id="featherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2E8B57" />
        <stop offset="50%" stopColor="#3CB371" />
        <stop offset="100%" stopColor="#006400" />
      </linearGradient>
    </defs>
  </svg>
);

export const LotusSVG = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Leaves */}
    <path d="M10 60 Q 50 90 90 60 Q 50 70 10 60 Z" fill="#8FBC8F" />
    
    {/* Back Petals */}
    <path d="M50 80 Q 20 40 40 20 Q 50 50 50 80 Z" fill="#FFB6C1" />
    <path d="M50 80 Q 80 40 60 20 Q 50 50 50 80 Z" fill="#FFB6C1" />
    
    {/* Mid Petals */}
    <path d="M50 85 Q 10 50 30 25 Q 50 60 50 85 Z" fill="#FF69B4" />
    <path d="M50 85 Q 90 50 70 25 Q 50 60 50 85 Z" fill="#FF69B4" />
    
    {/* Front Center Petal */}
    <path d="M50 90 Q 35 40 50 15 Q 65 40 50 90 Z" fill="#FF1493" />
    <path d="M50 90 Q 40 50 50 25 Q 60 50 50 90 Z" fill="#DB7093" />
  </svg>
);

export const PeacockFeatherSVG = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <path d="M50 190 Q 55 100 50 10" stroke="#F5DEB3" strokeWidth="2" fill="none" />
    
    {/* Hairs/Fronds */}
    <path d="M50 150 Q 20 120 10 80 Q 50 100 50 130" fill="#3CB371" opacity="0.7"/>
    <path d="M50 150 Q 80 120 90 80 Q 50 100 50 130" fill="#3CB371" opacity="0.7"/>
    
    <path d="M50 130 Q 15 90 15 50 Q 50 80 50 110" fill="#2E8B57" opacity="0.8"/>
    <path d="M50 130 Q 85 90 85 50 Q 50 80 50 110" fill="#2E8B57" opacity="0.8"/>
    
    {/* Eye of feather */}
    <path d="M50 90 Q 25 50 50 20 Q 75 50 50 90 Z" fill="#DAA520" />
    <path d="M50 80 Q 35 50 50 30 Q 65 50 50 80 Z" fill="#00CED1" />
    <path d="M50 70 Q 40 50 50 40 Q 60 50 50 70 Z" fill="#000080" />
  </svg>
);
