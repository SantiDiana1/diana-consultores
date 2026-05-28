'use client';

import type { Cliente, EstadoTrimestre } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ClientesKanbanProps {
  clientes: Cliente[];
}

const columnas: { estado: EstadoTrimestre; label: string; color: string }[] = [
  { estado: 'pendiente_documentacion', label: 'Pte. Documentación', color: 'border-orange-400' },
  { estado: 'en_proceso', label: 'En Proceso', color: 'border-blue-400' },
  { estado: 'listo_para_presentar', label: 'Listo para Presentar', color: 'border-yellow-400' },
  { estado: 'presentado', label: 'Presentado', color: 'border-green-400' },
];

export function ClientesKanban({ clientes }: ClientesKanbanProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {columnas.map((col) => {
        const clientesCol = clientes.filter((c) => c.estadoTrimestre === col.estado);
        return (
          <div key={col.estado} className={cn('rounded-xl border-t-2 min-h-[400px] bg-gray-50/50', col.color)}>
            <div className="px-3 py-2.5 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#111827]">{col.label}</h3>
              <span className="text-xs text-[#6B7280] bg-white px-2 py-0.5 rounded-full">{clientesCol.length}</span>
            </div>
            <div className="px-2 pb-2 space-y-2">
              {clientesCol.map((c) => (
                <Link key={c.id} href={`/clientes/${c.id}`} className="block bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-[#4F67FF]/10 flex items-center justify-center text-[#4F67FF] text-[10px] font-medium">
                      {c.nombre.slice(0, 2).toUpperCase()}
                    </div>
                    <p className="text-sm font-medium text-[#111827] truncate">{c.nombre}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#6B7280]">
                    <span className="capitalize">{c.regimen.replace(/_/g, ' ')}</span>
                    {c.facturasEnBuzon > 0 && (
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-medium">{c.facturasEnBuzon} docs</span>
                    )}
                  </div>
                  <div className="mt-1.5 text-xs text-[#6B7280]">Asesor: {c.asesorAsignado.split(' ')[0]}</div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
