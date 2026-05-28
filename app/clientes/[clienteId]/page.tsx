'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getClienteById, getNotasCliente, crearNotaCliente, getHistorialCliente } from '@/services/mockApi';
import type { Cliente, NotaCliente, HistorialEvento } from '@/types';
import { ClienteStatusBadge } from '@/components/clientes/ClienteStatusBadge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { ArrowLeft, Mail, Phone, AlertCircle, FileText, Calculator, Receipt, Clock, StickyNote, Plus, Send } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ClienteDetallePageProps {
  params: Promise<{ clienteId: string }>;
}

const regimenLabels: Record<string, string> = {
  estimacion_directa: 'Estimación Directa',
  estimacion_objetiva: 'Estimación Objetiva',
  sociedad_limitada: 'Sociedad Limitada',
  autonomo_profesional: 'Autónomo Profesional',
};

type Tab = 'resumen' | 'documentos' | 'contabilidad' | 'impuestos' | 'historial';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'resumen', label: 'Resumen', icon: <StickyNote size={15} /> },
  { id: 'documentos', label: 'Documentos', icon: <FileText size={15} /> },
  { id: 'contabilidad', label: 'Contabilidad', icon: <Calculator size={15} /> },
  { id: 'impuestos', label: 'Impuestos', icon: <Receipt size={15} /> },
  { id: 'historial', label: 'Historial', icon: <Clock size={15} /> },
];

export default function ClienteDetallePage({ params }: ClienteDetallePageProps) {
  const { clienteId } = use(params);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as Tab | null;
  const [activeTab, setActiveTab] = useState<Tab>(tabParam || 'resumen');
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [notas, setNotas] = useState<NotaCliente[]>([]);
  const [historial, setHistorial] = useState<HistorialEvento[]>([]);
  const [nuevaNota, setNuevaNota] = useState('');

  useEffect(() => {
    Promise.all([
      getClienteById(clienteId),
      getNotasCliente(clienteId),
      getHistorialCliente(clienteId),
    ]).then(([data, notasData, historialData]) => {
      setCliente(data ?? null);
      setNotas(notasData);
      setHistorial(historialData);
      setLoading(false);
    });
  }, [clienteId]);

  const handleCrearNota = async () => {
    if (!nuevaNota.trim()) return;
    const nota = await crearNotaCliente({ clienteId, texto: nuevaNota, autor: 'Mapi y Ximo', tipo: 'nota_interna' });
    setNotas([nota, ...notas]);
    setNuevaNota('');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 rounded" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6B7280]">Cliente no encontrado</p>
        <Link href="/clientes" className="text-[#4F67FF] text-sm mt-2 inline-block">
          ← Volver a clientes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Back link */}
      <Link href="/clientes" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] transition-colors">
        <ArrowLeft size={14} />
        Volver a clientes
      </Link>

      {/* Sticky header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#4F67FF]/10 flex items-center justify-center text-[#4F67FF] font-bold text-base">
              {cliente.nombre.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#111827]">{cliente.nombre}</h1>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <span className="font-mono">{cliente.cifNif}</span>
                <span>·</span>
                <span>{regimenLabels[cliente.regimen]}</span>
                <span>·</span>
                <span>{cliente.asesorAsignado}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {cliente.alertas.length > 0 && (
              <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                <AlertCircle size={12} /> {cliente.alertas.length} alerta{cliente.alertas.length > 1 ? 's' : ''}
              </span>
            )}
            <ClienteStatusBadge estado={cliente.estadoTrimestre} />
          </div>
        </div>
      </div>

      {/* Tabs nav */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors',
              activeTab === tab.id ? 'bg-white shadow-sm font-medium text-[#111827]' : 'text-[#6B7280] hover:text-[#111827]'
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'resumen' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Contact & fiscal info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-[#111827]">Información</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-[#111827]">
                <Mail size={14} className="text-[#6B7280]" /> {cliente.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#111827]">
                <Phone size={14} className="text-[#6B7280]" /> {cliente.telefono}
              </div>
              <div className="text-sm text-[#6B7280]">Alta: {formatDate(cliente.fechaAlta)}</div>
              <div className="text-sm text-[#6B7280]">Última actividad: {formatDate(cliente.ultimaActividad)}</div>
            </div>
            {cliente.alertas.length > 0 && (
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <h4 className="text-xs font-medium text-[#EF4444]">Alertas</h4>
                {cliente.alertas.map((a, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-sm text-[#EF4444]">
                    <AlertCircle size={12} className="mt-0.5 shrink-0" /> {a}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#111827]">Accesos Rápidos</h3>
            <Link href={`/clientes/${clienteId}/documentos`} className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm text-[#111827]">
              <FileText size={16} className="text-[#4F67FF]" /> Gestión Documental
            </Link>
            <Link href={`/clientes/${clienteId}/contabilidad`} className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm text-[#111827]">
              <Calculator size={16} className="text-[#4F67FF]" /> Contabilidad
            </Link>
            <Link href={`/clientes/${clienteId}/impuestos`} className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm text-[#111827]">
              <Receipt size={16} className="text-[#4F67FF]" /> Impuestos
            </Link>
          </div>

          {/* Notas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#111827]">Notas</h3>
              <span className="text-xs text-[#6B7280]">{notas.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nuevaNota}
                onChange={(e) => setNuevaNota(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCrearNota(); }}
                placeholder="Añadir nota..."
                className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg"
              />
              <button onClick={handleCrearNota} disabled={!nuevaNota.trim()} className="p-1.5 bg-[#4F67FF] text-white rounded-lg disabled:opacity-50">
                <Send size={12} />
              </button>
            </div>
            <div className="space-y-2 max-h-[250px] overflow-y-auto">
              {notas.map((n) => (
                <div key={n.id} className="bg-gray-50 rounded-lg p-2.5">
                  <p className="text-sm text-[#111827]">{n.texto}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-[#6B7280]">{n.autor}</span>
                    <span className="text-xs text-[#6B7280]">{formatRelativeTime(n.fecha)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documentos' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <FileText size={40} className="text-[#6B7280] mx-auto mb-3" />
          <p className="text-sm text-[#6B7280] mb-3">Gestiona los documentos de este cliente</p>
          <Link href={`/clientes/${clienteId}/documentos`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4F67FF] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e0]">
            Ir a Documentos
          </Link>
        </div>
      )}

      {activeTab === 'contabilidad' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <Calculator size={40} className="text-[#6B7280] mx-auto mb-3" />
          <p className="text-sm text-[#6B7280] mb-3">Consulta la contabilidad de este cliente</p>
          <Link href={`/clientes/${clienteId}/contabilidad`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4F67FF] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e0]">
            Ir a Contabilidad
          </Link>
        </div>
      )}

      {activeTab === 'impuestos' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <Receipt size={40} className="text-[#6B7280] mx-auto mb-3" />
          <p className="text-sm text-[#6B7280] mb-3">Gestiona las obligaciones fiscales</p>
          <Link href={`/clientes/${clienteId}/impuestos`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4F67FF] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e0]">
            Ir a Impuestos
          </Link>
        </div>
      )}

      {activeTab === 'historial' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-[#111827] mb-4">Historial de Eventos</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-4">
              {historial.map((evento) => (
                <div key={evento.id} className="flex items-start gap-3 pl-8 relative">
                  <div className="absolute left-3 top-1.5 w-2.5 h-2.5 rounded-full bg-[#4F67FF] border-2 border-white" />
                  <div className="flex-1">
                    <p className="text-sm text-[#111827]">{evento.descripcion}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#6B7280]">{evento.autor}</span>
                      <span className="text-xs text-[#6B7280]">·</span>
                      <span className="text-xs text-[#6B7280]">{formatRelativeTime(evento.fecha)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
