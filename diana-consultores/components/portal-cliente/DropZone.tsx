'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { subirDocumento } from '@/services/mockApi';

interface ArchivoEnCola {
  file: File;
  progress: number;
  status: 'pendiente' | 'subiendo' | 'completado' | 'error';
}

export function DropZone() {
  const [archivos, setArchivos] = useState<ArchivoEnCola[]>([]);
  const [categoria, setCategoria] = useState('facturas_compra');
  const [toastVisible, setToastVisible] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const nuevos: ArchivoEnCola[] = acceptedFiles.map((file) => ({
      file,
      progress: 0,
      status: 'pendiente' as const,
    }));
    setArchivos((prev) => [...prev, ...nuevos]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/heic': ['.heic'],
    },
  });

  const eliminarArchivo = (index: number) => {
    setArchivos((prev) => prev.filter((_, i) => i !== index));
  };

  const subirArchivos = async () => {
    for (let i = 0; i < archivos.length; i++) {
      if (archivos[i].status !== 'pendiente') continue;

      setArchivos((prev) =>
        prev.map((a, idx) => (idx === i ? { ...a, status: 'subiendo' as const, progress: 30 } : a))
      );

      // Simulate progress
      await new Promise((r) => setTimeout(r, 500));
      setArchivos((prev) =>
        prev.map((a, idx) => (idx === i ? { ...a, progress: 70 } : a))
      );

      await subirDocumento(archivos[i].file);

      setArchivos((prev) =>
        prev.map((a, idx) =>
          idx === i ? { ...a, status: 'completado' as const, progress: 100 } : a
        )
      );
    }

    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      setArchivos([]);
    }, 3000);
  };

  const archivosPendientes = archivos.filter((a) => a.status === 'pendiente').length;

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div>
        <label className="block text-sm font-medium text-[#111827] mb-2">
          Categoría del documento
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#4F67FF]/20"
        >
          <option value="facturas_compra">Facturas de compra</option>
          <option value="facturas_venta">Facturas de venta</option>
          <option value="gastos">Gastos</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-[#4F67FF] bg-[#4F67FF]/5'
            : 'border-gray-300 hover:border-[#4F67FF] hover:bg-gray-50'
        )}
      >
        <input {...getInputProps()} />
        <Upload size={40} className="mx-auto text-[#6B7280] mb-4" />
        <p className="text-[#111827] font-medium">
          {isDragActive ? 'Suelta los archivos aquí...' : 'Arrastra tus facturas aquí o haz clic para seleccionar'}
        </p>
        <p className="text-sm text-[#6B7280] mt-2">
          Formatos aceptados: PDF, JPG, PNG, HEIC
        </p>
      </div>

      {/* File list */}
      {archivos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-[#111827]">
              Archivos seleccionados ({archivos.length})
            </h3>
          </div>
          <ul className="divide-y divide-gray-100">
            {archivos.map((archivo, index) => (
              <li key={index} className="px-5 py-3 flex items-center gap-3">
                <FileText size={18} className="text-[#6B7280] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#111827] truncate">{archivo.file.name}</p>
                  <p className="text-xs text-[#6B7280]">
                    {(archivo.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {archivo.status === 'subiendo' && (
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-[#4F67FF] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${archivo.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                {archivo.status === 'completado' && (
                  <CheckCircle2 size={18} className="text-[#22C55E] shrink-0" />
                )}
                {archivo.status === 'pendiente' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarArchivo(index);
                    }}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    <X size={16} className="text-[#6B7280]" />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {archivosPendientes > 0 && (
            <div className="px-5 py-3 border-t border-gray-100">
              <button
                onClick={subirArchivos}
                className="w-full px-4 py-2.5 bg-[#4F67FF] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e0] transition-colors"
              >
                Subir Documentos ({archivosPendientes})
              </button>
            </div>
          )}
        </div>
      )}

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 bg-[#22C55E] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-bottom-4">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">
            ¡Documentos enviados! Tu asesor los revisará pronto
          </span>
        </div>
      )}
    </div>
  );
}
