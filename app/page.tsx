import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InventoryTabs } from '@/components/InventoryTabs';
import { Testimonials } from '@/components/Testimonials';
import { FinanceCalculator } from '@/components/FinanceCalculator';
import { ContactForm } from '@/components/ContactForm';
import { MapEmbed } from '@/components/MapEmbed';
import { Reveal } from '@/components/Reveal';
import { getVehicles } from '@/lib/vehicles';
import { site, waLink } from '@/lib/site';
import { IconArrow, IconCheck, IconClock, IconPhone, IconPin } from '@/components/icons';

const reasons = [
  { t: 'Usados y 0 km', d: 'Vendemos autos, camionetas y motos, usados revisados y unidades 0 km.' },
  { t: 'Financiación propia', d: 'Planes en cuotas que se adaptan a tu presupuesto y aprobación ágil.' },
  { t: 'Recibimos tu usado', d: 'Tomamos tu vehículo en parte de pago con una tasación justa.' },
  { t: 'Nos encargamos de todo', d: 'Trámites, transferencia y papeles: te lo dejamos listo.' },
];

export default async function HomePage() {
  const all = await getVehicles();
  const stock = all.filter((v) => v.status !== 'vendido');

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-home.jpg"
            alt="Familia disfrutando su vehículo de JP Automóviles" fill priority className="object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
        </div>

        <div className="wrap flex min-h-[440px] flex-col justify-center py-16 sm:min-h-[500px]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-700 uppercase tracking-[0.2em] text-white/70">
              <span className="h-px w-7 bg-gold" /> Automotora en {site.city}
            </span>
            <h1 className="mt-3 font-display text-2xl font-800 uppercase leading-[1.1] sm:text-3xl lg:text-4xl">
              Encontrá tu próximo vehículo en JP Automóviles
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Autos, camionetas y motos, <strong className="font-700 text-white">usados y 0 km</strong>, con
              garantía y financiación. Te asesoramos en todo el proceso.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/catalogo" className="btn-gold">Ver stock <IconArrow className="h-4 w-4" /></Link>
              <Link href="/financiacion" className="btn-outline-light">Ver financiación</Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPRÁ TU VEHÍCULO */}
      <section className="bg-paper-muted">
        <div className="wrap grid items-center gap-6 py-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow">Comprá con confianza</span>
            <h2 className="mt-2 font-display text-2xl font-800 uppercase sm:text-3xl">
              Encontrá tu próximo vehículo
            </h2>
            <p className="mt-3 max-w-md text-steel-600">
              Autos, camionetas y motos seleccionados. Elegí el tuyo, recibimos tu usado en parte de
              pago y te financiamos la diferencia en cuotas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/catalogo" className="btn-primary">Ver catálogo <IconArrow className="h-4 w-4" /></Link>
              <Link href="/financiacion" className="btn-outline">Simular cuota</Link>
            </div>
          </Reveal>
          <Reveal delay={80} className="order-1 lg:order-2">
            <Image
              src="/vehiculo-cutout.png"
              alt="Vehículo disponible en JP Automóviles"
              width={640} height={420}
              className="h-auto w-full drop-shadow-2xl"
            />
          </Reveal>
        </div>
      </section>

      {/* NUEVOS INGRESOS */}
      <section className="wrap py-14 sm:py-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Stock disponible</span>
            <h2 className="mt-1 font-display text-2xl font-800 uppercase sm:text-3xl">Nuevos ingresos</h2>
          </div>
          <Link href="/catalogo" className="text-sm font-700 uppercase tracking-wide text-ink hover:text-gold-deep">
            Ver todos los vehículos →
          </Link>
        </Reveal>
        <div className="mt-7">
          <InventoryTabs vehicles={stock} />
        </div>
      </section>

      {/* NOVEDADES · video vertical de JP */}
      <section className="bg-paper-muted">
        <div className="wrap grid items-center gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <span className="eyebrow">Novedades · Preventa</span>
            <h2 className="mt-2 font-display text-2xl font-800 uppercase sm:text-3xl">
              Nuevo Jeep Avenger híbrido
            </h2>
            <p className="mt-4 max-w-md text-steel-600">
              Ya podés reservar el tuyo con una seña. Consultanos por disponibilidad, colores y el plan
              de financiación que mejor se adapte a vos.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waLink('Hola JP Automóviles, quiero info de la preventa del Jeep Avenger híbrido.')} target="_blank" rel="noopener" className="btn-primary">
                Quiero más info
              </a>
              <Link href="/catalogo" className="btn-outline">Ver stock</Link>
            </div>
          </Reveal>
          <Reveal delay={80} className="mx-auto w-full max-w-[300px]">
            <div className="overflow-hidden rounded-xl2 border border-ink/10 bg-black shadow-lift">
              <video
                className="aspect-[9/16] w-full object-cover"
                controls playsInline preload="metadata"
                poster="/video-avenger-poster.jpg"
              >
                <source src="/video-avenger.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RAZONES */}
      <section id="nosotros" className="bg-ink text-white">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <Reveal delay={80} className="relative order-2 aspect-[16/10] overflow-hidden rounded-lg lg:order-1">
            <Image src="/local-jp.jpg" alt="Local de JP Automóviles en Paysandú" fill className="object-cover" />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-700 uppercase tracking-[0.2em] text-gold">
                <span className="h-px w-7 bg-gold" /> Por qué elegirnos
              </span>
              <h2 className="mt-2 font-display text-2xl font-800 uppercase sm:text-3xl">
                4 razones para elegir JP Automóviles
              </h2>
            </Reveal>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <Reveal key={r.t} delay={i * 70} className="border-t-2 border-gold pt-4">
                  <span className="font-display text-2xl font-900 text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-1 font-display text-base font-800 uppercase">{r.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{r.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-16 sm:py-20">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Testimonios</span>
            <h2 className="mt-1 font-display text-2xl font-800 uppercase sm:text-3xl">Qué dicen nuestros clientes</h2>
          </Reveal>
        </div>
        <div className="mt-8">
          <Testimonials />
        </div>
      </section>

      {/* CALCULADORA */}
      <section id="financiacion" className="bg-paper-muted">
        <div className="wrap grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Financiación</span>
            <h2 className="mt-1 font-display text-2xl font-800 uppercase sm:text-3xl">Calculá tu cuota</h2>
            <p className="mt-4 text-steel-600">
              Ajustá el precio, la entrega y el plazo y mirá al instante cuánto pagarías por mes. Cuando
              tengas tu número, lo mandás por WhatsApp y coordinamos.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-steel-800">
              {['Entrega desde 0% según el caso', 'Planes de 12 a 60 meses', 'Aprobación ágil y personalizada'].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-gold"><IconCheck className="h-4 w-4" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}><FinanceCalculator basePrice={20000} /></Reveal>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="wrap py-16 sm:py-20">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Contacto</span>
          <h2 className="mt-1 font-display text-2xl font-800 uppercase sm:text-3xl">Escribinos</h2>
          <p className="mt-3 text-steel-600">
            Dejanos tu consulta y te respondemos a la brevedad en horario comercial.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="card p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <InfoItem icon={IconPin} title="Dirección" text={`${site.address}, ${site.city}`} />
              <InfoItem icon={IconClock} title="Horarios" text={site.hoursText} />
              <InfoItem icon={IconPhone} title="WhatsApp" text={site.phone.mobile} href={waLink()} />
              <InfoItem icon={IconPhone} title="Teléfono" text={site.phone.landline} href={`tel:${site.phone.landlineIntl}`} />
            </div>
            <div className="mt-6 border-t border-ink/[.06] pt-6">
              <h3 className="mb-4 font-display text-lg font-800 uppercase">Dejanos tu consulta</h3>
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={80} className="min-h-[420px] overflow-hidden rounded-lg border border-ink/[.06] shadow-card">
            <MapEmbed />
          </Reveal>
        </div>
      </section>

      <Footer />
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
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ink/[.05] text-ink">
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
