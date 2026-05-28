'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ValidarDialogProps {
  open: boolean;
  documentoNombre: string;
  tipo: 'validar' | 'rechazar';
  onConfirm: (motivo?: string) => void;
  onCancel: () => void;
}

export function ValidarDialog({ open, documentoNombre, tipo, onConfirm, onCancel }: ValidarDialogProps) {
  const [motivo, setMotivo] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <X size={18} className="text-[#6B7280]" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className={`p-2 rounded-lg ${tipo === 'validar' ? 'bg-green-50' : 'bg-red-50'}`}
          >
            <AlertTriangle
              size={20}
              className={tipo === 'validar' ? 'text-[#22C55E]' : 'text-[#EF4444]'}
            />
          </div>
          <h3 className="text-lg font-semibold text-[#111827]">
            {tipo === 'validar' ? 'Validar Documento' : 'Rechazar Documento'}
          </h3>
        </div>

        <p className="text-sm text-[#6B7280] mb-4">
          {tipo === 'validar'
            ? `¿Confirmas que deseas validar y contabilizar "${documentoNombre}"?`
            : `¿Confirmas que deseas rechazar "${documentoNombre}"?`}
        </p>

        {tipo === 'rechazar' && (
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Indica el motivo del rechazo..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#4F67FF]/20 focus:border-[#4F67FF] mb-4"
          />
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-[#6B7280] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(tipo === 'rechazar' ? motivo : undefined)}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              tipo === 'validar'
                ? 'bg-[#22C55E] hover:bg-green-600'
                : 'bg-[#EF4444] hover:bg-red-600'
            }`}
          >
            {tipo === 'validar' ? 'Validar y Contabilizar' : 'Rechazar'}
          </button>
        </div>
      </div>
    </div>
  );
}
