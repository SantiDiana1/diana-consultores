'use client';

import { useEffect, useState } from 'react';
import { getMovimientosFinancieros } from '@/services/mockApi';
import type { MovimientoFinanciero } from '@/types';
import { FinancialChart } from '@/components/portal-cliente/FinancialChart';
import { IVAEstimacion } from '@/components/portal-cliente/IVAEstimacion';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export default function PortalClientePage() {
  const [movimientos, setMovimientos] = useState<MovimientoFinanciero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovimientosFinancieros().then((data) => {
      setMovimientos(data);
      setLoading(false);
    });
  }, []);

  const ingresosYTD = movimientos.reduce((sum, m) => sum + m.ingresos, 0);
  const gastosYTD = movimientos.reduce((sum, m) => sum + m.gastos, 0);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-72 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Bienvenida, Demo Corp S.L. 👋</h1>
        <p className="text-sm text-[#6B7280]">Aquí tienes el resumen de tu negocio</p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <IVAEstimacion monto={4850} periodo="Q2" fechaPago="julio" />
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">Ingresos YTD</p>
              <p className="text-2xl font-bold text-[#22C55E] mt-1">{formatCurrency(ingresosYTD)}</p>
              <p className="text-xs text-[#6B7280] mt-1">Acumulado del año</p>
            </div>
            <div className="p-2.5 rounded-lg bg-green-50">
              <TrendingUp size={20} className="text-[#22C55E]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">Gastos YTD</p>
              <p className="text-2xl font-bold text-[#EF4444] mt-1">{formatCurrency(gastosYTD)}</p>
              <p className="text-xs text-[#6B7280] mt-1">Acumulado del año</p>
            </div>
            <div className="p-2.5 rounded-lg bg-red-50">
              <TrendingDown size={20} className="text-[#EF4444]" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <FinancialChart data={movimientos} />

      {/* Obligations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-lg font-semibold text-[#111827] mb-4">Próximas Obligaciones</h3>
        <ul className="space-y-3">
          {[
            { fecha: '20/07/2026', tipo: 'Modelo 303 - IVA Q2', estado: 'Pendiente' },
            { fecha: '20/07/2026', tipo: 'Modelo 130 - IRPF Q2', estado: 'Pendiente' },
            { fecha: '30/07/2026', tipo: 'Impuesto Sociedades', estado: 'Pendiente' },
          ].map((item, i) => (
            <li key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-[#6B7280]" />
                <div>
                  <p className="text-sm font-medium text-[#111827]">{item.tipo}</p>
                  <p className="text-xs text-[#6B7280]">{item.fecha}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                {item.estado}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
