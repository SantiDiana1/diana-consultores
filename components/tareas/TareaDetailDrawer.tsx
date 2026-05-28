'use client';

import { useState } from 'react';
import type { Tarea, EstadoTarea } from '@/types';
import { añadirComentarioTarea } from '@/services/mockApi';
import { cn, formatRelativeTime } from '@/lib/utils';
import { X, Clock, User, Tag, MessageSquare, CheckCircle2, Circle, Send } from 'lucide-react';

interface TareaDetailDrawerProps {
  tarea: Tarea | null;
  open: boolean;
  onClose: () => void;
  onCambiarEstado: (estado: EstadoTarea) => void;
  onUpdateTarea: (tarea: Tarea) => void;
}

const estadoOptions: { value: EstadoTarea; label: string }[] = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'en_progreso', label: 'En Progreso' },
  { value: 'en_revision', label: 'En Revisión' },
  { value: 'completada', label: 'Completada' },
  { value: 'bloqueada', label: 'Bloqueada' },
];

export function TareaDetailDrawer({ tarea, open, onClose, onCambiarEstado, onUpdateTarea }: TareaDetailDrawerProps) {
  const [nuevoComentario, setNuevoComentario] = useState('');

  if (!tarea) return null;

  const subtareasCompletadas = tarea.subtareas.filter((s) => s.completada).length;
  const progress = tarea.subtareas.length > 0 ? (subtareasCompletadas / tarea.subtareas.length) * 100 : 0;

  const handleToggleSubtarea = (subtareaId: string) => {
    const updatedSubtareas = tarea.subtareas.map((s) =>
      s.id === subtareaId ? { ...s, completada: !s.completada } : s
    );
    onUpdateTarea({ ...tarea, subtareas: updatedSubtareas });
  };

  const handleEnviarComentario = async () => {
    if (!nuevoComentario.trim()) return;
    const comentario = await añadirComentarioTarea(tarea.id, nuevoComentario);
    onUpdateTarea({ ...tarea, comentarios: [...tarea.comentarios, comentario] });
    setNuevoComentario('');
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />}
      <div className={cn(
        'fixed top-0 right-0 h-full w-[480px] bg-white z-50 shadow-xl transition-transform duration-300',
        open ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[#111827] line-clamp-1">{tarea.titulo}</h2>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <X size={18} className="text-[#6B7280]" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* Estado select */}
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Estado</label>
              <select
                value={tarea.estado}
                onChange={(e) => onCambiarEstado(e.target.value as EstadoTarea)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"
              >
                {estadoOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Description */}
            {tarea.descripcion && (
              <div>
                <label className="text-xs font-medium text-[#6B7280] mb-1 block">Descripción</label>
                <p className="text-sm text-[#111827]">{tarea.descripcion}</p>
              </div>
            )}

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <User size={14} className="text-[#6B7280]" />
                <span className="text-sm text-[#111827]">{tarea.asignadoA}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-[#6B7280]" />
                <span className="text-sm text-[#111827] capitalize">{tarea.categoria}</span>
              </div>
              {tarea.fechaLimite && (
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#6B7280]" />
                  <span className="text-sm text-[#111827]">{new Date(tarea.fechaLimite).toLocaleDateString('es-ES')}</span>
                </div>
              )}
              {tarea.clienteNombre && (
                <div className="flex items-center gap-2">
                  <User size={14} className="text-[#6B7280]" />
                  <span className="text-sm text-[#111827]">{tarea.clienteNombre}</span>
                </div>
              )}
            </div>

            {/* Subtareas */}
            {tarea.subtareas.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-[#6B7280]">Subtareas ({subtareasCompletadas}/{tarea.subtareas.length})</label>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                  <div className="bg-[#4F67FF] h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="space-y-1.5">
                  {tarea.subtareas.map((s) => (
                    <button key={s.id} onClick={() => handleToggleSubtarea(s.id)} className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-1.5 rounded">
                      {s.completada ? <CheckCircle2 size={16} className="text-[#22C55E]" /> : <Circle size={16} className="text-[#6B7280]" />}
                      <span className={cn('text-sm', s.completada ? 'line-through text-[#6B7280]' : 'text-[#111827]')}>{s.texto}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Comentarios */}
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <MessageSquare size={14} className="text-[#6B7280]" />
                <label className="text-xs font-medium text-[#6B7280]">Comentarios ({tarea.comentarios.length})</label>
              </div>
              <div className="space-y-3 mb-3">
                {tarea.comentarios.map((c) => (
                  <div key={c.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#111827]">{c.autor}</span>
                      <span className="text-xs text-[#6B7280]">{formatRelativeTime(c.fecha)}</span>
                    </div>
                    <p className="text-sm text-[#6B7280]">{c.texto}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nuevoComentario}
                  onChange={(e) => setNuevoComentario(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleEnviarComentario(); }}
                  placeholder="Añadir comentario..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg"
                />
                <button onClick={handleEnviarComentario} disabled={!nuevoComentario.trim()} className="p-2 bg-[#4F67FF] text-white rounded-lg disabled:opacity-50">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
