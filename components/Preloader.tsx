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
      <div className="animate-logo-in">
        <LogoStacked tone="light" />
      </div>
    </div>
  );
}
