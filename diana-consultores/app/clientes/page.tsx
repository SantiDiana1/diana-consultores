'use client';

import { useState } from 'react';
import { useClientes } from '@/hooks/useClientes';
import { ClientesTable } from '@/components/clientes/ClientesTable';
import { ClientesKanban } from '@/components/clientes/ClientesKanban';
import { Skeleton } from '@/components/ui/Skeleton';
import { Users, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ClientesPage() {
  const { clientes, loading } = useClientes();
  const [vista, setVista] = useState<'tabla' | 'kanban'>('tabla');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Cartera de Clientes</h1>
          <p className="text-sm text-[#6B7280]">{loading ? '...' : `${clientes.length} clientes`}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setVista('tabla')} className={cn('p-1.5 rounded', vista === 'tabla' ? 'bg-white shadow-sm' : 'text-[#6B7280]')}><List size={16} /></button>
            <button onClick={() => setVista('kanban')} className={cn('p-1.5 rounded', vista === 'kanban' ? 'bg-white shadow-sm' : 'text-[#6B7280]')}><LayoutGrid size={16} /></button>
          </div>
          <Link href="/onboarding" className="flex items-center gap-2 px-4 py-2.5 bg-[#4F67FF] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e0] transition-colors">
            <Users size={16} />
            Nuevo Cliente
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 rounded-lg" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      ) : vista === 'tabla' ? (
        <ClientesTable clientes={clientes} />
      ) : (
        <ClientesKanban clientes={clientes} />
      )}
    </div>
  );
}
