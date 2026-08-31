'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { VehicleCard } from './VehicleCard';
import { bodyLabels } from '@/lib/labels';
import type { BodyType, Vehicle } from '@/lib/types';
import { IconArrow } from './icons';

export function InventoryTabs({ vehicles }: { vehicles: Vehicle[] }) {
  const bodies = useMemo(() => {
    const set = new Set<BodyType>();
    vehicles.forEach((v) => set.add(v.body));
    return Array.from(set);
  }, [vehicles]);

  const [tab, setTab] = useState<'all' | BodyType>('all');
  const list = tab === 'all' ? vehicles : vehicles.filter((v) => v.body === tab);

  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 300;
    el.scrollBy({ left: dir * step * 1, behavior: 'smooth' });
  };

  // Auto-avance suave
  useEffect(() => {
    if (paused) return;
    const el = trackRef.current;
    if (!el) return;
    const id = setInterval(() => {
      const card = el.querySelector('[data-card]') as HTMLElement | null;
      const step = card ? card.offsetWidth + 24 : 300;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 3500);
    return () => clearInterval(id);
  }, [paused, list.length, tab]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[.08]">
        <div className="flex flex-wrap items-center gap-1">
          <TabBtn active={tab === 'all'} onClick={() => setTab('all')}>Todos</TabBtn>
          {bodies.map((b) => (
            <TabBtn key={b} active={tab === b} onClick={() => setTab(b)}>{bodyLabels[b]}</TabBtn>
          ))}
        </div>
        <div className="hidden gap-2 pb-2 sm:flex">
          <ArrowBtn onClick={() => scrollByCards(-1)} dir="left" />
          <ArrowBtn onClick={() => scrollByCards(1)} dir="right" />
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {list.map((v, i) => (
          <div
            key={v.id}
            data-card
            className="w-[78%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
          >
            <VehicleCard v={v} priority={i < 4} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`border-b-2 px-3 py-2 text-xs font-800 uppercase tracking-wide transition ${
        active ? 'border-gold text-ink' : 'border-transparent text-steel-400 hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

function ArrowBtn({ onClick, dir }: { onClick: () => void; dir: 'left' | 'right' }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'left' ? 'Anterior' : 'Siguiente'}
      className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink hover:bg-ink hover:text-white"
    >
      <IconArrow className={`h-4 w-4 ${dir === 'left' ? 'rotate-180' : ''}`} />
    </button>
  );
}
