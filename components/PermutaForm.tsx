'use client';

import { useState } from 'react';
import { waLink } from '@/lib/site';
import { IconWhatsApp } from './icons';

export function PermutaForm() {
  const [f, setF] = useState({
    name: '', brand: '', model: '', year: '', km: '', condition: 'Muy bueno', interest: '',
  });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `Hola JP Automóviles, quiero tasar mi vehículo para permuta.`,
      `Nombre: ${f.name || '(nombre)'}`,
      `Vehículo: ${f.brand} ${f.model} ${f.year}`.trim(),
      `Kilometraje: ${f.km || '(a confirmar)'} km`,
      `Estado: ${f.condition}`,
      f.interest ? `Me interesa cambiarlo por: ${f.interest}` : '',
      `(Adjunto fotos en este chat)`,
    ].filter(Boolean).join('\n');
    window.open(waLink(msg), '_blank', 'noopener');
  };

  return (
    <form onSubmit={submit} className="card grid gap-4 p-6 sm:p-8">
      <div>
        <label className="label">Tu nombre</label>
        <input className="field" value={f.name} onChange={set('name')} placeholder="Nombre y apellido" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Marca</label>
          <input className="field" value={f.brand} onChange={set('brand')} placeholder="Ej: Ford" required />
        </div>
        <div>
          <label className="label">Modelo</label>
          <input className="field" value={f.model} onChange={set('model')} placeholder="Ej: Focus" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Año</label>
          <input className="field" type="number" value={f.year} onChange={set('year')} placeholder="2016" />
        </div>
        <div>
          <label className="label">Kilometraje</label>
          <input className="field" type="number" value={f.km} onChange={set('km')} placeholder="90000" />
        </div>
      </div>
      <div>
        <label className="label">Estado general</label>
        <select className="field" value={f.condition} onChange={set('condition')}>
          {['Excelente', 'Muy bueno', 'Bueno', 'Regular'].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="label">¿Qué auto te interesa? (opcional)</label>
        <input className="field" value={f.interest} onChange={set('interest')} placeholder="Ej: una SUV, un usado más nuevo…" />
      </div>
      <button type="submit" className="btn-wa w-full">
        <IconWhatsApp className="h-5 w-5" /> Enviar y adjuntar fotos por WhatsApp
      </button>
      <p className="text-center text-[11px] text-steel-400">
        Al enviar se abre WhatsApp con los datos cargados. Ahí mismo podés adjuntar las fotos de tu vehículo.
      </p>
    </form>
  );
}
