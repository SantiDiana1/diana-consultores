'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { getArchivosCliente, subirArchivoCliente, eliminarArchivo } from '@/services/mockApi';
import type { ArchivoCliente, CarpetaDoc } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn, formatDateShort } from '@/lib/utils';
import { ArrowLeft, FolderOpen, File, Upload, Trash2, LayoutGrid, List, Download, Search } from 'lucide-react';
import Link from 'next/link';

interface DocumentosPageProps {
  params: Promise<{ clienteId: string }>;
}

const carpetas: { id: CarpetaDoc; label: string; color: string }[] = [
  { id: 'facturas_emitidas', label: 'Facturas Emitidas', color: 'text-blue-600' },
  { id: 'facturas_recibidas', label: 'Facturas Recibidas', color: 'text-purple-600' },
  { id: 'nominas', label: 'Nóminas', color: 'text-green-600' },
  { id: 'modelos_fiscales', label: 'Modelos Fiscales', color: 'text-orange-600' },
  { id: 'contratos', label: 'Contratos', color: 'text-red-600' },
  { id: 'escrituras', label: 'Escrituras', color: 'text-indigo-600' },
  { id: 'extractos', label: 'Extractos', color: 'text-gray-600' },
];

export default function DocumentosClientePage({ params }: DocumentosPageProps) {
  const { clienteId } = use(params);
  const [archivos, setArchivos] = useState<ArchivoCliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [carpetaActiva, setCarpetaActiva] = useState<CarpetaDoc | 'todas'>('todas');
  const [vista, setVista] = useState<'grid' | 'lista'>('lista');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    getArchivosCliente(clienteId).then((data) => {
      setArchivos(data);
      setLoading(false);
    });
  }, [clienteId]);

  const archivosFiltrados = archivos.filter((a) => {
    if (carpetaActiva !== 'todas' && a.carpeta !== carpetaActiva) return false;
    if (busqueda && !a.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  const handleSubir = async () => {
    const carpeta = carpetaActiva === 'todas' ? 'facturas_recibidas' : carpetaActiva;
    const archivo = await subirArchivoCliente(clienteId, {} as File, carpeta);
    setArchivos([archivo, ...archivos]);
  };

  const handleEliminar = async (archivoId: string) => {
    await eliminarArchivo(archivoId);
    setArchivos(archivos.filter((a) => a.id !== archivoId));
  };

  const formatSize = (size: string) => size;

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
          <h1 className="text-xl font-bold text-[#111827]">Gestión Documental</h1>
          <p className="text-sm text-[#6B7280]">{archivos.length} archivos</p>
        </div>
        <button onClick={handleSubir} className="flex items-center gap-1.5 px-3 py-2 bg-[#4F67FF] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e0] transition-colors">
          <Upload size={14} /> Subir Archivo
        </button>
      </div>

      {/* Two-panel layout */}
      <div className="flex gap-4">
        {/* Folder tree */}
        <div className="w-56 shrink-0 bg-white rounded-xl border border-gray-100 p-3 space-y-1">
          <button
            onClick={() => setCarpetaActiva('todas')}
            className={cn('w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left', carpetaActiva === 'todas' ? 'bg-[#4F67FF]/10 text-[#4F67FF] font-medium' : 'text-[#6B7280] hover:bg-gray-50')}
          >
            <FolderOpen size={16} /> Todas ({archivos.length})
          </button>
          {carpetas.map((c) => {
            const count = archivos.filter((a) => a.carpeta === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCarpetaActiva(c.id)}
                className={cn('w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left', carpetaActiva === c.id ? 'bg-[#4F67FF]/10 text-[#4F67FF] font-medium' : 'text-[#6B7280] hover:bg-gray-50')}
              >
                <FolderOpen size={16} className={c.color} /> {c.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 flex-1">
              <Search size={14} className="text-[#6B7280]" />
              <input type="text" placeholder="Buscar archivo..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="flex-1 text-sm border-none outline-none" />
            </div>
            <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded">
              <button onClick={() => setVista('lista')} className={cn('p-1 rounded', vista === 'lista' ? 'bg-white shadow-sm' : '')}><List size={14} /></button>
              <button onClick={() => setVista('grid')} className={cn('p-1 rounded', vista === 'grid' ? 'bg-white shadow-sm' : '')}><LayoutGrid size={14} /></button>
            </div>
          </div>

          {/* Files */}
          {vista === 'lista' ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 text-left text-xs text-[#6B7280] uppercase">
                  <th className="px-4 py-2.5">Nombre</th>
                  <th className="px-4 py-2.5">Carpeta</th>
                  <th className="px-4 py-2.5">Tamaño</th>
                  <th className="px-4 py-2.5">Fecha</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {archivosFiltrados.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-2.5 flex items-center gap-2">
                      <File size={14} className="text-[#6B7280]" />
                      <span className="text-sm text-[#111827]">{a.nombre}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-xs text-[#6B7280] capitalize">{a.carpeta.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-[#6B7280]">{formatSize(a.tamano)}</td>
                    <td className="px-4 py-2.5 text-xs text-[#6B7280]">{formatDateShort(a.fechaSubida)}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded"><Download size={12} className="text-[#6B7280]" /></button>
                        <button onClick={() => handleEliminar(a.id)} className="p-1 hover:bg-red-50 rounded"><Trash2 size={12} className="text-[#EF4444]" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-3 gap-3 p-4">
              {archivosFiltrados.map((a) => (
                <div key={a.id} className="border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow">
                  <File size={24} className="text-[#6B7280] mb-2" />
                  <p className="text-sm font-medium text-[#111827] truncate">{a.nombre}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{formatSize(a.tamano)} · {formatDateShort(a.fechaSubida)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <button className="p-1 hover:bg-gray-100 rounded"><Download size={12} className="text-[#6B7280]" /></button>
                    <button onClick={() => handleEliminar(a.id)} className="p-1 hover:bg-red-50 rounded"><Trash2 size={12} className="text-[#EF4444]" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {archivosFiltrados.length === 0 && (
            <div className="text-center py-12 text-sm text-[#6B7280]">No hay archivos en esta carpeta</div>
          )}
        </div>
      </div>
    </div>
  );
}
