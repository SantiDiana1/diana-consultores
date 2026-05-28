'use client';

import { useState, useEffect } from 'react';
import { getTareas, actualizarEstadoTarea, crearTarea } from '@/services/mockApi';
import type { Tarea, EstadoTarea, CategoriaTarea, PrioridadTarea } from '@/types';
import { TareasKanban } from '@/components/tareas/TareasKanban';
import { TareasLista } from '@/components/tareas/TareasLista';
import { TareaDetailDrawer } from '@/components/tareas/TareaDetailDrawer';
import { NuevaTareaDialog } from '@/components/tareas/NuevaTareaDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { LayoutGrid, List, Plus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState<'kanban' | 'lista'>('kanban');
  const [filtroAsesor, setFiltroAsesor] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<EstadoTarea | ''>('');
  const [filtroCategoria, setFiltroCategoria] = useState<CategoriaTarea | ''>('');
  const [busqueda, setBusqueda] = useState('');
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getTareas().then((data) => {
      setTareas(data);
      setLoading(false);
    });
  }, []);

  const tareasFiltradas = tareas.filter((t) => {
    if (filtroAsesor && t.asignadoA !== filtroAsesor) return false;
    if (filtroEstado && t.estado !== filtroEstado) return false;
    if (filtroCategoria && t.categoria !== filtroCategoria) return false;
    if (busqueda && !t.titulo.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  const handleMoverTarea = async (tareaId: string, nuevoEstado: EstadoTarea) => {
    setTareas((prev) => prev.map((t) => t.id === tareaId ? { ...t, estado: nuevoEstado } : t));
    await actualizarEstadoTarea(tareaId, nuevoEstado);
  };

  const handleSelectTarea = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setDrawerOpen(true);
  };

  const handleCrearTarea = async (data: { titulo: string; descripcion?: string; clienteId?: string; clienteNombre?: string; asignadoA: string; prioridad: PrioridadTarea; categoria: CategoriaTarea; fechaLimite?: string; subtareas: { id: string; texto: string; completada: boolean }[] }) => {
    const nueva = await crearTarea({
      ...data,
      creadoPor: 'Mapi y Ximo',
      estado: 'backlog',
      etiquetas: [],
      subtareas: data.subtareas,
    });
    setTareas((prev) => [...prev, nueva]);
    setDialogOpen(false);
  };

  const enProgreso = tareas.filter((t) => t.estado === 'en_progreso').length;
  const vencenEstaSemana = tareas.filter((t) => {
    if (!t.fechaLimite) return false;
    const diff = new Date(t.fechaLimite).getTime() - Date.now();
    return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
  }).length;
  const bloqueadas = tareas.filter((t) => t.estado === 'bloqueada').length;

  const asesores = [...new Set(tareas.map((t) => t.asignadoA))];

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64 rounded" />
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-96 rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Tareas</h1>
          <p className="text-sm text-[#6B7280]">Gestión operativa del despacho</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Stats chips */}
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">{enProgreso} en progreso</span>
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">{vencenEstaSemana} vencen esta semana</span>
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">{bloqueadas} bloqueadas</span>
        </div>
      </div>

      {/* Filters + Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter size={16} className="text-[#6B7280]" />
        <select value={filtroAsesor} onChange={(e) => setFiltroAsesor(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white">
          <option value="">Todos los asesores</option>
          {asesores.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value as EstadoTarea | '')} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white">
          <option value="">Todos los estados</option>
          <option value="backlog">Backlog</option>
          <option value="en_progreso">En Progreso</option>
          <option value="en_revision">En Revisión</option>
          <option value="completada">Completada</option>
          <option value="bloqueada">Bloqueada</option>
        </select>
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value as CategoriaTarea | '')} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white">
          <option value="">Todas las categorías</option>
          <option value="fiscal">Fiscal</option>
          <option value="laboral">Laboral</option>
          <option value="contable">Contable</option>
          <option value="admin">Admin</option>
          <option value="reunion">Reunión</option>
        </select>
        <input type="text" placeholder="Buscar por título..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white flex-1 min-w-[180px]" />
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg ml-auto">
          <button onClick={() => setVista('kanban')} className={cn('p-1.5 rounded', vista === 'kanban' ? 'bg-white shadow-sm' : 'text-[#6B7280]')}><LayoutGrid size={16} /></button>
          <button onClick={() => setVista('lista')} className={cn('p-1.5 rounded', vista === 'lista' ? 'bg-white shadow-sm' : 'text-[#6B7280]')}><List size={16} /></button>
        </div>
        <button onClick={() => setDialogOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4F67FF] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e0] transition-colors">
          <Plus size={14} /> Nueva Tarea
        </button>
      </div>

      {/* Content */}
      {vista === 'kanban' ? (
        <TareasKanban tareas={tareasFiltradas} onMover={handleMoverTarea} onSelect={handleSelectTarea} />
      ) : (
        <TareasLista tareas={tareasFiltradas} onSelect={handleSelectTarea} />
      )}

      {/* Drawer */}
      <TareaDetailDrawer
        tarea={tareaSeleccionada}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCambiarEstado={(estado) => {
          if (tareaSeleccionada) {
            handleMoverTarea(tareaSeleccionada.id, estado);
            setTareaSeleccionada({ ...tareaSeleccionada, estado });
          }
        }}
        onUpdateTarea={(updated) => {
          setTareas((prev) => prev.map((t) => t.id === updated.id ? updated : t));
          setTareaSeleccionada(updated);
        }}
      />

      {/* New Task Dialog */}
      <NuevaTareaDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onCrear={handleCrearTarea} />
    </div>
  );
}
