'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';
import { bodyOptions, fuelOptions, transmissionOptions } from '@/lib/labels';
import { IconSearch, IconX } from './icons';

export function CatalogFilters({ brands }: { brands: string[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(params.get('q') ?? '');

  const get = (k: string) => params.get(k) ?? '';

  const update = useCallback(
    (patch: Record<string, string>) => {
      const next = new URLSearchParams(params.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v) next.set(k, v);
        else next.delete(k);
      });
      startTransition(() => router.push(`/catalogo?${next.toString()}`, { scroll: false }));
    },
    [params, router]
  );

  const clear = () => {
    setQ('');
    startTransition(() => router.push('/catalogo', { scroll: false }));
  };

  const active = Array.from(params.keys()).filter((k) => k !== 'sort').length > 0;

  return (
    <div className={`card p-5 ${isPending ? 'opacity-70' : ''}`}>
      <form
        onSubmit={(e) => { e.preventDefault(); update({ q }); }}
        className="mb-4"
      >
        <label className="label">Buscar</label>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={() => update({ q })}
            placeholder="Marca, modelo, año…"
            className="field pl-9"
          />
        </div>
      </form>

      <div className="grid gap-4">
        <Select label="Marca" value={get('brand')} onChange={(v) => update({ brand: v })}
          options={[{ value: '', label: 'Todas' }, ...brands.map((b) => ({ value: b, label: b }))]} />
        <Select label="Tipo" value={get('body')} onChange={(v) => update({ body: v })}
          options={[{ value: '', label: 'Todos' }, ...bodyOptions]} />
        <div className="grid grid-cols-2 gap-3">
          <Select label="Combustible" value={get('fuel')} onChange={(v) => update({ fuel: v })}
            options={[{ value: '', label: 'Todos' }, ...fuelOptions]} />
          <Select label="Caja" value={get('transmission')} onChange={(v) => update({ transmission: v })}
            options={[{ value: '', label: 'Todas' }, ...transmissionOptions]} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Año desde" type="number" value={get('yearMin')} onCommit={(v) => update({ yearMin: v })} placeholder="2015" />
          <Field label="Precio hasta" type="number" value={get('priceMax')} onCommit={(v) => update({ priceMax: v })} placeholder="USD" />
        </div>
        <Field label="Km máximo" type="number" value={get('kmMax')} onCommit={(v) => update({ kmMax: v })} placeholder="120000" />
        <Select label="Estado" value={get('status')} onChange={(v) => update({ status: v })}
          options={[
            { value: '', label: 'Todos' },
            { value: 'disponible', label: 'Disponibles' },
            { value: 'reservado', label: 'Reservados' },
          ]} />
      </div>

      {active && (
        <button onClick={clear} className="btn-ghost mt-5 w-full !py-2 text-sm">
          <IconX className="h-4 w-4" /> Limpiar filtros
        </button>
      )}
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <select className="field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Field({
  label, value, onCommit, type = 'text', placeholder,
}: {
  label: string; value: string; onCommit: (v: string) => void; type?: string; placeholder?: string;
}) {
  const [v, setV] = useState(value);
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        className="field"
        value={v}
        placeholder={placeholder}
        onChange={(e) => setV(e.target.value)}
        onBlur={() => onCommit(v)}
        onKeyDown={(e) => e.key === 'Enter' && onCommit(v)}
      />
    </div>
  );
}
