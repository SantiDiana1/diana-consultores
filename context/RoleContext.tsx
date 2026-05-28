'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type Rol = 'asesor' | 'cliente';

interface RoleContextType {
  rolActual: Rol;
  clienteSeleccionado: string;
  cambiarRol: (rol: Rol) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [rolActual, setRolActual] = useState<Rol>('asesor');
  const [clienteSeleccionado] = useState<string>('Demo Corp S.L.');
  const router = useRouter();

  const cambiarRol = useCallback(
    (rol: Rol) => {
      setRolActual(rol);
      if (rol === 'asesor') {
        router.push('/dashboard');
      } else {
        router.push('/portal-cliente');
      }
    },
    [router]
  );

  return (
    <RoleContext.Provider value={{ rolActual, clienteSeleccionado, cambiarRol }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
