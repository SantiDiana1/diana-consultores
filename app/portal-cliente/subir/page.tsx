'use client';

import { DropZone } from '@/components/portal-cliente/DropZone';

export default function SubirPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Subir Documentos</h1>
        <p className="text-sm text-[#6B7280]">
          Sube tus facturas, recibos y documentos. Tu asesor los revisará en breve.
        </p>
      </div>
      <DropZone />
    </div>
  );
}
