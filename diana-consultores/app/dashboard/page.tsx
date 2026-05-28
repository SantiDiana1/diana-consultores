'use client';

import { Users, Inbox, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';
import { MetricCard } from '@/components/dashboard-asesor/MetricCard';
import { TareasUrgentes } from '@/components/dashboard-asesor/TareasUrgentes';
import { ResumenTrimestral } from '@/components/dashboard-asesor/ResumenTrimestral';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatRelativeTime } from '@/lib/utils';

const actividadReciente = [
  { clienteNombre: 'Tech Innovación S.L.', tipo: 'Factura recibida', fecha: '2026-05-28T08:30:00Z', iniciales: 'TI' },
  { clienteNombre: 'Ana López Diseño', tipo: 'Factura emitida', fecha: '2026-05-28T08:00:00Z', iniciales: 'AL' },
  { clienteNombre: 'Clínica Dental Sonrisa', tipo: 'Extracto bancario', fecha: '2026-05-27T16:45:00Z', iniciales: 'CD' },
  { clienteNombre: 'Restaurante El Palmeral', tipo: 'Factura recibida', fecha: '2026-05-27T14:20:00Z', iniciales: 'EP' },
  { clienteNombre: 'Construcciones Pérez', tipo: 'Contrato', fecha: '2026-05-27T10:00:00Z', iniciales: 'CP' },
];

export default function DashboardPage() {
  const { metricas, tareas, loading, marcarCompletada } = useDashboardMetrics();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Dashboard</h1>
        <p className="text-sm text-[#6B7280]">Resumen de actividad de la gestoría</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Clientes Activos"
          value={metricas?.clientesActivos ?? 0}
          icon={<Users size={20} className="text-[#4F67FF]" />}
          subtitle="+3 vs mes anterior"
        />
        <MetricCard
          title="Facturas en Buzón"
          value={metricas?.facturasPendientesRevision ?? 0}
          icon={<Inbox size={20} className="text-[#4F67FF]" />}
          variant={(metricas?.facturasPendientesRevision ?? 0) > 20 ? 'danger' : 'default'}
          subtitle="Pendientes de revisión"
        />
        <ResumenTrimestral
          presentados={metricas?.modelosPresentadosMes ?? 0}
          total={(metricas?.modelosPresentadosMes ?? 0) + (metricas?.modelosPendientesMes ?? 0)}
        />
        <MetricCard
          title="Alertas Urgentes"
          value={metricas?.alertasUrgentes ?? 0}
          icon={<AlertTriangle size={20} className="text-[#EF4444]" />}
          variant="danger"
          subtitle="Requieren atención"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - tasks */}
        <div className="lg:col-span-2">
          <TareasUrgentes tareas={tareas} onCompletar={marcarCompletada} />
        </div>

        {/* Right column - recent activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[#111827]">Actividad Reciente</h2>
          </div>
          <ul className="divide-y divide-gray-100">
            {actividadReciente.map((item, i) => (
              <li key={i} className="px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4F67FF]/10 flex items-center justify-center text-[#4F67FF] text-xs font-medium shrink-0">
                  {item.iniciales}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827] truncate">{item.clienteNombre}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <FileText size={10} />
                    <span>{item.tipo}</span>
                    <span>·</span>
                    <span>{formatRelativeTime(item.fecha)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
