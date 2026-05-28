import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
  variant?: 'default' | 'danger';
}

export function MetricCard({ title, value, icon, subtitle, variant = 'default' }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#6B7280]">{title}</p>
          <p
            className={cn(
              'text-2xl font-bold mt-1',
              variant === 'danger' ? 'text-[#EF4444]' : 'text-[#111827]'
            )}
          >
            {value}
          </p>
          {subtitle && <p className="text-xs text-[#6B7280] mt-1">{subtitle}</p>}
        </div>
        <div
          className={cn(
            'p-2.5 rounded-lg',
            variant === 'danger' ? 'bg-red-50' : 'bg-[#4F67FF]/10'
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
