'use client';

import { waLink } from '@/lib/site';
import { IconWhatsApp } from './icons';

export function WhatsAppFloat({ message }: { message?: string }) {
  return (
    <a
      href={waLink(message ?? 'Hola JP Automóviles, quería hacer una consulta.')}
      target="_blank"
      rel="noopener"
      aria-label="Escribir por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-[#25D366] p-3.5 text-white shadow-lift transition-all hover:pl-4 hover:pr-5"
    >
      <IconWhatsApp className="h-7 w-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-700 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[140px]">
        Consultá ahora
      </span>
    </a>
  );
}
