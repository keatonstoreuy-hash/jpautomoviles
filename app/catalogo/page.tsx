import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { CatalogFilters } from '@/components/CatalogFilters';
import { SortSelect } from '@/components/SortSelect';
import { VehicleCard } from '@/components/VehicleCard';
import { getBrands, getVehicles } from '@/lib/vehicles';
import type { VehicleFilters } from '@/lib/types';
import { waLink } from '@/lib/site';
import { IconWhatsApp } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Catálogo de autos usados y 0 km en Paysandú',
  description:
    'Explorá el catálogo de JP Automóviles: autos usados y 0 km multimarca en Paysandú. Filtrá por marca, precio, año, kilometraje y tipo. Permuta y financiación disponibles.',
  alternates: { canonical: '/catalogo' },
};

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const num = (v: string | string[] | undefined) => {
  const n = Number(one(v));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export default async function CatalogoPage({ searchParams }: { searchParams: SP }) {
  const filters: VehicleFilters = {
    q: one(searchParams.q),
    brand: one(searchParams.brand),
    body: one(searchParams.body),
    fuel: one(searchParams.fuel),
    transmission: one(searchParams.transmission),
    status: one(searchParams.status),
    yearMin: num(searchParams.yearMin),
    priceMax: num(searchParams.priceMax),
    kmMax: num(searchParams.kmMax),
    sort: one(searchParams.sort),
  };

  const [vehicles, brands] = await Promise.all([getVehicles(filters), getBrands()]);

  return (
    <>
      <Navbar />

      <header className="border-b border-ink/[.06] bg-steel-50">
        <div className="wrap py-10 sm:py-12">
          <nav className="mb-3 text-xs text-steel-400">
            <Link href="/" className="hover:text-ink">Inicio</Link> <span className="mx-1">/</span> Catálogo
          </nav>
          <h1 className="font-display text-3xl font-800 uppercase sm:text-4xl">Catálogo de vehículos</h1>
          <p className="mt-2 max-w-2xl text-steel-600">
            Usados y 0 km seleccionados en Paysandú. Encontrá tu próximo auto y consultanos por permuta
            o financiación.
          </p>
        </div>
      </header>

      <div className="wrap grid gap-8 py-10 lg:grid-cols-[290px_1fr]">
        <aside className="lg:sticky lg:top-[124px] lg:h-fit">
          <Suspense>
            <CatalogFilters brands={brands} />
          </Suspense>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-steel-600">
              <span className="font-700 text-ink">{vehicles.length}</span>{' '}
              {vehicles.length === 1 ? 'vehículo' : 'vehículos'} encontrados
            </p>
            <Suspense>
              <SortSelect />
            </Suspense>
          </div>

          {vehicles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {vehicles.map((v, i) => (
                <VehicleCard key={v.id} v={v} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="card grid place-items-center gap-4 p-12 text-center">
              <p className="font-display text-xl font-800 uppercase">No encontramos autos con esos filtros</p>
              <p className="max-w-md text-sm text-steel-600">
                Probá quitar algún filtro o escribinos y te avisamos apenas ingrese una unidad como la
                que buscás.
              </p>
              <a href={waLink('Hola, estoy buscando un auto específico, ¿me avisan si les entra algo?')} target="_blank" rel="noopener" className="btn-wa">
                <IconWhatsApp className="h-5 w-5" /> Consultar por WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
