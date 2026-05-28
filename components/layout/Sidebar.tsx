'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Inbox,
  BarChart3,
  Upload,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  UserPlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRole } from '@/context/RoleContext';
import { RoleSwitcher } from './RoleSwitcher';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const asesorNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Tareas', href: '/tareas', icon: <CheckSquare size={20} /> },
  { label: 'Clientes', href: '/clientes', icon: <Users size={20} /> },
  { label: 'Buzón Documental', href: '/buzon', icon: <Inbox size={20} /> },
  { label: 'Nuevo Cliente', href: '/onboarding', icon: <UserPlus size={20} /> },
];

const clienteNav: NavItem[] = [
  { label: 'Mi Resumen', href: '/portal-cliente', icon: <BarChart3 size={20} /> },
  { label: 'Subir Documentos', href: '/portal-cliente/subir', icon: <Upload size={20} /> },
  { label: 'Mis Documentos', href: '/portal-cliente/mis-documentos', icon: <FolderOpen size={20} /> },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { rolActual } = useRole();

  const navItems = rolActual === 'asesor' ? asesorNav : clienteNav;

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-[#1C2333] text-white transition-all duration-300 sticky top-0',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">Diana Consultores</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-white/10 transition-colors"
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Role Switcher */}
      <div className="p-3 border-b border-white/10">
        <RoleSwitcher collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#4F67FF] text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10 text-xs text-gray-400">
          © 2026 Diana Consultores
        </div>
      )}
    </aside>
  );
}
