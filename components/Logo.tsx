import Link from 'next/link';

/**
 * Monograma JP (estilo tubular redondeado, inspirado en el isotipo original).
 * Usa currentColor: negro sobre fondos claros, plateado/blanco sobre fondos oscuros.
 */
export function LogoMark({
  className = '',
  chrome = false,
}: {
  className?: string;
  chrome?: boolean;
}) {
  const stroke = chrome ? 'url(#jp-chrome)' : 'currentColor';
  return (
    <svg viewBox="0 0 132 100" className={className} role="img" aria-label="JP Automóviles" fill="none">
      {chrome && (
        <defs>
          <linearGradient id="jp-chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="42%" stopColor="#e7eaee" />
            <stop offset="55%" stopColor="#a9afb8" />
            <stop offset="100%" stopColor="#f2f4f6" />
          </linearGradient>
        </defs>
      )}
      {/* J */}
      <path
        d="M63 20 V54 a19 19 0 0 1 -38 0"
        stroke={stroke}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* P */}
      <path
        d="M74 82 V20 H92 a20 20 0 0 1 0 40 H74"
        stroke={stroke}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  tone = 'dark',
  href = '/',
  className = '',
  compact = false,
}: {
  tone?: 'dark' | 'light';
  href?: string | null;
  className?: string;
  compact?: boolean;
}) {
  const isLight = tone === 'light'; // fondo oscuro → logo claro
  const content = (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark
        className={`${compact ? 'h-8' : 'h-10'} w-auto ${isLight ? 'text-white' : 'text-ink'}`}
        chrome={isLight}
      />
      <span className="flex flex-col leading-none">
        <span className={`display text-[19px] leading-none ${isLight ? 'text-white' : 'text-ink'}`}>
          JP <span className={isLight ? 'text-silver-300' : 'text-red'}>Automóviles</span>
        </span>
        <span
          className={`mt-1 text-[9px] font-700 uppercase tracking-[0.34em] ${
            isLight ? 'text-white/50' : 'text-steel-400'
          }`}
        >
          Paysandú · Uruguay
        </span>
      </span>
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="JP Automóviles — Inicio" className="group inline-flex">
      {content}
    </Link>
  );
}

/** Versión apilada (isotipo + texto centrado) para preloader / hero. */
export function LogoStacked({
  tone = 'light',
  className = '',
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const isLight = tone === 'light';
  return (
    <span className={`inline-flex flex-col items-center ${className}`}>
      <LogoMark
        className={`h-16 w-auto sm:h-20 ${isLight ? 'text-white' : 'text-ink'}`}
        chrome={isLight}
      />
      <span className={`display mt-3 text-2xl ${isLight ? 'text-white' : 'text-ink'}`}>
        JP Automóviles
      </span>
      <span className="mt-2 flex items-center gap-3 text-[10px] font-700 uppercase tracking-[0.4em] text-silver-500">
        <span className="h-px w-6 bg-current opacity-50" />
        Automotora
        <span className="h-px w-6 bg-current opacity-50" />
      </span>
    </span>
  );
}
