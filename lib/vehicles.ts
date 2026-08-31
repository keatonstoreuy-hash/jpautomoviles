import 'server-only';
import { createClient } from './supabase/server';
import { isSupabaseConfigured } from './supabase/config';
import { demoVehicles } from './demo-data';
import type { Vehicle, VehicleFilters } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromRow(row: any): Vehicle {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    version: row.version,
    year: row.year,
    price: Number(row.price),
    currency: row.currency ?? 'USD',
    km: row.km ?? 0,
    transmission: row.transmission,
    fuel: row.fuel,
    body: row.body,
    color: row.color,
    doors: row.doors,
    engine: row.engine,
    status: row.status,
    featured: Boolean(row.featured),
    description: row.description,
    features: row.features ?? [],
    images: row.images ?? [],
    createdAt: row.created_at,
  };
}

async function fetchAll(includeHidden = false): Promise<Vehicle[]> {
  let rows: Vehicle[];

  if (!isSupabaseConfigured) {
    // Todavía sin base de datos → datos de ejemplo (solo para previsualizar el diseño).
    rows = demoVehicles;
  } else {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      if (error) throw error;
      rows = (data ?? []).map(fromRow);
    } catch (e) {
      // Con base configurada NUNCA mostramos autos de ejemplo: preferimos vacío a datos falsos.
      console.error('[vehicles] Error consultando Supabase:', e);
      rows = [];
    }
  }

  // includeHidden = true (panel) muestra todo; el público no ve los vendidos en los listados.
  return includeHidden ? rows : rows.filter((v) => v.status !== 'vendido');
}

// Ordena y filtra en memoria (el inventario de una automotora es acotado).
export function applyFilters(list: Vehicle[], f: VehicleFilters = {}): Vehicle[] {
  let out = [...list];
  const q = f.q?.trim().toLowerCase();
  if (q) {
    out = out.filter((v) =>
      [v.brand, v.model, v.version, v.body, v.fuel, String(v.year)]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }
  if (f.brand) out = out.filter((v) => v.brand.toLowerCase() === f.brand!.toLowerCase());
  if (f.body) out = out.filter((v) => v.body === f.body);
  if (f.fuel) out = out.filter((v) => v.fuel === f.fuel);
  if (f.transmission) out = out.filter((v) => v.transmission === f.transmission);
  if (f.status) out = out.filter((v) => v.status === f.status);
  if (f.yearMin) out = out.filter((v) => v.year >= f.yearMin!);
  if (f.yearMax) out = out.filter((v) => v.year <= f.yearMax!);
  if (f.priceMin) out = out.filter((v) => v.price >= f.priceMin!);
  if (f.priceMax) out = out.filter((v) => v.price <= f.priceMax!);
  if (f.kmMax) out = out.filter((v) => v.km <= f.kmMax!);

  const rank = { disponible: 0, reservado: 1, vendido: 2 } as const;
  switch (f.sort) {
    case 'precio-asc':
      out.sort((a, b) => a.price - b.price);
      break;
    case 'precio-desc':
      out.sort((a, b) => b.price - a.price);
      break;
    case 'anio-desc':
      out.sort((a, b) => b.year - a.year);
      break;
    case 'km-asc':
      out.sort((a, b) => a.km - b.km);
      break;
    default:
      out.sort(
        (a, b) =>
          rank[a.status] - rank[b.status] ||
          Number(b.featured) - Number(a.featured)
      );
  }
  return out;
}

export async function getVehicles(f?: VehicleFilters): Promise<Vehicle[]> {
  return applyFilters(await fetchAll(), f);
}

export async function getAllVehiclesAdmin(): Promise<Vehicle[]> {
  return fetchAll(true);
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const all = await fetchAll(true);
  return all.find((v) => v.slug === slug) ?? null;
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const all = await fetchAll(true);
  return all.find((v) => v.id === id) ?? null;
}

export async function getFeatured(limit = 6): Promise<Vehicle[]> {
  const all = await fetchAll();
  const featured = all.filter((v) => v.featured && v.status !== 'vendido');
  return (featured.length ? featured : all.filter((v) => v.status !== 'vendido')).slice(0, limit);
}

export async function getBrands(): Promise<string[]> {
  const all = await fetchAll();
  return Array.from(new Set(all.map((v) => v.brand))).sort();
}

export async function getRelated(v: Vehicle, limit = 3): Promise<Vehicle[]> {
  const all = await fetchAll();
  return all
    .filter((x) => x.id !== v.id && x.status !== 'vendido')
    .sort((a, b) => {
      const sa = (a.body === v.body ? 2 : 0) + (a.brand === v.brand ? 1 : 0);
      const sb = (b.body === v.body ? 2 : 0) + (b.brand === v.brand ? 1 : 0);
      return sb - sa;
    })
    .slice(0, limit);
}

export function inventoryStats(list: Vehicle[]) {
  const available = list.filter((v) => v.status === 'disponible');
  const brands = new Set(list.map((v) => v.brand));
  return {
    total: list.length,
    available: available.length,
    brands: brands.size,
  };
}
