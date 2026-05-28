'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { getObligacionesFiscales, actualizarObligacion } from '@/services/mockApi';
import type { ObligacionFiscal, EstadoModelo } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn, formatDateShort } from '@/lib/utils';
import { ArrowLeft, Calendar, CheckCircle2, Clock, XCircle, FileText, Upload } from 'lucide-react';
import Link from 'next/link';

interface ImpuestosPageProps {
  params: Promise<{ clienteId: string }>;
}

const estadoConfig: Record<EstadoModelo, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  pendiente: { icon: <Clock size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-100', label: 'Pendiente' },
  en_preparacion: { icon: <FileText size={14} />, color: 'text-blue-700', bg: 'bg-blue-100', label: 'En Preparación' },
  listo_para_presentar: { icon: <CheckCircle2 size={14} />, color: 'text-purple-700', bg: 'bg-purple-100', label: 'Listo' },
  presentado: { icon: <CheckCircle2 size={14} />, color: 'text-green-700', bg: 'bg-green-100', label: 'Presentado' },
  domiciliado: { icon: <CheckCircle2 size={14} />, color: 'text-teal-700', bg: 'bg-teal-100', label: 'Domiciliado' },
  no_aplica: { icon: <XCircle size={14} />, color: 'text-gray-500', bg: 'bg-gray-100', label: 'No Aplica' },
};

export default function ImpuestosClientePage({ params }: ImpuestosPageProps) {
  const { clienteId } = use(params);
  const [obligaciones, setObligaciones] = useState<ObligacionFiscal[]>([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2024);
  const [detalle, setDetalle] = useState<ObligacionFiscal | null>(null);

  useEffect(() => {
    getObligacionesFiscales(clienteId, year).then((data) => {
      setObligaciones(data);
      setLoading(false);
    });
  }, [clienteId, year]);

  const handleCambiarEstado = async (id: string, nuevoEstado: EstadoModelo) => {
    await actualizarObligacion(id, { estado: nuevoEstado });
    setObligaciones(obligaciones.map((o) => o.id === id ? { ...o, estado: nuevoEstado } : o));
    if (detalle && detalle.id === id) {
      setDetalle({ ...detalle, estado: nuevoEstado });
    }
  };

  // Group by period
  const periodos = [...new Set(obligaciones.map((o) => o.periodo))].sort();
  const modelos = [...new Set(obligaciones.map((o) => o.modelo))];

  const pendientes = obligaciones.filter((o) => o.estado === 'pendiente' || o.estado === 'en_preparacion').length;
  const presentados = obligaciones.filter((o) => o.estado === 'presentado' || o.estado === 'domiciliado').length;
  const listos = obligaciones.filter((o) => o.estado === 'listo_para_presentar').length;

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 rounded" />
        <Skeleton className="h-96 rounded-xl" />
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
          <h1 className="text-xl font-bold text-[#111827]">Gestión Fiscal</h1>
          <p className="text-sm text-[#6B7280]">Año {year} · {obligaciones.length} obligaciones</p>
        </div>
        <select value={year} onChange={(e) => setYear(+e.target.value)} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg">
          <option value={2024}>2024</option>
          <option value={2023}>2023</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <p className="text-xs text-[#6B7280] mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-[#F59E0B]">{pendientes}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <p className="text-xs text-[#6B7280] mb-1">Presentados</p>
          <p className="text-2xl font-bold text-[#22C55E]">{presentados}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <p className="text-xs text-[#6B7280] mb-1">Listos para Presentar</p>
          <p className="text-2xl font-bold text-[#4F67FF]">{listos}</p>
        </div>
      </div>

      {/* Grid by period x model */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-[#111827]">Obligaciones por Periodo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-[#6B7280] uppercase border-b border-gray-50">
                <th className="px-4 py-2.5">Periodo</th>
                {modelos.map((m) => <th key={m} className="px-4 py-2.5 text-center">{m}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {periodos.map((periodo) => (
                <tr key={periodo} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-[#111827]">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#6B7280]" /> {periodo}
                    </div>
                  </td>
                  {modelos.map((modelo) => {
                    const ob = obligaciones.find((o) => o.periodo === periodo && o.modelo === modelo);
                    if (!ob) return <td key={modelo} className="px-4 py-3 text-center text-xs text-[#6B7280]">—</td>;
                    const config = estadoConfig[ob.estado];
                    return (
                      <td key={modelo} className="px-4 py-3 text-center">
                        <button
                          onClick={() => setDetalle(ob)}
                          className={cn('inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full', config.bg, config.color)}
                        >
                          {config.icon} {config.label}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detalle drawer */}
      {detalle && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setDetalle(null)} />
          <div className="fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-xl">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-[#111827]">{detalle.modelo}</h2>
                <button onClick={() => setDetalle(null)} className="text-[#6B7280] hover:text-[#111827]">✕</button>
              </div>
              <div className="flex-1 px-6 py-4 space-y-5">
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Periodo</p>
                  <p className="text-sm font-medium text-[#111827]">{detalle.periodo}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Fecha Límite</p>
                  <p className="text-sm font-medium text-[#111827]">{formatDateShort(detalle.fechaLimite)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] mb-1">Estado</p>
                  <select
                    value={detalle.estado}
                    onChange={(e) => handleCambiarEstado(detalle.id, e.target.value as EstadoModelo)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en_preparacion">En Preparación</option>
                    <option value="listo_para_presentar">Listo para Presentar</option>
                    <option value="presentado">Presentado</option>
                    <option value="domiciliado">Domiciliado</option>
                    <option value="no_aplica">No Aplica</option>
                  </select>
                </div>
                {detalle.importeResultado !== undefined && (
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Resultado</p>
                    <p className={cn('text-lg font-bold', detalle.importeResultado >= 0 ? 'text-[#EF4444]' : 'text-[#22C55E]')}>
                      {detalle.importeResultado >= 0 ? 'A pagar: ' : 'A devolver: '}{Math.abs(detalle.importeResultado).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </p>
                  </div>
                )}
                {detalle.fechaPresentacion && (
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Fecha Presentación</p>
                    <p className="text-sm text-[#111827]">{formatDateShort(detalle.fechaPresentacion)}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-[#6B7280] mb-2">Justificante</p>
                  {detalle.documentoId ? (
                    <p className="text-sm text-[#22C55E] flex items-center gap-1"><CheckCircle2 size={14} /> Adjuntado</p>
                  ) : (
                    <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 text-sm text-[#6B7280] rounded-lg hover:bg-gray-100">
                      <Upload size={14} /> Subir justificante
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
