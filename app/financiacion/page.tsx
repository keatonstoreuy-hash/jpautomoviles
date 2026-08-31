import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { FinanceCalculator } from '@/components/FinanceCalculator';
import { IconCheck, IconSpark, IconSwap } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Financiación de autos en Paysandú — Calculá tu cuota',
  description:
    'Simulá la cuota de tu próximo auto en JP Automóviles. Planes de 12 a 60 meses, entrega flexible y aprobación ágil en Paysandú, Uruguay.',
  alternates: { canonical: '/financiacion' },
};

export default function FinanciacionPage() {
  return (
    <>
      <Navbar />
      <header className="bg-ink text-paper">
        <div className="wrap py-14 sm:py-16">
          <nav className="mb-3 text-xs text-paper/50">
            <Link href="/" className="hover:text-paper">Inicio</Link> / Financiación
          </nav>
          <h1 className="max-w-2xl font-display text-4xl font-900 uppercase leading-[0.95] sm:text-5xl">
            Financiá tu auto a tu medida
          </h1>
          <p className="mt-4 max-w-xl text-paper/70">
            Simulá cuántas cuotas y de qué monto pagarías. Es una estimación orientativa: el plan final
            lo armamos juntos según tu situación.
          </p>
        </div>
      </header>

      <div className="wrap grid gap-10 py-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="font-display text-2xl font-800 uppercase">Cómo funciona</h2>
          <ol className="mt-6 space-y-5">
            {[
              { t: 'Elegí tu auto', d: 'Del catálogo o contanos qué buscás.' },
              { t: 'Simulá la cuota', d: 'Ajustá entrega y plazo en la calculadora.' },
              { t: 'Enviá tu solicitud', d: 'Nos llega por WhatsApp con tus datos.' },
              { t: 'Aprobación y entrega', d: 'Coordinamos la documentación y te llevás el auto.' },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-display font-700 text-gold-soft">
                  {i + 1}
                </span>
                <div>
                  <p className="font-600">{s.t}</p>
                  <p className="text-sm text-steel-600">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: IconSpark, t: '12 a 60 meses' },
              { icon: IconCheck, t: 'Entrega flexible' },
              { icon: IconSwap, t: 'Aceptamos permuta' },
            ].map((b) => (
              <div key={b.t} className="card flex items-center gap-3 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/15 text-gold-deep">
                  <b.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-600">{b.t}</span>
              </div>
            ))}
          </div>
        </div>

        <FinanceCalculator basePrice={20000} />
      </div>

      <Footer />
      <WhatsAppFloat message="Hola, quería consultar por financiación." />
    </>
  );
}
