import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { PermutaForm } from '@/components/PermutaForm';
import { IconCheck } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Permuta y tasación de tu usado en Paysandú',
  description:
    'Entregá tu auto en parte de pago. Tasamos tu usado de forma justa y en el día en JP Automóviles, Paysandú. Enviá los datos y fotos por WhatsApp.',
  alternates: { canonical: '/permuta' },
};

export default function PermutaPage() {
  return (
    <>
      <Navbar />
      <div className="wrap grid gap-10 py-14 lg:grid-cols-2 lg:items-start">
        <div className="lg:pt-6">
          <nav className="mb-3 text-xs text-steel-400">
            <Link href="/" className="hover:text-ink">Inicio</Link> / Permuta
          </nav>
          <h1 className="font-display text-4xl font-900 uppercase leading-[0.95] sm:text-5xl">Entregá tu usado en parte de pago</h1>
          <p className="mt-4 max-w-lg text-steel-600">
            Tasamos tu vehículo de forma justa y transparente. Completá los datos, adjuntá unas fotos por
            WhatsApp y te pasamos una estimación para que cambies por tu próximo auto.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              'Tasación sin compromiso',
              'Tomamos autos, camionetas y pick ups',
              'Descontás el valor directamente de tu próxima compra',
              'Combinable con financiación',
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-steel-800">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-deep">
                  <IconCheck className="h-4 w-4" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <PermutaForm />
      </div>
      <Footer />
      <WhatsAppFloat message="Hola, quería tasar mi vehículo para permuta." />
    </>
  );
}
