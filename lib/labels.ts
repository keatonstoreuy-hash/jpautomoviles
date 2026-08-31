import type { BodyType, FuelType, Transmission, VehicleStatus } from './types';

export const fuelLabels: Record<FuelType, string> = {
  nafta: 'Nafta',
  diesel: 'Diésel',
  hibrido: 'Híbrido',
  electrico: 'Eléctrico',
  gnc: 'GNC',
};

export const transmissionLabels: Record<Transmission, string> = {
  manual: 'Manual',
  automatica: 'Automática',
};

export const bodyLabels: Record<BodyType, string> = {
  sedan: 'Sedán',
  hatchback: 'Hatchback',
  suv: 'SUV',
  pickup: 'Pick up',
  camioneta: 'Camioneta',
  utilitario: 'Utilitario',
  coupe: 'Coupé',
};

export const statusLabels: Record<VehicleStatus, string> = {
  disponible: 'Disponible',
  reservado: 'Reservado',
  vendido: 'Vendido',
};

export const fuelOptions = Object.entries(fuelLabels).map(([value, label]) => ({ value, label }));
export const transmissionOptions = Object.entries(transmissionLabels).map(([value, label]) => ({ value, label }));
export const bodyOptions = Object.entries(bodyLabels).map(([value, label]) => ({ value, label }));
export const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({ value, label }));
