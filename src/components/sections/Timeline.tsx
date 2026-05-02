'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TimelineProps {
  translations: any;
  images: any;
}

const EVENT_IMAGES = [
  '/site_images/event1.png',
  '/site_images/event2.png',
  '/site_images/event3.png',
];

function EventIcon({ index }: { index: number }) {
  const src = EVENT_IMAGES[index % EVENT_IMAGES.length];
  return (
    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#D4AF37]/50 bg-white shadow-md">
      <Image src={src} alt="Event" fill className="object-cover object-center" sizes="56px" />
    </div>
  );
}

export default function Timeline({ translations, images }: TimelineProps) {
  const events = translations.timeline.events || [];
  const timelineImages = images?.timeline || [];

  return (
    <section className="py-8 md:py-24 bg-[#FDFBF7] relative overflow-hidden" id="timeline">

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 opacity-[0.05] pointer-events-none">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 opacity-[0.05] pointer-events-none rotate-180">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center mb-20 z-20 relative"
        >
          <h2 className="font-sans text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#C63C7B] font-semibold text-center whitespace-nowrap drop-shadow-sm mb-4">
            {translations.timeline.title}
          </h2>
          <div className="w-full max-w-[320px] flex justify-center">
            <div className="relative w-[280px] h-[50px]">
              <Image src="/site_images/flute_feather.png" alt="Flute" fill className="object-contain" />
            </div>
          </div>
        </motion.div>

        {/* ── Desktop layout: side-alternating ── */}
        <div className="relative max-w-5xl mx-auto hidden md:block">
          {/* Vertical Line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, #D4AF37 15%, #D4AF37 85%, transparent)' }}
          />

          <div className="space-y-24">
            {events.map((event: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`relative flex flex-row items-center gap-8 lg:gap-16 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10 bg-[#FDFBF7] p-[3px] shadow-[0_0_12px_rgba(198,60,123,0.4)] border border-[#C63C7B]">
                  <div className="w-full h-full rounded-full bg-[#C63C7B]" />
                </div>

                {/* Card */}
                <div className="w-1/2">
                  <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(212,175,55,0.1)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)] border border-[#F0E6D2]/50 overflow-hidden group transition-all duration-500 hover:-translate-y-2">

                    {/* Text Block */}
                    <div className="p-8 sm:p-10 relative overflow-hidden">
                      <div className={`absolute -bottom-10 ${index % 2 === 0 ? '-right-10' : '-left-10'} w-40 h-40 opacity-[0.03] pointer-events-none`}>
                        <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
                      </div>
                      <div className={`relative z-10 flex flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-px w-8 bg-[#D4AF37]" />
                          <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#C63C7B]">
                            {event.date}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#C63C7B] drop-shadow-sm mb-4">{event.title}</h3>
                        {event.time && (
                          <p className="text-sm font-sans tracking-[0.15em] text-[#D4AF37] font-semibold uppercase mb-4">{event.time}</p>
                        )}
                        <p className="text-[#455A64] leading-loose text-sm sm:text-base italic max-w-md">
                          &ldquo;{event.description}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Event Image */}
                    {timelineImages[index] && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <Image
                          src={timelineImages[index]}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A364D]/30 via-transparent to-transparent opacity-80" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile layout: single column with center line ── */}
        <div className="relative max-w-lg mx-auto md:hidden">
          {/* Center vertical line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px z-0"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, #D4AF37 8%, #D4AF37 92%, transparent 100%)' }}
          />

          <div className="flex flex-col gap-0">
            {events.map((event: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                {/* ── Dot on the center line ── */}
                <div className="relative z-10 flex items-center justify-center w-6 h-6 my-4">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center p-[3px] bg-[#FDFBF7] border border-[#C63C7B]"
                    style={{
                      boxShadow: '0 0 14px rgba(198,60,123,0.4)',
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#C63C7B]" />
                  </div>
                </div>

                {/* ── Card ── */}
                <div className="w-full px-2 pb-2">
                  <div className="bg-white rounded-[1.5rem] shadow-[0_6px_24px_rgba(212,175,55,0.15)] border border-[#F0E6D2]/50 overflow-hidden group transition-all duration-500">

                    {/* Text Block */}
                    <div className="p-6 relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-[0.04] pointer-events-none">
                        <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
                      </div>
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-px w-6 bg-[#D4AF37]" />
                          <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#C63C7B]">
                            {event.date}
                          </span>
                          <div className="h-px w-6 bg-[#D4AF37]" />
                        </div>
                        <h3 className="text-2xl font-serif text-[#C63C7B] drop-shadow-sm mb-3">{event.title}</h3>
                        {event.time && (
                          <p className="text-xs font-sans tracking-[0.15em] text-[#D4AF37] font-semibold uppercase mb-3">{event.time}</p>
                        )}
                        <p className="text-[#455A64] leading-loose text-sm italic">
                          &ldquo;{event.description}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* ── Icon divider between text and photo (mobile only) ── */}
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-transparent via-[#F0E6D2]/40 to-transparent">
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 p-0.5"
                        style={{
                          background: 'linear-gradient(135deg, #FDFBF7, #F0E6D2)',
                          border: '1.5px solid rgba(212,175,55,0.5)',
                          boxShadow: '0 2px 8px rgba(212,175,55,0.2)',
                        }}
                      >
                        <EventIcon index={index} />
                      </div>
                      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
                    </div>

                    {/* Event Image */}
                    {timelineImages[index] && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <Image
                          src={timelineImages[index]}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A364D]/30 via-transparent to-transparent opacity-80" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom dot connector — not on last item */}
                {index < events.length - 1 && (
                  <div className="relative z-10 flex items-center justify-center w-4 h-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-60" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
