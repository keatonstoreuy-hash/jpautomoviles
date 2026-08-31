'use client';

import { useMemo, useState } from 'react';
import { VehicleCard } from './VehicleCard';
import { bodyLabels } from '@/lib/labels';
import type { BodyType, Vehicle } from '@/lib/types';

export function InventoryTabs({ vehicles }: { vehicles: Vehicle[] }) {
  const bodies = useMemo(() => {
    const set = new Set<BodyType>();
    vehicles.forEach((v) => set.add(v.body));
    return Array.from(set);
  }, [vehicles]);

  const [tab, setTab] = useState<'all' | BodyType>('all');
  const list = tab === 'all' ? vehicles : vehicles.filter((v) => v.body === tab);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <TabBtn active={tab === 'all'} onClick={() => setTab('all')}>Todos</TabBtn>
        {bodies.map((b) => (
          <TabBtn key={b} active={tab === b} onClick={() => setTab(b)}>
            {bodyLabels[b]}
          </TabBtn>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.slice(0, 8).map((v, i) => (
          <VehicleCard key={v.id} v={v} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}

function TabBtn({
  active, onClick, children,
}: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-xs font-800 uppercase tracking-wide transition ${
        active ? 'bg-gold text-ink' : 'bg-paper-muted text-steel-600 hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}
