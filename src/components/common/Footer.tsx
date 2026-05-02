export default function Footer({ translations, metadata }: { translations: any, metadata: any }) {
  return (
    <footer className="py-12 bg-text-primary text-background-main/80 border-t border-primary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif text-[#D4AF37] mb-4 drop-shadow-sm">{metadata.coupleNames}</h2>
        <div className="w-24 h-[1px] bg-[#D4AF37]/30 mx-auto mb-8" />

        <p className="text-sm font-sans">
          {translations.footer.copyright.split(/(EventMacha\.com|Event Macha)/).map((part: string, i: number, arr: any[]) => (
            <span key={i}>
              {part === 'EventMacha.com' || part === 'Event Macha' ? (
                <a href="https://www.eventmacha.com/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline hover:text-white transition-colors">
                  {part}
                </a>
              ) : (
                part
              )}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
