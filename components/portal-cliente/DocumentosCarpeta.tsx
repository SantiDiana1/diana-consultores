'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Download, FolderOpen } from 'lucide-react';
import type { DocumentoCliente } from '@/types';
import { cn, formatDateShort } from '@/lib/utils';

interface DocumentosCarpetaProps {
  documentos: DocumentoCliente[];
}

interface CarpetaGroup {
  label: string;
  icon: string;
  documentos: DocumentoCliente[];
}

export function DocumentosCarpeta({ documentos }: DocumentosCarpetaProps) {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(['trimestral']));

  const carpetas: CarpetaGroup[] = [
    {
      label: 'Modelos Trimestrales',
      icon: '📁',
      documentos: documentos.filter((d) => d.categoria === 'trimestral'),
    },
    {
      label: 'Nóminas',
      icon: '📁',
      documentos: documentos.filter((d) => d.categoria === 'nominas'),
    },
    {
      label: 'Escrituras y Contratos',
      icon: '📁',
      documentos: documentos.filter((d) => d.categoria === 'escrituras'),
    },
    {
      label: 'Otros',
      icon: '📁',
      documentos: documentos.filter((d) => d.categoria === 'otros'),
    },
  ];

  const toggleFolder = (label: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const handleDownload = (doc: DocumentoCliente) => {
    const blob = new Blob([''], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.nombre;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-2">
      {carpetas
        .filter((c) => c.documentos.length > 0)
        .map((carpeta) => {
          const isOpen = openFolders.has(carpeta.label);
          return (
            <div
              key={carpeta.label}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFolder(carpeta.label)}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                {isOpen ? (
                  <ChevronDown size={16} className="text-[#6B7280]" />
                ) : (
                  <ChevronRight size={16} className="text-[#6B7280]" />
                )}
                <FolderOpen size={18} className="text-[#4F67FF]" />
                <span className="text-sm font-medium text-[#111827]">{carpeta.label}</span>
                <span className="text-xs text-[#6B7280] ml-auto">
                  {carpeta.documentos.length} archivos
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100">
                  {carpeta.documentos.map((doc) => (
                    <div
                      key={doc.id}
                      className={cn(
                        'flex items-center gap-3 px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors'
                      )}
                    >
                      <FileText size={16} className="text-red-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#111827] truncate">{doc.nombre}</p>
                        <p className="text-xs text-[#6B7280]">
                          {doc.subcategoria} · {doc.tamano} · {formatDateShort(doc.fechaDisponible)}
                        </p>
                      </div>
                      {doc.descargable && (
                        <button
                          onClick={() => handleDownload(doc)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#4F67FF] border border-[#4F67FF]/30 rounded-lg hover:bg-[#4F67FF]/5 transition-colors shrink-0"
                        >
                          <Download size={12} />
                          Descargar
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
