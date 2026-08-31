import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { HeroSearch } from '@/components/HeroSearch';
import { InventoryTabs } from '@/components/InventoryTabs';
import { BrandsStrip } from '@/components/BrandsStrip';
import { FinanceCalculator } from '@/components/FinanceCalculator';
import { ContactForm } from '@/components/ContactForm';
import { MapEmbed } from '@/components/MapEmbed';
import { Reveal } from '@/components/Reveal';
import { Logo } from '@/components/Logo';
import { getBrands, getVehicles, inventoryStats } from '@/lib/vehicles';
import { site, waLink } from '@/lib/site';
import {
  IconArrow, IconCheck, IconClock, IconPhone, IconPin, IconShield, IconSpark, IconSwap, IconWhatsApp,
} from '@/components/icons';

export default async function HomePage() {
  const [brands, all] = await Promise.all([getBrands(), getVehicles()]);
  const stats = inventoryStats(all);
  const stock = all.filter((v) => v.status !== 'vendido');

  const trust = [
    { icon: IconShield, title: 'Usados revisados', text: 'Cada unidad pasa por control mecánico antes de la entrega.' },
    { icon: IconCheck, title: 'Precio claro', text: 'El precio que ves es el precio final, sin vueltas ni sorpresas.' },
    { icon: IconSpark, title: 'Financiación propia', text: 'Planes en cuotas que se adaptan a tu presupuesto.' },
    { icon: IconPhone, title: 'Te atendemos nosotros', text: 'Hablás siempre con la misma persona, de la consulta a la entrega.' },
  ];

  return (
    <>
      <Navbar />

      {/* HERO con video */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10">
          <video
            className="h-full w-full object-cover opacity-35"
            autoPlay muted loop playsInline
            poster="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1900&q=60"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
        </div>

        <div className="wrap pb-16 pt-14 sm:pt-20">
          <Logo tone="light" href={null} size={72} className="mb-4" />
          <span className="eyebrow rule-eyebrow text-gold">Automotora en Paysandú, Uruguay</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-900 uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Tu próximo auto <br /><span className="text-gold">está en Paysandú</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Usados y 0 km multimarca, revisados y listos para entregar. Recibimos tu vehículo en parte
            de pago y te financiamos la diferencia.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/catalogo" className="btn-primary">Ver stock <IconArrow className="h-4 w-4" /></Link>
            <Link href="/financiacion" className="btn-outline-light">Simular financiación</Link>
          </div>

          <div className="mt-10 max-w-4xl">
            <HeroSearch brands={brands} />
          </div>
        </div>

        <div className="border-t border-white/10 bg-ink-soft/70 backdrop-blur">
          <div className="wrap grid grid-cols-2 divide-x divide-white/10 py-5 text-center sm:grid-cols-4">
            {[
              { n: `${stats.available}`, l: 'Autos disponibles' },
              { n: `${stats.brands}+`, l: 'Marcas' },
              { n: '100%', l: 'Unidades revisadas' },
              { n: '+12', l: 'Años en el rubro' },
            ].map((s) => (
              <div key={s.l} className="px-2">
                <p className="font-display text-2xl font-900 text-white">{s.n}</p>
                <p className="mt-0.5 text-xs text-white/55">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STOCK */}
      <section className="wrap py-16 sm:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow rule-eyebrow">Nuestro stock</span>
            <h2 className="mt-2 font-display text-3xl font-800 uppercase sm:text-4xl">Autos en venta</h2>
          </div>
          <Link href="/catalogo" className="btn-outline">
            Ver todo el catálogo <IconArrow className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-8">
          <InventoryTabs vehicles={stock} />
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="bg-paper-muted">
        <div className="wrap grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t, i) => (
            <Reveal key={t.title} delay={i * 70}>
              <div className="flex h-full flex-col items-start gap-3 border-l-2 border-gold pl-5">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-ink text-gold">
                  <t.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-base font-800 uppercase">{t.title}</h3>
                <p className="text-sm leading-relaxed text-steel-600">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROMOS: financiación + permuta */}
      <section id="nosotros" className="wrap py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="group relative overflow-hidden rounded-lg bg-ink text-white">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=60"
              alt="" fill className="object-cover opacity-25 transition group-hover:opacity-30" />
            <div className="relative p-8 sm:p-10">
              <span className="eyebrow text-gold">Financiación</span>
              <h3 className="mt-2 font-display text-2xl font-800 uppercase sm:text-3xl">Llevate tu auto en cuotas</h3>
              <p className="mt-3 max-w-sm text-white/70">
                Planes de 12 a 60 meses con entrega flexible. Simulá tu cuota online y aprobamos rápido.
              </p>
              <Link href="/financiacion" className="btn-primary mt-6">Simular cuota</Link>
            </div>
          </Reveal>

          <Reveal delay={80} className="group relative overflow-hidden rounded-lg bg-ink text-white">
            <Image
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=60"
              alt="" fill className="object-cover opacity-25 transition group-hover:opacity-30" />
            <div className="relative p-8 sm:p-10">
              <span className="eyebrow text-gold">Permuta</span>
              <h3 className="mt-2 font-display text-2xl font-800 uppercase sm:text-3xl">Entregá tu usado</h3>
              <p className="mt-3 max-w-sm text-white/70">
                Tasamos tu vehículo de forma justa y lo tomamos como parte de pago de tu próxima compra.
              </p>
              <Link href="/permuta" className="btn-outline-light mt-6">Tasar mi vehículo <IconSwap className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NOVEDADES · video real de JP */}
      <section className="bg-ink text-white">
        <div className="wrap grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="eyebrow text-gold">Novedades · Preventa</span>
            <h2 className="mt-2 font-display text-3xl font-800 uppercase sm:text-4xl">
              Nuevo <span className="text-gold">Jeep Avenger</span> híbrido
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Reservá el tuyo con una seña. Consultanos por disponibilidad, colores y el plan de
              financiación que mejor se adapte a vos.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waLink('Hola JP Automóviles, quiero información sobre la preventa del Jeep Avenger híbrido.')}
                target="_blank" rel="noopener" className="btn-primary"
              >
                <IconWhatsApp className="h-4 w-4" /> Quiero más info
              </a>
              <Link href="/catalogo" className="btn-outline-light">Ver stock</Link>
            </div>
          </Reveal>

          <Reveal delay={80} className="overflow-hidden rounded-lg border border-white/10 shadow-lift">
            <video
              className="aspect-video w-full bg-black"
              controls
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=60"
            >
              <source src="/video-avenger.mp4" type="video/mp4" />
            </video>
          </Reveal>
        </div>
      </section>

      <BrandsStrip />

      {/* CALCULADORA */}
      <section id="financiacion" className="wrap py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow rule-eyebrow">Calculadora</span>
            <h2 className="mt-2 font-display text-3xl font-800 uppercase sm:text-4xl">Calculá tu cuota</h2>
            <p className="mt-4 text-steel-600">
              Movés el precio, la entrega y el plazo, y ves al instante cuánto pagarías por mes. Cuando
              tengas tu número, lo mandás por WhatsApp y coordinamos el resto.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-steel-800">
              {['Entrega desde 0% según el caso', 'Planes de 12 a 60 meses', 'Aprobación ágil y personalizada'].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/10 text-gold">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <FinanceCalculator basePrice={20000} />
          </Reveal>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="bg-ink text-white">
        <div className="wrap py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <span className="eyebrow rule-eyebrow text-gold">Contacto</span>
            <h2 className="mt-2 font-display text-3xl font-800 uppercase sm:text-4xl">Vení a conocernos</h2>
            <p className="mt-4 text-white/70">
              Te esperamos en {site.address}, {site.city}. Escribinos por WhatsApp y coordinamos una
              visita o un test drive.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <Reveal className="rounded-lg bg-white p-6 text-ink sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoItem icon={IconPin} title="Dirección" text={`${site.address}, ${site.city}`} />
                <InfoItem icon={IconClock} title="Horarios" text={site.hoursText} />
                <InfoItem icon={IconWhatsApp} title="WhatsApp" text={site.phone.mobile} href={waLink()} />
                <InfoItem icon={IconPhone} title="Teléfono" text={site.phone.landline} href={`tel:${site.phone.landlineIntl}`} />
              </div>
              <div className="mt-6 border-t border-ink/[.08] pt-6">
                <h3 className="mb-4 font-display text-lg font-800 uppercase">Dejanos tu consulta</h3>
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={80} className="min-h-[420px] overflow-hidden rounded-lg border border-white/10">
              <MapEmbed />
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function InfoItem({
  icon: Icon, title, text, href,
}: {
  icon: (p: { className?: string }) => JSX.Element;
  title: string; text: string; href?: string;
}) {
  const body = (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ink/[.05] text-gold">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-700 uppercase tracking-wide text-steel-400">{title}</p>
        <p className="font-700 text-ink">{text}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener" className="transition hover:opacity-80">{body}</a>
  ) : body;
}
