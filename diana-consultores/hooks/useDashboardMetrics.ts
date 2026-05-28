'use client';

import { useState, useEffect } from 'react';
import { getMetricasDashboard, getTareasUrgentes } from '@/services/mockApi';
import type { MetricaDashboard, TareaUrgente } from '@/types';

export function useDashboardMetrics() {
  const [metricas, setMetricas] = useState<MetricaDashboard | null>(null);
  const [tareas, setTareas] = useState<TareaUrgente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getMetricasDashboard(), getTareasUrgentes()]).then(
      ([metricasData, tareasData]) => {
        if (!cancelled) {
          setMetricas(metricasData);
          setTareas(tareasData);
          setLoading(false);
        }
      }
    );
    return () => { cancelled = true; };
  }, []);

  const marcarCompletada = (id: string) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: true } : t))
    );
  };

  return { metricas, tareas, loading, marcarCompletada };
}
