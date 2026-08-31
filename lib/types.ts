export type VehicleStatus = 'disponible' | 'reservado' | 'vendido';
export type Transmission = 'manual' | 'automatica';
export type FuelType = 'nafta' | 'diesel' | 'hibrido' | 'electrico' | 'gnc';
export type BodyType =
  | 'sedan'
  | 'hatchback'
  | 'suv'
  | 'pickup'
  | 'camioneta'
  | 'utilitario'
  | 'coupe';

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version?: string | null;
  year: number;
  price: number; // USD
  currency: 'USD' | 'UYU';
  km: number;
  transmission: Transmission;
  fuel: FuelType;
  body: BodyType;
  color?: string | null;
  doors?: number | null;
  engine?: string | null;
  status: VehicleStatus;
  featured: boolean;
  description?: string | null;
  features: string[];
  images: string[];
  createdAt?: string;
}

export interface VehicleFilters {
  q?: string;
  brand?: string;
  body?: string;
  fuel?: string;
  transmission?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  kmMax?: number;
  status?: string;
  sort?: string;
}
