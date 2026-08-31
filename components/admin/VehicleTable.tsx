'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { currency, numberFmt } from '@/lib/site';
import { statusLabels } from '@/lib/labels';
import type { Vehicle } from '@/lib/types';

export function VehicleTable({ vehicles, editable }: { vehicles: Vehicle[]; editable: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const remove = async (v: Vehicle) => {
    if (!confirm(`¿Eliminar ${v.brand} ${v.model} ${v.year}? Esta acción no se puede deshacer.`)) return;
    setBusy(v.id);
    try {
      const res = await fetch(`/api/admin/vehicles?id=${encodeURIComponent(v.id)}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'No se pudo eliminar');
      router.refresh();
    } catch (e: any) {
      alert('No se pudo eliminar: ' + (e.message ?? e));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-steel-50 text-left text-xs uppercase tracking-wide text-steel-500">
            <tr>
              <th className="px-4 py-3">Vehículo</th>
              <th className="px-4 py-3">Año</th>
              <th className="px-4 py-3">Km</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/[.06]">
            {vehicles.map((v) => (
              <tr key={v.id} className={busy === v.id ? 'opacity-50' : ''}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md bg-steel-100">
                      {v.images[0] && <Image src={v.images[0]} alt="" fill sizes="64px" className="object-cover" />}
                    </div>
                    <div className="min-w-0">
                      <p className="font-600 text-ink">{v.brand} {v.model}</p>
                      <p className="truncate text-xs text-steel-400">{v.version}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-steel-700">{v.year}</td>
                <td className="px-4 py-3 text-steel-700">{numberFmt.format(v.km)}</td>
                <td className="px-4 py-3 font-600">{currency.format(v.price)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-600 ${
                    v.status === 'disponible' ? 'bg-emerald-100 text-emerald-700'
                    : v.status === 'reservado' ? 'bg-gold/20 text-gold-deep'
                    : 'bg-steel-200 text-steel-700'
                  }`}>
                    {statusLabels[v.status]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {editable ? (
                      <>
                        <Link href={`/admin/${v.id}`} className="rounded-md border border-ink/10 px-3 py-1.5 text-xs font-600 hover:border-ink/30">Editar</Link>
                        <button onClick={() => remove(v)} className="rounded-md border border-[#f3c0c0] px-3 py-1.5 text-xs font-600 text-[#b3161f] hover:bg-[#fdecec]">Eliminar</button>
                      </>
                    ) : (
                      <span className="text-xs text-steel-400">Solo lectura (demo)</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
