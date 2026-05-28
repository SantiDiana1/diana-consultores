'use client';

import { Building2, Briefcase, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRole, type Rol } from '@/context/RoleContext';
import { cn } from '@/lib/utils';

interface RoleSwitcherProps {
  collapsed: boolean;
}

export function RoleSwitcher({ collapsed }: RoleSwitcherProps) {
  const { rolActual, cambiarRol } = useRole();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: { rol: Rol; label: string; sublabel: string; icon: React.ReactNode }[] = [
    {
      rol: 'asesor',
      label: 'Diana Consultores',
      sublabel: 'Asesor',
      icon: <Briefcase size={16} />,
    },
    {
      rol: 'cliente',
      label: 'Demo Corp S.L.',
      sublabel: 'Cliente',
      icon: <Building2 size={16} />,
    },
  ];

  const current = roles.find((r) => r.rol === rolActual)!;

  if (collapsed) {
    return (
      <button
        onClick={() => {
          const next: Rol = rolActual === 'asesor' ? 'cliente' : 'asesor';
          cambiarRol(next);
        }}
        className="w-full flex justify-center p-2 rounded-lg hover:bg-white/10 transition-colors"
        title={`Cambiar a ${rolActual === 'asesor' ? 'Cliente' : 'Asesor'}`}
      >
        {current.icon}
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
      >
        <div className="w-8 h-8 rounded-lg bg-[#4F67FF]/20 flex items-center justify-center">
          {current.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{current.label}</p>
          <p className="text-xs text-gray-400">{current.sublabel}</p>
        </div>
        <ChevronDown size={14} className={cn('text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-[#2A3347] rounded-lg shadow-lg border border-white/10 overflow-hidden z-50">
          {roles.map((r) => (
            <button
              key={r.rol}
              onClick={() => {
                cambiarRol(r.rol);
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-2 p-3 text-left hover:bg-white/10 transition-colors',
                r.rol === rolActual && 'bg-white/5'
              )}
            >
              <div className="w-7 h-7 rounded bg-[#4F67FF]/20 flex items-center justify-center">
                {r.icon}
              </div>
              <div>
                <p className="text-sm text-white">{r.label}</p>
                <p className="text-xs text-gray-400">{r.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
