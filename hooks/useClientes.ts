'use client';

import { useState, useEffect } from 'react';
import { getClientes } from '@/services/mockApi';
import type { Cliente } from '@/types';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getClientes().then((data) => {
      if (!cancelled) {
        setClientes(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return { clientes, loading };
}
