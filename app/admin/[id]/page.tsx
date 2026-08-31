import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VehicleForm } from '@/components/admin/VehicleForm';
import { getVehicleById } from '@/lib/vehicles';

export const dynamic = 'force-dynamic';

export default async function EditarVehiculo({ params }: { params: { id: string } }) {
  const vehicle = await getVehicleById(params.id);
  if (!vehicle) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-steel-500 hover:text-ink">← Volver al catálogo</Link>
        <h1 className="mt-1 font-display text-2xl font-600">
          Editar: {vehicle.brand} {vehicle.model} {vehicle.year}
        </h1>
      </div>
      <VehicleForm initial={vehicle} />
    </div>
  );
}
