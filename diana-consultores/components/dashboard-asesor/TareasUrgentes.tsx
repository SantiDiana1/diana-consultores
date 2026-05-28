'use client';

import { CheckCircle2 } from 'lucide-react';
import type { TareaUrgente } from '@/types';
import { cn } from '@/lib/utils';
import { formatDateShort } from '@/lib/utils';

interface TareasUrgentesProps {
  tareas: TareaUrgente[];
  onCompletar: (id: string) => void;
}

const prioridadColors: Record<TareaUrgente['prioridad'], string> = {
  alta: 'bg-red-100 text-red-700',
  media: 'bg-yellow-100 text-yellow-700',
  baja: 'bg-blue-100 text-blue-700',
};

const tipoColors: Record<TareaUrgente['tipo'], string> = {
  fiscal: 'bg-purple-100 text-purple-700',
  laboral: 'bg-green-100 text-green-700',
  contable: 'bg-orange-100 text-orange-700',
};

function isCloseDeadline(fecha: string): boolean {
  const diff = new Date(fecha).getTime() - Date.now();
  return diff < 3 * 24 * 60 * 60 * 1000 && diff > 0;
}

export function TareasUrgentes({ tareas, onCompletar }: TareasUrgentesProps) {
  const tareasActivas = tareas.filter((t) => !t.completada);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[#111827]">Tareas Urgentes</h2>
        <p className="text-sm text-[#6B7280]">{tareasActivas.length} pendientes</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Prioridad</th>
              <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Cliente</th>
              <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Descripción</th>
              <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Fecha Límite</th>
              <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Tipo</th>
              <th className="text-left px-5 py-3 text-[#6B7280] font-medium">Acción</th>
            </tr>
          </thead>
          <tbody>
            {tareasActivas.map((tarea) => (
              <tr
                key={tarea.id}
                className={cn(
                  'border-b border-gray-50 hover:bg-gray-50 transition-colors',
                  isCloseDeadline(tarea.fechaLimite) && 'bg-[#FFF7ED]'
                )}
              >
                <td className="px-5 py-3">
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', prioridadColors[tarea.prioridad])}>
                    {tarea.prioridad}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium text-[#111827]">{tarea.clienteNombre}</td>
                <td className="px-5 py-3 text-[#6B7280]">{tarea.descripcion}</td>
                <td className="px-5 py-3 text-[#6B7280]">{formatDateShort(tarea.fechaLimite)}</td>
                <td className="px-5 py-3">
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', tipoColors[tarea.tipo])}>
                    {tarea.tipo}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => onCompletar(tarea.id)}
                    className="flex items-center gap-1 text-xs font-medium text-[#22C55E] hover:text-green-700 transition-colors"
                  >
                    <CheckCircle2 size={14} />
                    Completar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
