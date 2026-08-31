import type { MetadataRoute } from 'next';
import { getVehicles } from '@/lib/vehicles';
import { site } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, '');
  const staticRoutes = ['', '/catalogo', '/financiacion', '/permuta'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }));

  let vehicles: Awaited<ReturnType<typeof getVehicles>> = [];
  try {
    vehicles = await getVehicles();
  } catch {
    vehicles = [];
  }

  const vehicleRoutes = vehicles.map((v) => ({
    url: `${base}/vehiculos/${v.slug}`,
    lastModified: v.createdAt ? new Date(v.createdAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
