import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { Gallery } from '@/components/Gallery';
import { StatusBadge } from '@/components/StatusBadge';
import { VehicleCard } from '@/components/VehicleCard';
import { FinanceCalculator } from '@/components/FinanceCalculator';
import { getRelated, getVehicleBySlug, getVehicles } from '@/lib/vehicles';
import { bodyLabels, fuelLabels, transmissionLabels } from '@/lib/labels';
import { currency, numberFmt, site, waLink } from '@/lib/site';
import {
  IconCalendar, IconCheck, IconDoor, IconFuel, IconGauge, IconGear, IconPin, IconWhatsApp,
} from '@/components/icons';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const v = await getVehicleBySlug(params.slug);
  if (!v) return { title: 'Vehículo no encontrado' };
  const name = `${v.brand} ${v.model} ${v.version ?? ''} ${v.year}`.trim();
  const desc = `${name} — ${numberFmt.format(v.km)} km, ${transmissionLabels[v.transmission]}, ${fuelLabels[v.fuel]}. ${
    v.status === 'vendido' ? 'Consultá por unidades similares.' : `${currency.format(v.price)}.`
  } En JP Automóviles, Paysandú. Permuta y financiación.`;
  return {
    title: `${name} usado en Paysandú`,
    description: desc,
    alternates: { canonical: `/vehiculos/${v.slug}` },
    openGraph: {
      title: name,
      description: desc,
      images: v.images[0] ? [{ url: v.images[0] }] : undefined,
      type: 'website',
    },
  };
}

export default async function VehiclePage({ params }: { params: { slug: string } }) {
  const v = await getVehicleBySlug(params.slug);
  if (!v) notFound();

  const name = `${v.brand} ${v.model} ${v.version ?? ''}`.trim();
  const fullName = `${name} ${v.year}`;
  const related = await getRelated(v);
  const sold = v.status === 'vendido';

  const specs = [
    { icon: IconCalendar, label: 'Año', value: String(v.year) },
    { icon: IconGauge, label: 'Kilometraje', value: `${numberFmt.format(v.km)} km` },
    { icon: IconGear, label: 'Transmisión', value: transmissionLabels[v.transmission] },
    { icon: IconFuel, label: 'Combustible', value: fuelLabels[v.fuel] },
    { icon: IconDoor, label: 'Carrocería', value: bodyLabels[v.body] },
    ...(v.engine ? [{ icon: IconGauge, label: 'Motor', value: v.engine }] : []),
    ...(v.color ? [{ icon: IconCheck, label: 'Color', value: v.color }] : []),
    ...(v.doors ? [{ icon: IconDoor, label: 'Puertas', value: String(v.doors) }] : []),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: fullName,
    brand: { '@type': 'Brand', name: v.brand },
    model: v.model,
    vehicleModelDate: String(v.year),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: v.km, unitCode: 'KMT' },
    fuelType: fuelLabels[v.fuel],
    vehicleTransmission: transmissionLabels[v.transmission],
    ...(v.color ? { color: v.color } : {}),
    image: v.images,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: v.price,
      availability:
        v.status === 'vendido'
          ? 'https://schema.org/SoldOut'
          : v.status === 'reservado'
          ? 'https://schema.org/LimitedAvailability'
          : 'https://schema.org/InStock',
      seller: { '@type': 'AutoDealer', name: site.name },
    },
  };

  const waMsg = `Hola JP Automóviles, me interesa el ${fullName} (${currency.format(v.price)}). ¿Sigue disponible?`;

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="wrap py-8">
        <nav className="mb-5 text-xs text-steel-400">
          <Link href="/" className="hover:text-ink">Inicio</Link> <span className="mx-1">/</span>
          <Link href="/catalogo" className="hover:text-ink"> Catálogo</Link> <span className="mx-1">/</span>
          <span className="text-steel-600"> {name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Gallery images={v.images} alt={fullName} />

            {v.description && (
              <section className="mt-8">
                <h2 className="font-display text-xl font-800 uppercase">Descripción</h2>
                <p className="mt-3 leading-relaxed text-steel-800">{v.description}</p>
              </section>
            )}

            <section className="mt-8">
              <h2 className="font-display text-xl font-800 uppercase">Ficha técnica</h2>
              <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {specs.map((s) => (
                  <div key={s.label} className="rounded-md border border-ink/[.08] bg-white p-3">
                    <dt className="flex items-center gap-1.5 text-xs font-600 uppercase tracking-wide text-steel-400">
                      <s.icon className="h-4 w-4" /> {s.label}
                    </dt>
                    <dd className="mt-1 font-600 text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {v.features.length > 0 && (
              <section className="mt-8">
                <h2 className="font-display text-xl font-800 uppercase">Equipamiento destacado</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-steel-800">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-deep">
                        <IconCheck className="h-4 w-4" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[124px] lg:h-fit">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-800 uppercase tracking-[0.14em] text-gold-deep">{v.brand}</p>
                <StatusBadge status={v.status} />
              </div>
              <h1 className="mt-1 font-display text-2xl font-800 leading-tight">{fullName}</h1>

              <div className="mt-4 border-y border-ink/[.06] py-4">
                <p className="text-xs font-600 uppercase tracking-wide text-steel-400">Precio</p>
                <p className="font-display text-3xl font-800 text-ink">
                  {sold ? 'Vendido' : currency.format(v.price)}
                </p>
              </div>

              <div className="mt-4 grid gap-2.5">
                <a href={waLink(waMsg)} target="_blank" rel="noopener" className="btn-wa w-full">
                  <IconWhatsApp className="h-5 w-5" /> {sold ? 'Consultar similares' : 'Consultar por WhatsApp'}
                </a>
                <a href={waLink(`Hola, quería coordinar un test drive del ${fullName}.`)} target="_blank" rel="noopener" className="btn-primary w-full">
                  Agendar visita / test drive
                </a>
              </div>

              <p className="mt-4 flex items-center gap-2 text-sm text-steel-600">
                <IconPin className="h-4 w-4 text-gold-deep" /> {site.address}, {site.city}
              </p>
            </div>

            {!sold && (
              <div className="card mt-6 p-6">
                <h2 className="mb-4 font-display text-lg font-800 uppercase">Simulá tu cuota</h2>
                <FinanceCalculator basePrice={v.price} vehicleName={fullName} compact />
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-800 uppercase">También te puede interesar</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <VehicleCard key={r.id} v={r} />)}
            </div>
          </section>
        )}
      </div>

      <Footer />
      <WhatsAppFloat message={waMsg} />
    </>
  );
}

export async function generateStaticParams() {
  try {
    const vehicles = await getVehicles();
    return vehicles.map((v) => ({ slug: v.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;
export const revalidate = 300;
