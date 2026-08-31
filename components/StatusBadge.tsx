import { statusLabels } from '@/lib/labels';
import type { VehicleStatus } from '@/lib/types';

const styles: Record<VehicleStatus, string> = {
  disponible: 'bg-white text-ink ring-1 ring-ink/10',
  reservado: 'bg-gold text-ink',
  vendido: 'bg-ink text-white',
};

const dot: Record<VehicleStatus, string> = {
  disponible: 'bg-gold',
  reservado: 'bg-ink',
  vendido: 'bg-white/70',
};

export function StatusBadge({ status, className = '' }: { status: VehicleStatus; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[11px] font-800 uppercase tracking-wide ${styles[status]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {statusLabels[status]}
    </span>
  );
}
