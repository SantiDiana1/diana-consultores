'use client';

import { useState, useEffect, useCallback } from 'react';
import { getDocumentos } from '@/services/mockApi';
import type { Documento, EstadoDocumento } from '@/types';

export function useDocumentos(filtroEstado?: EstadoDocumento) {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocumentos = useCallback(() => {
    setLoading(true);
    getDocumentos(filtroEstado).then((data) => {
      setDocumentos(data);
      setLoading(false);
    });
  }, [filtroEstado]);

  useEffect(() => {
    fetchDocumentos();
  }, [fetchDocumentos]);

  const updateDocumentoEstado = (id: string, nuevoEstado: EstadoDocumento, notas?: string) => {
    setDocumentos((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, estado: nuevoEstado, notas: notas ?? d.notas } : d
      )
    );
  };

  return { documentos, loading, updateDocumentoEstado, refetch: fetchDocumentos };
}
