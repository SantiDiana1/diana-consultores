'use client';

import type { Tarea } from '@/types';
import { cn, formatDateShort } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface TareasListaProps {
  tareas: Tarea[];
  onSelect: (tarea: Tarea) => void;
}

const estadoBadge: Record<string, { bg: string; text: string; label: string }> = {
  backlog: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Backlog' },
  en_progreso: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'En Progreso' },
  en_revision: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'En Revisión' },
  completada: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completada' },
  bloqueada: { bg: 'bg-red-100', text: 'text-red-700', label: 'Bloqueada' },
};

const prioridadLabel: Record<string, { color: string; label: string }> = {
  critica: { color: 'text-red-600', label: 'Crítica' },
  alta: { color: 'text-orange-600', label: 'Alta' },
  media: { color: 'text-yellow-600', label: 'Media' },
  baja: { color: 'text-blue-500', label: 'Baja' },
};

export function TareasLista({ tareas, onSelect }: TareasListaProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">
            <th className="px-4 py-3">Tarea</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Prioridad</th>
            <th className="px-4 py-3">Asignado</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Fecha Límite</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {tareas.map((tarea) => {
            const estado = estadoBadge[tarea.estado];
            const prioridad = prioridadLabel[tarea.prioridad];
            const isOverdue = tarea.fechaLimite && new Date(tarea.fechaLimite) < new Date();
            return (
              <tr key={tarea.id} onClick={() => onSelect(tarea)} className="hover:bg-gray-50/50 cursor-pointer transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-[#111827]">{tarea.titulo}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{tarea.categoria}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={cn('px-2 py-0.5 text-xs font-medium rounded-full', estado.bg, estado.text)}>{estado.label}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn('text-xs font-medium', prioridad.color)}>{prioridad.label}</span>
                </td>
                <td className="px-4 py-3 text-sm text-[#6B7280]">{tarea.asignadoA.split(' ')[0]}</td>
                <td className="px-4 py-3 text-sm text-[#6B7280]">{tarea.clienteNombre || '-'}</td>
                <td className="px-4 py-3">
                  {tarea.fechaLimite ? (
                    <span className={cn('text-xs', isOverdue ? 'text-[#EF4444] font-medium' : 'text-[#6B7280]')}>
                      {formatDateShort(tarea.fechaLimite)}
                    </span>
                  ) : '-'}
                </td>
                <td className="px-4 py-3"><ChevronRight size={14} className="text-[#6B7280]" /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {tareas.length === 0 && (
        <div className="text-center py-12 text-[#6B7280] text-sm">No hay tareas con los filtros seleccionados</div>
      )}
    </div>
  );
}
