'use client';

import { DndContext, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Tarea, EstadoTarea } from '@/types';
import { cn, formatDateShort } from '@/lib/utils';

interface TareasKanbanProps {
  tareas: Tarea[];
  onMover: (tareaId: string, nuevoEstado: EstadoTarea) => void;
  onSelect: (tarea: Tarea) => void;
}

const columnas: { estado: EstadoTarea; label: string; color: string }[] = [
  { estado: 'backlog', label: 'Backlog', color: 'border-gray-300' },
  { estado: 'en_progreso', label: 'En Progreso', color: 'border-blue-400' },
  { estado: 'en_revision', label: 'En Revisión', color: 'border-yellow-400' },
  { estado: 'completada', label: 'Completada', color: 'border-green-400' },
  { estado: 'bloqueada', label: 'Bloqueada', color: 'border-red-400' },
];

const prioridadDot: Record<string, string> = {
  critica: 'bg-red-500',
  alta: 'bg-orange-500',
  media: 'bg-yellow-500',
  baja: 'bg-blue-400',
};

function KanbanCard({ tarea, onSelect }: { tarea: Tarea; onSelect: (t: Tarea) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: tarea.id });
  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  const isCloseDeadline = tarea.fechaLimite && (new Date(tarea.fechaLimite).getTime() - Date.now()) < 2 * 24 * 60 * 60 * 1000;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onSelect(tarea)}
      className={cn(
        'bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-medium text-[#111827] line-clamp-2">{tarea.titulo}</p>
        <span className={cn('w-2 h-2 rounded-full shrink-0 mt-1.5', prioridadDot[tarea.prioridad])} />
      </div>
      {tarea.clienteNombre && (
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-[#4F67FF]/10 flex items-center justify-center text-[#4F67FF] text-[9px] font-medium">
            {tarea.clienteNombre.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-xs text-[#6B7280] truncate">{tarea.clienteNombre}</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#6B7280]">{tarea.asignadoA.split(' ')[0]}</span>
        {tarea.fechaLimite && (
          <span className={cn('text-xs', isCloseDeadline ? 'text-[#EF4444] font-medium' : 'text-[#6B7280]')}>
            {formatDateShort(tarea.fechaLimite)}
          </span>
        )}
      </div>
    </div>
  );
}

function KanbanColumna({ estado, label, color, tareas, onSelect }: { estado: EstadoTarea; label: string; color: string; tareas: Tarea[]; onSelect: (t: Tarea) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: estado });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col rounded-xl border-t-2 min-h-[400px]',
        color,
        estado === 'bloqueada' ? 'bg-red-50/50' : 'bg-gray-50/50',
        isOver && 'bg-[#4F67FF]/5'
      )}
    >
      <div className="px-3 py-2.5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#111827]">{label}</h3>
        <span className="text-xs text-[#6B7280] bg-white px-2 py-0.5 rounded-full">{tareas.length}</span>
      </div>
      <div className="flex-1 px-2 pb-2 space-y-2 overflow-y-auto">
        {tareas.map((t) => (
          <KanbanCard key={t.id} tarea={t} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

export function TareasKanban({ tareas, onMover, onSelect }: TareasKanbanProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const tareaId = active.id as string;
    const nuevoEstado = over.id as EstadoTarea;
    const tarea = tareas.find((t) => t.id === tareaId);
    if (tarea && tarea.estado !== nuevoEstado) {
      onMover(tareaId, nuevoEstado);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-3">
        {columnas.map((col) => (
          <KanbanColumna
            key={col.estado}
            estado={col.estado}
            label={col.label}
            color={col.color}
            tareas={tareas.filter((t) => t.estado === col.estado)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </DndContext>
  );
}
