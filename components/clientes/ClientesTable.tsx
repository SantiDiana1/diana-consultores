'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { Cliente, EstadoTrimestre, RegimenFiscal } from '@/types';
import { ClienteStatusBadge } from './ClienteStatusBadge';
import { formatRelativeTime } from '@/lib/utils';

interface ClientesTableProps {
  clientes: Cliente[];
}

const regimenLabels: Record<RegimenFiscal, string> = {
  estimacion_directa: 'Estimación Directa',
  estimacion_objetiva: 'Estimación Objetiva',
  sociedad_limitada: 'Sociedad Limitada',
  autonomo_profesional: 'Autónomo Profesional',
};

export function ClientesTable({ clientes }: ClientesTableProps) {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<EstadoTrimestre | ''>('');
  const [filtroRegimen, setFiltroRegimen] = useState<RegimenFiscal | ''>('');

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      const matchBusqueda =
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.cifNif.toLowerCase().includes(busqueda.toLowerCase());
      const matchEstado = filtroEstado === '' || c.estadoTrimestre === filtroEstado;
      const matchRegimen = filtroRegimen === '' || c.regimen === filtroRegimen;
      return matchBusqueda && matchEstado && matchRegimen;
    });
  }, [clientes, busqueda, filtroEstado, filtroRegimen]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Buscar por nombre o CIF/NIF..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F67FF]/20 focus:border-[#4F67FF] bg-white"
          />
        </div>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value as EstadoTrimestre | '')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#4F67FF]/20"
        >
          <option value="">Todos los estados</option>
          <option value="en_proceso">En proceso</option>
          <option value="listo_para_presentar">Listo para presentar</option>
          <option value="presentado">Presentado</option>
          <option value="pendiente_documentacion">Pendiente documentación</option>
        </select>
        <select
          value={filtroRegimen}
          onChange={(e) => setFiltroRegimen(e.target.value as RegimenFiscal | '')}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#4F67FF]/20"
        >
          <option value="">Todos los regímenes</option>
          <option value="estimacion_directa">Estimación Directa</option>
          <option value="estimacion_objetiva">Estimación Objetiva</option>
          <option value="sociedad_limitada">Sociedad Limitada</option>
          <option value="autonomo_profesional">Autónomo Profesional</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Cliente</th>
                <th className="text-left px-5 py-3 text-[#6B7280] font-medium">CIF/NIF</th>
                <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Régimen</th>
                <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Estado Trimestre</th>
                <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Facturas en Buzón</th>
                <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Última Actividad</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr
                  key={cliente.id}
                  onClick={() => router.push(`/clientes/${cliente.id}`)}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#4F67FF]/10 flex items-center justify-center text-[#4F67FF] font-medium text-xs">
                        {cliente.nombre.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-[#111827]">{cliente.nombre}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#6B7280] font-mono text-xs">{cliente.cifNif}</td>
                  <td className="px-5 py-3 text-[#6B7280]">{regimenLabels[cliente.regimen]}</td>
                  <td className="px-5 py-3">
                    <ClienteStatusBadge estado={cliente.estadoTrimestre} />
                  </td>
                  <td className="px-5 py-3">
                    {cliente.facturasEnBuzon > 0 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                        {cliente.facturasEnBuzon}
                      </span>
                    ) : (
                      <span className="text-[#6B7280]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-[#6B7280]">
                    {formatRelativeTime(cliente.ultimaActividad)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {clientesFiltrados.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-[#6B7280]">No se encontraron clientes con esos filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}
