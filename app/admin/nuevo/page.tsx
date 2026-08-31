import Link from 'next/link';
import { VehicleForm } from '@/components/admin/VehicleForm';

export default function NuevoVehiculo() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-steel-500 hover:text-ink">← Volver al catálogo</Link>
        <h1 className="mt-1 font-display text-2xl font-600">Nuevo vehículo</h1>
      </div>
      <VehicleForm />
    </div>
  );
}
