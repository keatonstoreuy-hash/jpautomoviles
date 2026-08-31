import Link from 'next/link';
import { getAllVehiclesAdmin, inventoryStats } from '@/lib/vehicles';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { VehicleTable } from '@/components/admin/VehicleTable';
import { SetupNotice } from '@/components/admin/SetupNotice';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const vehicles = await getAllVehiclesAdmin();
  const stats = inventoryStats(vehicles);
  const sold = vehicles.filter((v) => v.status === 'vendido').length;

  return (
    <div className="space-y-6">
      {!isSupabaseConfigured && <SetupNotice />}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-600">Catálogo</h1>
          <p className="text-sm text-steel-600">Gestioná los vehículos que se muestran en el sitio.</p>
        </div>
        {isSupabaseConfigured && (
          <Link href="/admin/nuevo" className="btn-primary">+ Nuevo vehículo</Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { n: stats.total, l: 'Total cargados' },
          { n: stats.available, l: 'Disponibles' },
          { n: sold, l: 'Vendidos' },
          { n: stats.brands, l: 'Marcas' },
        ].map((s) => (
          <div key={s.l} className="card p-4">
            <p className="font-display text-2xl font-700">{s.n}</p>
            <p className="text-xs text-steel-500">{s.l}</p>
          </div>
        ))}
      </div>

      <VehicleTable vehicles={vehicles} editable={isSupabaseConfigured} />
    </div>
  );
}
