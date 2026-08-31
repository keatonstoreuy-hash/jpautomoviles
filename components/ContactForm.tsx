'use client';

import { useState } from 'react';
import { site, waLink } from '@/lib/site';
import { IconWhatsApp } from './icons';

export function ContactForm({ subject }: { subject?: string }) {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState(subject ?? '');
  const [message, setMessage] = useState('');

  const build = () => {
    const lines = [
      `Hola ${site.name}, soy ${name || '(nombre)'}.`,
      interest ? `Me interesa: ${interest}.` : '',
      message ? `Consulta: ${message}` : '',
    ].filter(Boolean);
    return lines.join('\n');
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waLink(build()), '_blank', 'noopener');
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div>
        <label className="label" htmlFor="cf-name">Nombre</label>
        <input id="cf-name" className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />
      </div>
      <div>
        <label className="label" htmlFor="cf-interest">Vehículo o interés</label>
        <input id="cf-interest" className="field" value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="Ej: Jeep Renegade, permuta, financiación…" />
      </div>
      <div>
        <label className="label" htmlFor="cf-msg">Mensaje</label>
        <textarea id="cf-msg" className="field min-h-[110px] resize-y" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Contanos qué estás buscando" />
      </div>
      <button type="submit" className="btn-wa w-full">
        <IconWhatsApp className="h-5 w-5" /> Enviar por WhatsApp
      </button>
      <p className="text-center text-[11px] text-steel-400">
        Al enviar se abre WhatsApp con tu consulta lista. Te respondemos a la brevedad en horario comercial.
      </p>
    </form>
  );
}
