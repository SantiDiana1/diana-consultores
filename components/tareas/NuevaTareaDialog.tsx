'use client';

import { useState } from 'react';
import type { PrioridadTarea, CategoriaTarea } from '@/types';
import { X, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NuevaTareaDialogProps {
  open: boolean;
  onClose: () => void;
  onCrear: (data: {
    titulo: string;
    descripcion?: string;
    clienteId?: string;
    clienteNombre?: string;
    asignadoA: string;
    prioridad: PrioridadTarea;
    categoria: CategoriaTarea;
    fechaLimite?: string;
    subtareas: { id: string; texto: string; completada: boolean }[];
  }) => void;
}

export function NuevaTareaDialog({ open, onClose, onCrear }: NuevaTareaDialogProps) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [asignadoA, setAsignadoA] = useState('Mapi y Ximo');
  const [prioridad, setPrioridad] = useState<PrioridadTarea>('media');
  const [categoria, setCategoria] = useState<CategoriaTarea>('fiscal');
  const [fechaLimite, setFechaLimite] = useState('');
  const [subtareas, setSubtareas] = useState<{ id: string; texto: string; completada: boolean }[]>([]);
  const [nuevaSubtarea, setNuevaSubtarea] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onCrear({
      titulo,
      descripcion: descripcion || undefined,
      asignadoA,
      prioridad,
      categoria,
      fechaLimite: fechaLimite || undefined,
      subtareas,
    });
    // Reset form
    setTitulo('');
    setDescripcion('');
    setAsignadoA('Mapi y Ximo');
    setPrioridad('media');
    setCategoria('fiscal');
    setFechaLimite('');
    setSubtareas([]);
  };

  const addSubtarea = () => {
    if (!nuevaSubtarea.trim()) return;
    setSubtareas([...subtareas, { id: `sub-new-${Date.now()}`, texto: nuevaSubtarea, completada: false }]);
    setNuevaSubtarea('');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] max-h-[85vh] bg-white rounded-xl shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#111827]">Nueva Tarea</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={18} className="text-[#6B7280]" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-[#6B7280] mb-1 block">Título *</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" placeholder="Describe la tarea..." required />
          </div>
          <div>
            <label className="text-xs font-medium text-[#6B7280] mb-1 block">Descripción</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none" rows={3} placeholder="Detalles adicionales..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Asignar a</label>
              <select value={asignadoA} onChange={(e) => setAsignadoA(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg">
                <option value="Mapi y Ximo">Mapi y Ximo</option>
                <option value="Ana García">Ana García</option>
                <option value="Luis Moreno">Luis Moreno</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Prioridad</label>
              <select value={prioridad} onChange={(e) => setPrioridad(e.target.value as PrioridadTarea)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg">
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Categoría</label>
              <select value={categoria} onChange={(e) => setCategoria(e.target.value as CategoriaTarea)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg">
                <option value="fiscal">Fiscal</option>
                <option value="laboral">Laboral</option>
                <option value="contable">Contable</option>
                <option value="admin">Admin</option>
                <option value="reunion">Reunión</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[#6B7280] mb-1 block">Fecha Límite</label>
              <input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
            </div>
          </div>
          {/* Subtareas */}
          <div>
            <label className="text-xs font-medium text-[#6B7280] mb-1 block">Subtareas</label>
            {subtareas.length > 0 && (
              <div className="space-y-1 mb-2">
                {subtareas.map((s) => (
                  <div key={s.id} className="flex items-center gap-2 bg-gray-50 px-2 py-1.5 rounded">
                    <span className="text-sm flex-1 text-[#111827]">{s.texto}</span>
                    <button type="button" onClick={() => setSubtareas(subtareas.filter((x) => x.id !== s.id))} className="text-[#6B7280] hover:text-[#EF4444]"><Trash2 size={12} /></button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <input type="text" value={nuevaSubtarea} onChange={(e) => setNuevaSubtarea(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSubtarea(); } }} className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg" placeholder="Añadir subtarea..." />
              <button type="button" onClick={addSubtarea} className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus size={14} /></button>
            </div>
          </div>
        </form>
        <div className="px-6 py-3 border-t border-gray-100 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#6B7280] hover:bg-gray-100 rounded-lg">Cancelar</button>
          <button onClick={(e) => { e.preventDefault(); if (titulo.trim()) handleSubmit(e as unknown as React.FormEvent); }} className={cn('px-4 py-2 text-sm font-medium text-white rounded-lg', titulo.trim() ? 'bg-[#4F67FF] hover:bg-[#3d52e0]' : 'bg-gray-300 cursor-not-allowed')}>
            Crear Tarea
          </button>
        </div>
      </div>
    </>
  );
}
