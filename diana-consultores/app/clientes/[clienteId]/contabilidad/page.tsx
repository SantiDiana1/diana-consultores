'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { getAsientosCliente, getResumenTrimestral, crearAsiento } from '@/services/mockApi';
import type { AsientoContable, ResumenContableTrimestre, TipoAsiento } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn, formatCurrency, formatDateShort } from '@/lib/utils';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ContabilidadPageProps {
  params: Promise<{ clienteId: string }>;
}

export default function ContabilidadClientePage({ params }: ContabilidadPageProps) {
  const { clienteId } = use(params);
  const [asientos, setAsientos] = useState<AsientoContable[]>([]);
  const [resumen, setResumen] = useState<ResumenContableTrimestre[]>([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2024);
  const [filtroTipo, setFiltroTipo] = useState<TipoAsiento | ''>('');
  const [showNuevo, setShowNuevo] = useState(false);

  useEffect(() => {
    Promise.all([
      getAsientosCliente(clienteId, undefined, year),
      getResumenTrimestral(clienteId, year),
    ]).then(([asientosData, resumenData]) => {
      setAsientos(asientosData);
      setResumen(resumenData);
      setLoading(false);
    });
  }, [clienteId, year]);

  const asientosFiltrados = filtroTipo ? asientos.filter((a) => a.tipo === filtroTipo) : asientos;

  const totalIngresos = resumen.reduce((sum, r) => sum + r.totalIngresos, 0);
  const totalGastos = resumen.reduce((sum, r) => sum + r.totalGastos, 0);
  const resultado = totalIngresos - totalGastos;

  const chartData = resumen.map((r) => ({
    name: r.trimestre,
    Ingresos: r.totalIngresos,
    Gastos: r.totalGastos,
    Resultado: r.resultadoBruto,
  }));

  const handleCrearAsiento = async () => {
    const nuevo = await crearAsiento({
      clienteId,
      fecha: new Date().toISOString().split('T')[0],
      tipo: 'ingreso',
      concepto: 'Nuevo asiento de prueba',
      importe: 1000,
      base: 826.45,
      iva: 173.55,
      trimestre: 'Q1',
      año: year,
      contabilizado: false,
    });
    setAsientos([nuevo, ...asientos]);
    setShowNuevo(false);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 rounded" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href={`/clientes/${clienteId}`} className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] transition-colors">
        <ArrowLeft size={14} /> Volver al cliente
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Contabilidad</h1>
          <p className="text-sm text-[#6B7280]">Año {year} · {asientos.length} asientos</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={year} onChange={(e) => setYear(+e.target.value)} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg">
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
          <button onClick={() => setShowNuevo(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4F67FF] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e0]">
            <Plus size={14} /> Nuevo Asiento
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {resumen.map((r) => (
          <div key={r.trimestre} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[#6B7280]">{r.trimestre}</h3>
              <span className={cn('text-xs font-medium', r.resultadoBruto >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]')}>
                {r.resultadoBruto >= 0 ? '+' : ''}{formatCurrency(r.resultadoBruto)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#22C55E]"><TrendingUp size={12} /> {formatCurrency(r.totalIngresos)}</span>
              <span className="flex items-center gap-1 text-[#EF4444]"><TrendingDown size={12} /> {formatCurrency(r.totalGastos)}</span>
            </div>
            <div className="mt-2 text-xs text-[#6B7280]">
              IVA neto: {formatCurrency(r.ivaNeto)}
            </div>
          </div>
        ))}
        {/* Total annual */}
        <div className="bg-gradient-to-br from-[#4F67FF] to-[#3d52e0] rounded-xl p-4 text-white shadow-sm col-span-4 lg:col-span-4" style={{ display: 'none' }} />
      </div>

      {/* Annual totals bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-[#6B7280]">Ingresos {year}</p>
            <p className="text-lg font-bold text-[#22C55E]">{formatCurrency(totalIngresos)}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280]">Gastos {year}</p>
            <p className="text-lg font-bold text-[#EF4444]">{formatCurrency(totalGastos)}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280]">Resultado {year}</p>
            <p className={cn('text-lg font-bold', resultado >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]')}>{formatCurrency(resultado)}</p>
          </div>
        </div>
        <ArrowUpDown size={16} className="text-[#6B7280]" />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#111827] mb-4">Evolución Trimestral</h3>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="Ingresos" fill="#22C55E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Gastos" fill="#EF4444" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="Resultado" stroke="#4F67FF" strokeWidth={2} dot={{ fill: '#4F67FF' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Entries table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-[#111827]">Asientos Contables</h3>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value as TipoAsiento | '')} className="px-2 py-1 text-xs border border-gray-200 rounded">
            <option value="">Todos los tipos</option>
            <option value="ingreso">Ingresos</option>
            <option value="gasto">Gastos</option>
            <option value="nomina">Nóminas</option>
            <option value="amortizacion">Amortizaciones</option>
            <option value="cuota_ss">Cuotas SS</option>
          </select>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-[#6B7280] uppercase border-b border-gray-50">
              <th className="px-4 py-2.5">Fecha</th>
              <th className="px-4 py-2.5">Concepto</th>
              <th className="px-4 py-2.5">Tipo</th>
              <th className="px-4 py-2.5">Trimestre</th>
              <th className="px-4 py-2.5 text-right">Importe</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {asientosFiltrados.slice(0, 20).map((a) => (
              <tr key={a.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-2.5 text-xs text-[#6B7280]">{formatDateShort(a.fecha)}</td>
                <td className="px-4 py-2.5 text-sm text-[#111827]">{a.concepto}</td>
                <td className="px-4 py-2.5">
                  <span className={cn('text-xs font-medium capitalize', a.tipo === 'ingreso' ? 'text-[#22C55E]' : a.tipo === 'gasto' ? 'text-[#EF4444]' : 'text-[#6B7280]')}>{a.tipo}</span>
                </td>
                <td className="px-4 py-2.5 text-xs text-[#6B7280] capitalize">{a.trimestre}</td>
                <td className={cn('px-4 py-2.5 text-sm font-medium text-right', a.tipo === 'ingreso' ? 'text-[#22C55E]' : a.tipo === 'gasto' ? 'text-[#EF4444]' : 'text-[#111827]')}>
                  {a.tipo === 'ingreso' ? '+' : a.tipo === 'gasto' ? '-' : ''}{formatCurrency(a.importe)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {asientosFiltrados.length === 0 && (
          <div className="text-center py-8 text-sm text-[#6B7280]">No hay asientos para este filtro</div>
        )}
      </div>

      {/* New entry dialog (simplified) */}
      {showNuevo && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowNuevo(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50 p-6 w-[400px]">
            <h2 className="text-lg font-semibold text-[#111827] mb-4">Nuevo Asiento (Demo)</h2>
            <p className="text-sm text-[#6B7280] mb-4">Se creará un asiento de ejemplo de 1.000€</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowNuevo(false)} className="px-4 py-2 text-sm text-[#6B7280] hover:bg-gray-100 rounded-lg">Cancelar</button>
              <button onClick={handleCrearAsiento} className="px-4 py-2 text-sm font-medium text-white bg-[#4F67FF] rounded-lg hover:bg-[#3d52e0]">Crear Asiento</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
