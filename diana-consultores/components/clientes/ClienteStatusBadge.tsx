import { cn } from '@/lib/utils';
import type { EstadoTrimestre } from '@/types';

interface ClienteStatusBadgeProps {
  estado: EstadoTrimestre;
}

const estadoConfig: Record<EstadoTrimestre, { label: string; classes: string }> = {
  en_proceso: { label: 'En proceso', classes: 'bg-blue-100 text-blue-700' },
  listo_para_presentar: { label: 'Listo para presentar', classes: 'bg-yellow-100 text-yellow-700' },
  presentado: { label: 'Presentado', classes: 'bg-green-100 text-green-700' },
  pendiente_documentacion: { label: 'Pendiente doc.', classes: 'bg-red-100 text-red-700' },
};

export function ClienteStatusBadge({ estado }: ClienteStatusBadgeProps) {
  const config = estadoConfig[estado];
  return (
    <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', config.classes)}>
      {config.label}
    </span>
  );
}
