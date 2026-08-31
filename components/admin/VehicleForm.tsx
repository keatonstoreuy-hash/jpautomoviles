'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { VEHICLES_BUCKET } from '@/lib/supabase/config';
import { bodyOptions, fuelOptions, statusOptions, transmissionOptions } from '@/lib/labels';
import { vehicleSlug } from '@/lib/slug';
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
  const supabase = createClient();
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
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          throw new Error(`"${file.name}" no es una imagen.`);
        }
        if (file.size > 8 * 1024 * 1024) {
          throw new Error(`"${file.name}" supera los 8 MB. Reducí el tamaño e intentá de nuevo.`);
        }
        const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from(VEHICLES_BUCKET).upload(path, file, {
          cacheControl: '3600', upsert: false,
        });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from(VEHICLES_BUCKET).getPublicUrl(path);
        urls.push(data.publicUrl);
      }
      set('images', [...f.images, ...urls]);
    } catch (e: any) {
      setError('Error subiendo fotos: ' + (e.message ?? e));
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

    const features = featuresText.split('\n').map((s) => s.trim()).filter(Boolean);
    const baseSlug = vehicleSlug(f.brand, f.model, f.version, f.year);
    const slug = f.slug && initial ? f.slug : `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;

    const row = {
      slug,
      brand: f.brand.trim(),
      model: f.model.trim(),
      version: f.version?.trim() || null,
      year: Number(f.year),
      price: Number(f.price),
      currency: f.currency,
      km: Number(f.km),
      transmission: f.transmission,
      fuel: f.fuel,
      body: f.body,
      color: f.color?.trim() || null,
      doors: f.doors ? Number(f.doors) : null,
      engine: f.engine?.trim() || null,
      status: f.status,
      featured: f.featured,
      description: f.description?.trim() || null,
      features,
      images: f.images,
    };

    const q = initial
      ? supabase.from('vehicles').update(row).eq('id', initial.id)
      : supabase.from('vehicles').insert(row);
    const { error: dbErr } = await q;
    setSaving(false);
    if (dbErr) { setError('No se pudo guardar: ' + dbErr.message); return; }
    router.push('/admin');
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        <section className="card p-6">
          <h2 className="mb-4 font-display text-lg font-600">Datos principales</h2>
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
          <h2 className="mb-4 font-display text-lg font-600">Especificaciones</h2>
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
          <h2 className="mb-4 font-display text-lg font-600">Descripción y equipamiento</h2>
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
          <h2 className="mb-4 font-display text-lg font-600">Publicación</h2>
          <Select label="Estado" value={f.status} onChange={(v) => set('status', v as any)} options={statusOptions} />
          <label className="mt-4 flex items-center gap-2.5 text-sm font-600">
            <input type="checkbox" checked={f.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 accent-red" />
            Destacar en la página de inicio
          </label>
        </section>

        <section className="card p-6">
          <h2 className="mb-1 font-display text-lg font-600">Fotos</h2>
          <p className="mb-4 text-xs text-steel-500">La primera foto es la principal. Podés reordenar.</p>

          <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-ink/15 bg-steel-50 py-8 text-center text-sm text-steel-600 hover:border-red">
            <span className="font-600">{uploading ? 'Subiendo…' : 'Subir fotos'}</span>
            <span className="text-xs text-steel-400">JPG o PNG</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} disabled={uploading} />
          </label>

          {f.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {f.images.map((src, i) => (
                <div key={src} className="group relative aspect-square overflow-hidden rounded-lg border border-ink/10">
                  <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                  {i === 0 && <span className="absolute left-1 top-1 rounded bg-red px-1.5 py-0.5 text-[10px] font-700 text-ink">Principal</span>}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between bg-ink/60 p-1 opacity-0 transition group-hover:opacity-100">
                    <button type="button" onClick={() => moveImage(i, -1)} className="px-1 text-xs text-white">←</button>
                    <button type="button" onClick={() => removeImage(i)} className="px-1 text-xs text-red-300">✕</button>
                    <button type="button" onClick={() => moveImage(i, 1)} className="px-1 text-xs text-white">→</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

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
