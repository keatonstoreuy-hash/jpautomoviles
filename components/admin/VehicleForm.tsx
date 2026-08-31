'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { bodyOptions, fuelOptions, statusOptions, transmissionOptions } from '@/lib/labels';
import type { Vehicle } from '@/lib/types';

type FormState = Omit<Vehicle, 'id' | 'createdAt'>;

const empty: FormState = {
  slug: '', brand: '', model: '', version: '', year: new Date().getFullYear(),
  price: 0, currency: 'USD', km: 0, transmission: 'manual', fuel: 'nafta', body: 'sedan',
  color: '', doors: 4, engine: '', status: 'disponible', featured: false,
  description: '', features: [], images: [],
};

export function VehicleForm({ initial }: { initial?: Vehicle }) {
  const router = useRouter();
  const [f, setF] = useState<FormState>(initial ? { ...initial } : empty);
  const [featuresText, setFeaturesText] = useState((initial?.features ?? []).join('\n'));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((p) => ({ ...p, [k]: v }));

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      Array.from(files).forEach((file) => fd.append('files', file));
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error subiendo fotos');
      set('images', [...f.images, ...(data.urls as string[])]);
    } catch (e: any) {
      setError(e.message ?? 'Error subiendo fotos');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i: number) => set('images', f.images.filter((_, idx) => idx !== i));
  const moveImage = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= f.images.length) return;
    const next = [...f.images];
    [next[i], next[j]] = [next[j], next[i]];
    set('images', next);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!f.brand || !f.model) { setError('Marca y modelo son obligatorios.'); return; }
    setSaving(true);
    const payload = {
      ...f,
      id: initial?.id,
      features: featuresText.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    try {
      const res = await fetch('/api/admin/vehicles', {
        method: initial ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo guardar');
      router.push('/admin');
      router.refresh();
    } catch (e: any) {
      setError(e.message ?? 'No se pudo guardar');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        <section className="card p-6">
          <h2 className="mb-4 font-display text-lg font-800 uppercase">Datos principales</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Marca *" value={f.brand} onChange={(v) => set('brand', v)} placeholder="Jeep" />
            <Input label="Modelo *" value={f.model} onChange={(v) => set('model', v)} placeholder="Renegade" />
            <Input label="Versión" value={f.version ?? ''} onChange={(v) => set('version', v)} placeholder="Sport 1.8" />
            <Input label="Año" type="number" value={String(f.year)} onChange={(v) => set('year', Number(v))} />
            <Input label="Precio (USD)" type="number" value={String(f.price)} onChange={(v) => set('price', Number(v))} />
            <Input label="Kilometraje" type="number" value={String(f.km)} onChange={(v) => set('km', Number(v))} />
          </div>
        </section>

        <section className="card p-6">
          <h2 className="mb-4 font-display text-lg font-800 uppercase">Especificaciones</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Transmisión" value={f.transmission} onChange={(v) => set('transmission', v as any)} options={transmissionOptions} />
            <Select label="Combustible" value={f.fuel} onChange={(v) => set('fuel', v as any)} options={fuelOptions} />
            <Select label="Carrocería" value={f.body} onChange={(v) => set('body', v as any)} options={bodyOptions} />
            <Input label="Color" value={f.color ?? ''} onChange={(v) => set('color', v)} placeholder="Gris" />
            <Input label="Puertas" type="number" value={String(f.doors ?? '')} onChange={(v) => set('doors', Number(v))} />
            <Input label="Motor" value={f.engine ?? ''} onChange={(v) => set('engine', v)} placeholder="1.8 16v" />
          </div>
        </section>

        <section className="card p-6">
          <h2 className="mb-4 font-display text-lg font-800 uppercase">Descripción y equipamiento</h2>
          <label className="label">Descripción</label>
          <textarea className="field min-h-[100px]" value={f.description ?? ''} onChange={(e) => set('description', e.target.value)}
            placeholder="Estado, detalles, service al día…" />
          <label className="label mt-4">Equipamiento (uno por línea)</label>
          <textarea className="field min-h-[120px]" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)}
            placeholder={'Cámara de retroceso\nBluetooth\nControl de estabilidad'} />
        </section>
      </div>

      <div className="space-y-6">
        <section className="card p-6">
          <h2 className="mb-4 font-display text-lg font-800 uppercase">Publicación</h2>
          <Select label="Estado" value={f.status} onChange={(v) => set('status', v as any)} options={statusOptions} />
          <label className="mt-4 flex items-center gap-2.5 text-sm font-600">
            <input type="checkbox" checked={f.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 accent-gold" />
            Destacar en la página de inicio
          </label>
        </section>

        <section className="card p-6">
          <h2 className="mb-1 font-display text-lg font-800 uppercase">Fotos</h2>
          <p className="mb-4 text-xs text-steel-500">La primera foto es la principal. Podés reordenar.</p>

          <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-ink/15 bg-steel-50 py-8 text-center text-sm text-steel-600 hover:border-gold">
            <span className="font-700">{uploading ? 'Subiendo…' : 'Subir fotos'}</span>
            <span className="text-xs text-steel-400">JPG o PNG (hasta 8 MB)</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} disabled={uploading} />
          </label>

          {f.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {f.images.map((src, i) => (
                <div key={src} className="group relative aspect-square overflow-hidden rounded-md border border-ink/10">
                  <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                  {i === 0 && <span className="absolute left-1 top-1 rounded bg-gold px-1.5 py-0.5 text-[10px] font-800 text-ink">Principal</span>}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between bg-ink/60 p-1 opacity-0 transition group-hover:opacity-100">
                    <button type="button" onClick={() => moveImage(i, -1)} className="px-1 text-xs text-white">←</button>
                    <button type="button" onClick={() => removeImage(i)} className="px-1 text-xs text-[#ff6b6b]">✕</button>
                    <button type="button" onClick={() => moveImage(i, 1)} className="px-1 text-xs text-white">→</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {error && <p className="rounded-md bg-[#fdecec] px-4 py-3 text-sm text-[#b3161f]">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" className="btn-primary flex-1" disabled={saving || uploading}>
            {saving ? 'Guardando…' : initial ? 'Guardar cambios' : 'Publicar vehículo'}
          </button>
          <button type="button" onClick={() => router.push('/admin')} className="btn-ghost">Cancelar</button>
        </div>
      </div>
    </form>
  );
}

function Input({
  label, value, onChange, type = 'text', placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input type={type} className="field" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
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
