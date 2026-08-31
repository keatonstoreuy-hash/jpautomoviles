import Image from 'next/image';
import Link from 'next/link';

// Logo REAL de JP Automóviles (incluye el nombre). Versión oscura para fondos claros,
// versión plateada para fondos oscuros.
export function Logo({
  tone = 'dark',
  href = '/',
  size = 52,
  className = '',
}: {
  tone?: 'dark' | 'light';
  href?: string | null;
  size?: number;
  className?: string;
}) {
  const src = tone === 'light' ? '/logo-jp-silver.png' : '/logo-jp-dark.png';
  const img = (
    <Image
      src={src}
      alt="JP Automóviles"
      width={size}
      height={size}
      priority
      className={`h-auto w-auto ${className}`}
      style={{ height: size, width: size }}
    />
  );
  if (href === null) return img;
  return (
    <Link href={href} aria-label="JP Automóviles — Inicio" className="inline-flex items-center">
      {img}
    </Link>
  );
}

export function LogoStacked({
  tone = 'light',
  size = 160,
  className = '',
}: {
  tone?: 'dark' | 'light';
  size?: number;
  className?: string;
}) {
  const src = tone === 'light' ? '/logo-jp-silver.png' : '/logo-jp-dark.png';
  return (
    <Image
      src={src}
      alt="JP Automóviles"
      width={size}
      height={size}
      priority
      className={className}
      style={{ height: size, width: size }}
    />
  );
}
