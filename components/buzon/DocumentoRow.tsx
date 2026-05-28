'use client';

import { FileText, Receipt, User, Landmark, FileSignature, Building } from 'lucide-react';
import type { Documento, TipoDocumento, EstadoDocumento } from '@/types';
import { cn, formatRelativeTime } from '@/lib/utils';

interface DocumentoRowProps {
  documento: Documento;
  onValidar: (id: string) => void;
  onRechazar: (id: string) => void;
}

const tipoIconos: Record<TipoDocumento, React.ReactNode> = {
  factura_emitida: <Receipt size={18} className="text-green-600" />,
  factura_recibida: <Receipt size={18} className="text-blue-600" />,
  nomina: <User size={18} className="text-purple-600" />,
  extracto_bancario: <Landmark size={18} className="text-gray-600" />,
  contrato: <FileSignature size={18} className="text-orange-600" />,
  escritura: <Building size={18} className="text-indigo-600" />,
};

const estadoConfig: Record<EstadoDocumento, { label: string; classes: string }> = {
  pendiente: { label: 'Pendiente', classes: 'bg-yellow-100 text-yellow-700' },
  procesado: { label: 'Procesado', classes: 'bg-blue-100 text-blue-700' },
  rechazado: { label: 'Rechazado', classes: 'bg-red-100 text-red-700' },
  validado: { label: 'Validado', classes: 'bg-green-100 text-green-700' },
};

export function DocumentoRow({ documento, onValidar, onRechazar }: DocumentoRowProps) {
  const config = estadoConfig[documento.estado];

  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="p-2 bg-gray-50 rounded-lg">
        {tipoIconos[documento.tipo] || <FileText size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#111827] truncate">{documento.nombre}</p>
        <p className="text-xs text-[#6B7280]">
          {documento.clienteNombre} · {documento.tamano} · {formatRelativeTime(documento.fechaSubida)}
        </p>
      </div>
      <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium shrink-0', config.classes)}>
        {config.label}
      </span>
      <div className="flex gap-2 shrink-0">
        {documento.estado === 'pendiente' && (
          <>
            <button
              onClick={() => onValidar(documento.id)}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#22C55E] rounded-lg hover:bg-green-600 transition-colors"
            >
              Validar
            </button>
            <button
              onClick={() => onRechazar(documento.id)}
              className="px-3 py-1.5 text-xs font-medium text-[#EF4444] border border-[#EF4444] rounded-lg hover:bg-red-50 transition-colors"
            >
              Rechazar
            </button>
          </>
        )}
        {(documento.estado === 'validado' || documento.estado === 'procesado') && (
          <button className="px-3 py-1.5 text-xs font-medium text-[#4F67FF] border border-[#4F67FF] rounded-lg hover:bg-blue-50 transition-colors">
            Ver
          </button>
        )}
        {documento.estado === 'rechazado' && documento.notas && (
          <button
            className="px-3 py-1.5 text-xs font-medium text-[#6B7280] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            title={documento.notas}
          >
            Ver motivo
          </button>
        )}
      </div>
    </div>
  );
}
