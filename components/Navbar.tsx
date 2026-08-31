'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { TopBar } from './TopBar';
import { IconMenu, IconWhatsApp, IconX } from './icons';
import { waLink } from '@/lib/site';

const links = [
  { href: '/catalogo', label: 'Comprar' },
  { href: '/financiacion', label: 'Financiar' },
  { href: '/permuta', label: 'Vendé tu auto' },
  { href: '/#contacto', label: 'Contacto' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      <TopBar />
      <header className="border-b border-ink/[.08] bg-white">
        <nav className="wrap flex h-[72px] items-center justify-between">
          <Logo tone="dark" />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-md px-3.5 py-2 text-sm font-700 uppercase tracking-wide text-steel-800 transition-colors hover:text-gold-deep"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/permuta" className="btn-gold !px-5 !py-2.5 text-xs">
              Cotizá tu auto
            </Link>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-md border border-ink/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="lg:hidden">
            <div className="wrap flex flex-col gap-1 border-t border-ink/[.07] bg-white pb-5 pt-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-700 uppercase tracking-wide text-ink hover:bg-ink/[.04]"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={waLink('Hola JP Automóviles, quería hacer una consulta.')}
                target="_blank"
                rel="noopener"
                className="btn-wa mt-2"
                onClick={() => setOpen(false)}
              >
                <IconWhatsApp className="h-5 w-5" /> Escribir por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
