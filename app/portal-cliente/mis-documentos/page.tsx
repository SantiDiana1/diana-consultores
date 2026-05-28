'use client';

import { useEffect, useState } from 'react';
import { getDocumentosCliente } from '@/services/mockApi';
import type { DocumentoCliente } from '@/types';
import { DocumentosCarpeta } from '@/components/portal-cliente/DocumentosCarpeta';
import { Skeleton } from '@/components/ui/Skeleton';

export default function MisDocumentosPage() {
  const [documentos, setDocumentos] = useState<DocumentoCliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocumentosCliente().then((data) => {
      setDocumentos(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Mis Documentos</h1>
        <p className="text-sm text-[#6B7280]">
          Accede a todos tus documentos fiscales, nóminas y escrituras
        </p>
      </div>
      <DocumentosCarpeta documentos={documentos} />
    </div>
  );
}
