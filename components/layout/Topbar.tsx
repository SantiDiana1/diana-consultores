'use client';

import { Bell } from 'lucide-react';
import { useRole } from '@/context/RoleContext';

export function Topbar() {
  const { rolActual, clienteSeleccionado } = useRole();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div>
        <p className="text-sm text-[#6B7280]">
          {rolActual === 'asesor' ? 'Panel del Asesor' : `Portal de ${clienteSeleccionado}`}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-[#6B7280]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#4F67FF] flex items-center justify-center text-white text-sm font-medium">
            {rolActual === 'asesor' ? 'CR' : 'DC'}
          </div>
          <span className="text-sm font-medium text-[#111827] hidden sm:inline">
            {rolActual === 'asesor' ? 'Mapi y Ximo' : clienteSeleccionado}
          </span>
        </div>
      </div>
    </header>
  );
}
