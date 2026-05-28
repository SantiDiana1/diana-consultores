'use client';

import { useState } from 'react';
import { useDocumentos } from '@/hooks/useDocumentos';
import { DocumentoRow } from '@/components/buzon/DocumentoRow';
import { ValidarDialog } from '@/components/buzon/ValidarDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { validarDocumento, rechazarDocumento } from '@/services/mockApi';
import { Inbox } from 'lucide-react';
import type { EstadoDocumento } from '@/types';

type TabKey = 'todos' | 'pendiente' | 'procesado' | 'rechazado';

export default function BuzonPage() {
  const { documentos, loading, updateDocumentoEstado } = useDocumentos();
  const [activeTab, setActiveTab] = useState<TabKey>('todos');
  const [dialog, setDialog] = useState<{
    open: boolean;
    tipo: 'validar' | 'rechazar';
    documentoId: string;
    documentoNombre: string;
  }>({ open: false, tipo: 'validar', documentoId: '', documentoNombre: '' });
  const [toast, setToast] = useState<{ visible: boolean; message: string; variant: 'success' | 'error' }>({
    visible: false,
    message: '',
    variant: 'success',
  });

  const showToast = (message: string, variant: 'success' | 'error') => {
    setToast({ visible: true, message, variant });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  const filteredDocumentos = documentos.filter((d) => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'pendiente') return d.estado === 'pendiente';
    if (activeTab === 'procesado') return d.estado === 'procesado' || d.estado === 'validado';
    if (activeTab === 'rechazado') return d.estado === 'rechazado';
    return true;
  });

  const pendientesCount = documentos.filter((d) => d.estado === 'pendiente').length;

  const handleValidar = (id: string) => {
    const doc = documentos.find((d) => d.id === id);
    if (doc) {
      setDialog({ open: true, tipo: 'validar', documentoId: id, documentoNombre: doc.nombre });
    }
  };

  const handleRechazar = (id: string) => {
    const doc = documentos.find((d) => d.id === id);
    if (doc) {
      setDialog({ open: true, tipo: 'rechazar', documentoId: id, documentoNombre: doc.nombre });
    }
  };

  const handleConfirm = async (motivo?: string) => {
    const { tipo, documentoId } = dialog;
    setDialog((prev) => ({ ...prev, open: false }));

    // Optimistic update
    const nuevoEstado: EstadoDocumento = tipo === 'validar' ? 'validado' : 'rechazado';
    updateDocumentoEstado(documentoId, nuevoEstado, motivo);

    if (tipo === 'validar') {
      const result = await validarDocumento(documentoId);
      if (result.success) {
        showToast(result.mensaje, 'success');
      } else {
        // Revert
        updateDocumentoEstado(documentoId, 'pendiente');
        showToast(result.mensaje, 'error');
      }
    } else {
      const result = await rechazarDocumento(documentoId, motivo ?? '');
      if (result.success) {
        showToast('Documento rechazado correctamente', 'success');
      } else {
        updateDocumentoEstado(documentoId, 'pendiente');
        showToast('Error al rechazar el documento', 'error');
      }
    }
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'pendiente', label: `Pendientes (${pendientesCount})` },
    { key: 'procesado', label: 'Procesados' },
    { key: 'rechazado', label: 'Rechazados' },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-12 rounded-lg" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Buzón Documental</h1>
        <p className="text-sm text-[#6B7280]">Gestiona los documentos recibidos de tus clientes</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-[#111827] shadow-sm'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Document list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredDocumentos.length > 0 ? (
          filteredDocumentos.map((doc) => (
            <DocumentoRow
              key={doc.id}
              documento={doc}
              onValidar={handleValidar}
              onRechazar={handleRechazar}
            />
          ))
        ) : (
          <div className="px-5 py-12 text-center">
            <Inbox size={40} className="mx-auto text-[#6B7280] mb-3" />
            <p className="text-[#6B7280]">No hay documentos en esta categoría</p>
          </div>
        )}
      </div>

      {/* Dialog */}
      <ValidarDialog
        open={dialog.open}
        tipo={dialog.tipo}
        documentoNombre={dialog.documentoNombre}
        onConfirm={handleConfirm}
        onCancel={() => setDialog((prev) => ({ ...prev, open: false }))}
      />

      {/* Toast */}
      {toast.visible && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-bottom-4 ${
            toast.variant === 'success' ? 'bg-[#22C55E] text-white' : 'bg-[#EF4444] text-white'
          }`}
        >
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
