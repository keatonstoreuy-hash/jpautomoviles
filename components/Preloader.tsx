'use client';

import { useEffect, useState } from 'react';
import { LogoStacked } from './Logo';

export function Preloader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('jp-splash') === '1';
    } catch {}
    if (seen) return;

    setShow(true);
    document.documentElement.style.overflow = 'hidden';

    const t1 = setTimeout(() => setLeaving(true), 1500);
    const t2 = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = '';
      try { sessionStorage.setItem('jp-splash', '1'); } catch {}
    }, 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-ink transition-opacity duration-500 ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="relative animate-logo-in">
        <LogoStacked tone="light" />
        {/* barrido metálico */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute inset-y-0 -left-1/3 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </span>
      </div>
    </div>
  );
}
