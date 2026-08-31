import Image from 'next/image';
import Link from 'next/link';
import { currency, numberFmt } from '@/lib/site';
import { fuelLabels, transmissionLabels } from '@/lib/labels';
import type { Vehicle } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { IconCalendar, IconFuel, IconGauge, IconGear } from './icons';

export function VehicleCard({ v, priority = false }: { v: Vehicle; priority?: boolean }) {
  const sold = v.status === 'vendido';
  return (
    <Link
      href={`/vehiculos/${v.slug}`}
      className="group card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
        {v.images[0] ? (
          <Image
            src={v.images[0]}
            alt={`${v.brand} ${v.model} ${v.version ?? ''} ${v.year}`}
            fill
            sizes="(max-width:768px) 100vw, 25vw"
            priority={priority}
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              sold ? 'grayscale' : ''
            }`}
          />
        ) : (
          <div className="grid h-full place-items-center text-steel-400">Sin foto</div>
        )}
        <span className="absolute left-0 top-3 bg-ink px-2.5 py-1 text-xs font-800 uppercase tracking-wide text-white">
          {v.year}
        </span>
        <div className="absolute right-3 top-3">
          <StatusBadge status={v.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-800 uppercase tracking-[0.14em] text-steel-400">{v.brand}</p>
        <h3 className="mt-0.5 font-display text-lg font-700 leading-tight text-ink">
          {v.model} {v.version && <span className="font-600 text-steel-600">{v.version}</span>}
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[13px] text-steel-800">
          <span className="inline-flex items-center gap-1.5"><IconGauge className="h-4 w-4 text-steel-400" /> {numberFmt.format(v.km)} km</span>
          <span className="inline-flex items-center gap-1.5"><IconGear className="h-4 w-4 text-steel-400" /> {transmissionLabels[v.transmission]}</span>
          <span className="inline-flex items-center gap-1.5"><IconFuel className="h-4 w-4 text-steel-400" /> {fuelLabels[v.fuel]}</span>
          <span className="inline-flex items-center gap-1.5"><IconCalendar className="h-4 w-4 text-steel-400" /> {v.year}</span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-ink/[.08] pt-3.5">
          <div>
            <p className="text-[10px] font-700 uppercase tracking-wide text-steel-400">Precio</p>
            <p className="font-display text-xl font-800 text-ink">
              {sold ? 'Vendido' : currency.format(v.price)}
            </p>
          </div>
          <span className="text-xs font-800 uppercase tracking-wide text-red">
            Ver detalles →
          </span>
        </div>
      </div>
    </Link>
  );
}
