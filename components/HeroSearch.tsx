'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { bodyOptions } from '@/lib/labels';
import { IconSearch } from './icons';

const priceRanges = [
  { value: '', label: 'Cualquier precio' },
  { value: '15000', label: 'Hasta US$ 15.000' },
  { value: '25000', label: 'Hasta US$ 25.000' },
  { value: '35000', label: 'Hasta US$ 35.000' },
  { value: '50000', label: 'Hasta US$ 50.000' },
];

export function HeroSearch({ brands }: { brands: string[] }) {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [body, setBody] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (body) params.set('body', body);
    if (priceMax) params.set('priceMax', priceMax);
    router.push(`/catalogo${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <form onSubmit={submit} className="rounded-lg bg-ink/85 p-4 shadow-lift ring-1 ring-white/10 backdrop-blur">
      <p className="mb-3 text-xs font-800 uppercase tracking-[0.2em] text-white/70">
        Encontrá tu próximo auto
      </p>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
        <Field label="Marca">
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="hs-select">
            <option value="">Todas</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Tipo">
          <select value={body} onChange={(e) => setBody(e.target.value)} className="hs-select">
            <option value="">Todos</option>
            {bodyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field label="Precio">
          <select value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="hs-select">
            {priceRanges.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <div className="flex items-end">
          <button type="submit" className="btn-primary h-[42px] w-full sm:w-auto">
            <IconSearch className="h-4 w-4" /> Buscar
          </button>
        </div>
      </div>
      <style>{`.hs-select{width:100%;border-radius:.375rem;border:0;background:#fff;padding:.6rem .7rem;font-size:.875rem;color:#0a0a0c}`}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-700 uppercase tracking-wide text-white/50">{label}</span>
      {children}
    </label>
  );
}
