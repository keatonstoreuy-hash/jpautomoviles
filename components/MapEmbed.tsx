import { site } from '@/lib/site';

export function MapEmbed({ className = '' }: { className?: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
  return (
    <iframe
      src={src}
      title={`Ubicación de ${site.name} en ${site.city}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`h-full w-full border-0 ${className}`}
    />
  );
}
